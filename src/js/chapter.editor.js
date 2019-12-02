// ----------------------------------------------------------------------------------------------------------
//									CHAPTER EDITOR
// ----------------------------------------------------------------------------------------------------------
var ChapterEditor = (function (Peaks) {
	/* Handy waveform values
	(zoomview):
	Total waveform length:
		peaks.waveform.waveformZoomView.pixelLength
	timeToPixels per second
		peaks.waveform.waveformZoomView.data.pixels_per_second

	-----------------------------------------------------------------

	peaks.js events (search peaks.emit in peaks.js for all):
	'zoomview.displaying'	// ? shows start time of overview region
	'user_scroll.zoomview'	// For scrubbing the zoomview
	'user_seek'				// For scrubbing the overview
	*/
	var peaks;
	var audioObj;
	var chapMinWidth = 1; // seconds
	var loadingIcon = document.getElementById('waveformLoading');

	var overviewContainer;
	var zoomviewContainer;
	var titlesContainer = document.getElementById('titlesContainer');

	var manualCueButton = document.getElementById('manualCue');
	var deleteCuesButton = document.getElementById('deleteCues');
	var zoomSlider = document.getElementById('waveformZoom');
	var volumeSlider = document.getElementById('waveformVolume');
	var playPauseButton = document.querySelector("#playPauseButton > span");
	var currentTime = document.getElementById('waveTimestamp');
	var helpButton = document.getElementById('wsHelp');
	var resetButton = document.getElementById('chapReset');

	// Document event listeners
	var _keyDownListener;
	var _keyUpListener;
	var _mouseDownListener;

	// Standard event listeners
	var _volListener;
	var _zoomListener;
	var _helpListener;
	var _resetListener;
	var _playerPauseListener;
	var _manualCueListener;
	var _autoCueListener;

	var CUE_MODE = 'auto'; // 'auto' or 'manual'
	var EDITING_TITLE = null; // State to keep track of when a chapter title is being edited

	var lastActive; // last active chapter
	var prevHighlightX; // previous highlight rect x coordinate
	var activeChap; // Currently playing chapter

	// Replacement for default peaks.js point markers
	var customPointMarker = function(options) {
		extend(options, {
			handleColor: '#fff',
			timeColor: '#fff'
		});
	    var handleTop = (options.height / 2) - 10.5;
	    var handleWidth = 10;
	    var handleHeight = 20;
	    var handleX = -(handleWidth / 2) + 0.5; // Place in the middle of the marker

	    var group = new Konva.Group({
	      draggable: options.draggable,
	      dragBoundFunc: function(pos) {
	        return {
	          x: pos.x, // No constraint horizontally
	          y: this.getAbsolutePosition().y // Constrained vertical line
	        };
	      }
	    });

	    if (options.onDragStart) {
	      group.on('dragstart', function(event) {
	        options.onDragStart(options.point);
	      });
	    }

	    if (options.onDragMove) {
	      group.on('dragmove', function(event) {
	        options.onDragMove(options.point);
	      });
	    }

	    if (options.onDragEnd) {
	      group.on('dragend', function(event) {
	        options.onDragEnd(options.point);
	      });
	    }

	    if (options.onDblClick) {
	      group.on('dblclick', function(event) {
	        options.onDblClick(options.point);
	      });
	    }

	    if (options.onMouseEnter) {
	      group.on('mouseenter', function(event) {
	        options.onMouseEnter(options.point);
	      });
	    }

	    if (options.onMouseLeave) {
	      group.on('mouseleave', function(event) {
	        options.onMouseLeave(options.point);
	      });
	    }

	    // Label
	    var text = null;

	    if (options.showLabel) {
	      text = new Konva.Text({
	        x:          2,
	        y:          12,
	        text:       options.point.labelText,
	        textAlign:  'left',
	        fontSize:   10,
	        fontFamily: 'sans-serif',
	        fill:       '#000'
	      });

	      group.label = text;
	    }

	    // Handle
	    var handle = null;

	    if (options.draggable) {
	      handle = new Konva.Rect({
	        x:      handleX,
	        y:      handleTop,
	        width:  handleWidth,
	        height: handleHeight,
	        fill:   options.handleColor
	      });
	    }

	    // Line
	    var line = new Konva.Line({
	      x:           0,
	      y:           0,
	      points:      [0, 0, 0, options.height],
	      stroke:      options.handleColor,
	      strokeWidth: 1
	    });

	    // Events
	    var time = null;

	    if (handle) {
	      // Time
	      time = new Konva.Text({
	        x:          10,
	        y:          (options.height / 2) - 35,
	        text:       '',
	        fontSize:   10,
	        fontFamily: 'sans-serif',
	        fill:       options.timeColor,
	        textAlign:  'center'
	      });

	      time.hide();
	      group.time = time;

	      handle.on('mouseover', function(event) {
	        // Position text to the left of the marker
	        time.setX(10); // time.getWidth()
	        time.show();
	        options.layer.draw();
	      });

	      handle.on('mouseout', function(event) {
	        time.hide();
	        options.layer.draw();
	      });
	    }

	    if (handle) {
	      group.add(handle);
	    }

	    group.add(line);

	    if (text) {
	      group.add(text);
	    }

	    if (time) {
	      group.add(time);
	    }

	    return group;
	}

	// Move timestamps to top so waveform doesn't cover them
	var setLayers = function() {
		// Time text doesnt have _view property
		peaks.waveform.waveformOverview.waveformLayer.children.each(function(shape){if (!shape._view){
			shape.moveToTop();
			shape.draw();
		}});
		peaks.waveform.waveformZoomView.waveformLayer.children.each(function(shape){if (!shape._view){
			shape.moveToTop();
			shape.draw();
		}});
	}

	/* Create an even spread of points on the waveform and saves 	cue points in localstoarge
	   Returns: array of point objects
	 */
	var createEvenPoints = function(audio, numChapters) {
		var points = new Array();
		var chapLength = audio.duration / numChapters;
		props.cues[0] = 0;
		for (var i = 1; i < numChapters; i++) {
			var point = {
				time: chapLength * i,
				editable: true,
			}
			points.push(point);
			props.cues[i] = point.time;
		}
		localforage.setItem('props', props);
		return points;
	}
	// Sets up points based on current props.cues values
	var createPointsFromCues = function() {
		if (props.cues.length === 0 || props.cues.length != props.slides.length) {fillCues();}
		var points = new Array();
		for (var i = 1; i < props.cues.length; i++) {
			var point = {
				time: props.cues[i],
				editable: true,
			}
			points.push(point);
			props.cues[i] = point.time;
		}
		localforage.setItem('props', props);
		return points;
	}
	// Creates a new point at cueTime for the next slide
	var createManualPoint = function(cueTime) {
		if (cueTime <= props.cues[props.cues.length-1]) {
			console.log('cannot overlap chapters');
			return;
		}
		peaks.points.add({
			time: cueTime,
			editable: true,
		});
		props.cues.push(cueTime);
		localforage.setItem('props', props);
		var index = peaks.points._findPoint(function(point){
			if (point.time === cueTime) {
				return point;
			}
		});
		createTitle(peaks.points.getPoint('peaks.point.'+index[0]));
	}

	// For window resize events
	var redrawOverviewPoints = function() {
		var samples = peaks.waveform.waveformZoomView._scale * peaks.waveform.waveformZoomView.pixelLength;
		var fit = samples / waveContainer.clientWidth;
		peaks.options.zoomLevels = [fit/8, fit/4, fit/2, fit];
		peaks.zoom._zoomLevels = [fit/8, fit/4, fit/2, fit];
		peaks.zoom.reset();
		alignChapterTitles();
		setTimeout(function() {
			peaks.waveform.waveformOverview._pointsLayer.updatePoints(0,peaks.player.getDuration());
			peaks.waveform.waveformZoomView.container.hidden = false;
			peaks.waveform.waveformOverview.container.hidden = false;
		}, 1); // peaks event timing is jank, use settimeout to make sure resize is really done
	}

	// Setup appropriate zoom levels 
	var createZoomLevels = function() {
		var totalSamples = peaks.waveform.waveformZoomView._scale * peaks.waveform.waveformZoomView.pixelLength;
		var fit = totalSamples / peaks.waveform.waveformZoomView.width;
		peaks.options.zoomLevels = [fit/8, fit/4, fit/2, fit];
		peaks.zoom._zoomLevels = [fit/8, fit/4, fit/2, fit];
	}

	// Creates a chapter title for each point (plus one)
	var createAllTitles = function(points) {
		for (var i = 0; i <= points.length; i++) {
			var title = document.createElement("div");
			var titleText = document.createElement("span");
			title.appendChild(titleText);
			if (i == 0) {
				if (points.length == 0) {
					var pwidth = peaks.waveform.waveformZoomView.pixelLength;
				} else {
					var percent = points[i].time / peaks.player.getDuration();
					var pwidth = percent * peaks.waveform.waveformZoomView.pixelLength;
				}
			} else if (i == points.length) {
				var percentPos = peaks.points.getPoint('peaks.point.' + (i-1)).time / peaks.player.getDuration();
				var pointPos = percentPos * peaks.waveform.waveformZoomView.pixelLength;
				var pwidth = peaks.waveform.waveformZoomView.pixelLength - pointPos;
			} else {
				var percent = (points[i].time - points[i-1].time) / peaks.player.getDuration();
				var pwidth = percent * peaks.waveform.waveformZoomView.pixelLength;
			}
			title.classList.add("chapter-title");
			(i == 0) ? title.classList.add("active") : title.classList.add("inactive");
			title.style.width = pwidth + "px";
			titleText.innerText = props.slidePageNames[i];
			title.setAttribute("data-index", i);
			titleText.addEventListener('dblclick', function(e) {
				editTitle(this.parentElement);
			});
			titlesContainer.appendChild(title);
		}
	}
	// Create chapter title for a single point
	var createTitle = function(point) {
		var lastTitle = false;
		var title = document.createElement("div");
		var titleText = document.createElement("span");
		title.appendChild(titleText);
		var pointIndex = ~~(point.id.substring(point.id.lastIndexOf('.') + 1));
		(pointIndex == 0) ? title.classList.add("active") : title.classList.add("inactive");
		title.classList.add("chapter-title");
		var points = peaks.points.getPoints();
		if (pointIndex == 0) {
			var percent = point.time / peaks.player.getDuration();
			var pwidth = percent * peaks.waveform.waveformZoomView.pixelLength;
		} else if (pointIndex == props.slides.length - 2) {
			lastTitle = true;
			var percent = (points[pointIndex].time - points[pointIndex-1].time) / peaks.player.getDuration();
			var pwidth = percent * peaks.waveform.waveformZoomView.pixelLength;
		} else {
			var percent = (points[pointIndex].time - points[pointIndex-1].time) / peaks.player.getDuration();
			var pwidth = percent * peaks.waveform.waveformZoomView.pixelLength;
		}
		title.style.width = pwidth + "px";
		titleText.innerText = "Slide " + (pointIndex+1);
		title.setAttribute("data-index", pointIndex);
		titleText.addEventListener('dblclick', function(e) {
			editTitle(this.parentElement);
		});
		titlesContainer.appendChild(title);
		if (lastTitle) {
			var lt = document.createElement('div');
			var ltText = document.createElement('span');
			lt.appendChild(ltText);
			var percent = (peaks.player.getDuration() - point.time) / peaks.player.getDuration();
			var pwidth = percent * peaks.waveform.waveformZoomView.pixelLength;
			lt.classList.add("chapter-title", "inactive");
			lt.style.width = pwidth + "px";
			ltText.innerText = "Slide " + (pointIndex + 2);
			lt.setAttribute("data-index", pointIndex + 1);
			ltText.addEventListener('dblclick', function(e) {
				editTitle(this.parentElement);
			});
			titlesContainer.appendChild(lt);
			if (CUE_MODE === 'manual') {CUE_MODE = 'auto';}
		}
	}
	// Edit specific title
	var editTitle = function(titleDiv) {
		EDITING_TITLE = titleDiv.firstChild;
		EDITING_TITLE.setAttribute("contenteditable", true);
		EDITING_TITLE.style.textOverflow = "";
		EDITING_TITLE.style.overflowWrap = "break-word";
		EDITING_TITLE.style.whiteSpace = "normal";
		EDITING_TITLE.classList.add("editing");
		EDITING_TITLE.parentElement.classList.add("editing");
		// Select text
		var range = document.createRange();
		range.selectNodeContents(EDITING_TITLE);
		var selection = window.getSelection();
		selection.removeAllRanges();
		selection.addRange(range);
		EDITING_TITLE.focus();
	}
	// Saves title changes when editing
	var saveTitle = function() {
		// check for empty name
		// (try) to match all whitespace characters
		if (EDITING_TITLE.innerText.replace(/(<br>)*(&nbsp;)*\s*/g,'') === "") {
			revertTitle();
		} else { // save new name
			EDITING_TITLE.innerText = EDITING_TITLE.innerText.replace(/(<br>)*(&nbsp;)*/g, '')
			props.slidePageNames[EDITING_TITLE.parentElement.getAttribute("data-index")] = EDITING_TITLE.innerText;
			localforage.setItem("props", props);
			EDITING_TITLE.setAttribute("contenteditable", false);
			EDITING_TITLE.style.textOverflow = "ellipsis";
			EDITING_TITLE.style.whiteSpace = "nowrap";
			EDITING_TITLE.classList.remove('editing');
			EDITING_TITLE.parentElement.classList.remove('editing');
			EDITING_TITLE = null;		
		}
	}
	// Discards title changes when editing
	var revertTitle = function() {
		EDITING_TITLE.innerText = props.slidePageNames[EDITING_TITLE.parentElement.getAttribute("data-index")];
		EDITING_TITLE.setAttribute("contenteditable", false);
		EDITING_TITLE.style.textOverflow = "ellipsis";
		EDITING_TITLE.style.whiteSpace = "nowrap";
		EDITING_TITLE.classList.remove('editing');
		EDITING_TITLE.parentElement.classList.remove('editing');
		EDITING_TITLE = null;		
	}
	// Deletes all titles
	var deleteAllTitles = function() {
		while (titlesContainer.lastChild) {
			titlesContainer.removeChild(titlesContainer.lastChild);
		}
	}
	// Align chapter title with point or align all titles with points if point==null 
	var alignChapterTitles = function(point=null) {
		if (point === null) {
			for (var i = 0; i < peaks.points.getPoints().length; i++) {
				// First Point
				if (i == 0) {
					var percentPos = peaks.points.getPoint('peaks.point.0').time / peaks.player.getDuration();
					var pointPos = percentPos * peaks.waveform.waveformZoomView.pixelLength;
					var titleWidth = pointPos;
					titlesContainer.children[0].style.width = titleWidth + "px";
				// Last Point
				} else if (i == peaks.points.getPoints().length - 1) {
					var percentPos = peaks.points.getPoint('peaks.point.' + i).time / peaks.player.getDuration();
					var pointPos = percentPos * peaks.waveform.waveformZoomView.pixelLength;
					var prevPercentPos = peaks.points.getPoint('peaks.point.' + (i-1)).time / peaks.player.getDuration();
					var prevPointPos = prevPercentPos * peaks.waveform.waveformZoomView.pixelLength;
					var titleWidth = pointPos - prevPointPos;
					titlesContainer.children[i].style.width = titleWidth + "px";
					titlesContainer.children[i+1].style.width = (peaks.waveform.waveformZoomView.pixelLength - pointPos) + "px";
				// All other points
				} else {
					var percentPos = peaks.points.getPoint('peaks.point.' + i).time / peaks.player.getDuration();
					var pointPos = percentPos * peaks.waveform.waveformZoomView.pixelLength;
					var prevPercentPos = peaks.points.getPoint('peaks.point.' + (i-1)).time / peaks.player.getDuration();
					var prevPointPos = prevPercentPos * peaks.waveform.waveformZoomView.pixelLength;
					var titleWidth = pointPos - prevPointPos ;
					titlesContainer.children[i].style.width = titleWidth + "px";
				}
			}
		} else {
			var pointIndex = ~~(point.id.substring(point.id.lastIndexOf('.') + 1));
			var percentPos = point.time / peaks.player.getDuration();
			var pointPos = percentPos * peaks.waveform.waveformZoomView.pixelLength;
			// First point
			if (pointIndex == 0) {
				// Active chapter
				var titleWidth = pointPos; 
				// Next chapter
				var nextPercentPos = peaks.points.getPoint('peaks.point.' + (pointIndex+1)).time / peaks.player.getDuration();
				var nextPointPos = nextPercentPos * peaks.waveform.waveformZoomView.pixelLength;
				var nextTitleWidth = nextPointPos - pointPos;
				// Set widths
				titlesContainer.children[0].style.width = titleWidth + "px";
				titlesContainer.children[1].style.width = nextTitleWidth + "px";
			// Last Point
			} else if (pointIndex + 1 == peaks.points.getPoints().length) {
				var prevPercentPos = peaks.points.getPoint('peaks.point.' + (pointIndex-1)).time / peaks.player.getDuration();
				var prevPointPos = prevPercentPos * peaks.waveform.waveformZoomView.pixelLength;
				// Active chapter
				var titleWidth = pointPos - prevPointPos;
				// Next chapter
				var nextTitleWidth = peaks.waveform.waveformZoomView.pixelLength - pointPos;
				// Set widths
				titlesContainer.children[pointIndex].style.width = titleWidth + "px";
				titlesContainer.children[pointIndex+1].style.width = nextTitleWidth + "px";
			// All other points
			} else {
				var prevPercentPos = peaks.points.getPoint('peaks.point.' + (pointIndex-1)).time / peaks.player.getDuration();
				var prevPointPos = prevPercentPos * peaks.waveform.waveformZoomView.pixelLength;
				var nextPercentPos = peaks.points.getPoint('peaks.point.' + (pointIndex+1)).time / peaks.player.getDuration();
				var nextPointPos = nextPercentPos * peaks.waveform.waveformZoomView.pixelLength;
				// Active chapter
				var titleWidth = pointPos - prevPointPos;
				// Next chapter
				var nextTitleWidth = nextPointPos - pointPos;
				// Set widths
				titlesContainer.children[pointIndex].style.width = titleWidth + "px";
				titlesContainer.children[pointIndex+1].style.width = nextTitleWidth + "px";
			}
		}
	}
	// Set/reset the left offset of the chapter titles container
	var alignTitlesContainer = function(time) {
		time = (time) ? time : peaks.player.getCurrentTime();
		var frameIndex = peaks.waveform.waveformZoomView.timeToPixels(time);
		var frameOffset = frameIndex - Math.floor(peaks.waveform.waveformZoomView.width / 2);
		frameOffset = (frameOffset < 0) ? 0 : frameOffset;
		titlesContainer.style.left = '-' + frameOffset + 'px';

	}
	// Makes sure chapter title is visible (when zoomed in and chapter width goes off screen)
	var stickTitles = function() {
		var activeChap = document.querySelector(".chapter-title.active");
		if (lastActive == undefined) {lastActive = document.querySelector('#titlesContainer:first-child');}
		if (activeChap != lastActive) {
			lastActive.style.textIndent = "0px";
		}
		try {
			if (activeChap.getBoundingClientRect().x < 0) {
				activeChap.style.textIndent = (0 - activeChap.getBoundingClientRect().x) / 2 + "px"; // divide by 2 because reasons
			} else {
				activeChap.style.textIndent = "0px";
			}
		} catch(e) {
			if (e instanceof TypeError) {
				// console.log("No active chapter causing: "+e);
			} else {
				throw e;
			}
		}
		lastActive = activeChap;
	}

	// Constrain chapters to min width and prevent overlap 
	var constrainChapters = function(point) {
		var pointIndex = ~~(point.id.substring(point.id.lastIndexOf('.') + 1));
		if (pointIndex == 0) {
			if (point.time <= chapMinWidth) {
				point.time = chapMinWidth;
			}

			if (point.time >= peaks.points.getPoint('peaks.point.' + (pointIndex+1)).time - chapMinWidth) {
				point.time = peaks.points.getPoint('peaks.point.' + (pointIndex+1)).time - chapMinWidth;
			}
		} 
		else if (pointIndex + 1 == peaks.points.getPoints().length) {
			if (point.time <= peaks.points.getPoint('peaks.point.' + (pointIndex-1)).time + chapMinWidth) {
				point.time = peaks.points.getPoint('peaks.point.' + (pointIndex-1)).time + chapMinWidth;
			}
			if (point.time >= audioObj.duration - chapMinWidth) {
				point.time = audioObj.duration - chapMinWidth;
			}
		}
		else {
			if (point.time <= peaks.points.getPoint('peaks.point.' + (pointIndex-1)).time + chapMinWidth) {
				point.time = peaks.points.getPoint('peaks.point.' + (pointIndex-1)).time + chapMinWidth;
			}
			if (point.time >= peaks.points.getPoint('peaks.point.' + (pointIndex+1)).time - chapMinWidth) {
				point.time =  peaks.points.getPoint('peaks.point.' + (pointIndex+1)).time - chapMinWidth;
			}
		}
	}
	// Adds the active class to the currently displayed chapters title and the inactive class to all others
	var setActiveChapter = function(time) {
		var activeIndex;
		for (var i = 0; i < peaks.points._points.length; i++) {
			if (i == 0 && time < peaks.points._points[0].time) {
				activeIndex = 0;
				break;
			} else if (time < peaks.points._points[i].time && time > peaks.points._points[i-1].time) {
				activeIndex = i;
				break;
			} else if (time > peaks.points._points[peaks.points._points.length-1].time) {
				activeIndex = peaks.points._points.length;
			}
		}
		var titles = titlesContainer.children;
		for (var i = 0; i < titles.length; i++) {
			if (i == activeIndex) {
				titles[i].classList.add('active');
				titles[i].classList.remove('inactive');
			} else {
				titles[i].classList.add('inactive');
				titles[i].classList.remove('active');
			}
		}
	}
	// Show the currently active chapters associated slide
	var displayActiveChapter = function(time) {
		for (var i = 0; i < props.cues.length; i++) {
			if (i === props.cues.length-1) {
				if (time > props.cues[i] && activeChap !== i) {
					activeChap = i;
					UI.Dom.Slide.Preview(i);
					return;
				}
			} // javascript cant do maths so this is broken atm
			else if (time > props.cues[i] && time < props.cues[i+1] && activeChap !== i) {
				
				activeChap = i;
				UI.Dom.Slide.Preview(i);
				return;
			}
		}
	}

	// Track if the overview highlight rect has moved (eg while playing) and update title container offset if it has
	var trackOverviewRect = function() {
		// For checking if the highlight rect has moved on its own
		var highlightRectX = peaks.waveform.waveformOverview.highlightRect.attrs.x;
		if (prevHighlightX == undefined) prevHighlightX = highlightRectX;
		if (highlightRectX !== prevHighlightX) {
			var frameOffset = peaks.waveform.waveformZoomView.frameOffset;
			titlesContainer.style.left = '-' + frameOffset + 'px';
		}
		prevHighlightX = highlightRectX;
	}
	// Restore chapter titles (when resetting editor)
	var restoreTitles = function() {

	}

	// Toggle audio playback
	var playPause = function() {
		if (peaks.player.isPlaying()) {
			peaks.player.pause();
			playPauseButton.innerHTML = 'play_arrow';
		} else {
			peaks.player.play();
			playPauseButton.innerHTML = 'pause';
		}
	}
	// Toggle help tooltips
	var toggleHelp = function() {
		var toolTips = document.querySelectorAll("[ws-tooltip]");
		for (var el of toolTips) {
			if (el.classList.contains("ws-tooltip-active")) {
				el.classList.remove("ws-tooltip-active");
			} else {
				el.classList.add("ws-tooltip-active");
			}
		}
	}


	var unHide = function() {
		redrawOverviewPoints();
		//waveformlayer does nothing, dont bother with it
		peaks.waveform.waveformOverview.width = waveContainer.clientWidth;
		peaks.waveform.waveformOverview.data = peaks.waveform.originalWaveformData.resample(waveContainer.clientWidth);
		peaks.waveform.waveformOverview.waveformLayer.canvas.context._context.clearRect(0,0,peaks.waveform.waveformOverview.waveformLayer.canvas.width, peaks.waveform.waveformOverview.waveformLayer.canvas.height);
		peaks.waveform.waveformOverview.axis.drawAxis(peaks.waveform.waveformOverview.waveformLayer.canvas.context,peaks.waveform.waveformOverview);
		peaks.waveform.waveformOverview.waveformLayer.draw();
	}

	// Unbind event listeners
	var unbind = function() {
		window.onresize = null;
		document.removeEventListener("keydown", _keyDownListener);
		document.removeEventListener("keyup", _keyUpListener);
		document.removeEventListener("mousedown", _mouseDownListener);

		volumeSlider.removeEventListener("input", _volListener);
		zoomSlider.removeEventListener("input", _zoomListener);
		helpButton.removeEventListener("click", _helpListener);
		resetButton.removeEventListener("click", _resetListener);
		playPauseButton.removeEventListener("click", _playerPauseListener);
		manualCueButton.removeEventListener("click", _manualCueListener);
	}
	// Uninitialise peaks and associated resources
	var uninit = function() {
		CUE_MODE = 'auto';
		//Reset audio position
		peaks.player.pause();
		peaks.player.seek(0);
		playPauseButton.innerHTML = 'play_arrow';
		//Unbind listeners
		unbind();
		peaks.destroy();
		loadingIcon.classList.add("visible");
		while (titlesContainer.firstChild) {
			titlesContainer.removeChild(titlesContainer.firstChild);
		}
		titlesContainer.style.left = "0px";
		zoomSlider.value = zoomSlider.max;
		props.cues = [];
	}
	// Reset the chapter editor
	var reset = function(titles = true) {
		uninit();
		// reset slide titles
		if (titles) {
			for (var i = 0; i < props.slides.length; i++) {
				props.slidePageNames[i] = 'Slide ' + (i+1);
			}
		}
		localforage.setItem('props', props).then(function(){
			ChapterEditor.Initialise();
		});
	}

	var getPeaks = function() {
		return peaks;
	}

	var waveformInit = function() {
		var audioCtx = new (window.AudioContext || window.webkitAudioContext)();
		audioObj = document.getElementById("page-audio-obj");
		peaks = Peaks.init({
			container: waveContainer,
			mediaElement: audioObj,
			audioContext: audioCtx,
			// dataUri: { // must be path to file, cannot currently supply objectUrl
				// arraybuffer: wavedataUri
				// json: 'wave.json',
			// },
			waveformBuilderOptions: { 
				scale: 8,			    
				amplitude_scale: 0.7,
			},			  			   
			zoomLevels: [8],		  
			height: 50, // Actual height set in css
			
			// Colours
			overviewWaveformColor: '#085caa',//'#366b9c'/*getComputedStyle(document.body).getPropertyValue('--panel-hilight')*/,
			overviewHighlightRectangleColor: '#ffffffab',
			zoomWaveformColor: '#f0b40f',
			playheadColor: 'rgba(0, 0, 0, 1)',
			playheadTextColor: '#FFF',
			pointMarkerColor: '#FF0000',
			axisGridlineColor: '#ccc',
			axisLabelColor: '#FFF', // timestamps

			// Template
			template: '<div class="waveform"><div class="zoom-container"></div><div class="overview-container"></div></div>',
		});
		peaks.on('peaks.ready', function() {
			waveformLoaded = true;
			extend(peaks.options, {
				createPointMarker: customPointMarker
			});

			// Setting up some tooltips
			zoomviewContainer = document.querySelector('.zoom-container');
			zoomviewContainer.setAttribute('ws-tooltip', 'Click and drag to navigate the waveform when zoomed in. Drag markers to set slide cues.')
			overviewContainer = document.querySelector('.overview-container');
			overviewContainer.setAttribute('ws-tooltip', 'This is an overview of the full waveform. The highlighted area is displayed above. Click and drag to navigate the waveform and change the displayed area.')
			loadingIcon.classList.remove("visible");
			
			localforage.getItem('props')
			.then(function(p) {
				peaks.points.add(createPointsFromCues());
			}).then(function() {
				createZoomLevels();
				peaks.zoom.setZoom(3);
				createAllTitles(peaks.points.getPoints());
				setLayers();
				alignTitlesContainer(undefined);
			}).catch(function(err) {
				console.warn(err);
			});


			// Listeners that require peaks to be ready
			playPauseButton.addEventListener("click", _playerPauseListener = function(e) {
				e.preventDefault();
				playPause();
			});
			zoomSlider.addEventListener("input", _zoomListener = function(e) {
				e.preventDefault();
				peaks.zoom.setZoom(zoomSlider.value);
				alignChapterTitles();
				var frameOffset = (peaks.waveform.waveformZoomView.frameOffset < 0) ? 0 : peaks.waveform.waveformZoomView.frameOffset;
				titlesContainer.style.left = '-' + frameOffset + 'px';
			});
			manualCueButton.addEventListener('click', _manualCueListener = function(e) {
				if (CUE_MODE !== 'manual') {
					CUE_MODE = 'manual';
					props.cues = [0];
					localforage.setItem('props', props);
					peaks.points.removeAll();
					peaks.points._pointIdCounter = 0;
					deleteAllTitles();
				}
			});

			// Key Bindings
			document.addEventListener("keydown", _keyDownListener = function(e) {
				if (body.classList.contains('slides')) {
					switch(e.code) {
						case 'Space':
							if (!EDITING_TITLE) playPause();
							break;
						case 'Enter':
						case 'NumpadEnter':
							if (EDITING_TITLE) saveTitle();
							break;
						case 'Escape':
							if (EDITING_TITLE) revertTitle();
							break;
						case 'ArrowRight':
							if (EDITING_TITLE) {
								var nextTitle = EDITING_TITLE.parentElement.nextSibling;
								saveTitle();
								if (nextTitle) editTitle(nextTitle);
							}
					}
				}
			});
			// Manual Cue set
			document.addEventListener("keyup", _keyUpListener = function(e) {
				if (body.classList.contains('slides') && e.code === 'Enter' && CUE_MODE === 'manual') {
					if (props.cues.length < props.slides.length) {
						createManualPoint(peaks.player.getCurrentTime());
					}
				}

				// TEST BUTTON
				if (body.classList.contains('slides') && e.code === 'KeyP') {
					console.log(peaks);
				}
			});
			document.addEventListener("mousedown", function(e) {
				if (body.classList.contains('slides') && EDITING_TITLE) {
					if (e.srcElement !== EDITING_TITLE && e.srcElement !== EDITING_TITLE.parentElement) {
						revertTitle();
					}
				}
			});

		});
		peaks.on('user_scroll.zoomview', function(frameOffset) {
			// Fires only on dragging the zoomview waveform (not on click to scrub)
			// frameOffset = waveform pixel offset

			// alignTitlesContainer (ez mode)
			frameOffset = (frameOffset < 0) ? 0 : frameOffset;
			titlesContainer.style.left = '-' + frameOffset + 'px';
			
			stickTitles();
		});
		peaks.on('user_seek', function(time) {
			// time = position of playhead (seconds)
			// Fires when dragging OR clicking the OVERVIEW waveform (whether moving the region or not)
			// OverviewWaveform info (eg x position) will NOT be up to date when this event fires, will have values from previous event
			// player_time_update WILL ALWAYS FIRE WITH THIS

			// alignTitlesContainer(time);
			// setTimeout(stickTitles, 100);
		});
		peaks.on('points.dragmove', function(point) {
			var id = ~~(point.id.substring(point.id.lastIndexOf('.') + 1));
			props.cues[id+1] = point.time;
			constrainChapters(point);
			alignChapterTitles(point);
		});
		peaks.on('points.dragend', function(point) {
			localforage.setItem("props", props);
		});
		peaks.on('player_time_update', function(time) {
			currentTime.innerHTML = HHMMSS(time);
			trackOverviewRect();
			setActiveChapter(time);
			displayActiveChapter(time);
			stickTitles();
		});
		peaks.on('player_pause', function(time) {
			playPauseButton.innerHTML = "play_arrow";
		});
		peaks.on('window_resize_complete', function(playerWidth) {
			if (body.classList.contains('slides')) {
				redrawOverviewPoints();
			}
		});
		peaks.on('zoom.update', function() {
			setTimeout(stickTitles, 1);
		});

		// Listeners that dont require peaks to be ready
		volumeSlider.addEventListener("input", _volListener = function(e) {
			e.preventDefault(e);
			audioObj.volume = volumeSlider.value / 100;
		});	
		helpButton.addEventListener("click", _helpListener = function(e) {
			e.preventDefault();
			toggleHelp();
		});	
		resetButton.addEventListener("click", _resetListener = function(e) {
			e.preventDefault();
			reset();
		});
	}


	return {
		Initialise: waveformInit,
		UnInitialise: uninit,
		GetPeaks: getPeaks,
		Show: unHide,
		Reset: reset,
	}
})(peaks);