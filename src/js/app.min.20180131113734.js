/*! tinycolorpicker - v0.9.5 - 2015-11-20
 * http://www.baijs.com/tinycolorpicker
 *
 * Copyright (c) 2015 Maarten Baijs <wieringen@gmail.com>;
 * Licensed under the MIT license */
function toggle_class(e,t){e.parentNode.querySelectorAll(":scope>"+e.tagName).forEach(function(n){return n.classList[n===e?"add":"remove"](t)})}function splitDocument(e,t){return performance.mark("split-document-begin"),new Promise(function(n,r){var i=document.implementation.createHTMLDocument("foo")
i.documentElement.innerHTML=t,[].forEach.call(i.querySelectorAll("head > script"),function(e){e.parentNode.removeChild(e)}),[].forEach.call(i.querySelectorAll("div.pi"),function(e){e.parentNode.removeChild(e)}),[].forEach.call(i.querySelectorAll("style"),function(e){e.textContent.indexOf("Fancy styles for pdf2htmlEX")!==-1&&e.parentNode.removeChild(e)}),[].forEach.call(i.querySelectorAll("a:not([target])"),function(e){e.setAttribute("target","_blank")})
var a=i.querySelector("body > #sidebar")
a.parentNode.removeChild(a),a=i.querySelector("body > div.loading-indicator"),a.parentNode.removeChild(a),a=i.querySelector("head > meta[name='generator']"),a.parentNode.removeChild(a),i.querySelector("head").insertAdjacentHTML("beforeend",Handlebars.templates["style-transform-scale"]({})),i.querySelector("body").insertAdjacentHTML("beforeend",Handlebars.templates["script-transform-scale"]({}))
for(var o=i.getElementById("page-container"),s=o.querySelectorAll("div[data-page-no]").length,l=o.cloneNode(!0),u=0,c=1;u<s;u++){for(;o.firstChild;)o.removeChild(o.firstChild)
i.querySelector("head > title").textContent=e+" - Page "+c
var d=l.querySelector("#pf"+dec2hex(c))
if(null!==d){o.appendChild(d)
var f="<!doctype html>"+i.documentElement.outerHTML,h="page-"+(new Date).getTime().toString(36)+"-"+c
localforage.setItem(h,new Blob([f],{type:"text/html"})),f=null,props.slides.push({fileid:h,label:e+" - Page "+c,cue:0}),c+=1}}l=null,i=null,UI.Dom.Cache.Save(),performance.mark("split-document-end"),n()})}function splitAudio(){if(0!==props.duration&&0!==props.slides.length&&props.split!==!0){for(var e=props.duration/props.slides.length,t=0,n=0,r={};n<props.slides.length,r=props.slides[n];n++)r.cue=Math.round(1e3*t)/1e3,t+=e
props.split=!0,generateWebVtt(!0),UI.Dom.Cache.Save(),UI.Dom.Audio.Ready()}}function generateWebVtt(e){if(0!==props.duration&&0!==props.slides.length){for(var t=["WEBVTT",""],n=0,r=props.slides.length;n<r;n++){var i=props.slides[n],a=hhmmss(i.cue,!0),o=a+" --> "
o+=n<r-1?hhmmss(props.slides[n+1].cue,!0):hhmmss(props.duration,!0),t.push(i.fileid+".html"),t.push(o),t.push(i.label),t.push("")}props.webvtt=t.join("\n"),UI.Dom.Audio.AddTrack(e)}}function oEmbed(e){if(performance.mark("oembed-begin"),e.indexOf("slideshare")!==-1)UI.Dom.Design.SetAspectRatio("4:3"),UI.Converting("slide"),$.ajax({type:"GET",url:"http://www.slideshare.net/api/oembed/2?url="+encodeURIComponent(e)+"&maxwidth=1280&maxheight=1024&format=jsonp",dataType:"jsonp"}).done(function(e){if(e&&e.total_slides){for(var t=2===e.conversion_version?"":"-slide-",n=1;n<e.total_slides;n++){var r="https:"+e.slide_image_baseurl+t+n+e.slide_image_baseurl_suffix,i="<img src='"+r+"'>",a=Handlebars.templates.boilerplate({title:e.title+" - Page "+n,content:i,description:e.author_name,index:n,author:e.author_url}),o="page-"+(new Date).getTime().toString(36)+"-"+n
props.slides.push({fileid:o,label:e.title+" - Page "+n,cue:0}),localforage.setItem(o,a)}UI.Dom.Cache.Save(),UI.Dom.Slide.Ready(),performance.mark("oembed-slideshare-end")}else alert("Unable to embed this SlideShare (was it private?)")})
else{if(e.indexOf(".google.com")===-1||e.indexOf("presentation")===-1)throw new Error(xhr.status+": oEmbed called with unsupported url "+e)
UI.Dom.Design.SetAspectRatio("16:9"),UI.Converting("slide")
var t=e.split("://")[1].split("/")[3],n={pdf:"https://docs.google.com/presentation/d/"+t+"/export/pdf?id="+t,source:"https://docs.google.com/presentation/d/"+t+"/edit?usp=sharing",title:""}
fetch(n.source).then(function(e){return e.text()}).then(function(e){var t=document.implementation.createHTMLDocument("foo")
return t.documentElement.innerHTML=e,t.querySelector("meta[property='og:description']").getAttribute("content")}).then(function(e){n.title=e
var t=xhrFields({apikey:CLOUD_CONVERT_APIKEY,input:"download",file:n.pdf,delete:"true",download:"",inputformat:"pdf",filename:e+".pdf",outputformat:"html","converteroptions[bg_format]":"jpg",wait:!0}),r="https://api.cloudconvert.com/convert?"+t,i=new XMLHttpRequest
i.open("POST",r,!0),i.onload=function(){if(200!=i.status)throw new Error("Document conversion error "+i.status)
performance.mark("oembed-googledoc-end"),splitDocument(e,i.responseText).then(function(){UI.Dom.Slide.Ready()})},i.send()}).catch(function(e){alert("Couldn't load or convert these slides (maybe private?)\n"+e)})}}function performAlert(e,t){$("#alert-text").html("<h3>"+e+"</h3><p class='dont-break-out'>"+t+"</p>"),$("#alert").addClass("pop")}!function(e){"use strict"
function t(){for(var e=1;e<arguments.length;e++)for(var t in arguments[e])arguments[e].hasOwnProperty(t)&&(arguments[0][t]=arguments[e][t])
return arguments[0]}function n(n,a){function o(){return b&&(p=document.createElement("canvas"),d.appendChild(p),g=p.getContext("2d"),s()),l(),c}function s(){var t=new Image,n=d.currentStyle||e.getComputedStyle(d,!1),r=n.backgroundImage.replace(/"/g,"").replace(/url\(|\)$/gi,"")
t.crossOrigin="Anonymous",d.style.backgroundImage="none",t.onload=function(){p.width=this.width,p.height=this.height,g.drawImage(t,0,0,this.width,this.height)},t.src=c.options.backgroundUrl||r}function l(){var e=y?"touchstart":"mousedown"
b&&(f["on"+e]=function(e){e.preventDefault(),e.stopPropagation(),d.style.display="block",document.onmousedown=function(){document.onmousedown=null,c.close()}},y?(p.ontouchstart=function(e){return v=!0,u(e.touches[0]),!1},p.ontouchmove=function(e){return u(e.touches[0]),!1},p.ontouchend=function(){return c.close(),!1}):(p.onmousedown=function(e){e.preventDefault(),e.stopPropagation(),v=!0,u(e),document.onmouseup=function(){return document.onmouseup=null,c.close(),!1}},p.onmousemove=u))}function u(e){if(v){var t=e.target.getBoundingClientRect(),r=g.getImageData(e.clientX-t.left,e.clientY-t.top,1,1).data
c.setColor("rgb("+r[0]+","+r[1]+","+r[2]+")"),n.dispatchEvent(A,[c.colorHex,c.colorRGB])}}this.options=t({},i,a),this._defaults=i,this._name=r
var c=this,d=n.querySelectorAll(".track")[0],f=n.querySelectorAll(".color")[0],h=n.querySelectorAll(".colorInner")[0],p=null,m=n.querySelectorAll(".colorInput")[0],g=null,v=!1,b=!!document.createElement("canvas").getContext,y="ontouchstart"in document.documentElement,A=document.createEvent("HTMLEvents")
return A.initEvent("change",!0,!0),this.colorHex="",this.colorRGB="",this.setColor=function(e){e.indexOf("#")>=0?(c.colorHex=e,c.colorRGB=c.hexToRgb(c.colorHex)):(c.colorRGB=e,c.colorHex=c.rgbToHex(c.colorRGB)),h.style.backgroundColor=c.colorHex,m.value=c.colorHex},this.close=function(){v=!1,d.style.display="none"},this.hexToRgb=function(e){var t=/^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(e)
return"rgb("+parseInt(t[1],16)+","+parseInt(t[2],16)+","+parseInt(t[3],16)+")"},this.rgbToHex=function(e){function t(e){var t=new Array("0","1","2","3","4","5","6","7","8","9","A","B","C","D","E","F")
return isNaN(e)?"00":t[(e-e%16)/16]+t[e%16]}var n=e.match(/\d+/g)
return"#"+t(n[0])+t(n[1])+t(n[2])},o()}var r="tinycolorpicker",i={backgroundUrl:null},a=function(e,t){return new n(e,t)}
"function"==typeof define&&define.amd?define(function(){return a}):"object"==typeof module&&module.exports?module.exports=a:e.tinycolorpicker=a}(window),!function(e){if("object"==typeof exports&&"undefined"!=typeof module)module.exports=e()
else if("function"==typeof define&&define.amd)define([],e)
else{var t
t="undefined"!=typeof window?window:"undefined"!=typeof global?global:"undefined"!=typeof self?self:this,t.JSZip=e()}}(function(){var e
return function e(t,n,r){function i(o,s){if(!n[o]){if(!t[o]){var l="function"==typeof require&&require
if(!s&&l)return l(o,!0)
if(a)return a(o,!0)
var u=new Error("Cannot find module '"+o+"'")
throw u.code="MODULE_NOT_FOUND",u}var c=n[o]={exports:{}}
t[o][0].call(c.exports,function(e){var n=t[o][1][e]
return i(n?n:e)},c,c.exports,e,t,n,r)}return n[o].exports}for(var a="function"==typeof require&&require,o=0;o<r.length;o++)i(r[o])
return i}({1:[function(e,t,n){"use strict"
var r=e("./utils"),i=e("./support"),a="ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/="
n.encode=function(e){for(var t,n,i,o,s,l,u,c=[],d=0,f=e.length,h=f,p="string"!==r.getTypeOf(e);d<e.length;)h=f-d,p?(t=e[d++],n=f>d?e[d++]:0,i=f>d?e[d++]:0):(t=e.charCodeAt(d++),n=f>d?e.charCodeAt(d++):0,i=f>d?e.charCodeAt(d++):0),o=t>>2,s=(3&t)<<4|n>>4,l=h>1?(15&n)<<2|i>>6:64,u=h>2?63&i:64,c.push(a.charAt(o)+a.charAt(s)+a.charAt(l)+a.charAt(u))
return c.join("")},n.decode=function(e){var t,n,r,o,s,l,u,c=0,d=0
e=e.replace(/[^A-Za-z0-9\+\/\=]/g,"")
var f=3*e.length/4
e.charAt(e.length-1)===a.charAt(64)&&f--,e.charAt(e.length-2)===a.charAt(64)&&f--
var h
for(h=i.uint8array?new Uint8Array(f):new Array(f);c<e.length;)o=a.indexOf(e.charAt(c++)),s=a.indexOf(e.charAt(c++)),l=a.indexOf(e.charAt(c++)),u=a.indexOf(e.charAt(c++)),t=o<<2|s>>4,n=(15&s)<<4|l>>2,r=(3&l)<<6|u,h[d++]=t,64!==l&&(h[d++]=n),64!==u&&(h[d++]=r)
return h}},{"./support":27,"./utils":29}],2:[function(e,t,n){"use strict"
function r(e,t,n,r,i){this.compressedSize=e,this.uncompressedSize=t,this.crc32=n,this.compression=r,this.compressedContent=i}var i=e("./external"),a=e("./stream/DataWorker"),o=e("./stream/DataLengthProbe"),s=e("./stream/Crc32Probe"),o=e("./stream/DataLengthProbe")
r.prototype={getContentWorker:function(){var e=new a(i.Promise.resolve(this.compressedContent)).pipe(this.compression.uncompressWorker()).pipe(new o("data_length")),t=this
return e.on("end",function(){if(this.streamInfo.data_length!==t.uncompressedSize)throw new Error("Bug : uncompressed data size mismatch")}),e},getCompressedWorker:function(){return new a(i.Promise.resolve(this.compressedContent)).withStreamInfo("compressedSize",this.compressedSize).withStreamInfo("uncompressedSize",this.uncompressedSize).withStreamInfo("crc32",this.crc32).withStreamInfo("compression",this.compression)}},r.createWorkerFrom=function(e,t,n){return e.pipe(new s).pipe(new o("uncompressedSize")).pipe(t.compressWorker(n)).pipe(new o("compressedSize")).withStreamInfo("compression",t)},t.exports=r},{"./external":6,"./stream/Crc32Probe":22,"./stream/DataLengthProbe":23,"./stream/DataWorker":24}],3:[function(e,t,n){"use strict"
var r=e("./stream/GenericWorker")
n.STORE={magic:"\0\0",compressWorker:function(e){return new r("STORE compression")},uncompressWorker:function(){return new r("STORE decompression")}},n.DEFLATE=e("./flate")},{"./flate":7,"./stream/GenericWorker":25}],4:[function(e,t,n){"use strict"
function r(){for(var e,t=[],n=0;256>n;n++){e=n
for(var r=0;8>r;r++)e=1&e?3988292384^e>>>1:e>>>1
t[n]=e}return t}function i(e,t,n,r){var i=s,a=r+n
e=-1^e
for(var o=r;a>o;o++)e=e>>>8^i[255&(e^t[o])]
return-1^e}function a(e,t,n,r){var i=s,a=r+n
e=-1^e
for(var o=r;a>o;o++)e=e>>>8^i[255&(e^t.charCodeAt(o))]
return-1^e}var o=e("./utils"),s=r()
t.exports=function(e,t){if("undefined"==typeof e||!e.length)return 0
var n="string"!==o.getTypeOf(e)
return n?i(0|t,e,e.length,0):a(0|t,e,e.length,0)}},{"./utils":29}],5:[function(e,t,n){"use strict"
n.base64=!1,n.binary=!1,n.dir=!1,n.createFolders=!0,n.date=null,n.compression=null,n.compressionOptions=null,n.comment=null,n.unixPermissions=null,n.dosPermissions=null},{}],6:[function(e,t,n){"use strict"
var r=e("es6-promise").Promise
t.exports={Promise:r}},{"es6-promise":37}],7:[function(e,t,n){"use strict"
function r(e,t){s.call(this,"FlateWorker/"+e),this._pako=new a[e]({raw:!0,level:t.level||-1}),this.meta={}
var n=this
this._pako.onData=function(e){n.push({data:e,meta:n.meta})}}var i="undefined"!=typeof Uint8Array&&"undefined"!=typeof Uint16Array&&"undefined"!=typeof Uint32Array,a=e("pako"),o=e("./utils"),s=e("./stream/GenericWorker"),l=i?"uint8array":"array"
n.magic="\b\0",o.inherits(r,s),r.prototype.processChunk=function(e){this.meta=e.meta,this._pako.push(o.transformTo(l,e.data),!1)},r.prototype.flush=function(){s.prototype.flush.call(this),this._pako.push([],!0)},r.prototype.cleanUp=function(){s.prototype.cleanUp.call(this),this._pako=null},n.compressWorker=function(e){return new r("Deflate",e)},n.uncompressWorker=function(){return new r("Inflate",{})}},{"./stream/GenericWorker":25,"./utils":29,pako:38}],8:[function(e,t,n){"use strict"
function r(e,t,n,r){a.call(this,"ZipFileWorker"),this.bytesWritten=0,this.zipComment=t,this.zipPlatform=n,this.encodeFileName=r,this.streamFiles=e,this.accumulate=!1,this.contentBuffer=[],this.dirRecords=[],this.currentSourceOffset=0,this.entriesCount=0,this.currentFile=null,this._sources=[]}var i=e("../utils"),a=e("../stream/GenericWorker"),o=e("../utf8"),s=e("../crc32"),l=e("../signature"),u=function(e,t){var n,r=""
for(n=0;t>n;n++)r+=String.fromCharCode(255&e),e>>>=8
return r},c=function(e,t){var n=e
return e||(n=t?16893:33204),(65535&n)<<16},d=function(e,t){return 63&(e||0)},f=function(e,t,n,r,a,f){var h,p,m=e.file,g=e.compression,v=f!==o.utf8encode,b=i.transformTo("string",f(m.name)),y=i.transformTo("string",o.utf8encode(m.name)),A=m.comment,w=i.transformTo("string",f(A)),_=i.transformTo("string",o.utf8encode(A)),x=y.length!==m.name.length,S=_.length!==A.length,k="",I="",E="",C=m.dir,T=m.date,z={crc32:0,compressedSize:0,uncompressedSize:0}
t&&!n||(z.crc32=e.crc32,z.compressedSize=e.compressedSize,z.uncompressedSize=e.uncompressedSize)
var D=0
t&&(D|=8),v||!x&&!S||(D|=2048)
var L=0,O=0
C&&(L|=16),"UNIX"===a?(O=798,L|=c(m.unixPermissions,C)):(O=20,L|=d(m.dosPermissions,C)),h=T.getUTCHours(),h<<=6,h|=T.getUTCMinutes(),h<<=5,h|=T.getUTCSeconds()/2,p=T.getUTCFullYear()-1980,p<<=4,p|=T.getUTCMonth()+1,p<<=5,p|=T.getUTCDate(),x&&(I=u(1,1)+u(s(b),4)+y,k+="up"+u(I.length,2)+I),S&&(E=u(1,1)+u(s(w),4)+_,k+="uc"+u(E.length,2)+E)
var R=""
R+="\n\0",R+=u(D,2),R+=g.magic,R+=u(h,2),R+=u(p,2),R+=u(z.crc32,4),R+=u(z.compressedSize,4),R+=u(z.uncompressedSize,4),R+=u(b.length,2),R+=u(k.length,2)
var P=l.LOCAL_FILE_HEADER+R+b+k,N=l.CENTRAL_FILE_HEADER+u(O,2)+R+u(w.length,2)+"\0\0\0\0"+u(L,4)+u(r,4)+b+k+w
return{fileRecord:P,dirRecord:N}},h=function(e,t,n,r,a){var o="",s=i.transformTo("string",a(r))
return o=l.CENTRAL_DIRECTORY_END+"\0\0\0\0"+u(e,2)+u(e,2)+u(t,4)+u(n,4)+u(s.length,2)+s},p=function(e){var t=""
return t=l.DATA_DESCRIPTOR+u(e.crc32,4)+u(e.compressedSize,4)+u(e.uncompressedSize,4)}
i.inherits(r,a),r.prototype.push=function(e){var t=e.meta.percent||0,n=this.entriesCount,r=this._sources.length
this.accumulate?this.contentBuffer.push(e):(this.bytesWritten+=e.data.length,a.prototype.push.call(this,{data:e.data,meta:{currentFile:this.currentFile,percent:n?(t+100*(n-r-1))/n:100}}))},r.prototype.openedSource=function(e){if(this.currentSourceOffset=this.bytesWritten,this.currentFile=e.file.name,this.streamFiles&&!e.file.dir){var t=f(e,this.streamFiles,!1,this.currentSourceOffset,this.zipPlatform,this.encodeFileName)
this.push({data:t.fileRecord,meta:{percent:0}})}else this.accumulate=!0},r.prototype.closedSource=function(e){this.accumulate=!1
var t=f(e,this.streamFiles,!0,this.currentSourceOffset,this.zipPlatform,this.encodeFileName)
if(this.dirRecords.push(t.dirRecord),this.streamFiles&&!e.file.dir)this.push({data:p(e),meta:{percent:100}})
else for(this.push({data:t.fileRecord,meta:{percent:0}});this.contentBuffer.length;)this.push(this.contentBuffer.shift())
this.currentFile=null},r.prototype.flush=function(){for(var e=this.bytesWritten,t=0;t<this.dirRecords.length;t++)this.push({data:this.dirRecords[t],meta:{percent:100}})
var n=this.bytesWritten-e,r=h(this.dirRecords.length,n,e,this.zipComment,this.encodeFileName)
this.push({data:r,meta:{percent:100}})},r.prototype.prepareNextSource=function(){this.previous=this._sources.shift(),this.openedSource(this.previous.streamInfo),this.isPaused?this.previous.pause():this.previous.resume()},r.prototype.registerPrevious=function(e){this._sources.push(e)
var t=this
return e.on("data",function(e){t.processChunk(e)}),e.on("end",function(){t.closedSource(t.previous.streamInfo),t._sources.length?t.prepareNextSource():t.end()}),e.on("error",function(e){t.error(e)}),this},r.prototype.resume=function(){return!!a.prototype.resume.call(this)&&(!this.previous&&this._sources.length?(this.prepareNextSource(),!0):this.previous||this._sources.length||this.generatedError?void 0:(this.end(),!0))},r.prototype.error=function(e){var t=this._sources
if(!a.prototype.error.call(this,e))return!1
for(var n=0;n<t.length;n++)try{t[n].error(e)}catch(e){}return!0},r.prototype.lock=function(){a.prototype.lock.call(this)
for(var e=this._sources,t=0;t<e.length;t++)e[t].lock()},t.exports=r},{"../crc32":4,"../signature":20,"../stream/GenericWorker":25,"../utf8":28,"../utils":29}],9:[function(e,t,n){"use strict"
var r=e("../compressions"),i=e("./ZipFileWorker"),a=function(e,t){var n=e||t,i=r[n]
if(!i)throw new Error(n+" is not a valid compression method !")
return i}
n.generateWorker=function(e,t,n){var r=new i(t.streamFiles,n,t.platform,t.encodeFileName),o=0
try{e.forEach(function(e,n){o++
var i=a(n.options.compression,t.compression),s=n.options.compressionOptions||t.compressionOptions||{},l=n.dir,u=n.date
n._compressWorker(i,s).withStreamInfo("file",{name:e,dir:l,date:u,comment:n.comment||"",unixPermissions:n.unixPermissions,dosPermissions:n.dosPermissions}).pipe(r)}),r.entriesCount=o}catch(e){r.error(e)}return r}},{"../compressions":3,"./ZipFileWorker":8}],10:[function(e,t,n){"use strict"
function r(){if(!(this instanceof r))return new r
if(arguments.length)throw new Error("The constructor with parameters has been removed in JSZip 3.0, please check the upgrade guide.")
this.files={},this.comment=null,this.root="",this.clone=function(){var e=new r
for(var t in this)"function"!=typeof this[t]&&(e[t]=this[t])
return e}}r.prototype=e("./object"),r.prototype.loadAsync=e("./load"),r.support=e("./support"),r.defaults=e("./defaults"),r.loadAsync=function(e,t){return(new r).loadAsync(e,t)},r.external=e("./external"),t.exports=r},{"./defaults":5,"./external":6,"./load":11,"./object":13,"./support":27}],11:[function(e,t,n){"use strict"
function r(e){return new a.Promise(function(t,n){var r=e.decompressed.getContentWorker().pipe(new l)
r.on("error",function(e){n(e)}).on("end",function(){r.streamInfo.crc32!==e.decompressed.crc32?n(new Error("Corrupted zip : CRC32 mismatch")):t()}).resume()})}var i=e("./utils"),a=e("./external"),o=e("./utf8"),i=e("./utils"),s=e("./zipEntries"),l=e("./stream/Crc32Probe"),u=e("./nodejsUtils")
t.exports=function(e,t){var n=this
return t=i.extend(t||{},{base64:!1,checkCRC32:!1,optimizedBinaryString:!1,createFolders:!1,decodeFileName:o.utf8decode}),u.isNode&&u.isStream(e)?a.Promise.reject(new Error("JSZip can't accept a stream when loading a zip file.")):i.prepareContent("the loaded zip file",e,!0,t.optimizedBinaryString,t.base64).then(function(e){var n=new s(t)
return n.load(e),n}).then(function(e){var n=[a.Promise.resolve(e)],i=e.files
if(t.checkCRC32)for(var o=0;o<i.length;o++)n.push(r(i[o]))
return a.Promise.all(n)}).then(function(e){for(var r=e.shift(),i=r.files,a=0;a<i.length;a++){var o=i[a]
n.file(o.fileNameStr,o.decompressed,{binary:!0,optimizedBinaryString:!0,date:o.date,dir:o.dir,comment:o.fileCommentStr.length?o.fileCommentStr:null,unixPermissions:o.unixPermissions,dosPermissions:o.dosPermissions,createFolders:t.createFolders})}return r.zipComment.length&&(n.comment=r.zipComment),n})}},{"./external":6,"./nodejsUtils":12,"./stream/Crc32Probe":22,"./utf8":28,"./utils":29,"./zipEntries":30}],12:[function(e,t,n){(function(e){"use strict"
t.exports={isNode:"undefined"!=typeof e,newBuffer:function(t,n){return new e(t,n)},isBuffer:function(t){return e.isBuffer(t)},isStream:function(e){return e&&"function"==typeof e.on&&"function"==typeof e.pause&&"function"==typeof e.resume}}}).call(this,"undefined"!=typeof Buffer?Buffer:void 0)},{}],13:[function(e,t,n){"use strict"
function r(e){return"[object RegExp]"===Object.prototype.toString.call(e)}var i=e("./utf8"),a=e("./utils"),o=e("./stream/GenericWorker"),s=e("./stream/StreamHelper"),l=e("./defaults"),u=e("./compressedObject"),c=e("./zipObject"),d=e("./generate"),f=e("./nodejsUtils"),h=e("./nodejs/NodejsStreamInputAdapter"),p=function(e,t,n){var r,i=a.getTypeOf(t)
n=a.extend(n||{},l),n.date=n.date||new Date,null!==n.compression&&(n.compression=n.compression.toUpperCase()),"string"==typeof n.unixPermissions&&(n.unixPermissions=parseInt(n.unixPermissions,8)),n.unixPermissions&&16384&n.unixPermissions&&(n.dir=!0),n.dosPermissions&&16&n.dosPermissions&&(n.dir=!0),n.dir&&(e=g(e)),n.createFolders&&(r=m(e))&&v.call(this,r,!0)
var s="string"===i&&n.binary===!1&&n.base64===!1
n.binary=!s
var d=t instanceof u&&0===t.uncompressedSize;(d||n.dir||!t||0===t.length)&&(n.base64=!1,n.binary=!0,t="",n.compression="STORE",i="string")
var p=null
p=t instanceof u||t instanceof o?t:f.isNode&&f.isStream(t)?new h(e,t):a.prepareContent(e,t,n.binary,n.optimizedBinaryString,n.base64)
var b=new c(e,p,n)
this.files[e]=b},m=function(e){"/"===e.slice(-1)&&(e=e.substring(0,e.length-1))
var t=e.lastIndexOf("/")
return t>0?e.substring(0,t):""},g=function(e){return"/"!==e.slice(-1)&&(e+="/"),e},v=function(e,t){return t="undefined"!=typeof t?t:l.createFolders,e=g(e),this.files[e]||p.call(this,e,null,{dir:!0,createFolders:t}),this.files[e]},b={load:function(){throw new Error("This method has been removed in JSZip 3.0, please check the upgrade guide.")},forEach:function(e){var t,n,r
for(t in this.files)this.files.hasOwnProperty(t)&&(r=this.files[t],n=t.slice(this.root.length,t.length),n&&t.slice(0,this.root.length)===this.root&&e(n,r))},filter:function(e){var t=[]
return this.forEach(function(n,r){e(n,r)&&t.push(r)}),t},file:function(e,t,n){if(1===arguments.length){if(r(e)){var i=e
return this.filter(function(e,t){return!t.dir&&i.test(e)})}var a=this.files[this.root+e]
return a&&!a.dir?a:null}return e=this.root+e,p.call(this,e,t,n),this},folder:function(e){if(!e)return this
if(r(e))return this.filter(function(t,n){return n.dir&&e.test(t)})
var t=this.root+e,n=v.call(this,t),i=this.clone()
return i.root=n.name,i},remove:function(e){e=this.root+e
var t=this.files[e]
if(t||("/"!==e.slice(-1)&&(e+="/"),t=this.files[e]),t&&!t.dir)delete this.files[e]
else for(var n=this.filter(function(t,n){return n.name.slice(0,e.length)===e}),r=0;r<n.length;r++)delete this.files[n[r].name]
return this},generate:function(e){throw new Error("This method has been removed in JSZip 3.0, please check the upgrade guide.")},generateInternalStream:function(e){var t,n={}
try{if(n=a.extend(e||{},{streamFiles:!1,compression:"STORE",compressionOptions:null,type:"",platform:"DOS",comment:null,mimeType:"application/zip",encodeFileName:i.utf8encode}),n.type=n.type.toLowerCase(),n.compression=n.compression.toUpperCase(),"binarystring"===n.type&&(n.type="string"),!n.type)throw new Error("No output type specified.")
a.checkSupport(n.type),"darwin"!==e.platform&&"freebsd"!==e.platform&&"linux"!==e.platform&&"sunos"!==e.platform||(e.platform="UNIX"),"win32"===e.platform&&(e.platform="DOS")
var r=n.comment||this.comment||""
t=d.generateWorker(this,n,r)}catch(e){t=new o("error"),t.error(e)}return new s(t,n.type||"string",n.mimeType)},generateAsync:function(e,t){return this.generateInternalStream(e).accumulate(t)},generateNodeStream:function(e,t){return e=e||{},e.type||(e.type="nodebuffer"),this.generateInternalStream(e).toNodejsStream(t)}}
t.exports=b},{"./compressedObject":2,"./defaults":5,"./generate":9,"./nodejs/NodejsStreamInputAdapter":35,"./nodejsUtils":12,"./stream/GenericWorker":25,"./stream/StreamHelper":26,"./utf8":28,"./utils":29,"./zipObject":32}],14:[function(e,t,n){"use strict"
function r(e){i.call(this,e)
for(var t=0;t<this.data.length;t++)e[t]=255&e[t]}var i=e("./DataReader"),a=e("../utils")
a.inherits(r,i),r.prototype.byteAt=function(e){return this.data[this.zero+e]},r.prototype.lastIndexOfSignature=function(e){for(var t=e.charCodeAt(0),n=e.charCodeAt(1),r=e.charCodeAt(2),i=e.charCodeAt(3),a=this.length-4;a>=0;--a)if(this.data[a]===t&&this.data[a+1]===n&&this.data[a+2]===r&&this.data[a+3]===i)return a-this.zero
return-1},r.prototype.readAndCheckSignature=function(e){var t=e.charCodeAt(0),n=e.charCodeAt(1),r=e.charCodeAt(2),i=e.charCodeAt(3),a=this.readData(4)
return t===a[0]&&n===a[1]&&r===a[2]&&i===a[3]},r.prototype.readData=function(e){if(this.checkOffset(e),0===e)return[]
var t=this.data.slice(this.zero+this.index,this.zero+this.index+e)
return this.index+=e,t},t.exports=r},{"../utils":29,"./DataReader":15}],15:[function(e,t,n){"use strict"
function r(e){this.data=e,this.length=e.length,this.index=0,this.zero=0}var i=e("../utils")
r.prototype={checkOffset:function(e){this.checkIndex(this.index+e)},checkIndex:function(e){if(this.length<this.zero+e||0>e)throw new Error("End of data reached (data length = "+this.length+", asked index = "+e+"). Corrupted zip ?")},setIndex:function(e){this.checkIndex(e),this.index=e},skip:function(e){this.setIndex(this.index+e)},byteAt:function(e){},readInt:function(e){var t,n=0
for(this.checkOffset(e),t=this.index+e-1;t>=this.index;t--)n=(n<<8)+this.byteAt(t)
return this.index+=e,n},readString:function(e){return i.transformTo("string",this.readData(e))},readData:function(e){},lastIndexOfSignature:function(e){},readAndCheckSignature:function(e){},readDate:function(){var e=this.readInt(4)
return new Date(Date.UTC((e>>25&127)+1980,(e>>21&15)-1,e>>16&31,e>>11&31,e>>5&63,(31&e)<<1))}},t.exports=r},{"../utils":29}],16:[function(e,t,n){"use strict"
function r(e){i.call(this,e)}var i=e("./Uint8ArrayReader"),a=e("../utils")
a.inherits(r,i),r.prototype.readData=function(e){this.checkOffset(e)
var t=this.data.slice(this.zero+this.index,this.zero+this.index+e)
return this.index+=e,t},t.exports=r},{"../utils":29,"./Uint8ArrayReader":18}],17:[function(e,t,n){"use strict"
function r(e){i.call(this,e)}var i=e("./DataReader"),a=e("../utils")
a.inherits(r,i),r.prototype.byteAt=function(e){return this.data.charCodeAt(this.zero+e)},r.prototype.lastIndexOfSignature=function(e){return this.data.lastIndexOf(e)-this.zero},r.prototype.readAndCheckSignature=function(e){var t=this.readData(4)
return e===t},r.prototype.readData=function(e){this.checkOffset(e)
var t=this.data.slice(this.zero+this.index,this.zero+this.index+e)
return this.index+=e,t},t.exports=r},{"../utils":29,"./DataReader":15}],18:[function(e,t,n){"use strict"
function r(e){i.call(this,e)}var i=e("./ArrayReader"),a=e("../utils")
a.inherits(r,i),r.prototype.readData=function(e){if(this.checkOffset(e),0===e)return new Uint8Array(0)
var t=this.data.subarray(this.zero+this.index,this.zero+this.index+e)
return this.index+=e,t},t.exports=r},{"../utils":29,"./ArrayReader":14}],19:[function(e,t,n){"use strict"
var r=e("../utils"),i=e("../support"),a=e("./ArrayReader"),o=e("./StringReader"),s=e("./NodeBufferReader"),l=e("./Uint8ArrayReader")
t.exports=function(e){var t=r.getTypeOf(e)
return r.checkSupport(t),"string"!==t||i.uint8array?"nodebuffer"===t?new s(e):i.uint8array?new l(r.transformTo("uint8array",e)):new a(r.transformTo("array",e)):new o(e)}},{"../support":27,"../utils":29,"./ArrayReader":14,"./NodeBufferReader":16,"./StringReader":17,"./Uint8ArrayReader":18}],20:[function(e,t,n){"use strict"
n.LOCAL_FILE_HEADER="PK",n.CENTRAL_FILE_HEADER="PK",n.CENTRAL_DIRECTORY_END="PK",n.ZIP64_CENTRAL_DIRECTORY_LOCATOR="PK",n.ZIP64_CENTRAL_DIRECTORY_END="PK",n.DATA_DESCRIPTOR="PK\b"},{}],21:[function(e,t,n){"use strict"
function r(e){i.call(this,"ConvertWorker to "+e),this.destType=e}var i=e("./GenericWorker"),a=e("../utils")
a.inherits(r,i),r.prototype.processChunk=function(e){this.push({data:a.transformTo(this.destType,e.data),meta:e.meta})},t.exports=r},{"../utils":29,"./GenericWorker":25}],22:[function(e,t,n){"use strict"
function r(){i.call(this,"Crc32Probe")}var i=e("./GenericWorker"),a=e("../crc32"),o=e("../utils")
o.inherits(r,i),r.prototype.processChunk=function(e){this.streamInfo.crc32=a(e.data,this.streamInfo.crc32||0),this.push(e)},t.exports=r},{"../crc32":4,"../utils":29,"./GenericWorker":25}],23:[function(e,t,n){"use strict"
function r(e){a.call(this,"DataLengthProbe for "+e),this.propName=e,this.withStreamInfo(e,0)}var i=e("../utils"),a=e("./GenericWorker")
i.inherits(r,a),r.prototype.processChunk=function(e){if(e){var t=this.streamInfo[this.propName]||0
this.streamInfo[this.propName]=t+e.data.length}a.prototype.processChunk.call(this,e)},t.exports=r},{"../utils":29,"./GenericWorker":25}],24:[function(e,t,n){"use strict"
function r(e){a.call(this,"DataWorker")
var t=this
this.dataIsReady=!1,this.index=0,this.max=0,this.data=null,this.type="",this._tickScheduled=!1,e.then(function(e){t.dataIsReady=!0,t.data=e,t.max=e&&e.length||0,t.type=i.getTypeOf(e),t.isPaused||t._tickAndRepeat()},function(e){t.error(e)})}var i=e("../utils"),a=e("./GenericWorker"),o=16384
i.inherits(r,a),r.prototype.cleanUp=function(){a.prototype.cleanUp.call(this),this.data=null},r.prototype.resume=function(){return!!a.prototype.resume.call(this)&&(!this._tickScheduled&&this.dataIsReady&&(this._tickScheduled=!0,i.delay(this._tickAndRepeat,[],this)),!0)},r.prototype._tickAndRepeat=function(){this._tickScheduled=!1,this.isPaused||this.isFinished||(this._tick(),this.isFinished||(i.delay(this._tickAndRepeat,[],this),this._tickScheduled=!0))},r.prototype._tick=function(){if(this.isPaused||this.isFinished)return!1
var e=o,t=null,n=Math.min(this.max,this.index+e)
if(this.index>=this.max)return this.end()
switch(this.type){case"string":t=this.data.substring(this.index,n)
break
case"uint8array":t=this.data.subarray(this.index,n)
break
case"array":case"nodebuffer":t=this.data.slice(this.index,n)}return this.index=n,this.push({data:t,meta:{percent:this.max?this.index/this.max*100:0}})},t.exports=r},{"../utils":29,"./GenericWorker":25}],25:[function(e,t,n){"use strict"
function r(e){this.name=e||"default",this.streamInfo={},this.generatedError=null,this.extraStreamInfo={},this.isPaused=!0,this.isFinished=!1,this.isLocked=!1,this._listeners={data:[],end:[],error:[]},this.previous=null}r.prototype={push:function(e){this.emit("data",e)},end:function(){if(this.isFinished)return!1
this.flush()
try{this.emit("end"),this.cleanUp(),this.isFinished=!0}catch(e){this.emit("error",e)}return!0},error:function(e){return!this.isFinished&&(this.isPaused?this.generatedError=e:(this.isFinished=!0,this.emit("error",e),this.previous&&this.previous.error(e),this.cleanUp()),!0)},on:function(e,t){return this._listeners[e].push(t),this},cleanUp:function(){this.streamInfo=this.generatedError=this.extraStreamInfo=null,this._listeners=[]},emit:function(e,t){if(this._listeners[e])for(var n=0;n<this._listeners[e].length;n++)this._listeners[e][n].call(this,t)},pipe:function(e){return e.registerPrevious(this)},registerPrevious:function(e){if(this.isLocked)throw new Error("The stream '"+this+"' has already been used.")
this.streamInfo=e.streamInfo,this.mergeStreamInfo(),this.previous=e
var t=this
return e.on("data",function(e){t.processChunk(e)}),e.on("end",function(){t.end()}),e.on("error",function(e){t.error(e)}),this},pause:function(){return!this.isPaused&&!this.isFinished&&(this.isPaused=!0,this.previous&&this.previous.pause(),!0)},resume:function(){if(!this.isPaused||this.isFinished)return!1
this.isPaused=!1
var e=!1
return this.generatedError&&(this.error(this.generatedError),e=!0),this.previous&&this.previous.resume(),!e},flush:function(){},processChunk:function(e){this.push(e)},withStreamInfo:function(e,t){return this.extraStreamInfo[e]=t,this.mergeStreamInfo(),this},mergeStreamInfo:function(){for(var e in this.extraStreamInfo)this.extraStreamInfo.hasOwnProperty(e)&&(this.streamInfo[e]=this.extraStreamInfo[e])},lock:function(){if(this.isLocked)throw new Error("The stream '"+this+"' has already been used.")
this.isLocked=!0,this.previous&&this.previous.lock()},toString:function(){var e="Worker "+this.name
return this.previous?this.previous+" -> "+e:e}},t.exports=r},{}],26:[function(e,t,n){(function(n){"use strict"
function r(e,t,n){switch(e){case"blob":return s.newBlob(s.transformTo("arraybuffer",t),n)
case"base64":return c.encode(t)
default:return s.transformTo(e,t)}}function i(e,t){var r,i=0,a=null,o=0
for(r=0;r<t.length;r++)o+=t[r].length
switch(e){case"string":return t.join("")
case"array":return Array.prototype.concat.apply([],t)
case"uint8array":for(a=new Uint8Array(o),r=0;r<t.length;r++)a.set(t[r],i),i+=t[r].length
return a
case"nodebuffer":return n.concat(t)
default:throw new Error("concat : unsupported type '"+e+"'")}}function a(e,t){return new f.Promise(function(n,a){var o=[],s=e._internalType,l=e._outputType,u=e._mimeType
e.on("data",function(e,n){o.push(e),t&&t(n)}).on("error",function(e){o=[],a(e)}).on("end",function(){try{var e=r(l,i(s,o),u)
n(e)}catch(e){a(e)}o=[]}).resume()})}function o(e,t,n){var r=t
switch(t){case"blob":case"arraybuffer":r="uint8array"
break
case"base64":r="string"}try{this._internalType=r,this._outputType=t,this._mimeType=n,s.checkSupport(r),this._worker=e.pipe(new l(r)),e.lock()}catch(e){this._worker=new u("error"),this._worker.error(e)}}var s=e("../utils"),l=e("./ConvertWorker"),u=e("./GenericWorker"),c=e("../base64"),d=e("../nodejs/NodejsStreamOutputAdapter"),f=e("../external")
o.prototype={accumulate:function(e){return a(this,e)},on:function(e,t){var n=this
return"data"===e?this._worker.on(e,function(e){t.call(n,e.data,e.meta)}):this._worker.on(e,function(){s.delay(t,arguments,n)}),this},resume:function(){return s.delay(this._worker.resume,[],this._worker),this},pause:function(){return this._worker.pause(),this},toNodejsStream:function(e){if(s.checkSupport("nodestream"),"nodebuffer"!==this._outputType)throw new Error(this._outputType+" is not supported by this method")
return new d(this,{objectMode:"nodebuffer"!==this._outputType},e)}},t.exports=o}).call(this,"undefined"!=typeof Buffer?Buffer:void 0)},{"../base64":1,"../external":6,"../nodejs/NodejsStreamOutputAdapter":35,"../utils":29,"./ConvertWorker":21,"./GenericWorker":25}],27:[function(e,t,n){(function(t){"use strict"
if(n.base64=!0,n.array=!0,n.string=!0,n.arraybuffer="undefined"!=typeof ArrayBuffer&&"undefined"!=typeof Uint8Array,n.nodebuffer="undefined"!=typeof t,n.uint8array="undefined"!=typeof Uint8Array,"undefined"==typeof ArrayBuffer)n.blob=!1
else{var r=new ArrayBuffer(0)
try{n.blob=0===new Blob([r],{type:"application/zip"}).size}catch(e){try{var i=window.BlobBuilder||window.WebKitBlobBuilder||window.MozBlobBuilder||window.MSBlobBuilder,a=new i
a.append(r),n.blob=0===a.getBlob("application/zip").size}catch(e){n.blob=!1}}}n.nodestream=!!e("./nodejs/NodejsStreamOutputAdapter").prototype}).call(this,"undefined"!=typeof Buffer?Buffer:void 0)},{"./nodejs/NodejsStreamOutputAdapter":35}],28:[function(e,t,n){"use strict"
function r(){l.call(this,"utf-8 decode"),this.leftOver=null}function i(){l.call(this,"utf-8 encode")}for(var a=e("./utils"),o=e("./support"),s=e("./nodejsUtils"),l=e("./stream/GenericWorker"),u=new Array(256),c=0;256>c;c++)u[c]=c>=252?6:c>=248?5:c>=240?4:c>=224?3:c>=192?2:1
u[254]=u[254]=1
var d=function(e){var t,n,r,i,a,s=e.length,l=0
for(i=0;s>i;i++)n=e.charCodeAt(i),55296===(64512&n)&&s>i+1&&(r=e.charCodeAt(i+1),56320===(64512&r)&&(n=65536+(n-55296<<10)+(r-56320),i++)),l+=128>n?1:2048>n?2:65536>n?3:4
for(t=o.uint8array?new Uint8Array(l):new Array(l),a=0,i=0;l>a;i++)n=e.charCodeAt(i),55296===(64512&n)&&s>i+1&&(r=e.charCodeAt(i+1),56320===(64512&r)&&(n=65536+(n-55296<<10)+(r-56320),i++)),128>n?t[a++]=n:2048>n?(t[a++]=192|n>>>6,t[a++]=128|63&n):65536>n?(t[a++]=224|n>>>12,t[a++]=128|n>>>6&63,t[a++]=128|63&n):(t[a++]=240|n>>>18,t[a++]=128|n>>>12&63,t[a++]=128|n>>>6&63,t[a++]=128|63&n)
return t},f=function(e,t){var n
for(t=t||e.length,t>e.length&&(t=e.length),n=t-1;n>=0&&128===(192&e[n]);)n--
return 0>n?t:0===n?t:n+u[e[n]]>t?n:t},h=function(e){var t,n,r,i,o=e.length,s=new Array(2*o)
for(n=0,t=0;o>t;)if(r=e[t++],128>r)s[n++]=r
else if(i=u[r],i>4)s[n++]=65533,t+=i-1
else{for(r&=2===i?31:3===i?15:7;i>1&&o>t;)r=r<<6|63&e[t++],i--
i>1?s[n++]=65533:65536>r?s[n++]=r:(r-=65536,s[n++]=55296|r>>10&1023,s[n++]=56320|1023&r)}return s.length!==n&&(s.subarray?s=s.subarray(0,n):s.length=n),a.applyFromCharCode(s)}
n.utf8encode=function(e){return o.nodebuffer?s.newBuffer(e,"utf-8"):d(e)},n.utf8decode=function(e){return o.nodebuffer?a.transformTo("nodebuffer",e).toString("utf-8"):(e=a.transformTo(o.uint8array?"uint8array":"array",e),h(e))},a.inherits(r,l),r.prototype.processChunk=function(e){var t=a.transformTo(o.uint8array?"uint8array":"array",e.data)
if(this.leftOver&&this.leftOver.length){if(o.uint8array){var r=t
t=new Uint8Array(r.length+this.leftOver.length),t.set(this.leftOver,0),t.set(r,this.leftOver.length)}else t=this.leftOver.concat(t)
this.leftOver=null}var i=f(t),s=t
i!==t.length&&(o.uint8array?(s=t.subarray(0,i),this.leftOver=t.subarray(i,t.length)):(s=t.slice(0,i),this.leftOver=t.slice(i,t.length))),this.push({data:n.utf8decode(s),meta:e.meta})},r.prototype.flush=function(){this.leftOver&&this.leftOver.length&&(this.push({data:n.utf8decode(this.leftOver),meta:{}}),this.leftOver=null)},n.Utf8DecodeWorker=r,a.inherits(i,l),i.prototype.processChunk=function(e){this.push({data:n.utf8encode(e.data),meta:e.meta})},n.Utf8EncodeWorker=i},{"./nodejsUtils":12,"./stream/GenericWorker":25,"./support":27,"./utils":29}],29:[function(e,t,n){"use strict"
function r(e){var t=null
return t=l.uint8array?new Uint8Array(e.length):new Array(e.length),a(e,t)}function i(e){return e}function a(e,t){for(var n=0;n<e.length;++n)t[n]=255&e.charCodeAt(n)
return t}function o(e){var t=65536,r=n.getTypeOf(e),i=!0
if("uint8array"===r?i=h.applyCanBeUsed.uint8array:"nodebuffer"===r&&(i=h.applyCanBeUsed.nodebuffer),i)for(;t>1;)try{return h.stringifyByChunk(e,r,t)}catch(e){t=Math.floor(t/2)}return h.stringifyByChar(e)}function s(e,t){for(var n=0;n<e.length;n++)t[n]=e[n]
return t}var l=e("./support"),u=e("./base64"),c=e("./nodejsUtils"),d=e("asap"),f=e("./external")
n.newBlob=function(e,t){n.checkSupport("blob")
try{return new Blob([e],{type:t})}catch(n){try{var r=window.BlobBuilder||window.WebKitBlobBuilder||window.MozBlobBuilder||window.MSBlobBuilder,i=new r
return i.append(e),i.getBlob(t)}catch(e){throw new Error("Bug : can't construct the Blob.")}}}
var h={stringifyByChunk:function(e,t,n){var r=[],i=0,a=e.length
if(n>=a)return String.fromCharCode.apply(null,e)
for(;a>i;)"array"===t||"nodebuffer"===t?r.push(String.fromCharCode.apply(null,e.slice(i,Math.min(i+n,a)))):r.push(String.fromCharCode.apply(null,e.subarray(i,Math.min(i+n,a)))),i+=n
return r.join("")},stringifyByChar:function(e){for(var t="",n=0;n<e.length;n++)t+=String.fromCharCode(e[n])
return t},applyCanBeUsed:{uint8array:function(){try{return l.uint8array&&1===String.fromCharCode.apply(null,new Uint8Array(1)).length}catch(e){return!1}}(),nodebuffer:function(){try{return l.nodebuffer&&1===String.fromCharCode.apply(null,c.newBuffer(1)).length}catch(e){return!1}}()}}
n.applyFromCharCode=o
var p={}
p.string={string:i,array:function(e){return a(e,new Array(e.length))},arraybuffer:function(e){return p.string.uint8array(e).buffer},uint8array:function(e){return a(e,new Uint8Array(e.length))},nodebuffer:function(e){return a(e,c.newBuffer(e.length))}},p.array={string:o,array:i,arraybuffer:function(e){return new Uint8Array(e).buffer},uint8array:function(e){return new Uint8Array(e)},nodebuffer:function(e){return c.newBuffer(e)}},p.arraybuffer={string:function(e){return o(new Uint8Array(e))},array:function(e){return s(new Uint8Array(e),new Array(e.byteLength))},arraybuffer:i,uint8array:function(e){return new Uint8Array(e)},nodebuffer:function(e){return c.newBuffer(new Uint8Array(e))}},p.uint8array={string:o,array:function(e){return s(e,new Array(e.length))},arraybuffer:function(e){return e.buffer},uint8array:i,nodebuffer:function(e){return c.newBuffer(e)}},p.nodebuffer={string:o,array:function(e){return s(e,new Array(e.length))},arraybuffer:function(e){return p.nodebuffer.uint8array(e).buffer},uint8array:function(e){return s(e,new Uint8Array(e.length))},nodebuffer:i},n.transformTo=function(e,t){if(t||(t=""),!e)return t
n.checkSupport(e)
var r=n.getTypeOf(t),i=p[r][e](t)
return i},n.getTypeOf=function(e){return"string"==typeof e?"string":"[object Array]"===Object.prototype.toString.call(e)?"array":l.nodebuffer&&c.isBuffer(e)?"nodebuffer":l.uint8array&&e instanceof Uint8Array?"uint8array":l.arraybuffer&&e instanceof ArrayBuffer?"arraybuffer":void 0},n.checkSupport=function(e){var t=l[e.toLowerCase()]
if(!t)throw new Error(e+" is not supported by this platform")},n.MAX_VALUE_16BITS=65535,n.MAX_VALUE_32BITS=-1,n.pretty=function(e){var t,n,r=""
for(n=0;n<(e||"").length;n++)t=e.charCodeAt(n),r+="\\x"+(16>t?"0":"")+t.toString(16).toUpperCase()
return r},n.delay=function(e,t,n){d(function(){e.apply(n||null,t||[])})},n.inherits=function(e,t){var n=function(){}
n.prototype=t.prototype,e.prototype=new n},n.extend=function(){var e,t,n={}
for(e=0;e<arguments.length;e++)for(t in arguments[e])arguments[e].hasOwnProperty(t)&&"undefined"==typeof n[t]&&(n[t]=arguments[e][t])
return n},n.prepareContent=function(e,t,i,a,o){var s=null
return s=l.blob&&t instanceof Blob&&"undefined"!=typeof FileReader?new f.Promise(function(e,n){var r=new FileReader
r.onload=function(t){e(t.target.result)},r.onerror=function(e){n(e.target.error)},r.readAsArrayBuffer(t)}):f.Promise.resolve(t),s.then(function(t){var s=n.getTypeOf(t)
return s?("arraybuffer"===s?t=n.transformTo("uint8array",t):"string"===s&&(o?t=u.decode(t):i&&a!==!0&&(t=r(t))),t):f.Promise.reject(new Error("The data of '"+e+"' is in an unsupported format !"))})}},{"./base64":1,"./external":6,"./nodejsUtils":12,"./support":27,asap:33}],30:[function(e,t,n){"use strict"
function r(e){this.files=[],this.loadOptions=e}var i=e("./reader/readerFor"),a=e("./utils"),o=e("./signature"),s=e("./zipEntry"),l=(e("./utf8"),e("./support"))
r.prototype={checkSignature:function(e){if(!this.reader.readAndCheckSignature(e)){this.reader.index-=4
var t=this.reader.readString(4)
throw new Error("Corrupted zip or bug : unexpected signature ("+a.pretty(t)+", expected "+a.pretty(e)+")")}},isSignature:function(e,t){var n=this.reader.index
this.reader.setIndex(e)
var r=this.reader.readString(4),i=r===t
return this.reader.setIndex(n),i},readBlockEndOfCentral:function(){this.diskNumber=this.reader.readInt(2),this.diskWithCentralDirStart=this.reader.readInt(2),this.centralDirRecordsOnThisDisk=this.reader.readInt(2),this.centralDirRecords=this.reader.readInt(2),this.centralDirSize=this.reader.readInt(4),this.centralDirOffset=this.reader.readInt(4),this.zipCommentLength=this.reader.readInt(2)
var e=this.reader.readData(this.zipCommentLength),t=l.uint8array?"uint8array":"array",n=a.transformTo(t,e)
this.zipComment=this.loadOptions.decodeFileName(n)},readBlockZip64EndOfCentral:function(){this.zip64EndOfCentralSize=this.reader.readInt(8),this.reader.skip(4),this.diskNumber=this.reader.readInt(4),this.diskWithCentralDirStart=this.reader.readInt(4),this.centralDirRecordsOnThisDisk=this.reader.readInt(8),this.centralDirRecords=this.reader.readInt(8),this.centralDirSize=this.reader.readInt(8),this.centralDirOffset=this.reader.readInt(8),this.zip64ExtensibleData={}
for(var e,t,n,r=this.zip64EndOfCentralSize-44,i=0;r>i;)e=this.reader.readInt(2),t=this.reader.readInt(4),n=this.reader.readData(t),this.zip64ExtensibleData[e]={id:e,length:t,value:n}},readBlockZip64EndOfCentralLocator:function(){if(this.diskWithZip64CentralDirStart=this.reader.readInt(4),this.relativeOffsetEndOfZip64CentralDir=this.reader.readInt(8),this.disksCount=this.reader.readInt(4),this.disksCount>1)throw new Error("Multi-volumes zip are not supported")},readLocalFiles:function(){var e,t
for(e=0;e<this.files.length;e++)t=this.files[e],this.reader.setIndex(t.localHeaderOffset),this.checkSignature(o.LOCAL_FILE_HEADER),t.readLocalPart(this.reader),t.handleUTF8(),t.processAttributes()},readCentralDir:function(){var e
for(this.reader.setIndex(this.centralDirOffset);this.reader.readAndCheckSignature(o.CENTRAL_FILE_HEADER);)e=new s({zip64:this.zip64},this.loadOptions),e.readCentralPart(this.reader),this.files.push(e)
if(this.centralDirRecords!==this.files.length&&0!==this.centralDirRecords&&0===this.files.length)throw new Error("Corrupted zip or bug: expected "+this.centralDirRecords+" records in central dir, got "+this.files.length)},readEndOfCentral:function(){var e=this.reader.lastIndexOfSignature(o.CENTRAL_DIRECTORY_END)
if(0>e){var t=!this.isSignature(0,o.LOCAL_FILE_HEADER)
throw t?new Error("Can't find end of central directory : is this a zip file ? If it is, see http://stuk.github.io/jszip/documentation/howto/read_zip.html"):new Error("Corrupted zip : can't find end of central directory")}this.reader.setIndex(e)
var n=e
if(this.checkSignature(o.CENTRAL_DIRECTORY_END),this.readBlockEndOfCentral(),this.diskNumber===a.MAX_VALUE_16BITS||this.diskWithCentralDirStart===a.MAX_VALUE_16BITS||this.centralDirRecordsOnThisDisk===a.MAX_VALUE_16BITS||this.centralDirRecords===a.MAX_VALUE_16BITS||this.centralDirSize===a.MAX_VALUE_32BITS||this.centralDirOffset===a.MAX_VALUE_32BITS){if(this.zip64=!0,e=this.reader.lastIndexOfSignature(o.ZIP64_CENTRAL_DIRECTORY_LOCATOR),0>e)throw new Error("Corrupted zip : can't find the ZIP64 end of central directory locator")
if(this.reader.setIndex(e),this.checkSignature(o.ZIP64_CENTRAL_DIRECTORY_LOCATOR),this.readBlockZip64EndOfCentralLocator(),!this.isSignature(this.relativeOffsetEndOfZip64CentralDir,o.ZIP64_CENTRAL_DIRECTORY_END)&&(this.relativeOffsetEndOfZip64CentralDir=this.reader.lastIndexOfSignature(o.ZIP64_CENTRAL_DIRECTORY_END),this.relativeOffsetEndOfZip64CentralDir<0))throw new Error("Corrupted zip : can't find the ZIP64 end of central directory")
this.reader.setIndex(this.relativeOffsetEndOfZip64CentralDir),this.checkSignature(o.ZIP64_CENTRAL_DIRECTORY_END),this.readBlockZip64EndOfCentral()}var r=this.centralDirOffset+this.centralDirSize
this.zip64&&(r+=20,r+=12+this.zip64EndOfCentralSize)
var i=n-r
if(i>0)this.isSignature(n,o.CENTRAL_FILE_HEADER)||(this.reader.zero=i)
else if(0>i)throw new Error("Corrupted zip: missing "+Math.abs(i)+" bytes.")},prepareReader:function(e){this.reader=i(e)},load:function(e){this.prepareReader(e),this.readEndOfCentral(),this.readCentralDir(),this.readLocalFiles()}},t.exports=r},{"./reader/readerFor":19,"./signature":20,"./support":27,"./utf8":28,"./utils":29,"./zipEntry":31}],31:[function(e,t,n){"use strict"
function r(e,t){this.options=e,this.loadOptions=t}var i=e("./reader/readerFor"),a=e("./utils"),o=e("./compressedObject"),s=e("./crc32"),l=e("./utf8"),u=e("./compressions"),c=e("./support"),d=0,f=3,h=function(e){for(var t in u)if(u.hasOwnProperty(t)&&u[t].magic===e)return u[t]
return null}
r.prototype={isEncrypted:function(){return 1===(1&this.bitFlag)},useUTF8:function(){return 2048===(2048&this.bitFlag)},readLocalPart:function(e){var t,n
if(e.skip(22),this.fileNameLength=e.readInt(2),n=e.readInt(2),this.fileName=e.readData(this.fileNameLength),e.skip(n),-1===this.compressedSize||-1===this.uncompressedSize)throw new Error("Bug or corrupted zip : didn't get enough informations from the central directory (compressedSize === -1 || uncompressedSize === -1)")
if(t=h(this.compressionMethod),null===t)throw new Error("Corrupted zip : compression "+a.pretty(this.compressionMethod)+" unknown (inner file : "+a.transformTo("string",this.fileName)+")")
this.decompressed=new o(this.compressedSize,this.uncompressedSize,this.crc32,t,e.readData(this.compressedSize))},readCentralPart:function(e){this.versionMadeBy=e.readInt(2),e.skip(2),this.bitFlag=e.readInt(2),this.compressionMethod=e.readString(2),this.date=e.readDate(),this.crc32=e.readInt(4),this.compressedSize=e.readInt(4),this.uncompressedSize=e.readInt(4)
var t=e.readInt(2)
if(this.extraFieldsLength=e.readInt(2),this.fileCommentLength=e.readInt(2),this.diskNumberStart=e.readInt(2),this.internalFileAttributes=e.readInt(2),this.externalFileAttributes=e.readInt(4),this.localHeaderOffset=e.readInt(4),this.isEncrypted())throw new Error("Encrypted zip are not supported")
e.skip(t),this.readExtraFields(e),this.parseZIP64ExtraField(e),this.fileComment=e.readData(this.fileCommentLength)},processAttributes:function(){this.unixPermissions=null,this.dosPermissions=null
var e=this.versionMadeBy>>8
this.dir=!!(16&this.externalFileAttributes),e===d&&(this.dosPermissions=63&this.externalFileAttributes),e===f&&(this.unixPermissions=this.externalFileAttributes>>16&65535),this.dir||"/"!==this.fileNameStr.slice(-1)||(this.dir=!0)},parseZIP64ExtraField:function(e){if(this.extraFields[1]){var t=i(this.extraFields[1].value)
this.uncompressedSize===a.MAX_VALUE_32BITS&&(this.uncompressedSize=t.readInt(8)),this.compressedSize===a.MAX_VALUE_32BITS&&(this.compressedSize=t.readInt(8)),this.localHeaderOffset===a.MAX_VALUE_32BITS&&(this.localHeaderOffset=t.readInt(8)),this.diskNumberStart===a.MAX_VALUE_32BITS&&(this.diskNumberStart=t.readInt(4))}},readExtraFields:function(e){var t,n,r,i=e.index+this.extraFieldsLength
for(this.extraFields||(this.extraFields={});e.index<i;)t=e.readInt(2),n=e.readInt(2),r=e.readData(n),this.extraFields[t]={id:t,length:n,value:r}},handleUTF8:function(){var e=c.uint8array?"uint8array":"array"
if(this.useUTF8())this.fileNameStr=l.utf8decode(this.fileName),this.fileCommentStr=l.utf8decode(this.fileComment)
else{var t=this.findExtraFieldUnicodePath()
if(null!==t)this.fileNameStr=t
else{var n=a.transformTo(e,this.fileName)
this.fileNameStr=this.loadOptions.decodeFileName(n)}var r=this.findExtraFieldUnicodeComment()
if(null!==r)this.fileCommentStr=r
else{var i=a.transformTo(e,this.fileComment)
this.fileCommentStr=this.loadOptions.decodeFileName(i)}}},findExtraFieldUnicodePath:function(){var e=this.extraFields[28789]
if(e){var t=i(e.value)
return 1!==t.readInt(1)?null:s(this.fileName)!==t.readInt(4)?null:l.utf8decode(t.readData(e.length-5))}return null},findExtraFieldUnicodeComment:function(){var e=this.extraFields[25461]
if(e){var t=i(e.value)
return 1!==t.readInt(1)?null:s(this.fileComment)!==t.readInt(4)?null:l.utf8decode(t.readData(e.length-5))}return null}},t.exports=r},{"./compressedObject":2,"./compressions":3,"./crc32":4,"./reader/readerFor":19,"./support":27,"./utf8":28,"./utils":29}],32:[function(e,t,n){"use strict"
var r=e("./stream/StreamHelper"),i=e("./stream/DataWorker"),a=e("./utf8"),o=e("./compressedObject"),s=e("./stream/GenericWorker"),l=function(e,t,n){this.name=e,this.dir=n.dir,this.date=n.date,this.comment=n.comment,this.unixPermissions=n.unixPermissions,this.dosPermissions=n.dosPermissions,this._data=t,this._dataBinary=n.binary,this.options={compression:n.compression,compressionOptions:n.compressionOptions}}
l.prototype={internalStream:function(e){var t=e.toLowerCase(),n="string"===t||"text"===t
"binarystring"!==t&&"text"!==t||(t="string")
var i=this._decompressWorker(),o=!this._dataBinary
return o&&!n&&(i=i.pipe(new a.Utf8EncodeWorker)),!o&&n&&(i=i.pipe(new a.Utf8DecodeWorker)),new r(i,t,"")},async:function(e,t){return this.internalStream(e).accumulate(t)},nodeStream:function(e,t){return this.internalStream(e||"nodebuffer").toNodejsStream(t)},_compressWorker:function(e,t){if(this._data instanceof o&&this._data.compression.magic===e.magic)return this._data.getCompressedWorker()
var n=this._decompressWorker()
return this._dataBinary||(n=n.pipe(new a.Utf8EncodeWorker)),o.createWorkerFrom(n,e,t)},_decompressWorker:function(){return this._data instanceof o?this._data.getContentWorker():this._data instanceof s?this._data:new i(this._data)}}
for(var u=["asText","asBinary","asNodeBuffer","asUint8Array","asArrayBuffer"],c=function(){throw new Error("This method has been removed in JSZip 3.0, please check the upgrade guide.")},d=0;d<u.length;d++)l.prototype[u[d]]=c
t.exports=l},{"./compressedObject":2,"./stream/DataWorker":24,"./stream/GenericWorker":25,"./stream/StreamHelper":26,"./utf8":28}],33:[function(e,t,n){"use strict"
function r(){if(l.length)throw l.shift()}function i(e){var t
t=s.length?s.pop():new a,t.task=e,o(t)}function a(){this.task=null}var o=e("./raw"),s=[],l=[],u=o.makeRequestCallFromTimer(r)
t.exports=i,a.prototype.call=function(){try{this.task.call()}catch(e){i.onerror?i.onerror(e):(l.push(e),u())}finally{this.task=null,s[s.length]=this}}},{"./raw":34}],34:[function(e,t,n){(function(e){"use strict"
function n(e){s.length||(o(),l=!0),s[s.length]=e}function r(){for(;u<s.length;){var e=u
if(u+=1,s[e].call(),u>c){for(var t=0,n=s.length-u;n>t;t++)s[t]=s[t+u]
s.length-=u,u=0}}s.length=0,u=0,l=!1}function i(e){var t=1,n=new d(e),r=document.createTextNode("")
return n.observe(r,{characterData:!0}),function(){t=-t,r.data=t}}function a(e){return function(){function t(){clearTimeout(n),clearInterval(r),e()}var n=setTimeout(t,0),r=setInterval(t,50)}}t.exports=n
var o,s=[],l=!1,u=0,c=1024,d=e.MutationObserver||e.WebKitMutationObserver
o="function"==typeof d?i(r):a(r),n.requestFlush=o,n.makeRequestCallFromTimer=a}).call(this,"undefined"!=typeof global?global:"undefined"!=typeof self?self:"undefined"!=typeof window?window:{})},{}],35:[function(e,t,n){},{}],36:[function(e,t,n){function r(){c=!1,s.length?u=s.concat(u):d=-1,u.length&&i()}function i(){if(!c){var e=setTimeout(r)
c=!0
for(var t=u.length;t;){for(s=u,u=[];++d<t;)s&&s[d].run()
d=-1,t=u.length}s=null,c=!1,clearTimeout(e)}}function a(e,t){this.fun=e,this.array=t}function o(){}var s,l=t.exports={},u=[],c=!1,d=-1
l.nextTick=function(e){var t=new Array(arguments.length-1)
if(arguments.length>1)for(var n=1;n<arguments.length;n++)t[n-1]=arguments[n]
u.push(new a(e,t)),1!==u.length||c||setTimeout(i,0)},a.prototype.run=function(){this.fun.apply(null,this.array)},l.title="browser",l.browser=!0,l.env={},l.argv=[],l.version="",l.versions={},l.on=o,l.addListener=o,l.once=o,l.off=o,l.removeListener=o,l.removeAllListeners=o,l.emit=o,l.binding=function(e){throw new Error("process.binding is not supported")},l.cwd=function(){return"/"},l.chdir=function(e){throw new Error("process.chdir is not supported")},l.umask=function(){return 0}},{}],37:[function(t,n,r){(function(r,i){(function(){"use strict"
function a(e){return"function"==typeof e||"object"==typeof e&&null!==e}function o(e){return"function"==typeof e}function s(e){return"object"==typeof e&&null!==e}function l(e){Y=e}function u(e){X=e}function c(){return function(){r.nextTick(m)}}function d(){return function(){H(m)}}function f(){var e=0,t=new $(m),n=document.createTextNode("")
return t.observe(n,{characterData:!0}),function(){n.data=e=++e%2}}function h(){var e=new MessageChannel
return e.port1.onmessage=m,function(){e.port2.postMessage(0)}}function p(){return function(){setTimeout(m,1)}}function m(){for(var e=0;Q>e;e+=2){var t=ne[e],n=ne[e+1]
t(n),ne[e]=void 0,ne[e+1]=void 0}Q=0}function g(){try{var e=t,n=e("vertx")
return H=n.runOnLoop||n.runOnContext,d()}catch(e){return p()}}function v(){}function b(){return new TypeError("You cannot resolve a promise with itself")}function y(){return new TypeError("A promises callback cannot return that same promise.")}function A(e){try{return e.then}catch(e){return oe.error=e,oe}}function w(e,t,n,r){try{e.call(t,n,r)}catch(e){return e}}function _(e,t,n){X(function(e){var r=!1,i=w(n,t,function(n){r||(r=!0,t!==n?k(e,n):E(e,n))},function(t){r||(r=!0,C(e,t))},"Settle: "+(e._label||" unknown promise"))
!r&&i&&(r=!0,C(e,i))},e)}function x(e,t){t._state===ie?E(e,t._result):t._state===ae?C(e,t._result):T(t,void 0,function(t){k(e,t)},function(t){C(e,t)})}function S(e,t){if(t.constructor===e.constructor)x(e,t)
else{var n=A(t)
n===oe?C(e,oe.error):void 0===n?E(e,t):o(n)?_(e,t,n):E(e,t)}}function k(e,t){e===t?C(e,b()):a(t)?S(e,t):E(e,t)}function I(e){e._onerror&&e._onerror(e._result),z(e)}function E(e,t){e._state===re&&(e._result=t,e._state=ie,0!==e._subscribers.length&&X(z,e))}function C(e,t){e._state===re&&(e._state=ae,e._result=t,X(I,e))}function T(e,t,n,r){var i=e._subscribers,a=i.length
e._onerror=null,i[a]=t,i[a+ie]=n,i[a+ae]=r,0===a&&e._state&&X(z,e)}function z(e){var t=e._subscribers,n=e._state
if(0!==t.length){for(var r,i,a=e._result,o=0;o<t.length;o+=3)r=t[o],i=t[o+n],r?O(n,r,i,a):i(a)
e._subscribers.length=0}}function D(){this.error=null}function L(e,t){try{return e(t)}catch(e){return se.error=e,se}}function O(e,t,n,r){var i,a,s,l,u=o(n)
if(u){if(i=L(n,r),i===se?(l=!0,a=i.error,i=null):s=!0,t===i)return void C(t,y())}else i=r,s=!0
t._state!==re||(u&&s?k(t,i):l?C(t,a):e===ie?E(t,i):e===ae&&C(t,i))}function R(e,t){try{t(function(t){k(e,t)},function(t){C(e,t)})}catch(t){C(e,t)}}function P(e,t){var n=this
n._instanceConstructor=e,n.promise=new e(v),n._validateInput(t)?(n._input=t,n.length=t.length,n._remaining=t.length,n._init(),0===n.length?E(n.promise,n._result):(n.length=n.length||0,n._enumerate(),0===n._remaining&&E(n.promise,n._result))):C(n.promise,n._validationError())}function N(e){return new le(this,e).promise}function B(e){function t(e){k(i,e)}function n(e){C(i,e)}var r=this,i=new r(v)
if(!V(e))return C(i,new TypeError("You must pass an array to race.")),i
for(var a=e.length,o=0;i._state===re&&a>o;o++)T(r.resolve(e[o]),void 0,t,n)
return i}function j(e){var t=this
if(e&&"object"==typeof e&&e.constructor===t)return e
var n=new t(v)
return k(n,e),n}function M(e){var t=this,n=new t(v)
return C(n,e),n}function F(){throw new TypeError("You must pass a resolver function as the first argument to the promise constructor")}function U(){throw new TypeError("Failed to construct 'Promise': Please use the 'new' operator, this object constructor cannot be called as a function.")}function G(e){this._id=he++,this._state=void 0,this._result=void 0,this._subscribers=[],v!==e&&(o(e)||F(),this instanceof G||U(),R(this,e))}function Z(){var e
if("undefined"!=typeof i)e=i
else if("undefined"!=typeof self)e=self
else try{e=Function("return this")()}catch(e){throw new Error("polyfill failed because global object is unavailable in this environment")}var t=e.Promise
t&&"[object Promise]"===Object.prototype.toString.call(t.resolve())&&!t.cast||(e.Promise=pe)}var W
W=Array.isArray?Array.isArray:function(e){return"[object Array]"===Object.prototype.toString.call(e)}
var H,Y,q,V=W,Q=0,X=({}.toString,function(e,t){ne[Q]=e,ne[Q+1]=t,Q+=2,2===Q&&(Y?Y(m):q())}),J="undefined"!=typeof window?window:void 0,K=J||{},$=K.MutationObserver||K.WebKitMutationObserver,ee="undefined"!=typeof r&&"[object process]"==={}.toString.call(r),te="undefined"!=typeof Uint8ClampedArray&&"undefined"!=typeof importScripts&&"undefined"!=typeof MessageChannel,ne=new Array(1e3)
q=ee?c():$?f():te?h():void 0===J&&"function"==typeof t?g():p()
var re=void 0,ie=1,ae=2,oe=new D,se=new D
P.prototype._validateInput=function(e){return V(e)},P.prototype._validationError=function(){return new Error("Array Methods must be provided an Array")},P.prototype._init=function(){this._result=new Array(this.length)}
var le=P
P.prototype._enumerate=function(){for(var e=this,t=e.length,n=e.promise,r=e._input,i=0;n._state===re&&t>i;i++)e._eachEntry(r[i],i)},P.prototype._eachEntry=function(e,t){var n=this,r=n._instanceConstructor
s(e)?e.constructor===r&&e._state!==re?(e._onerror=null,n._settledAt(e._state,t,e._result)):n._willSettleAt(r.resolve(e),t):(n._remaining--,n._result[t]=e)},P.prototype._settledAt=function(e,t,n){var r=this,i=r.promise
i._state===re&&(r._remaining--,e===ae?C(i,n):r._result[t]=n),0===r._remaining&&E(i,r._result)},P.prototype._willSettleAt=function(e,t){var n=this
T(e,void 0,function(e){n._settledAt(ie,t,e)},function(e){n._settledAt(ae,t,e)})}
var ue=N,ce=B,de=j,fe=M,he=0,pe=G
G.all=ue,G.race=ce,G.resolve=de,G.reject=fe,G._setScheduler=l,G._setAsap=u,G._asap=X,G.prototype={constructor:G,then:function(e,t){var n=this,r=n._state
if(r===ie&&!e||r===ae&&!t)return this
var i=new this.constructor(v),a=n._result
if(r){var o=arguments[r-1]
X(function(){O(r,i,o,a)})}else T(n,i,e,t)
return i},catch:function(e){return this.then(null,e)}}
var me=Z,ge={Promise:pe,polyfill:me}
"function"==typeof e&&e.amd?e(function(){return ge}):"undefined"!=typeof n&&n.exports?n.exports=ge:"undefined"!=typeof this&&(this.ES6Promise=ge),me()}).call(this)}).call(this,t("_process"),"undefined"!=typeof global?global:"undefined"!=typeof self?self:"undefined"!=typeof window?window:{})},{_process:36}],38:[function(e,t,n){"use strict"
var r=e("./lib/utils/common").assign,i=e("./lib/deflate"),a=e("./lib/inflate"),o=e("./lib/zlib/constants"),s={}
r(s,i,a,o),t.exports=s},{"./lib/deflate":39,"./lib/inflate":40,"./lib/utils/common":41,"./lib/zlib/constants":44}],39:[function(e,t,n){"use strict"
function r(e){if(!(this instanceof r))return new r(e)
this.options=l.assign({level:b,method:A,chunkSize:16384,windowBits:15,memLevel:8,strategy:y,to:""},e||{})
var t=this.options
t.raw&&t.windowBits>0?t.windowBits=-t.windowBits:t.gzip&&t.windowBits>0&&t.windowBits<16&&(t.windowBits+=16),this.err=0,this.msg="",this.ended=!1,this.chunks=[],this.strm=new d,this.strm.avail_out=0
var n=s.deflateInit2(this.strm,t.level,t.method,t.windowBits,t.memLevel,t.strategy)
if(n!==m)throw new Error(c[n])
if(t.header&&s.deflateSetHeader(this.strm,t.header),t.dictionary){var i
if(i="string"==typeof t.dictionary?u.string2buf(t.dictionary):"[object ArrayBuffer]"===f.call(t.dictionary)?new Uint8Array(t.dictionary):t.dictionary,n=s.deflateSetDictionary(this.strm,i),n!==m)throw new Error(c[n])
this._dict_set=!0}}function i(e,t){var n=new r(t)
if(n.push(e,!0),n.err)throw n.msg
return n.result}function a(e,t){return t=t||{},t.raw=!0,i(e,t)}function o(e,t){return t=t||{},t.gzip=!0,i(e,t)}var s=e("./zlib/deflate"),l=e("./utils/common"),u=e("./utils/strings"),c=e("./zlib/messages"),d=e("./zlib/zstream"),f=Object.prototype.toString,h=0,p=4,m=0,g=1,v=2,b=-1,y=0,A=8
r.prototype.push=function(e,t){var n,r,i=this.strm,a=this.options.chunkSize
if(this.ended)return!1
r=t===~~t?t:t===!0?p:h,"string"==typeof e?i.input=u.string2buf(e):"[object ArrayBuffer]"===f.call(e)?i.input=new Uint8Array(e):i.input=e,i.next_in=0,i.avail_in=i.input.length
do{if(0===i.avail_out&&(i.output=new l.Buf8(a),i.next_out=0,i.avail_out=a),n=s.deflate(i,r),n!==g&&n!==m)return this.onEnd(n),this.ended=!0,!1
0!==i.avail_out&&(0!==i.avail_in||r!==p&&r!==v)||("string"===this.options.to?this.onData(u.buf2binstring(l.shrinkBuf(i.output,i.next_out))):this.onData(l.shrinkBuf(i.output,i.next_out)))}while((i.avail_in>0||0===i.avail_out)&&n!==g)
return r===p?(n=s.deflateEnd(this.strm),this.onEnd(n),this.ended=!0,n===m):r!==v||(this.onEnd(m),i.avail_out=0,!0)},r.prototype.onData=function(e){this.chunks.push(e)},r.prototype.onEnd=function(e){e===m&&("string"===this.options.to?this.result=this.chunks.join(""):this.result=l.flattenChunks(this.chunks)),this.chunks=[],this.err=e,this.msg=this.strm.msg},n.Deflate=r,n.deflate=i,n.deflateRaw=a,n.gzip=o},{"./utils/common":41,"./utils/strings":42,"./zlib/deflate":46,"./zlib/messages":51,"./zlib/zstream":53}],40:[function(e,t,n){"use strict"
function r(e){if(!(this instanceof r))return new r(e)
this.options=s.assign({chunkSize:16384,windowBits:0,to:""},e||{})
var t=this.options
t.raw&&t.windowBits>=0&&t.windowBits<16&&(t.windowBits=-t.windowBits,0===t.windowBits&&(t.windowBits=-15)),!(t.windowBits>=0&&t.windowBits<16)||e&&e.windowBits||(t.windowBits+=32),t.windowBits>15&&t.windowBits<48&&0===(15&t.windowBits)&&(t.windowBits|=15),this.err=0,this.msg="",this.ended=!1,this.chunks=[],this.strm=new d,this.strm.avail_out=0
var n=o.inflateInit2(this.strm,t.windowBits)
if(n!==u.Z_OK)throw new Error(c[n])
this.header=new f,o.inflateGetHeader(this.strm,this.header)}function i(e,t){var n=new r(t)
if(n.push(e,!0),n.err)throw n.msg
return n.result}function a(e,t){return t=t||{},t.raw=!0,i(e,t)}var o=e("./zlib/inflate"),s=e("./utils/common"),l=e("./utils/strings"),u=e("./zlib/constants"),c=e("./zlib/messages"),d=e("./zlib/zstream"),f=e("./zlib/gzheader"),h=Object.prototype.toString
r.prototype.push=function(e,t){var n,r,i,a,c,d,f=this.strm,p=this.options.chunkSize,m=this.options.dictionary,g=!1
if(this.ended)return!1
r=t===~~t?t:t===!0?u.Z_FINISH:u.Z_NO_FLUSH,"string"==typeof e?f.input=l.binstring2buf(e):"[object ArrayBuffer]"===h.call(e)?f.input=new Uint8Array(e):f.input=e,f.next_in=0,f.avail_in=f.input.length
do{if(0===f.avail_out&&(f.output=new s.Buf8(p),f.next_out=0,f.avail_out=p),n=o.inflate(f,u.Z_NO_FLUSH),n===u.Z_NEED_DICT&&m&&(d="string"==typeof m?l.string2buf(m):"[object ArrayBuffer]"===h.call(m)?new Uint8Array(m):m,n=o.inflateSetDictionary(this.strm,d)),n===u.Z_BUF_ERROR&&g===!0&&(n=u.Z_OK,g=!1),n!==u.Z_STREAM_END&&n!==u.Z_OK)return this.onEnd(n),this.ended=!0,!1
f.next_out&&(0!==f.avail_out&&n!==u.Z_STREAM_END&&(0!==f.avail_in||r!==u.Z_FINISH&&r!==u.Z_SYNC_FLUSH)||("string"===this.options.to?(i=l.utf8border(f.output,f.next_out),a=f.next_out-i,c=l.buf2string(f.output,i),f.next_out=a,f.avail_out=p-a,a&&s.arraySet(f.output,f.output,i,a,0),this.onData(c)):this.onData(s.shrinkBuf(f.output,f.next_out)))),0===f.avail_in&&0===f.avail_out&&(g=!0)}while((f.avail_in>0||0===f.avail_out)&&n!==u.Z_STREAM_END)
return n===u.Z_STREAM_END&&(r=u.Z_FINISH),r===u.Z_FINISH?(n=o.inflateEnd(this.strm),this.onEnd(n),this.ended=!0,n===u.Z_OK):r!==u.Z_SYNC_FLUSH||(this.onEnd(u.Z_OK),f.avail_out=0,!0)},r.prototype.onData=function(e){this.chunks.push(e)},r.prototype.onEnd=function(e){e===u.Z_OK&&("string"===this.options.to?this.result=this.chunks.join(""):this.result=s.flattenChunks(this.chunks)),this.chunks=[],this.err=e,this.msg=this.strm.msg},n.Inflate=r,n.inflate=i,n.inflateRaw=a,n.ungzip=i},{"./utils/common":41,"./utils/strings":42,"./zlib/constants":44,"./zlib/gzheader":47,"./zlib/inflate":49,"./zlib/messages":51,"./zlib/zstream":53}],41:[function(e,t,n){"use strict"
var r="undefined"!=typeof Uint8Array&&"undefined"!=typeof Uint16Array&&"undefined"!=typeof Int32Array
n.assign=function(e){for(var t=Array.prototype.slice.call(arguments,1);t.length;){var n=t.shift()
if(n){if("object"!=typeof n)throw new TypeError(n+"must be non-object")
for(var r in n)n.hasOwnProperty(r)&&(e[r]=n[r])}}return e},n.shrinkBuf=function(e,t){return e.length===t?e:e.subarray?e.subarray(0,t):(e.length=t,e)}
var i={arraySet:function(e,t,n,r,i){if(t.subarray&&e.subarray)return void e.set(t.subarray(n,n+r),i)
for(var a=0;r>a;a++)e[i+a]=t[n+a]},flattenChunks:function(e){var t,n,r,i,a,o
for(r=0,t=0,n=e.length;n>t;t++)r+=e[t].length
for(o=new Uint8Array(r),i=0,t=0,n=e.length;n>t;t++)a=e[t],o.set(a,i),i+=a.length
return o}},a={arraySet:function(e,t,n,r,i){for(var a=0;r>a;a++)e[i+a]=t[n+a]},flattenChunks:function(e){return[].concat.apply([],e)}}
n.setTyped=function(e){e?(n.Buf8=Uint8Array,n.Buf16=Uint16Array,n.Buf32=Int32Array,n.assign(n,i)):(n.Buf8=Array,n.Buf16=Array,n.Buf32=Array,n.assign(n,a))},n.setTyped(r)},{}],42:[function(e,t,n){"use strict"
function r(e,t){if(65537>t&&(e.subarray&&o||!e.subarray&&a))return String.fromCharCode.apply(null,i.shrinkBuf(e,t))
for(var n="",r=0;t>r;r++)n+=String.fromCharCode(e[r])
return n}var i=e("./common"),a=!0,o=!0
try{String.fromCharCode.apply(null,[0])}catch(e){a=!1}try{String.fromCharCode.apply(null,new Uint8Array(1))}catch(e){o=!1}for(var s=new i.Buf8(256),l=0;256>l;l++)s[l]=l>=252?6:l>=248?5:l>=240?4:l>=224?3:l>=192?2:1
s[254]=s[254]=1,n.string2buf=function(e){var t,n,r,a,o,s=e.length,l=0
for(a=0;s>a;a++)n=e.charCodeAt(a),55296===(64512&n)&&s>a+1&&(r=e.charCodeAt(a+1),56320===(64512&r)&&(n=65536+(n-55296<<10)+(r-56320),a++)),l+=128>n?1:2048>n?2:65536>n?3:4
for(t=new i.Buf8(l),o=0,a=0;l>o;a++)n=e.charCodeAt(a),55296===(64512&n)&&s>a+1&&(r=e.charCodeAt(a+1),56320===(64512&r)&&(n=65536+(n-55296<<10)+(r-56320),a++)),128>n?t[o++]=n:2048>n?(t[o++]=192|n>>>6,t[o++]=128|63&n):65536>n?(t[o++]=224|n>>>12,t[o++]=128|n>>>6&63,t[o++]=128|63&n):(t[o++]=240|n>>>18,t[o++]=128|n>>>12&63,t[o++]=128|n>>>6&63,t[o++]=128|63&n)
return t},n.buf2binstring=function(e){return r(e,e.length)},n.binstring2buf=function(e){for(var t=new i.Buf8(e.length),n=0,r=t.length;r>n;n++)t[n]=e.charCodeAt(n)
return t},n.buf2string=function(e,t){var n,i,a,o,l=t||e.length,u=new Array(2*l)
for(i=0,n=0;l>n;)if(a=e[n++],128>a)u[i++]=a
else if(o=s[a],o>4)u[i++]=65533,n+=o-1
else{for(a&=2===o?31:3===o?15:7;o>1&&l>n;)a=a<<6|63&e[n++],o--
o>1?u[i++]=65533:65536>a?u[i++]=a:(a-=65536,u[i++]=55296|a>>10&1023,u[i++]=56320|1023&a)}return r(u,i)},n.utf8border=function(e,t){var n
for(t=t||e.length,t>e.length&&(t=e.length),n=t-1;n>=0&&128===(192&e[n]);)n--
return 0>n?t:0===n?t:n+s[e[n]]>t?n:t}},{"./common":41}],43:[function(e,t,n){"use strict"
function r(e,t,n,r){for(var i=65535&e|0,a=e>>>16&65535|0,o=0;0!==n;){o=n>2e3?2e3:n,n-=o
do i=i+t[r++]|0,a=a+i|0
while(--o)
i%=65521,a%=65521}return i|a<<16|0}t.exports=r},{}],44:[function(e,t,n){"use strict"
t.exports={Z_NO_FLUSH:0,Z_PARTIAL_FLUSH:1,Z_SYNC_FLUSH:2,Z_FULL_FLUSH:3,Z_FINISH:4,Z_BLOCK:5,Z_TREES:6,Z_OK:0,Z_STREAM_END:1,Z_NEED_DICT:2,Z_ERRNO:-1,Z_STREAM_ERROR:-2,Z_DATA_ERROR:-3,Z_BUF_ERROR:-5,Z_NO_COMPRESSION:0,Z_BEST_SPEED:1,Z_BEST_COMPRESSION:9,Z_DEFAULT_COMPRESSION:-1,Z_FILTERED:1,Z_HUFFMAN_ONLY:2,Z_RLE:3,Z_FIXED:4,Z_DEFAULT_STRATEGY:0,Z_BINARY:0,Z_TEXT:1,Z_UNKNOWN:2,Z_DEFLATED:8}},{}],45:[function(e,t,n){"use strict"
function r(){for(var e,t=[],n=0;256>n;n++){e=n
for(var r=0;8>r;r++)e=1&e?3988292384^e>>>1:e>>>1
t[n]=e}return t}function i(e,t,n,r){var i=a,o=r+n
e^=-1
for(var s=r;o>s;s++)e=e>>>8^i[255&(e^t[s])]
return-1^e}var a=r()
t.exports=i},{}],46:[function(e,t,n){"use strict"
function r(e,t){return e.msg=R[t],t}function i(e){return(e<<1)-(e>4?9:0)}function a(e){for(var t=e.length;--t>=0;)e[t]=0}function o(e){var t=e.state,n=t.pending
n>e.avail_out&&(n=e.avail_out),0!==n&&(z.arraySet(e.output,t.pending_buf,t.pending_out,n,e.next_out),e.next_out+=n,t.pending_out+=n,e.total_out+=n,e.avail_out-=n,t.pending-=n,0===t.pending&&(t.pending_out=0))}function s(e,t){D._tr_flush_block(e,e.block_start>=0?e.block_start:-1,e.strstart-e.block_start,t),e.block_start=e.strstart,o(e.strm)}function l(e,t){e.pending_buf[e.pending++]=t}function u(e,t){e.pending_buf[e.pending++]=t>>>8&255,e.pending_buf[e.pending++]=255&t}function c(e,t,n,r){var i=e.avail_in
return i>r&&(i=r),0===i?0:(e.avail_in-=i,z.arraySet(t,e.input,e.next_in,i,n),1===e.state.wrap?e.adler=L(e.adler,t,i,n):2===e.state.wrap&&(e.adler=O(e.adler,t,i,n)),e.next_in+=i,e.total_in+=i,i)}function d(e,t){var n,r,i=e.max_chain_length,a=e.strstart,o=e.prev_length,s=e.nice_match,l=e.strstart>e.w_size-de?e.strstart-(e.w_size-de):0,u=e.window,c=e.w_mask,d=e.prev,f=e.strstart+ce,h=u[a+o-1],p=u[a+o]
e.prev_length>=e.good_match&&(i>>=2),s>e.lookahead&&(s=e.lookahead)
do if(n=t,u[n+o]===p&&u[n+o-1]===h&&u[n]===u[a]&&u[++n]===u[a+1]){a+=2,n++
do;while(u[++a]===u[++n]&&u[++a]===u[++n]&&u[++a]===u[++n]&&u[++a]===u[++n]&&u[++a]===u[++n]&&u[++a]===u[++n]&&u[++a]===u[++n]&&u[++a]===u[++n]&&f>a)
if(r=ce-(f-a),a=f-ce,r>o){if(e.match_start=t,o=r,r>=s)break
h=u[a+o-1],p=u[a+o]}}while((t=d[t&c])>l&&0!==--i)
return o<=e.lookahead?o:e.lookahead}function f(e){var t,n,r,i,a,o=e.w_size
do{if(i=e.window_size-e.lookahead-e.strstart,e.strstart>=o+(o-de)){z.arraySet(e.window,e.window,o,o,0),e.match_start-=o,e.strstart-=o,e.block_start-=o,n=e.hash_size,t=n
do r=e.head[--t],e.head[t]=r>=o?r-o:0
while(--n)
n=o,t=n
do r=e.prev[--t],e.prev[t]=r>=o?r-o:0
while(--n)
i+=o}if(0===e.strm.avail_in)break
if(n=c(e.strm,e.window,e.strstart+e.lookahead,i),e.lookahead+=n,e.lookahead+e.insert>=ue)for(a=e.strstart-e.insert,e.ins_h=e.window[a],e.ins_h=(e.ins_h<<e.hash_shift^e.window[a+1])&e.hash_mask;e.insert&&(e.ins_h=(e.ins_h<<e.hash_shift^e.window[a+ue-1])&e.hash_mask,e.prev[a&e.w_mask]=e.head[e.ins_h],e.head[e.ins_h]=a,a++,e.insert--,!(e.lookahead+e.insert<ue)););}while(e.lookahead<de&&0!==e.strm.avail_in)}function h(e,t){var n=65535
for(n>e.pending_buf_size-5&&(n=e.pending_buf_size-5);;){if(e.lookahead<=1){if(f(e),0===e.lookahead&&t===P)return Ae
if(0===e.lookahead)break}e.strstart+=e.lookahead,e.lookahead=0
var r=e.block_start+n
if((0===e.strstart||e.strstart>=r)&&(e.lookahead=e.strstart-r,e.strstart=r,s(e,!1),0===e.strm.avail_out))return Ae
if(e.strstart-e.block_start>=e.w_size-de&&(s(e,!1),0===e.strm.avail_out))return Ae}return e.insert=0,t===j?(s(e,!0),0===e.strm.avail_out?_e:xe):e.strstart>e.block_start&&(s(e,!1),0===e.strm.avail_out)?Ae:Ae}function p(e,t){for(var n,r;;){if(e.lookahead<de){if(f(e),e.lookahead<de&&t===P)return Ae
if(0===e.lookahead)break}if(n=0,e.lookahead>=ue&&(e.ins_h=(e.ins_h<<e.hash_shift^e.window[e.strstart+ue-1])&e.hash_mask,n=e.prev[e.strstart&e.w_mask]=e.head[e.ins_h],e.head[e.ins_h]=e.strstart),0!==n&&e.strstart-n<=e.w_size-de&&(e.match_length=d(e,n)),e.match_length>=ue)if(r=D._tr_tally(e,e.strstart-e.match_start,e.match_length-ue),e.lookahead-=e.match_length,e.match_length<=e.max_lazy_match&&e.lookahead>=ue){e.match_length--
do e.strstart++,e.ins_h=(e.ins_h<<e.hash_shift^e.window[e.strstart+ue-1])&e.hash_mask,n=e.prev[e.strstart&e.w_mask]=e.head[e.ins_h],e.head[e.ins_h]=e.strstart
while(0!==--e.match_length)
e.strstart++}else e.strstart+=e.match_length,e.match_length=0,e.ins_h=e.window[e.strstart],e.ins_h=(e.ins_h<<e.hash_shift^e.window[e.strstart+1])&e.hash_mask
else r=D._tr_tally(e,0,e.window[e.strstart]),e.lookahead--,e.strstart++
if(r&&(s(e,!1),0===e.strm.avail_out))return Ae}return e.insert=e.strstart<ue-1?e.strstart:ue-1,t===j?(s(e,!0),0===e.strm.avail_out?_e:xe):e.last_lit&&(s(e,!1),0===e.strm.avail_out)?Ae:we}function m(e,t){for(var n,r,i;;){if(e.lookahead<de){if(f(e),e.lookahead<de&&t===P)return Ae
if(0===e.lookahead)break}if(n=0,e.lookahead>=ue&&(e.ins_h=(e.ins_h<<e.hash_shift^e.window[e.strstart+ue-1])&e.hash_mask,n=e.prev[e.strstart&e.w_mask]=e.head[e.ins_h],e.head[e.ins_h]=e.strstart),e.prev_length=e.match_length,e.prev_match=e.match_start,e.match_length=ue-1,0!==n&&e.prev_length<e.max_lazy_match&&e.strstart-n<=e.w_size-de&&(e.match_length=d(e,n),e.match_length<=5&&(e.strategy===Y||e.match_length===ue&&e.strstart-e.match_start>4096)&&(e.match_length=ue-1)),e.prev_length>=ue&&e.match_length<=e.prev_length){i=e.strstart+e.lookahead-ue,r=D._tr_tally(e,e.strstart-1-e.prev_match,e.prev_length-ue),e.lookahead-=e.prev_length-1,e.prev_length-=2
do++e.strstart<=i&&(e.ins_h=(e.ins_h<<e.hash_shift^e.window[e.strstart+ue-1])&e.hash_mask,n=e.prev[e.strstart&e.w_mask]=e.head[e.ins_h],e.head[e.ins_h]=e.strstart)
while(0!==--e.prev_length)
if(e.match_available=0,e.match_length=ue-1,e.strstart++,r&&(s(e,!1),0===e.strm.avail_out))return Ae}else if(e.match_available){if(r=D._tr_tally(e,0,e.window[e.strstart-1]),r&&s(e,!1),e.strstart++,e.lookahead--,0===e.strm.avail_out)return Ae}else e.match_available=1,e.strstart++,e.lookahead--}return e.match_available&&(r=D._tr_tally(e,0,e.window[e.strstart-1]),e.match_available=0),e.insert=e.strstart<ue-1?e.strstart:ue-1,t===j?(s(e,!0),0===e.strm.avail_out?_e:xe):e.last_lit&&(s(e,!1),0===e.strm.avail_out)?Ae:we}function g(e,t){for(var n,r,i,a,o=e.window;;){if(e.lookahead<=ce){if(f(e),e.lookahead<=ce&&t===P)return Ae
if(0===e.lookahead)break}if(e.match_length=0,e.lookahead>=ue&&e.strstart>0&&(i=e.strstart-1,r=o[i],r===o[++i]&&r===o[++i]&&r===o[++i])){a=e.strstart+ce
do;while(r===o[++i]&&r===o[++i]&&r===o[++i]&&r===o[++i]&&r===o[++i]&&r===o[++i]&&r===o[++i]&&r===o[++i]&&a>i)
e.match_length=ce-(a-i),e.match_length>e.lookahead&&(e.match_length=e.lookahead)}if(e.match_length>=ue?(n=D._tr_tally(e,1,e.match_length-ue),e.lookahead-=e.match_length,e.strstart+=e.match_length,e.match_length=0):(n=D._tr_tally(e,0,e.window[e.strstart]),e.lookahead--,e.strstart++),n&&(s(e,!1),0===e.strm.avail_out))return Ae}return e.insert=0,t===j?(s(e,!0),0===e.strm.avail_out?_e:xe):e.last_lit&&(s(e,!1),0===e.strm.avail_out)?Ae:we}function v(e,t){for(var n;;){if(0===e.lookahead&&(f(e),0===e.lookahead)){if(t===P)return Ae
break}if(e.match_length=0,n=D._tr_tally(e,0,e.window[e.strstart]),e.lookahead--,e.strstart++,n&&(s(e,!1),0===e.strm.avail_out))return Ae}return e.insert=0,t===j?(s(e,!0),0===e.strm.avail_out?_e:xe):e.last_lit&&(s(e,!1),0===e.strm.avail_out)?Ae:we}function b(e,t,n,r,i){this.good_length=e,this.max_lazy=t,this.nice_length=n,this.max_chain=r,this.func=i}function y(e){e.window_size=2*e.w_size,a(e.head),e.max_lazy_match=T[e.level].max_lazy,e.good_match=T[e.level].good_length,e.nice_match=T[e.level].nice_length,e.max_chain_length=T[e.level].max_chain,e.strstart=0,e.block_start=0,e.lookahead=0,e.insert=0,e.match_length=e.prev_length=ue-1,e.match_available=0,e.ins_h=0}function A(){this.strm=null,this.status=0,this.pending_buf=null,this.pending_buf_size=0,this.pending_out=0,this.pending=0,this.wrap=0,this.gzhead=null,this.gzindex=0,this.method=K,this.last_flush=-1,this.w_size=0,this.w_bits=0,this.w_mask=0,this.window=null,this.window_size=0,this.prev=null,this.head=null,this.ins_h=0,this.hash_size=0,this.hash_bits=0,this.hash_mask=0,this.hash_shift=0,this.block_start=0,this.match_length=0,this.prev_match=0,this.match_available=0,this.strstart=0,this.match_start=0,this.lookahead=0,this.prev_length=0,this.max_chain_length=0,this.max_lazy_match=0,this.level=0,this.strategy=0,this.good_match=0,this.nice_match=0,this.dyn_ltree=new z.Buf16(2*se),this.dyn_dtree=new z.Buf16(2*(2*ae+1)),this.bl_tree=new z.Buf16(2*(2*oe+1)),a(this.dyn_ltree),a(this.dyn_dtree),a(this.bl_tree),this.l_desc=null,this.d_desc=null,this.bl_desc=null,this.bl_count=new z.Buf16(le+1),this.heap=new z.Buf16(2*ie+1),a(this.heap),this.heap_len=0,this.heap_max=0,this.depth=new z.Buf16(2*ie+1),a(this.depth),this.l_buf=0,this.lit_bufsize=0,this.last_lit=0,this.d_buf=0,this.opt_len=0,this.static_len=0,this.matches=0,this.insert=0,this.bi_buf=0,this.bi_valid=0}function w(e){var t
return e&&e.state?(e.total_in=e.total_out=0,e.data_type=J,t=e.state,t.pending=0,t.pending_out=0,t.wrap<0&&(t.wrap=-t.wrap),t.status=t.wrap?he:be,e.adler=2===t.wrap?0:1,t.last_flush=P,D._tr_init(t),F):r(e,G)}function _(e){var t=w(e)
return t===F&&y(e.state),t}function x(e,t){return e&&e.state?2!==e.state.wrap?G:(e.state.gzhead=t,F):G}function S(e,t,n,i,a,o){if(!e)return G
var s=1
if(t===H&&(t=6),0>i?(s=0,i=-i):i>15&&(s=2,i-=16),1>a||a>$||n!==K||8>i||i>15||0>t||t>9||0>o||o>Q)return r(e,G)
8===i&&(i=9)
var l=new A
return e.state=l,l.strm=e,l.wrap=s,l.gzhead=null,l.w_bits=i,l.w_size=1<<l.w_bits,l.w_mask=l.w_size-1,l.hash_bits=a+7,l.hash_size=1<<l.hash_bits,l.hash_mask=l.hash_size-1,l.hash_shift=~~((l.hash_bits+ue-1)/ue),l.window=new z.Buf8(2*l.w_size),l.head=new z.Buf16(l.hash_size),l.prev=new z.Buf16(l.w_size),l.lit_bufsize=1<<a+6,l.pending_buf_size=4*l.lit_bufsize,l.pending_buf=new z.Buf8(l.pending_buf_size),l.d_buf=l.lit_bufsize>>1,l.l_buf=3*l.lit_bufsize,l.level=t,l.strategy=o,l.method=n,_(e)}function k(e,t){return S(e,t,K,ee,te,X)}function I(e,t){var n,s,c,d
if(!e||!e.state||t>M||0>t)return e?r(e,G):G
if(s=e.state,!e.output||!e.input&&0!==e.avail_in||s.status===ye&&t!==j)return r(e,0===e.avail_out?W:G)
if(s.strm=e,n=s.last_flush,s.last_flush=t,s.status===he)if(2===s.wrap)e.adler=0,l(s,31),l(s,139),l(s,8),s.gzhead?(l(s,(s.gzhead.text?1:0)+(s.gzhead.hcrc?2:0)+(s.gzhead.extra?4:0)+(s.gzhead.name?8:0)+(s.gzhead.comment?16:0)),l(s,255&s.gzhead.time),l(s,s.gzhead.time>>8&255),l(s,s.gzhead.time>>16&255),l(s,s.gzhead.time>>24&255),l(s,9===s.level?2:s.strategy>=q||s.level<2?4:0),l(s,255&s.gzhead.os),s.gzhead.extra&&s.gzhead.extra.length&&(l(s,255&s.gzhead.extra.length),l(s,s.gzhead.extra.length>>8&255)),s.gzhead.hcrc&&(e.adler=O(e.adler,s.pending_buf,s.pending,0)),s.gzindex=0,s.status=pe):(l(s,0),l(s,0),l(s,0),l(s,0),l(s,0),l(s,9===s.level?2:s.strategy>=q||s.level<2?4:0),l(s,Se),s.status=be)
else{var f=K+(s.w_bits-8<<4)<<8,h=-1
h=s.strategy>=q||s.level<2?0:s.level<6?1:6===s.level?2:3,f|=h<<6,0!==s.strstart&&(f|=fe),f+=31-f%31,s.status=be,u(s,f),0!==s.strstart&&(u(s,e.adler>>>16),u(s,65535&e.adler)),e.adler=1}if(s.status===pe)if(s.gzhead.extra){for(c=s.pending;s.gzindex<(65535&s.gzhead.extra.length)&&(s.pending!==s.pending_buf_size||(s.gzhead.hcrc&&s.pending>c&&(e.adler=O(e.adler,s.pending_buf,s.pending-c,c)),o(e),c=s.pending,s.pending!==s.pending_buf_size));)l(s,255&s.gzhead.extra[s.gzindex]),s.gzindex++
s.gzhead.hcrc&&s.pending>c&&(e.adler=O(e.adler,s.pending_buf,s.pending-c,c)),s.gzindex===s.gzhead.extra.length&&(s.gzindex=0,s.status=me)}else s.status=me
if(s.status===me)if(s.gzhead.name){c=s.pending
do{if(s.pending===s.pending_buf_size&&(s.gzhead.hcrc&&s.pending>c&&(e.adler=O(e.adler,s.pending_buf,s.pending-c,c)),o(e),c=s.pending,s.pending===s.pending_buf_size)){d=1
break}d=s.gzindex<s.gzhead.name.length?255&s.gzhead.name.charCodeAt(s.gzindex++):0,l(s,d)}while(0!==d)
s.gzhead.hcrc&&s.pending>c&&(e.adler=O(e.adler,s.pending_buf,s.pending-c,c)),0===d&&(s.gzindex=0,s.status=ge)}else s.status=ge
if(s.status===ge)if(s.gzhead.comment){c=s.pending
do{if(s.pending===s.pending_buf_size&&(s.gzhead.hcrc&&s.pending>c&&(e.adler=O(e.adler,s.pending_buf,s.pending-c,c)),o(e),c=s.pending,s.pending===s.pending_buf_size)){d=1
break}d=s.gzindex<s.gzhead.comment.length?255&s.gzhead.comment.charCodeAt(s.gzindex++):0,l(s,d)}while(0!==d)
s.gzhead.hcrc&&s.pending>c&&(e.adler=O(e.adler,s.pending_buf,s.pending-c,c)),0===d&&(s.status=ve)}else s.status=ve
if(s.status===ve&&(s.gzhead.hcrc?(s.pending+2>s.pending_buf_size&&o(e),s.pending+2<=s.pending_buf_size&&(l(s,255&e.adler),l(s,e.adler>>8&255),e.adler=0,s.status=be)):s.status=be),0!==s.pending){if(o(e),0===e.avail_out)return s.last_flush=-1,F}else if(0===e.avail_in&&i(t)<=i(n)&&t!==j)return r(e,W)
if(s.status===ye&&0!==e.avail_in)return r(e,W)
if(0!==e.avail_in||0!==s.lookahead||t!==P&&s.status!==ye){var p=s.strategy===q?v(s,t):s.strategy===V?g(s,t):T[s.level].func(s,t)
if(p!==_e&&p!==xe||(s.status=ye),p===Ae||p===_e)return 0===e.avail_out&&(s.last_flush=-1),F
if(p===we&&(t===N?D._tr_align(s):t!==M&&(D._tr_stored_block(s,0,0,!1),t===B&&(a(s.head),0===s.lookahead&&(s.strstart=0,s.block_start=0,s.insert=0))),o(e),0===e.avail_out))return s.last_flush=-1,F}return t!==j?F:s.wrap<=0?U:(2===s.wrap?(l(s,255&e.adler),l(s,e.adler>>8&255),l(s,e.adler>>16&255),l(s,e.adler>>24&255),l(s,255&e.total_in),l(s,e.total_in>>8&255),l(s,e.total_in>>16&255),l(s,e.total_in>>24&255)):(u(s,e.adler>>>16),u(s,65535&e.adler)),o(e),s.wrap>0&&(s.wrap=-s.wrap),0!==s.pending?F:U)}function E(e){var t
return e&&e.state?(t=e.state.status,t!==he&&t!==pe&&t!==me&&t!==ge&&t!==ve&&t!==be&&t!==ye?r(e,G):(e.state=null,t===be?r(e,Z):F)):G}function C(e,t){var n,r,i,o,s,l,u,c,d=t.length
if(!e||!e.state)return G
if(n=e.state,o=n.wrap,2===o||1===o&&n.status!==he||n.lookahead)return G
for(1===o&&(e.adler=L(e.adler,t,d,0)),n.wrap=0,d>=n.w_size&&(0===o&&(a(n.head),n.strstart=0,n.block_start=0,n.insert=0),c=new z.Buf8(n.w_size),z.arraySet(c,t,d-n.w_size,n.w_size,0),t=c,d=n.w_size),s=e.avail_in,l=e.next_in,u=e.input,e.avail_in=d,e.next_in=0,e.input=t,f(n);n.lookahead>=ue;){r=n.strstart,i=n.lookahead-(ue-1)
do n.ins_h=(n.ins_h<<n.hash_shift^n.window[r+ue-1])&n.hash_mask,n.prev[r&n.w_mask]=n.head[n.ins_h],n.head[n.ins_h]=r,r++
while(--i)
n.strstart=r,n.lookahead=ue-1,f(n)}return n.strstart+=n.lookahead,n.block_start=n.strstart,n.insert=n.lookahead,n.lookahead=0,n.match_length=n.prev_length=ue-1,n.match_available=0,e.next_in=l,e.input=u,e.avail_in=s,n.wrap=o,F}var T,z=e("../utils/common"),D=e("./trees"),L=e("./adler32"),O=e("./crc32"),R=e("./messages"),P=0,N=1,B=3,j=4,M=5,F=0,U=1,G=-2,Z=-3,W=-5,H=-1,Y=1,q=2,V=3,Q=4,X=0,J=2,K=8,$=9,ee=15,te=8,ne=29,re=256,ie=re+1+ne,ae=30,oe=19,se=2*ie+1,le=15,ue=3,ce=258,de=ce+ue+1,fe=32,he=42,pe=69,me=73,ge=91,ve=103,be=113,ye=666,Ae=1,we=2,_e=3,xe=4,Se=3
T=[new b(0,0,0,0,h),new b(4,4,8,4,p),new b(4,5,16,8,p),new b(4,6,32,32,p),new b(4,4,16,16,m),new b(8,16,32,32,m),new b(8,16,128,128,m),new b(8,32,128,256,m),new b(32,128,258,1024,m),new b(32,258,258,4096,m)],n.deflateInit=k,n.deflateInit2=S,n.deflateReset=_,n.deflateResetKeep=w,n.deflateSetHeader=x,n.deflate=I,n.deflateEnd=E,n.deflateSetDictionary=C,n.deflateInfo="pako deflate (from Nodeca project)"},{"../utils/common":41,"./adler32":43,"./crc32":45,"./messages":51,"./trees":52}],47:[function(e,t,n){"use strict"
function r(){this.text=0,this.time=0,this.xflags=0,this.os=0,this.extra=null,this.extra_len=0,this.name="",this.comment="",this.hcrc=0,this.done=!1}t.exports=r},{}],48:[function(e,t,n){"use strict"
var r=30,i=12
t.exports=function(e,t){var n,a,o,s,l,u,c,d,f,h,p,m,g,v,b,y,A,w,_,x,S,k,I,E,C
n=e.state,a=e.next_in,E=e.input,o=a+(e.avail_in-5),s=e.next_out,C=e.output,l=s-(t-e.avail_out),u=s+(e.avail_out-257),c=n.dmax,d=n.wsize,f=n.whave,h=n.wnext,p=n.window,m=n.hold,g=n.bits,v=n.lencode,b=n.distcode,y=(1<<n.lenbits)-1,A=(1<<n.distbits)-1
e:do{15>g&&(m+=E[a++]<<g,g+=8,m+=E[a++]<<g,g+=8),w=v[m&y]
t:for(;;){if(_=w>>>24,m>>>=_,g-=_,_=w>>>16&255,0===_)C[s++]=65535&w
else{if(!(16&_)){if(0===(64&_)){w=v[(65535&w)+(m&(1<<_)-1)]
continue t}if(32&_){n.mode=i
break e}e.msg="invalid literal/length code",n.mode=r
break e}x=65535&w,_&=15,_&&(_>g&&(m+=E[a++]<<g,g+=8),x+=m&(1<<_)-1,m>>>=_,g-=_),15>g&&(m+=E[a++]<<g,g+=8,m+=E[a++]<<g,g+=8),w=b[m&A]
n:for(;;){if(_=w>>>24,m>>>=_,g-=_,_=w>>>16&255,!(16&_)){if(0===(64&_)){w=b[(65535&w)+(m&(1<<_)-1)]
continue n}e.msg="invalid distance code",n.mode=r
break e}if(S=65535&w,_&=15,_>g&&(m+=E[a++]<<g,g+=8,_>g&&(m+=E[a++]<<g,g+=8)),S+=m&(1<<_)-1,S>c){e.msg="invalid distance too far back",n.mode=r
break e}if(m>>>=_,g-=_,_=s-l,S>_){if(_=S-_,_>f&&n.sane){e.msg="invalid distance too far back",n.mode=r
break e}if(k=0,I=p,0===h){if(k+=d-_,x>_){x-=_
do C[s++]=p[k++]
while(--_)
k=s-S,I=C}}else if(_>h){if(k+=d+h-_,_-=h,x>_){x-=_
do C[s++]=p[k++]
while(--_)
if(k=0,x>h){_=h,x-=_
do C[s++]=p[k++]
while(--_)
k=s-S,I=C}}}else if(k+=h-_,x>_){x-=_
do C[s++]=p[k++]
while(--_)
k=s-S,I=C}for(;x>2;)C[s++]=I[k++],C[s++]=I[k++],C[s++]=I[k++],x-=3
x&&(C[s++]=I[k++],x>1&&(C[s++]=I[k++]))}else{k=s-S
do C[s++]=C[k++],C[s++]=C[k++],C[s++]=C[k++],x-=3
while(x>2)
x&&(C[s++]=C[k++],x>1&&(C[s++]=C[k++]))}break}}break}}while(o>a&&u>s)
x=g>>3,a-=x,g-=x<<3,m&=(1<<g)-1,e.next_in=a,e.next_out=s,e.avail_in=o>a?5+(o-a):5-(a-o),e.avail_out=u>s?257+(u-s):257-(s-u),n.hold=m,n.bits=g}},{}],49:[function(e,t,n){"use strict"
function r(e){return(e>>>24&255)+(e>>>8&65280)+((65280&e)<<8)+((255&e)<<24)}function i(){this.mode=0,this.last=!1,this.wrap=0,this.havedict=!1,this.flags=0,this.dmax=0,this.check=0,this.total=0,this.head=null,this.wbits=0,this.wsize=0,this.whave=0,this.wnext=0,this.window=null,this.hold=0,this.bits=0,this.length=0,this.offset=0,this.extra=0,this.lencode=null,this.distcode=null,this.lenbits=0,this.distbits=0,this.ncode=0,this.nlen=0,this.ndist=0,this.have=0,this.next=null,this.lens=new b.Buf16(320),this.work=new b.Buf16(288),this.lendyn=null,this.distdyn=null,this.sane=0,this.back=0,this.was=0}function a(e){var t
return e&&e.state?(t=e.state,e.total_in=e.total_out=t.total=0,e.msg="",t.wrap&&(e.adler=1&t.wrap),t.mode=B,t.last=0,t.havedict=0,t.dmax=32768,t.head=null,t.hold=0,t.bits=0,t.lencode=t.lendyn=new b.Buf32(me),t.distcode=t.distdyn=new b.Buf32(ge),t.sane=1,t.back=-1,T):L}function o(e){var t
return e&&e.state?(t=e.state,t.wsize=0,t.whave=0,t.wnext=0,a(e)):L}function s(e,t){var n,r
return e&&e.state?(r=e.state,0>t?(n=0,t=-t):(n=(t>>4)+1,48>t&&(t&=15)),t&&(8>t||t>15)?L:(null!==r.window&&r.wbits!==t&&(r.window=null),r.wrap=n,r.wbits=t,o(e))):L}function l(e,t){var n,r
return e?(r=new i,e.state=r,r.window=null,n=s(e,t),n!==T&&(e.state=null),n):L}function u(e){return l(e,be)}function c(e){if(ye){var t
for(g=new b.Buf32(512),v=new b.Buf32(32),t=0;144>t;)e.lens[t++]=8
for(;256>t;)e.lens[t++]=9
for(;280>t;)e.lens[t++]=7
for(;288>t;)e.lens[t++]=8
for(_(S,e.lens,0,288,g,0,e.work,{bits:9}),t=0;32>t;)e.lens[t++]=5
_(k,e.lens,0,32,v,0,e.work,{bits:5}),ye=!1}e.lencode=g,e.lenbits=9,e.distcode=v,e.distbits=5}function d(e,t,n,r){var i,a=e.state
return null===a.window&&(a.wsize=1<<a.wbits,a.wnext=0,a.whave=0,a.window=new b.Buf8(a.wsize)),r>=a.wsize?(b.arraySet(a.window,t,n-a.wsize,a.wsize,0),a.wnext=0,a.whave=a.wsize):(i=a.wsize-a.wnext,i>r&&(i=r),b.arraySet(a.window,t,n-r,i,a.wnext),r-=i,r?(b.arraySet(a.window,t,n-r,r,0),a.wnext=r,a.whave=a.wsize):(a.wnext+=i,a.wnext===a.wsize&&(a.wnext=0),a.whave<a.wsize&&(a.whave+=i))),0}function f(e,t){var n,i,a,o,s,l,u,f,h,p,m,g,v,me,ge,ve,be,ye,Ae,we,_e,xe,Se,ke,Ie=0,Ee=new b.Buf8(4),Ce=[16,17,18,0,8,7,9,6,10,5,11,4,12,3,13,2,14,1,15]
if(!e||!e.state||!e.output||!e.input&&0!==e.avail_in)return L
n=e.state,n.mode===V&&(n.mode=Q),s=e.next_out,a=e.output,u=e.avail_out,o=e.next_in,i=e.input,l=e.avail_in,f=n.hold,h=n.bits,p=l,m=u,xe=T
e:for(;;)switch(n.mode){case B:if(0===n.wrap){n.mode=Q
break}for(;16>h;){if(0===l)break e
l--,f+=i[o++]<<h,h+=8}if(2&n.wrap&&35615===f){n.check=0,Ee[0]=255&f,Ee[1]=f>>>8&255,n.check=A(n.check,Ee,2,0),f=0,h=0,n.mode=j
break}if(n.flags=0,n.head&&(n.head.done=!1),!(1&n.wrap)||(((255&f)<<8)+(f>>8))%31){e.msg="incorrect header check",n.mode=fe
break}if((15&f)!==N){e.msg="unknown compression method",n.mode=fe
break}if(f>>>=4,h-=4,_e=(15&f)+8,0===n.wbits)n.wbits=_e
else if(_e>n.wbits){e.msg="invalid window size",n.mode=fe
break}n.dmax=1<<_e,e.adler=n.check=1,n.mode=512&f?Y:V,f=0,h=0
break
case j:for(;16>h;){if(0===l)break e
l--,f+=i[o++]<<h,h+=8}if(n.flags=f,(255&n.flags)!==N){e.msg="unknown compression method",n.mode=fe
break}if(57344&n.flags){e.msg="unknown header flags set",n.mode=fe
break}n.head&&(n.head.text=f>>8&1),512&n.flags&&(Ee[0]=255&f,Ee[1]=f>>>8&255,n.check=A(n.check,Ee,2,0)),f=0,h=0,n.mode=M
case M:for(;32>h;){if(0===l)break e
l--,f+=i[o++]<<h,h+=8}n.head&&(n.head.time=f),512&n.flags&&(Ee[0]=255&f,Ee[1]=f>>>8&255,Ee[2]=f>>>16&255,Ee[3]=f>>>24&255,n.check=A(n.check,Ee,4,0)),f=0,h=0,n.mode=F
case F:for(;16>h;){if(0===l)break e
l--,f+=i[o++]<<h,h+=8}n.head&&(n.head.xflags=255&f,n.head.os=f>>8),512&n.flags&&(Ee[0]=255&f,Ee[1]=f>>>8&255,n.check=A(n.check,Ee,2,0)),f=0,h=0,n.mode=U
case U:if(1024&n.flags){for(;16>h;){if(0===l)break e
l--,f+=i[o++]<<h,h+=8}n.length=f,n.head&&(n.head.extra_len=f),512&n.flags&&(Ee[0]=255&f,Ee[1]=f>>>8&255,n.check=A(n.check,Ee,2,0)),f=0,h=0}else n.head&&(n.head.extra=null)
n.mode=G
case G:if(1024&n.flags&&(g=n.length,g>l&&(g=l),g&&(n.head&&(_e=n.head.extra_len-n.length,n.head.extra||(n.head.extra=new Array(n.head.extra_len)),b.arraySet(n.head.extra,i,o,g,_e)),512&n.flags&&(n.check=A(n.check,i,g,o)),l-=g,o+=g,n.length-=g),n.length))break e
n.length=0,n.mode=Z
case Z:if(2048&n.flags){if(0===l)break e
g=0
do _e=i[o+g++],n.head&&_e&&n.length<65536&&(n.head.name+=String.fromCharCode(_e))
while(_e&&l>g)
if(512&n.flags&&(n.check=A(n.check,i,g,o)),l-=g,o+=g,_e)break e}else n.head&&(n.head.name=null)
n.length=0,n.mode=W
case W:if(4096&n.flags){if(0===l)break e
g=0
do _e=i[o+g++],n.head&&_e&&n.length<65536&&(n.head.comment+=String.fromCharCode(_e))
while(_e&&l>g)
if(512&n.flags&&(n.check=A(n.check,i,g,o)),l-=g,o+=g,_e)break e}else n.head&&(n.head.comment=null)
n.mode=H
case H:if(512&n.flags){for(;16>h;){if(0===l)break e
l--,f+=i[o++]<<h,h+=8}if(f!==(65535&n.check)){e.msg="header crc mismatch",n.mode=fe
break}f=0,h=0}n.head&&(n.head.hcrc=n.flags>>9&1,n.head.done=!0),e.adler=n.check=0,n.mode=V
break
case Y:for(;32>h;){if(0===l)break e
l--,f+=i[o++]<<h,h+=8}e.adler=n.check=r(f),f=0,h=0,n.mode=q
case q:if(0===n.havedict)return e.next_out=s,e.avail_out=u,e.next_in=o,e.avail_in=l,n.hold=f,n.bits=h,D
e.adler=n.check=1,n.mode=V
case V:if(t===E||t===C)break e
case Q:if(n.last){f>>>=7&h,h-=7&h,n.mode=ue
break}for(;3>h;){if(0===l)break e
l--,f+=i[o++]<<h,h+=8}switch(n.last=1&f,f>>>=1,h-=1,3&f){case 0:n.mode=X
break
case 1:if(c(n),n.mode=ne,t===C){f>>>=2,h-=2
break e}break
case 2:n.mode=$
break
case 3:e.msg="invalid block type",n.mode=fe}f>>>=2,h-=2
break
case X:for(f>>>=7&h,h-=7&h;32>h;){if(0===l)break e
l--,f+=i[o++]<<h,h+=8}if((65535&f)!==(f>>>16^65535)){e.msg="invalid stored block lengths",n.mode=fe
break}if(n.length=65535&f,f=0,h=0,n.mode=J,t===C)break e
case J:n.mode=K
case K:if(g=n.length){if(g>l&&(g=l),g>u&&(g=u),0===g)break e
b.arraySet(a,i,o,g,s),l-=g,o+=g,u-=g,s+=g,n.length-=g
break}n.mode=V
break
case $:for(;14>h;){if(0===l)break e
l--,f+=i[o++]<<h,h+=8}if(n.nlen=(31&f)+257,f>>>=5,h-=5,n.ndist=(31&f)+1,f>>>=5,h-=5,n.ncode=(15&f)+4,f>>>=4,h-=4,n.nlen>286||n.ndist>30){e.msg="too many length or distance symbols",n.mode=fe
break}n.have=0,n.mode=ee
case ee:for(;n.have<n.ncode;){for(;3>h;){if(0===l)break e
l--,f+=i[o++]<<h,h+=8}n.lens[Ce[n.have++]]=7&f,f>>>=3,h-=3}for(;n.have<19;)n.lens[Ce[n.have++]]=0
if(n.lencode=n.lendyn,n.lenbits=7,Se={bits:n.lenbits},xe=_(x,n.lens,0,19,n.lencode,0,n.work,Se),n.lenbits=Se.bits,xe){e.msg="invalid code lengths set",n.mode=fe
break}n.have=0,n.mode=te
case te:for(;n.have<n.nlen+n.ndist;){for(;Ie=n.lencode[f&(1<<n.lenbits)-1],ge=Ie>>>24,ve=Ie>>>16&255,be=65535&Ie,!(h>=ge);){if(0===l)break e
l--,f+=i[o++]<<h,h+=8}if(16>be)f>>>=ge,h-=ge,n.lens[n.have++]=be
else{if(16===be){for(ke=ge+2;ke>h;){if(0===l)break e
l--,f+=i[o++]<<h,h+=8}if(f>>>=ge,h-=ge,0===n.have){e.msg="invalid bit length repeat",n.mode=fe
break}_e=n.lens[n.have-1],g=3+(3&f),f>>>=2,h-=2}else if(17===be){for(ke=ge+3;ke>h;){if(0===l)break e
l--,f+=i[o++]<<h,h+=8}f>>>=ge,h-=ge,_e=0,g=3+(7&f),f>>>=3,h-=3}else{for(ke=ge+7;ke>h;){if(0===l)break e
l--,f+=i[o++]<<h,h+=8}f>>>=ge,h-=ge,_e=0,g=11+(127&f),f>>>=7,h-=7}if(n.have+g>n.nlen+n.ndist){e.msg="invalid bit length repeat",n.mode=fe
break}for(;g--;)n.lens[n.have++]=_e}}if(n.mode===fe)break
if(0===n.lens[256]){e.msg="invalid code -- missing end-of-block",n.mode=fe
break}if(n.lenbits=9,Se={bits:n.lenbits},xe=_(S,n.lens,0,n.nlen,n.lencode,0,n.work,Se),n.lenbits=Se.bits,xe){e.msg="invalid literal/lengths set",n.mode=fe
break}if(n.distbits=6,n.distcode=n.distdyn,Se={bits:n.distbits},xe=_(k,n.lens,n.nlen,n.ndist,n.distcode,0,n.work,Se),n.distbits=Se.bits,xe){e.msg="invalid distances set",n.mode=fe
break}if(n.mode=ne,t===C)break e
case ne:n.mode=re
case re:if(l>=6&&u>=258){e.next_out=s,e.avail_out=u,e.next_in=o,e.avail_in=l,n.hold=f,n.bits=h,w(e,m),s=e.next_out,a=e.output,u=e.avail_out,o=e.next_in,i=e.input,l=e.avail_in,f=n.hold,h=n.bits,n.mode===V&&(n.back=-1)
break}for(n.back=0;Ie=n.lencode[f&(1<<n.lenbits)-1],ge=Ie>>>24,ve=Ie>>>16&255,be=65535&Ie,!(h>=ge);){if(0===l)break e
l--,f+=i[o++]<<h,h+=8}if(ve&&0===(240&ve)){for(ye=ge,Ae=ve,we=be;Ie=n.lencode[we+((f&(1<<ye+Ae)-1)>>ye)],ge=Ie>>>24,ve=Ie>>>16&255,be=65535&Ie,!(h>=ye+ge);){if(0===l)break e
l--,f+=i[o++]<<h,h+=8}f>>>=ye,h-=ye,n.back+=ye}if(f>>>=ge,h-=ge,n.back+=ge,n.length=be,0===ve){n.mode=le
break}if(32&ve){n.back=-1,n.mode=V
break}if(64&ve){e.msg="invalid literal/length code",n.mode=fe
break}n.extra=15&ve,n.mode=ie
case ie:if(n.extra){for(ke=n.extra;ke>h;){if(0===l)break e
l--,f+=i[o++]<<h,h+=8}n.length+=f&(1<<n.extra)-1,f>>>=n.extra,h-=n.extra,n.back+=n.extra}n.was=n.length,n.mode=ae
case ae:for(;Ie=n.distcode[f&(1<<n.distbits)-1],ge=Ie>>>24,ve=Ie>>>16&255,be=65535&Ie,!(h>=ge);){if(0===l)break e
l--,f+=i[o++]<<h,h+=8}if(0===(240&ve)){for(ye=ge,Ae=ve,we=be;Ie=n.distcode[we+((f&(1<<ye+Ae)-1)>>ye)],ge=Ie>>>24,ve=Ie>>>16&255,be=65535&Ie,!(h>=ye+ge);){if(0===l)break e
l--,f+=i[o++]<<h,h+=8}f>>>=ye,h-=ye,n.back+=ye}if(f>>>=ge,h-=ge,n.back+=ge,64&ve){e.msg="invalid distance code",n.mode=fe
break}n.offset=be,n.extra=15&ve,n.mode=oe
case oe:if(n.extra){for(ke=n.extra;ke>h;){if(0===l)break e
l--,f+=i[o++]<<h,h+=8}n.offset+=f&(1<<n.extra)-1,f>>>=n.extra,h-=n.extra,n.back+=n.extra}if(n.offset>n.dmax){e.msg="invalid distance too far back",n.mode=fe
break}n.mode=se
case se:if(0===u)break e
if(g=m-u,n.offset>g){if(g=n.offset-g,g>n.whave&&n.sane){e.msg="invalid distance too far back",n.mode=fe
break}g>n.wnext?(g-=n.wnext,v=n.wsize-g):v=n.wnext-g,g>n.length&&(g=n.length),me=n.window}else me=a,v=s-n.offset,g=n.length
g>u&&(g=u),u-=g,n.length-=g
do a[s++]=me[v++]
while(--g)
0===n.length&&(n.mode=re)
break
case le:if(0===u)break e
a[s++]=n.length,u--,n.mode=re
break
case ue:if(n.wrap){for(;32>h;){if(0===l)break e
l--,f|=i[o++]<<h,h+=8}if(m-=u,e.total_out+=m,n.total+=m,m&&(e.adler=n.check=n.flags?A(n.check,a,m,s-m):y(n.check,a,m,s-m)),m=u,(n.flags?f:r(f))!==n.check){e.msg="incorrect data check",n.mode=fe
break}f=0,h=0}n.mode=ce
case ce:if(n.wrap&&n.flags){for(;32>h;){if(0===l)break e
l--,f+=i[o++]<<h,h+=8}if(f!==(4294967295&n.total)){e.msg="incorrect length check",n.mode=fe
break}f=0,h=0}n.mode=de
case de:xe=z
break e
case fe:xe=O
break e
case he:return R
case pe:default:return L}return e.next_out=s,e.avail_out=u,e.next_in=o,e.avail_in=l,n.hold=f,n.bits=h,(n.wsize||m!==e.avail_out&&n.mode<fe&&(n.mode<ue||t!==I))&&d(e,e.output,e.next_out,m-e.avail_out)?(n.mode=he,R):(p-=e.avail_in,m-=e.avail_out,e.total_in+=p,e.total_out+=m,n.total+=m,n.wrap&&m&&(e.adler=n.check=n.flags?A(n.check,a,m,e.next_out-m):y(n.check,a,m,e.next_out-m)),e.data_type=n.bits+(n.last?64:0)+(n.mode===V?128:0)+(n.mode===ne||n.mode===J?256:0),(0===p&&0===m||t===I)&&xe===T&&(xe=P),xe)}function h(e){if(!e||!e.state)return L
var t=e.state
return t.window&&(t.window=null),e.state=null,T}function p(e,t){var n
return e&&e.state?(n=e.state,0===(2&n.wrap)?L:(n.head=t,t.done=!1,T)):L}function m(e,t){var n,r,i,a=t.length
return e&&e.state?(n=e.state,0!==n.wrap&&n.mode!==q?L:n.mode===q&&(r=1,r=y(r,t,a,0),r!==n.check)?O:(i=d(e,t,a,a))?(n.mode=he,R):(n.havedict=1,T)):L}var g,v,b=e("../utils/common"),y=e("./adler32"),A=e("./crc32"),w=e("./inffast"),_=e("./inftrees"),x=0,S=1,k=2,I=4,E=5,C=6,T=0,z=1,D=2,L=-2,O=-3,R=-4,P=-5,N=8,B=1,j=2,M=3,F=4,U=5,G=6,Z=7,W=8,H=9,Y=10,q=11,V=12,Q=13,X=14,J=15,K=16,$=17,ee=18,te=19,ne=20,re=21,ie=22,ae=23,oe=24,se=25,le=26,ue=27,ce=28,de=29,fe=30,he=31,pe=32,me=852,ge=592,ve=15,be=ve,ye=!0
n.inflateReset=o,n.inflateReset2=s,n.inflateResetKeep=a,n.inflateInit=u,n.inflateInit2=l,n.inflate=f,n.inflateEnd=h,n.inflateGetHeader=p,n.inflateSetDictionary=m,n.inflateInfo="pako inflate (from Nodeca project)"},{"../utils/common":41,"./adler32":43,"./crc32":45,"./inffast":48,"./inftrees":50}],50:[function(e,t,n){"use strict"
var r=e("../utils/common"),i=15,a=852,o=592,s=0,l=1,u=2,c=[3,4,5,6,7,8,9,10,11,13,15,17,19,23,27,31,35,43,51,59,67,83,99,115,131,163,195,227,258,0,0],d=[16,16,16,16,16,16,16,16,17,17,17,17,18,18,18,18,19,19,19,19,20,20,20,20,21,21,21,21,16,72,78],f=[1,2,3,4,5,7,9,13,17,25,33,49,65,97,129,193,257,385,513,769,1025,1537,2049,3073,4097,6145,8193,12289,16385,24577,0,0],h=[16,16,16,16,17,17,18,18,19,19,20,20,21,21,22,22,23,23,24,24,25,25,26,26,27,27,28,28,29,29,64,64]
t.exports=function(e,t,n,p,m,g,v,b){var y,A,w,_,x,S,k,I,E,C=b.bits,T=0,z=0,D=0,L=0,O=0,R=0,P=0,N=0,B=0,j=0,M=null,F=0,U=new r.Buf16(i+1),G=new r.Buf16(i+1),Z=null,W=0
for(T=0;i>=T;T++)U[T]=0
for(z=0;p>z;z++)U[t[n+z]]++
for(O=C,L=i;L>=1&&0===U[L];L--);if(O>L&&(O=L),0===L)return m[g++]=20971520,m[g++]=20971520,b.bits=1,0
for(D=1;L>D&&0===U[D];D++);for(D>O&&(O=D),N=1,T=1;i>=T;T++)if(N<<=1,N-=U[T],0>N)return-1
if(N>0&&(e===s||1!==L))return-1
for(G[1]=0,T=1;i>T;T++)G[T+1]=G[T]+U[T]
for(z=0;p>z;z++)0!==t[n+z]&&(v[G[t[n+z]]++]=z)
if(e===s?(M=Z=v,S=19):e===l?(M=c,F-=257,Z=d,W-=257,S=256):(M=f,Z=h,S=-1),j=0,z=0,T=D,x=g,R=O,P=0,w=-1,B=1<<O,_=B-1,e===l&&B>a||e===u&&B>o)return 1
for(var H=0;;){H++,k=T-P,v[z]<S?(I=0,E=v[z]):v[z]>S?(I=Z[W+v[z]],E=M[F+v[z]]):(I=96,E=0),y=1<<T-P,A=1<<R,D=A
do A-=y,m[x+(j>>P)+A]=k<<24|I<<16|E|0
while(0!==A)
for(y=1<<T-1;j&y;)y>>=1
if(0!==y?(j&=y-1,j+=y):j=0,z++,0===--U[T]){if(T===L)break
T=t[n+v[z]]}if(T>O&&(j&_)!==w){for(0===P&&(P=O),x+=D,R=T-P,N=1<<R;L>R+P&&(N-=U[R+P],!(0>=N));)R++,N<<=1
if(B+=1<<R,e===l&&B>a||e===u&&B>o)return 1
w=j&_,m[w]=O<<24|R<<16|x-g|0}}return 0!==j&&(m[x+j]=T-P<<24|64<<16|0),b.bits=O,0}},{"../utils/common":41}],51:[function(e,t,n){"use strict"
t.exports={2:"need dictionary",1:"stream end",0:"","-1":"file error","-2":"stream error","-3":"data error","-4":"insufficient memory","-5":"buffer error","-6":"incompatible version"}},{}],52:[function(e,t,n){"use strict"
function r(e){for(var t=e.length;--t>=0;)e[t]=0}function i(e,t,n,r,i){this.static_tree=e,this.extra_bits=t,this.extra_base=n,this.elems=r,this.max_length=i,this.has_stree=e&&e.length}function a(e,t){this.dyn_tree=e,this.max_code=0,this.stat_desc=t}function o(e){return 256>e?le[e]:le[256+(e>>>7)]}function s(e,t){e.pending_buf[e.pending++]=255&t,e.pending_buf[e.pending++]=t>>>8&255}function l(e,t,n){e.bi_valid>Q-n?(e.bi_buf|=t<<e.bi_valid&65535,s(e,e.bi_buf),e.bi_buf=t>>Q-e.bi_valid,e.bi_valid+=n-Q):(e.bi_buf|=t<<e.bi_valid&65535,e.bi_valid+=n)}function u(e,t,n){l(e,n[2*t],n[2*t+1])}function c(e,t){var n=0
do n|=1&e,e>>>=1,n<<=1
while(--t>0)
return n>>>1}function d(e){16===e.bi_valid?(s(e,e.bi_buf),e.bi_buf=0,e.bi_valid=0):e.bi_valid>=8&&(e.pending_buf[e.pending++]=255&e.bi_buf,e.bi_buf>>=8,e.bi_valid-=8)}function f(e,t){var n,r,i,a,o,s,l=t.dyn_tree,u=t.max_code,c=t.stat_desc.static_tree,d=t.stat_desc.has_stree,f=t.stat_desc.extra_bits,h=t.stat_desc.extra_base,p=t.stat_desc.max_length,m=0
for(a=0;V>=a;a++)e.bl_count[a]=0
for(l[2*e.heap[e.heap_max]+1]=0,n=e.heap_max+1;q>n;n++)r=e.heap[n],a=l[2*l[2*r+1]+1]+1,a>p&&(a=p,m++),l[2*r+1]=a,r>u||(e.bl_count[a]++,o=0,r>=h&&(o=f[r-h]),s=l[2*r],e.opt_len+=s*(a+o),d&&(e.static_len+=s*(c[2*r+1]+o)))
if(0!==m){do{for(a=p-1;0===e.bl_count[a];)a--
e.bl_count[a]--,e.bl_count[a+1]+=2,e.bl_count[p]--,m-=2}while(m>0)
for(a=p;0!==a;a--)for(r=e.bl_count[a];0!==r;)i=e.heap[--n],i>u||(l[2*i+1]!==a&&(e.opt_len+=(a-l[2*i+1])*l[2*i],l[2*i+1]=a),r--)}}function h(e,t,n){var r,i,a=new Array(V+1),o=0
for(r=1;V>=r;r++)a[r]=o=o+n[r-1]<<1
for(i=0;t>=i;i++){var s=e[2*i+1]
0!==s&&(e[2*i]=c(a[s]++,s))}}function p(){var e,t,n,r,a,o=new Array(V+1)
for(n=0,r=0;G-1>r;r++)for(ce[r]=n,e=0;e<1<<te[r];e++)ue[n++]=r
for(ue[n-1]=r,a=0,r=0;16>r;r++)for(de[r]=a,e=0;e<1<<ne[r];e++)le[a++]=r
for(a>>=7;H>r;r++)for(de[r]=a<<7,e=0;e<1<<ne[r]-7;e++)le[256+a++]=r
for(t=0;V>=t;t++)o[t]=0
for(e=0;143>=e;)oe[2*e+1]=8,e++,o[8]++
for(;255>=e;)oe[2*e+1]=9,e++,o[9]++
for(;279>=e;)oe[2*e+1]=7,e++,o[7]++
for(;287>=e;)oe[2*e+1]=8,e++,o[8]++
for(h(oe,W+1,o),e=0;H>e;e++)se[2*e+1]=5,se[2*e]=c(e,5)
fe=new i(oe,te,Z+1,W,V),he=new i(se,ne,0,H,V),pe=new i(new Array(0),re,0,Y,X)}function m(e){var t
for(t=0;W>t;t++)e.dyn_ltree[2*t]=0
for(t=0;H>t;t++)e.dyn_dtree[2*t]=0
for(t=0;Y>t;t++)e.bl_tree[2*t]=0
e.dyn_ltree[2*J]=1,e.opt_len=e.static_len=0,e.last_lit=e.matches=0}function g(e){e.bi_valid>8?s(e,e.bi_buf):e.bi_valid>0&&(e.pending_buf[e.pending++]=e.bi_buf),e.bi_buf=0,e.bi_valid=0}function v(e,t,n,r){g(e),r&&(s(e,n),s(e,~n)),L.arraySet(e.pending_buf,e.window,t,n,e.pending),e.pending+=n}function b(e,t,n,r){var i=2*t,a=2*n
return e[i]<e[a]||e[i]===e[a]&&r[t]<=r[n]}function y(e,t,n){for(var r=e.heap[n],i=n<<1;i<=e.heap_len&&(i<e.heap_len&&b(t,e.heap[i+1],e.heap[i],e.depth)&&i++,!b(t,r,e.heap[i],e.depth));)e.heap[n]=e.heap[i],n=i,i<<=1
e.heap[n]=r}function A(e,t,n){var r,i,a,s,c=0
if(0!==e.last_lit)do r=e.pending_buf[e.d_buf+2*c]<<8|e.pending_buf[e.d_buf+2*c+1],i=e.pending_buf[e.l_buf+c],c++,0===r?u(e,i,t):(a=ue[i],u(e,a+Z+1,t),s=te[a],0!==s&&(i-=ce[a],l(e,i,s)),r--,a=o(r),u(e,a,n),s=ne[a],0!==s&&(r-=de[a],l(e,r,s)))
while(c<e.last_lit)
u(e,J,t)}function w(e,t){var n,r,i,a=t.dyn_tree,o=t.stat_desc.static_tree,s=t.stat_desc.has_stree,l=t.stat_desc.elems,u=-1
for(e.heap_len=0,e.heap_max=q,n=0;l>n;n++)0!==a[2*n]?(e.heap[++e.heap_len]=u=n,e.depth[n]=0):a[2*n+1]=0
for(;e.heap_len<2;)i=e.heap[++e.heap_len]=2>u?++u:0,a[2*i]=1,e.depth[i]=0,e.opt_len--,s&&(e.static_len-=o[2*i+1])
for(t.max_code=u,n=e.heap_len>>1;n>=1;n--)y(e,a,n)
i=l
do n=e.heap[1],e.heap[1]=e.heap[e.heap_len--],y(e,a,1),r=e.heap[1],e.heap[--e.heap_max]=n,e.heap[--e.heap_max]=r,a[2*i]=a[2*n]+a[2*r],e.depth[i]=(e.depth[n]>=e.depth[r]?e.depth[n]:e.depth[r])+1,a[2*n+1]=a[2*r+1]=i,e.heap[1]=i++,y(e,a,1)
while(e.heap_len>=2)
e.heap[--e.heap_max]=e.heap[1],f(e,t),h(a,u,e.bl_count)}function _(e,t,n){var r,i,a=-1,o=t[1],s=0,l=7,u=4
for(0===o&&(l=138,u=3),t[2*(n+1)+1]=65535,r=0;n>=r;r++)i=o,o=t[2*(r+1)+1],++s<l&&i===o||(u>s?e.bl_tree[2*i]+=s:0!==i?(i!==a&&e.bl_tree[2*i]++,e.bl_tree[2*K]++):10>=s?e.bl_tree[2*$]++:e.bl_tree[2*ee]++,s=0,a=i,0===o?(l=138,u=3):i===o?(l=6,u=3):(l=7,u=4))}function x(e,t,n){var r,i,a=-1,o=t[1],s=0,c=7,d=4
for(0===o&&(c=138,d=3),r=0;n>=r;r++)if(i=o,o=t[2*(r+1)+1],!(++s<c&&i===o)){if(d>s){do u(e,i,e.bl_tree)
while(0!==--s)}else 0!==i?(i!==a&&(u(e,i,e.bl_tree),s--),u(e,K,e.bl_tree),l(e,s-3,2)):10>=s?(u(e,$,e.bl_tree),l(e,s-3,3)):(u(e,ee,e.bl_tree),l(e,s-11,7))
s=0,a=i,0===o?(c=138,d=3):i===o?(c=6,d=3):(c=7,d=4)}}function S(e){var t
for(_(e,e.dyn_ltree,e.l_desc.max_code),_(e,e.dyn_dtree,e.d_desc.max_code),w(e,e.bl_desc),t=Y-1;t>=3&&0===e.bl_tree[2*ie[t]+1];t--);return e.opt_len+=3*(t+1)+5+5+4,t}function k(e,t,n,r){var i
for(l(e,t-257,5),l(e,n-1,5),l(e,r-4,4),i=0;r>i;i++)l(e,e.bl_tree[2*ie[i]+1],3)
x(e,e.dyn_ltree,t-1),x(e,e.dyn_dtree,n-1)}function I(e){var t,n=4093624447
for(t=0;31>=t;t++,n>>>=1)if(1&n&&0!==e.dyn_ltree[2*t])return R
if(0!==e.dyn_ltree[18]||0!==e.dyn_ltree[20]||0!==e.dyn_ltree[26])return P
for(t=32;Z>t;t++)if(0!==e.dyn_ltree[2*t])return P
return R}function E(e){me||(p(),me=!0),e.l_desc=new a(e.dyn_ltree,fe),e.d_desc=new a(e.dyn_dtree,he),e.bl_desc=new a(e.bl_tree,pe),e.bi_buf=0,e.bi_valid=0,m(e)}function C(e,t,n,r){l(e,(B<<1)+(r?1:0),3),v(e,t,n,!0)}function T(e){l(e,j<<1,3),u(e,J,oe),d(e)}function z(e,t,n,r){var i,a,o=0
e.level>0?(e.strm.data_type===N&&(e.strm.data_type=I(e)),w(e,e.l_desc),w(e,e.d_desc),o=S(e),i=e.opt_len+3+7>>>3,a=e.static_len+3+7>>>3,i>=a&&(i=a)):i=a=n+5,i>=n+4&&-1!==t?C(e,t,n,r):e.strategy===O||a===i?(l(e,(j<<1)+(r?1:0),3),A(e,oe,se)):(l(e,(M<<1)+(r?1:0),3),k(e,e.l_desc.max_code+1,e.d_desc.max_code+1,o+1),A(e,e.dyn_ltree,e.dyn_dtree)),m(e),r&&g(e)}function D(e,t,n){return e.pending_buf[e.d_buf+2*e.last_lit]=t>>>8&255,e.pending_buf[e.d_buf+2*e.last_lit+1]=255&t,e.pending_buf[e.l_buf+e.last_lit]=255&n,e.last_lit++,0===t?e.dyn_ltree[2*n]++:(e.matches++,t--,e.dyn_ltree[2*(ue[n]+Z+1)]++,e.dyn_dtree[2*o(t)]++),e.last_lit===e.lit_bufsize-1}var L=e("../utils/common"),O=4,R=0,P=1,N=2,B=0,j=1,M=2,F=3,U=258,G=29,Z=256,W=Z+1+G,H=30,Y=19,q=2*W+1,V=15,Q=16,X=7,J=256,K=16,$=17,ee=18,te=[0,0,0,0,0,0,0,0,1,1,1,1,2,2,2,2,3,3,3,3,4,4,4,4,5,5,5,5,0],ne=[0,0,0,0,1,1,2,2,3,3,4,4,5,5,6,6,7,7,8,8,9,9,10,10,11,11,12,12,13,13],re=[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,2,3,7],ie=[16,17,18,0,8,7,9,6,10,5,11,4,12,3,13,2,14,1,15],ae=512,oe=new Array(2*(W+2))
r(oe)
var se=new Array(2*H)
r(se)
var le=new Array(ae)
r(le)
var ue=new Array(U-F+1)
r(ue)
var ce=new Array(G)
r(ce)
var de=new Array(H)
r(de)
var fe,he,pe,me=!1
n._tr_init=E,n._tr_stored_block=C,n._tr_flush_block=z,n._tr_tally=D,n._tr_align=T},{"../utils/common":41}],53:[function(e,t,n){"use strict"
function r(){this.input=null,this.next_in=0,this.avail_in=0,this.total_in=0,this.output=null,this.next_out=0,this.avail_out=0,this.total_out=0,this.msg="",this.state=null,this.data_type=2,this.adler=0}t.exports=r},{}]},{},[10])(10)}),!function(e){if("object"==typeof exports&&"undefined"!=typeof module)module.exports=e()
else if("function"==typeof define&&define.amd)define([],e)
else{var t
t="undefined"!=typeof window?window:"undefined"!=typeof global?global:"undefined"!=typeof self?self:this,t.localforage=e()}}(function(){return function e(t,n,r){function i(o,s){if(!n[o]){if(!t[o]){var l="function"==typeof require&&require
if(!s&&l)return l(o,!0)
if(a)return a(o,!0)
var u=new Error("Cannot find module '"+o+"'")
throw u.code="MODULE_NOT_FOUND",u}var c=n[o]={exports:{}}
t[o][0].call(c.exports,function(e){var n=t[o][1][e]
return i(n?n:e)},c,c.exports,e,t,n,r)}return n[o].exports}for(var a="function"==typeof require&&require,o=0;o<r.length;o++)i(r[o])
return i}({1:[function(e,t,n){(function(e){"use strict"
function n(){c=!0
for(var e,t,n=d.length;n;){for(t=d,d=[],e=-1;++e<n;)t[e]()
n=d.length}c=!1}function r(e){1!==d.push(e)||c||i()}var i,a=e.MutationObserver||e.WebKitMutationObserver
if(a){var o=0,s=new a(n),l=e.document.createTextNode("")
s.observe(l,{characterData:!0}),i=function(){l.data=o=++o%2}}else if(e.setImmediate||"undefined"==typeof e.MessageChannel)i="document"in e&&"onreadystatechange"in e.document.createElement("script")?function(){var t=e.document.createElement("script")
t.onreadystatechange=function(){n(),t.onreadystatechange=null,t.parentNode.removeChild(t),t=null},e.document.documentElement.appendChild(t)}:function(){setTimeout(n,0)}
else{var u=new e.MessageChannel
u.port1.onmessage=n,i=function(){u.port2.postMessage(0)}}var c,d=[]
t.exports=r}).call(this,"undefined"!=typeof global?global:"undefined"!=typeof self?self:"undefined"!=typeof window?window:{})},{}],2:[function(e,t,n){"use strict"
function r(){}function i(e){if("function"!=typeof e)throw new TypeError("resolver must be a function")
this.state=b,this.queue=[],this.outcome=void 0,e!==r&&l(this,e)}function a(e,t,n){this.promise=e,"function"==typeof t&&(this.onFulfilled=t,this.callFulfilled=this.otherCallFulfilled),"function"==typeof n&&(this.onRejected=n,this.callRejected=this.otherCallRejected)}function o(e,t,n){p(function(){var r
try{r=t(n)}catch(t){return m.reject(e,t)}r===e?m.reject(e,new TypeError("Cannot resolve promise with itself")):m.resolve(e,r)})}function s(e){var t=e&&e.then
return e&&"object"==typeof e&&"function"==typeof t?function(){t.apply(e,arguments)}:void 0}function l(e,t){function n(t){a||(a=!0,m.reject(e,t))}function r(t){a||(a=!0,m.resolve(e,t))}function i(){t(r,n)}var a=!1,o=u(i)
"error"===o.status&&n(o.value)}function u(e,t){var n={}
try{n.value=e(t),n.status="success"}catch(e){n.status="error",n.value=e}return n}function c(e){return e instanceof this?e:m.resolve(new this(r),e)}function d(e){var t=new this(r)
return m.reject(t,e)}function f(e){function t(e,t){function r(e){o[t]=e,++s!==i||a||(a=!0,m.resolve(u,o))}n.resolve(e).then(r,function(e){a||(a=!0,m.reject(u,e))})}var n=this
if("[object Array]"!==Object.prototype.toString.call(e))return this.reject(new TypeError("must be an array"))
var i=e.length,a=!1
if(!i)return this.resolve([])
for(var o=new Array(i),s=0,l=-1,u=new this(r);++l<i;)t(e[l],l)
return u}function h(e){function t(e){n.resolve(e).then(function(e){a||(a=!0,m.resolve(s,e))},function(e){a||(a=!0,m.reject(s,e))})}var n=this
if("[object Array]"!==Object.prototype.toString.call(e))return this.reject(new TypeError("must be an array"))
var i=e.length,a=!1
if(!i)return this.resolve([])
for(var o=-1,s=new this(r);++o<i;)t(e[o])
return s}var p=e(1),m={},g=["REJECTED"],v=["FULFILLED"],b=["PENDING"]
t.exports=n=i,i.prototype.catch=function(e){return this.then(null,e)},i.prototype.then=function(e,t){if("function"!=typeof e&&this.state===v||"function"!=typeof t&&this.state===g)return this
var n=new this.constructor(r)
if(this.state!==b){var i=this.state===v?e:t
o(n,i,this.outcome)}else this.queue.push(new a(n,e,t))
return n},a.prototype.callFulfilled=function(e){m.resolve(this.promise,e)},a.prototype.otherCallFulfilled=function(e){o(this.promise,this.onFulfilled,e)},a.prototype.callRejected=function(e){m.reject(this.promise,e)},a.prototype.otherCallRejected=function(e){o(this.promise,this.onRejected,e)},m.resolve=function(e,t){var n=u(s,t)
if("error"===n.status)return m.reject(e,n.value)
var r=n.value
if(r)l(e,r)
else{e.state=v,e.outcome=t
for(var i=-1,a=e.queue.length;++i<a;)e.queue[i].callFulfilled(t)}return e},m.reject=function(e,t){e.state=g,e.outcome=t
for(var n=-1,r=e.queue.length;++n<r;)e.queue[n].callRejected(t)
return e},n.resolve=c,n.reject=d,n.all=f,n.race=h},{1:1}],3:[function(e,t,n){(function(t){"use strict"
"function"!=typeof t.Promise&&(t.Promise=e(2))}).call(this,"undefined"!=typeof global?global:"undefined"!=typeof self?self:"undefined"!=typeof window?window:{})},{2:2}],4:[function(e,t,n){"use strict"
function r(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}function i(){try{if("undefined"!=typeof indexedDB)return indexedDB
if("undefined"!=typeof webkitIndexedDB)return webkitIndexedDB
if("undefined"!=typeof mozIndexedDB)return mozIndexedDB
if("undefined"!=typeof OIndexedDB)return OIndexedDB
if("undefined"!=typeof msIndexedDB)return msIndexedDB}catch(e){}}function a(){try{if(!oe)return!1
var e="undefined"!=typeof openDatabase&&/(Safari|iPhone|iPad|iPod)/.test(navigator.userAgent)&&!/Chrome/.test(navigator.userAgent)&&!/BlackBerry/.test(navigator.platform),t="function"==typeof fetch&&-1!==fetch.toString().indexOf("[native code")
return(!e||t)&&"undefined"!=typeof indexedDB&&"undefined"!=typeof IDBKeyRange}catch(e){return!1}}function o(){return"function"==typeof openDatabase}function s(){try{return"undefined"!=typeof localStorage&&"setItem"in localStorage&&localStorage.setItem}catch(e){return!1}}function l(e,t){e=e||[],t=t||{}
try{return new Blob(e,t)}catch(a){if("TypeError"!==a.name)throw a
for(var n="undefined"!=typeof BlobBuilder?BlobBuilder:"undefined"!=typeof MSBlobBuilder?MSBlobBuilder:"undefined"!=typeof MozBlobBuilder?MozBlobBuilder:WebKitBlobBuilder,r=new n,i=0;i<e.length;i+=1)r.append(e[i])
return r.getBlob(t.type)}}function u(e,t){t&&e.then(function(e){t(null,e)},function(e){t(e)})}function c(e,t,n){"function"==typeof t&&e.then(t),"function"==typeof n&&e.catch(n)}function d(e){for(var t=e.length,n=new ArrayBuffer(t),r=new Uint8Array(n),i=0;t>i;i++)r[i]=e.charCodeAt(i)
return n}function f(e){return new ue(function(t){var n=e.transaction(ce,"readwrite"),r=l([""])
n.objectStore(ce).put(r,"key"),n.onabort=function(e){e.preventDefault(),e.stopPropagation(),t(!1)},n.oncomplete=function(){var e=navigator.userAgent.match(/Chrome\/(\d+)/),n=navigator.userAgent.match(/Edge\//)
t(n||!e||parseInt(e[1],10)>=43)}}).catch(function(){return!1})}function h(e){return"boolean"==typeof se?ue.resolve(se):f(e).then(function(e){return se=e})}function p(e){var t=le[e.name],n={}
n.promise=new ue(function(e){n.resolve=e}),t.deferredOperations.push(n),t.dbReady?t.dbReady=t.dbReady.then(function(){return n.promise}):t.dbReady=n.promise}function m(e){var t=le[e.name],n=t.deferredOperations.pop()
n&&n.resolve()}function g(e,t){return new ue(function(n,r){if(e.db){if(!t)return n(e.db)
p(e),e.db.close()}var i=[e.name]
t&&i.push(e.version)
var a=oe.open.apply(oe,i)
t&&(a.onupgradeneeded=function(t){var n=a.result
try{n.createObjectStore(e.storeName),t.oldVersion<=1&&n.createObjectStore(ce)}catch(n){if("ConstraintError"!==n.name)throw n
console.warn('The database "'+e.name+'" has been upgraded from version '+t.oldVersion+" to version "+t.newVersion+', but the storage "'+e.storeName+'" already exists.')}}),a.onerror=function(e){e.preventDefault(),r(a.error)},a.onsuccess=function(){n(a.result),m(e)}})}function v(e){return g(e,!1)}function b(e){return g(e,!0)}function y(e,t){if(!e.db)return!0
var n=!e.db.objectStoreNames.contains(e.storeName),r=e.version<e.db.version,i=e.version>e.db.version
if(r&&(e.version!==t&&console.warn('The database "'+e.name+"\" can't be downgraded from version "+e.db.version+" to version "+e.version+"."),e.version=e.db.version),i||n){if(n){var a=e.db.version+1
a>e.version&&(e.version=a)}return!0}return!1}function A(e){return new ue(function(t,n){var r=new FileReader
r.onerror=n,r.onloadend=function(n){var r=btoa(n.target.result||"")
t({__local_forage_encoded_blob:!0,data:r,type:e.type})},r.readAsBinaryString(e)})}function w(e){var t=d(atob(e.data))
return l([t],{type:e.type})}function _(e){return e&&e.__local_forage_encoded_blob}function x(e){var t=this,n=t._initReady().then(function(){var e=le[t._dbInfo.name]
return e&&e.dbReady?e.dbReady:void 0})
return c(n,e,e),n}function S(e){function t(){return ue.resolve()}var n=this,r={db:null}
if(e)for(var i in e)r[i]=e[i]
le||(le={})
var a=le[r.name]
a||(a={forages:[],db:null,dbReady:null,deferredOperations:[]},le[r.name]=a),a.forages.push(n),n._initReady||(n._initReady=n.ready,n.ready=x)
for(var o=[],s=0;s<a.forages.length;s++){var l=a.forages[s]
l!==n&&o.push(l._initReady().catch(t))}var u=a.forages.slice(0)
return ue.all(o).then(function(){return r.db=a.db,v(r)}).then(function(e){return r.db=e,y(r,n._defaultConfig.version)?b(r):e}).then(function(e){r.db=a.db=e,n._dbInfo=r
for(var t=0;t<u.length;t++){var i=u[t]
i!==n&&(i._dbInfo.db=r.db,i._dbInfo.version=r.version)}})}function k(e,t){var n=this
"string"!=typeof e&&(console.warn(e+" used as a key, but it is not a string."),e=String(e))
var r=new ue(function(t,r){n.ready().then(function(){var i=n._dbInfo,a=i.db.transaction(i.storeName,"readonly").objectStore(i.storeName),o=a.get(e)
o.onsuccess=function(){var e=o.result
void 0===e&&(e=null),_(e)&&(e=w(e)),t(e)},o.onerror=function(){r(o.error)}}).catch(r)})
return u(r,t),r}function I(e,t){var n=this,r=new ue(function(t,r){n.ready().then(function(){var i=n._dbInfo,a=i.db.transaction(i.storeName,"readonly").objectStore(i.storeName),o=a.openCursor(),s=1
o.onsuccess=function(){var n=o.result
if(n){var r=n.value
_(r)&&(r=w(r))
var i=e(r,n.key,s++)
void 0!==i?t(i):n.continue()}else t()},o.onerror=function(){r(o.error)}}).catch(r)})
return u(r,t),r}function E(e,t,n){var r=this
"string"!=typeof e&&(console.warn(e+" used as a key, but it is not a string."),e=String(e))
var i=new ue(function(n,i){var a
r.ready().then(function(){return a=r._dbInfo,"[object Blob]"===de.call(t)?h(a.db).then(function(e){return e?t:A(t)}):t}).then(function(t){var r=a.db.transaction(a.storeName,"readwrite"),o=r.objectStore(a.storeName),s=o.put(t,e)
null===t&&(t=void 0),r.oncomplete=function(){void 0===t&&(t=null),n(t)},r.onabort=r.onerror=function(){var e=s.error?s.error:s.transaction.error
i(e)}}).catch(i)})
return u(i,n),i}function C(e,t){var n=this
"string"!=typeof e&&(console.warn(e+" used as a key, but it is not a string."),e=String(e))
var r=new ue(function(t,r){n.ready().then(function(){var i=n._dbInfo,a=i.db.transaction(i.storeName,"readwrite"),o=a.objectStore(i.storeName),s=o.delete(e)
a.oncomplete=function(){t()},a.onerror=function(){r(s.error)},a.onabort=function(){var e=s.error?s.error:s.transaction.error
r(e)}}).catch(r)})
return u(r,t),r}function T(e){var t=this,n=new ue(function(e,n){t.ready().then(function(){var r=t._dbInfo,i=r.db.transaction(r.storeName,"readwrite"),a=i.objectStore(r.storeName),o=a.clear()
i.oncomplete=function(){e()},i.onabort=i.onerror=function(){var e=o.error?o.error:o.transaction.error
n(e)}}).catch(n)})
return u(n,e),n}function z(e){var t=this,n=new ue(function(e,n){t.ready().then(function(){var r=t._dbInfo,i=r.db.transaction(r.storeName,"readonly").objectStore(r.storeName),a=i.count()
a.onsuccess=function(){e(a.result)},a.onerror=function(){n(a.error)}}).catch(n)})
return u(n,e),n}function D(e,t){var n=this,r=new ue(function(t,r){return 0>e?void t(null):void n.ready().then(function(){var i=n._dbInfo,a=i.db.transaction(i.storeName,"readonly").objectStore(i.storeName),o=!1,s=a.openCursor()
s.onsuccess=function(){var n=s.result
return n?void(0===e?t(n.key):o?t(n.key):(o=!0,n.advance(e))):void t(null)},s.onerror=function(){r(s.error)}}).catch(r)})
return u(r,t),r}function L(e){var t=this,n=new ue(function(e,n){t.ready().then(function(){var r=t._dbInfo,i=r.db.transaction(r.storeName,"readonly").objectStore(r.storeName),a=i.openCursor(),o=[]
a.onsuccess=function(){var t=a.result
return t?(o.push(t.key),void t.continue()):void e(o)},a.onerror=function(){n(a.error)}}).catch(n)})
return u(n,e),n}function O(e){var t,n,r,i,a,o=.75*e.length,s=e.length,l=0
"="===e[e.length-1]&&(o--,"="===e[e.length-2]&&o--)
var u=new ArrayBuffer(o),c=new Uint8Array(u)
for(t=0;s>t;t+=4)n=he.indexOf(e[t]),r=he.indexOf(e[t+1]),i=he.indexOf(e[t+2]),a=he.indexOf(e[t+3]),c[l++]=n<<2|r>>4,c[l++]=(15&r)<<4|i>>2,c[l++]=(3&i)<<6|63&a
return u}function R(e){var t,n=new Uint8Array(e),r=""
for(t=0;t<n.length;t+=3)r+=he[n[t]>>2],r+=he[(3&n[t])<<4|n[t+1]>>4],r+=he[(15&n[t+1])<<2|n[t+2]>>6],r+=he[63&n[t+2]]
return n.length%3===2?r=r.substring(0,r.length-1)+"=":n.length%3===1&&(r=r.substring(0,r.length-2)+"=="),r}function P(e,t){var n=""
if(e&&(n=ze.call(e)),e&&("[object ArrayBuffer]"===n||e.buffer&&"[object ArrayBuffer]"===ze.call(e.buffer))){var r,i=ge
e instanceof ArrayBuffer?(r=e,i+=be):(r=e.buffer,"[object Int8Array]"===n?i+=Ae:"[object Uint8Array]"===n?i+=we:"[object Uint8ClampedArray]"===n?i+=_e:"[object Int16Array]"===n?i+=xe:"[object Uint16Array]"===n?i+=ke:"[object Int32Array]"===n?i+=Se:"[object Uint32Array]"===n?i+=Ie:"[object Float32Array]"===n?i+=Ee:"[object Float64Array]"===n?i+=Ce:t(new Error("Failed to get type for BinaryArray"))),t(i+R(r))}else if("[object Blob]"===n){var a=new FileReader
a.onload=function(){var n=pe+e.type+"~"+R(this.result)
t(ge+ye+n)},a.readAsArrayBuffer(e)}else try{t(JSON.stringify(e))}catch(n){console.error("Couldn't convert value into a JSON string: ",e),t(null,n)}}function N(e){if(e.substring(0,ve)!==ge)return JSON.parse(e)
var t,n=e.substring(Te),r=e.substring(ve,Te)
if(r===ye&&me.test(n)){var i=n.match(me)
t=i[1],n=n.substring(i[0].length)}var a=O(n)
switch(r){case be:return a
case ye:return l([a],{type:t})
case Ae:return new Int8Array(a)
case we:return new Uint8Array(a)
case _e:return new Uint8ClampedArray(a)
case xe:return new Int16Array(a)
case ke:return new Uint16Array(a)
case Se:return new Int32Array(a)
case Ie:return new Uint32Array(a)
case Ee:return new Float32Array(a)
case Ce:return new Float64Array(a)
default:throw new Error("Unkown type: "+r)}}function B(e){var t=this,n={db:null}
if(e)for(var r in e)n[r]="string"!=typeof e[r]?e[r].toString():e[r]
var i=new ue(function(e,r){try{n.db=openDatabase(n.name,String(n.version),n.description,n.size)}catch(e){return r(e)}n.db.transaction(function(i){i.executeSql("CREATE TABLE IF NOT EXISTS "+n.storeName+" (id INTEGER PRIMARY KEY, key unique, value)",[],function(){t._dbInfo=n,e()},function(e,t){r(t)})})})
return n.serializer=De,i}function j(e,t){var n=this
"string"!=typeof e&&(console.warn(e+" used as a key, but it is not a string."),e=String(e))
var r=new ue(function(t,r){n.ready().then(function(){var i=n._dbInfo
i.db.transaction(function(n){n.executeSql("SELECT * FROM "+i.storeName+" WHERE key = ? LIMIT 1",[e],function(e,n){var r=n.rows.length?n.rows.item(0).value:null
r&&(r=i.serializer.deserialize(r)),t(r)},function(e,t){r(t)})})}).catch(r)})
return u(r,t),r}function M(e,t){var n=this,r=new ue(function(t,r){n.ready().then(function(){var i=n._dbInfo
i.db.transaction(function(n){n.executeSql("SELECT * FROM "+i.storeName,[],function(n,r){for(var a=r.rows,o=a.length,s=0;o>s;s++){var l=a.item(s),u=l.value
if(u&&(u=i.serializer.deserialize(u)),u=e(u,l.key,s+1),void 0!==u)return void t(u)}t()},function(e,t){r(t)})})}).catch(r)})
return u(r,t),r}function F(e,t,n,r){var i=this
"string"!=typeof e&&(console.warn(e+" used as a key, but it is not a string."),e=String(e))
var a=new ue(function(a,o){i.ready().then(function(){void 0===t&&(t=null)
var s=t,l=i._dbInfo
l.serializer.serialize(t,function(t,u){u?o(u):l.db.transaction(function(n){n.executeSql("INSERT OR REPLACE INTO "+l.storeName+" (key, value) VALUES (?, ?)",[e,t],function(){a(s)},function(e,t){o(t)})},function(t){if(t.code===t.QUOTA_ERR){if(r>0)return void a(F.apply(i,[e,s,n,r-1]))
o(t)}})})}).catch(o)})
return u(a,n),a}function U(e,t,n){return F.apply(this,[e,t,n,1])}function G(e,t){var n=this
"string"!=typeof e&&(console.warn(e+" used as a key, but it is not a string."),e=String(e))
var r=new ue(function(t,r){n.ready().then(function(){var i=n._dbInfo
i.db.transaction(function(n){n.executeSql("DELETE FROM "+i.storeName+" WHERE key = ?",[e],function(){t()},function(e,t){r(t)})})}).catch(r)})
return u(r,t),r}function Z(e){var t=this,n=new ue(function(e,n){t.ready().then(function(){var r=t._dbInfo
r.db.transaction(function(t){t.executeSql("DELETE FROM "+r.storeName,[],function(){e()},function(e,t){n(t)})})}).catch(n)})
return u(n,e),n}function W(e){var t=this,n=new ue(function(e,n){t.ready().then(function(){var r=t._dbInfo
r.db.transaction(function(t){t.executeSql("SELECT COUNT(key) as c FROM "+r.storeName,[],function(t,n){var r=n.rows.item(0).c
e(r)},function(e,t){n(t)})})}).catch(n)})
return u(n,e),n}function H(e,t){var n=this,r=new ue(function(t,r){n.ready().then(function(){var i=n._dbInfo
i.db.transaction(function(n){n.executeSql("SELECT key FROM "+i.storeName+" WHERE id = ? LIMIT 1",[e+1],function(e,n){var r=n.rows.length?n.rows.item(0).key:null
t(r)},function(e,t){r(t)})})}).catch(r)})
return u(r,t),r}function Y(e){var t=this,n=new ue(function(e,n){t.ready().then(function(){var r=t._dbInfo
r.db.transaction(function(t){t.executeSql("SELECT key FROM "+r.storeName,[],function(t,n){for(var r=[],i=0;i<n.rows.length;i++)r.push(n.rows.item(i).key)
e(r)},function(e,t){n(t)})})}).catch(n)})
return u(n,e),n}function q(e){var t=this,n={}
if(e)for(var r in e)n[r]=e[r]
return n.keyPrefix=n.name+"/",n.storeName!==t._defaultConfig.storeName&&(n.keyPrefix+=n.storeName+"/"),t._dbInfo=n,n.serializer=De,ue.resolve()}function V(e){var t=this,n=t.ready().then(function(){for(var e=t._dbInfo.keyPrefix,n=localStorage.length-1;n>=0;n--){var r=localStorage.key(n)
0===r.indexOf(e)&&localStorage.removeItem(r)}})
return u(n,e),n}function Q(e,t){var n=this
"string"!=typeof e&&(console.warn(e+" used as a key, but it is not a string."),e=String(e))
var r=n.ready().then(function(){var t=n._dbInfo,r=localStorage.getItem(t.keyPrefix+e)
return r&&(r=t.serializer.deserialize(r)),r})
return u(r,t),r}function X(e,t){var n=this,r=n.ready().then(function(){for(var t=n._dbInfo,r=t.keyPrefix,i=r.length,a=localStorage.length,o=1,s=0;a>s;s++){var l=localStorage.key(s)
if(0===l.indexOf(r)){var u=localStorage.getItem(l)
if(u&&(u=t.serializer.deserialize(u)),u=e(u,l.substring(i),o++),void 0!==u)return u}}})
return u(r,t),r}function J(e,t){var n=this,r=n.ready().then(function(){var t,r=n._dbInfo
try{t=localStorage.key(e)}catch(e){t=null}return t&&(t=t.substring(r.keyPrefix.length)),t})
return u(r,t),r}function K(e){var t=this,n=t.ready().then(function(){for(var e=t._dbInfo,n=localStorage.length,r=[],i=0;n>i;i++)0===localStorage.key(i).indexOf(e.keyPrefix)&&r.push(localStorage.key(i).substring(e.keyPrefix.length))
return r})
return u(n,e),n}function $(e){var t=this,n=t.keys().then(function(e){return e.length})
return u(n,e),n}function ee(e,t){var n=this
"string"!=typeof e&&(console.warn(e+" used as a key, but it is not a string."),e=String(e))
var r=n.ready().then(function(){var t=n._dbInfo
localStorage.removeItem(t.keyPrefix+e)})
return u(r,t),r}function te(e,t,n){var r=this
"string"!=typeof e&&(console.warn(e+" used as a key, but it is not a string."),e=String(e))
var i=r.ready().then(function(){void 0===t&&(t=null)
var n=t
return new ue(function(i,a){var o=r._dbInfo
o.serializer.serialize(t,function(t,r){if(r)a(r)
else try{localStorage.setItem(o.keyPrefix+e,t),i(n)}catch(e){"QuotaExceededError"!==e.name&&"NS_ERROR_DOM_QUOTA_REACHED"!==e.name||a(e),a(e)}})})})
return u(i,n),i}function ne(e,t){e[t]=function(){var n=arguments
return e.ready().then(function(){return e[t].apply(e,n)})}}function re(){for(var e=1;e<arguments.length;e++){var t=arguments[e]
if(t)for(var n in t)t.hasOwnProperty(n)&&(Fe(t[n])?arguments[0][n]=t[n].slice():arguments[0][n]=t[n])}return arguments[0]}function ie(e){for(var t in Pe)if(Pe.hasOwnProperty(t)&&Pe[t]===e)return!0
return!1}var ae="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(e){return typeof e}:function(e){return e&&"function"==typeof Symbol&&e.constructor===Symbol?"symbol":typeof e},oe=i()
"undefined"==typeof Promise&&e(3)
var se,le,ue=Promise,ce="local-forage-detect-blob-support",de=Object.prototype.toString,fe={_driver:"asyncStorage",_initStorage:S,iterate:I,getItem:k,setItem:E,removeItem:C,clear:T,length:z,key:D,keys:L},he="ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/",pe="~~local_forage_type~",me=/^~~local_forage_type~([^~]+)~/,ge="__lfsc__:",ve=ge.length,be="arbf",ye="blob",Ae="si08",we="ui08",_e="uic8",xe="si16",Se="si32",ke="ur16",Ie="ui32",Ee="fl32",Ce="fl64",Te=ve+be.length,ze=Object.prototype.toString,De={serialize:P,deserialize:N,stringToBuffer:O,bufferToString:R},Le={_driver:"webSQLStorage",_initStorage:B,iterate:M,getItem:j,setItem:U,removeItem:G,clear:Z,length:W,key:H,keys:Y},Oe={_driver:"localStorageWrapper",_initStorage:q,iterate:X,getItem:Q,setItem:te,removeItem:ee,clear:V,length:$,key:J,keys:K},Re={},Pe={INDEXEDDB:"asyncStorage",LOCALSTORAGE:"localStorageWrapper",WEBSQL:"webSQLStorage"},Ne=[Pe.INDEXEDDB,Pe.WEBSQL,Pe.LOCALSTORAGE],Be=["clear","getItem","iterate","key","keys","length","removeItem","setItem"],je={description:"",driver:Ne.slice(),name:"localforage",size:4980736,storeName:"keyvaluepairs",version:1},Me={}
Me[Pe.INDEXEDDB]=a(),Me[Pe.WEBSQL]=o(),Me[Pe.LOCALSTORAGE]=s()
var Fe=Array.isArray||function(e){return"[object Array]"===Object.prototype.toString.call(e)},Ue=function(){function e(t){r(this,e),this.INDEXEDDB=Pe.INDEXEDDB,this.LOCALSTORAGE=Pe.LOCALSTORAGE,this.WEBSQL=Pe.WEBSQL,this._defaultConfig=re({},je),this._config=re({},this._defaultConfig,t),this._driverSet=null,this._initDriver=null,this._ready=!1,this._dbInfo=null,this._wrapLibraryMethodsWithReady(),this.setDriver(this._config.driver).catch(function(){})}return e.prototype.config=function(e){if("object"===("undefined"==typeof e?"undefined":ae(e))){if(this._ready)return new Error("Can't call config() after localforage has been used.")
for(var t in e){if("storeName"===t&&(e[t]=e[t].replace(/\W/g,"_")),"version"===t&&"number"!=typeof e[t])return new Error("Database version must be a number.")
this._config[t]=e[t]}return!("driver"in e&&e.driver)||this.setDriver(this._config.driver)}return"string"==typeof e?this._config[e]:this._config},e.prototype.defineDriver=function(e,t,n){var r=new ue(function(t,n){try{var r=e._driver,i=new Error("Custom driver not compliant; see https://mozilla.github.io/localForage/#definedriver"),a=new Error("Custom driver name already in use: "+e._driver)
if(!e._driver)return void n(i)
if(ie(e._driver))return void n(a)
for(var o=Be.concat("_initStorage"),s=0;s<o.length;s++){var l=o[s]
if(!l||!e[l]||"function"!=typeof e[l])return void n(i)}var u=ue.resolve(!0)
"_support"in e&&(u=e._support&&"function"==typeof e._support?e._support():ue.resolve(!!e._support)),u.then(function(n){Me[r]=n,Re[r]=e,t()},n)}catch(e){n(e)}})
return c(r,t,n),r},e.prototype.driver=function(){return this._driver||null},e.prototype.getDriver=function(e,t,n){var r=this,i=ue.resolve().then(function(){if(!ie(e)){if(Re[e])return Re[e]
throw new Error("Driver not found.")}switch(e){case r.INDEXEDDB:return fe
case r.LOCALSTORAGE:return Oe
case r.WEBSQL:return Le}})
return c(i,t,n),i},e.prototype.getSerializer=function(e){var t=ue.resolve(De)
return c(t,e),t},e.prototype.ready=function(e){var t=this,n=t._driverSet.then(function(){return null===t._ready&&(t._ready=t._initDriver()),t._ready})
return c(n,e,e),n},e.prototype.setDriver=function(e,t,n){function r(){o._config.driver=o.driver()}function i(e){return o._extend(e),r(),o._ready=o._initStorage(o._config),o._ready}function a(e){return function(){function t(){for(;n<e.length;){var a=e[n]
return n++,o._dbInfo=null,o._ready=null,o.getDriver(a).then(i).catch(t)}r()
var s=new Error("No available storage method found.")
return o._driverSet=ue.reject(s),o._driverSet}var n=0
return t()}}var o=this
Fe(e)||(e=[e])
var s=this._getSupportedDrivers(e),l=null!==this._driverSet?this._driverSet.catch(function(){return ue.resolve()}):ue.resolve()
return this._driverSet=l.then(function(){var e=s[0]
return o._dbInfo=null,o._ready=null,o.getDriver(e).then(function(e){o._driver=e._driver,r(),o._wrapLibraryMethodsWithReady(),o._initDriver=a(s)})}).catch(function(){r()
var e=new Error("No available storage method found.")
return o._driverSet=ue.reject(e),o._driverSet}),c(this._driverSet,t,n),this._driverSet},e.prototype.supports=function(e){return!!Me[e]},e.prototype._extend=function(e){re(this,e)},e.prototype._getSupportedDrivers=function(e){for(var t=[],n=0,r=e.length;r>n;n++){var i=e[n]
this.supports(i)&&t.push(i)}return t},e.prototype._wrapLibraryMethodsWithReady=function(){for(var e=0;e<Be.length;e++)ne(this,Be[e])},e.prototype.createInstance=function(t){return new e(t)},e}(),Ge=new Ue
t.exports=Ge},{3:3}]},{},[4])(4)})
var WebVTTParser=function(){this.parse=function(e,t){function n(e,t){u.push({message:e,line:a+1,col:t})}var r=/\r\n|\r|\n/,i=Date.now(),a=0,o=e.split(r),s=!1,l=[],u=[],c=o[a],d=c.length,f="WEBVTT",h=0,p=f.length
for("\ufeff"===c[0]&&(h=1,p+=1),(d<p||c.indexOf(f)!==0+h||d>p&&" "!==c[p]&&"\t"!==c[p])&&n('No valid signature. (File needs to start with "WEBVTT".)'),a++;""!=o[a]&&void 0!=o[a];){if(n("No blank line after the signature."),o[a].indexOf("-->")!=-1){s=!0
break}a++}for(;void 0!=o[a];){for(var m;!s&&""==o[a];)a++
if(!s&&void 0==o[a])break
m={id:"",startTime:0,endTime:0,pauseOnExit:!1,direction:"horizontal",snapToLines:!0,linePosition:"auto",textPosition:50,size:100,alignment:"middle",text:"",tree:null}
var g=!0
if(o[a].indexOf("-->")==-1){if(m.id=o[a],/^NOTE($|[ \t])/.test(m.id)){for(a++;""!=o[a]&&void 0!=o[a];)o[a].indexOf("-->")!=-1&&n("Cannot have timestamp in a comment."),a++
continue}if(a++,""==o[a]||void 0==o[a]){n("Cue identifier cannot be standalone.")
continue}o[a].indexOf("-->")==-1&&(g=!1,n("Cue identifier needs to be followed by timestamp (00:00:00.000)"))}s=!1
var v=new WebVTTCueTimingsAndSettingsParser(o[a],n),b=0
if(l.length>0&&(b=l[l.length-1].startTime),!g||v.parse(m,b)){for(a++;""!=o[a]&&void 0!=o[a];){if(o[a].indexOf("-->")!=-1){n("Blank line missing before cue."),s=!0
break}""!=m.text&&(m.text+="\n"),m.text+=o[a],a++}var y=new WebVTTCueTextParser(m.text,n,t)
m.tree=y.parse(m.startTime,m.endTime),l.push(m)}else for(m=null,a++;""!=o[a]&&void 0!=o[a];){if(o[a].indexOf("-->")!=-1){s=!0
break}a++}}return l.sort(function(e,t){return e.startTime<t.startTime?-1:e.startTime>t.startTime?1:e.endTime>t.endTime?-1:e.endTime<t.endTime?1:0}),{cues:l,errors:u,time:Date.now()-i}}},WebVTTCueTimingsAndSettingsParser=function(e,t){function n(t){for(;void 0!=e[l]&&t.test(e[l]);)l++}function r(t){for(var n="";void 0!=e[l]&&t.test(e[l]);)n+=e[l],l++
return n}function i(){var t,n,i,a,o="minutes"
if(void 0==e[l])return void u("No timestamp found.")
if(!/\d/.test(e[l]))return void u("Timestamp must start with a character in the range 0-9.")
if(t=r(/\d/),(t.length>2||parseInt(t,10)>59)&&(o="hours"),":"!=e[l])return void u("No time unit separator found.")
if(l++,n=r(/\d/),2!=n.length)return void u("Must be exactly two digits.")
if("hours"==o||":"==e[l]){if(":"!=e[l])return void u("No seconds found or minutes is greater than 59.")
if(l++,i=r(/\d/),2!=i.length)return void u("Must be exactly two digits.")}else i=n,n=t,t="0"
return"."!=e[l]?void u('No decimal separator (".") found.'):(l++,a=r(/\d/),3!=a.length?void u("Milliseconds must be given in three digits."):parseInt(n,10)>59?void u("You cannot have more than 59 minutes."):parseInt(i,10)>59?void u("You cannot have more than 59 seconds."):60*parseInt(t,10)*60+60*parseInt(n,10)+parseInt(i,10)+parseInt(a,10)/1e3)}function a(e,t){for(var n=e.split(o),r=[],i=0;i<n.length;i++)if(""!=n[i]){var a=n[i].indexOf(":"),s=n[i].slice(0,a)
if(value=n[i].slice(a+1),r.indexOf(s)!=-1&&u("Duplicate setting."),r.push(s),""==value)return void u("No value for setting defined.")
if("vertical"==s){if("rl"!=value&&"lr"!=value){u("Writing direction can only be set to 'rl' or 'rl'.")
continue}t.direction=value}else if("line"==s){if(!/\d/.test(value)){u("Line position takes a number or percentage.")
continue}if(value.indexOf("-",1)!=-1){u("Line position can only have '-' at the start.")
continue}if(value.indexOf("%")!=-1&&value.indexOf("%")!=value.length-1){u("Line position can only have '%' at the end.")
continue}if("-"==value[0]&&"%"==value[value.length-1]){u("Line position cannot be a negative percentage.")
continue}if("%"==value[value.length-1]){if(parseInt(value,10)>100){u("Line position cannot be >100%.")
continue}t.snapToLines=!1}t.linePosition=parseInt(value,10)}else if("position"==s){if("%"!=value[value.length-1]){u("Text position must be a percentage.")
continue}if(parseInt(value,10)>100){u("Size cannot be >100%.")
continue}t.textPosition=parseInt(value,10)}else if("size"==s){if("%"!=value[value.length-1]){u("Size must be a percentage.")
continue}if(parseInt(value,10)>100){u("Size cannot be >100%.")
continue}t.size=parseInt(value,10)}else if("align"==s){var l=["start","middle","end","left","right"]
if(l.indexOf(value)==-1){u("Alignment can only be set to one of "+l.join(", ")+".")
continue}t.alignment=value}else u("Invalid setting.")}}var o=/[\u0020\t\f]/,s=/[^\u0020\t\f]/,e=e,l=0,u=function(e){t(e,l+1)},c=!0
this.parse=function(t,r){if(n(o),t.startTime=i(),void 0!=t.startTime){if(t.startTime<r&&u("Start timestamp is not greater than or equal to start timestamp of previous cue."),s.test(e[l])&&u("Timestamp not separated from '-->' by whitespace."),n(o),"-"!=e[l])return void u("No valid timestamp separator found.")
if(l++,"-"!=e[l])return void u("No valid timestamp separator found.")
if(l++,">"!=e[l])return void u("No valid timestamp separator found.")
if(l++,s.test(e[l])&&u("'-->' not separated from timestamp by whitespace."),n(o),t.endTime=i(),void 0!=t.endTime)return t.endTime<=t.startTime&&u("End timestamp is not greater than start timestamp."),s.test(e[l])&&(c=!1),n(o),a(e.substring(l),t),!0}},this.parseTimestamp=function(){var t=i()
return void 0!=e[l]?void u("Timestamp must not have trailing characters."):t}},WebVTTCueTextParser=function(e,t,n){function r(){for(var t="data",n="",r="",o=[];void 0!=e[i-1]||0==i;){var s=e[i]
if("data"==t)if("&"==s)r=s,t="escape"
else if("<"==s&&""==n)t="tag"
else{if("<"==s||void 0==s)return["text",n]
n+=s}else if("escape"==t)if("&"==s)a("Incorrect escape."),n+=r,r=s
else if(/[abglmnsprt]/.test(s))r+=s
else if(";"==s)"&amp"==r?n+="&":"&lt"==r?n+="<":"&gt"==r?n+=">":"&lrm"==r?n+="‎":"&rlm"==r?n+="‏":"&nbsp"==r?n+=" ":(a("Incorrect escape."),n+=r+";"),t="data"
else{if("<"==s||void 0==s)return a("Incorrect escape."),n+=r,["text",n]
a("Incorrect escape."),n+=r+s,t="data"}else if("tag"==t)if("\t"==s||"\n"==s||"\f"==s||" "==s)t="start tag annotation"
else if("."==s)t="start tag class"
else if("/"==s)t="end tag"
else if(/\d/.test(s))n=s,t="timestamp tag"
else{if(">"==s||void 0==s)return">"==s&&i++,["start tag","",[],""]
n=s,t="start tag"}else if("start tag"==t)if("\t"==s||"\f"==s||" "==s)t="start tag annotation"
else if("\n"==s)r=s,t="start tag annotation"
else if("."==s)t="start tag class"
else{if(">"==s||void 0==s)return">"==s&&i++,["start tag",n,[],""]
n+=s}else if("start tag class"==t)if("\t"==s||"\f"==s||" "==s)o.push(r),r="",t="start tag annotation"
else if("\n"==s)o.push(r),r=s,t="start tag annotation"
else if("."==s)o.push(r),r=""
else{if(">"==s||void 0==s)return">"==s&&i++,o.push(r),["start tag",n,o,""]
r+=s}else if("start tag annotation"==t){if(">"==s||void 0==s)return">"==s&&i++,r=r.split(/[\u0020\t\f\r\n]+/).filter(function(e){if(e)return!0}).join(" "),["start tag",n,o,r]
r+=s}else if("end tag"==t){if(">"==s||void 0==s)return">"==s&&i++,["end tag",n]
n+=s}else if("timestamp tag"==t){if(">"==s||void 0==s)return">"==s&&i++,["timestamp",n]
n+=s}else a("Never happens.")
i++}}var e=e,i=0,a=function(e){"metadata"!=n&&t(e,i+1)}
this.parse=function(t,o){function s(e){c.children.push({type:"object",name:e[1],classes:e[2],children:[],parent:c}),c=c.children[c.children.length-1]}function l(e){for(var t=c;t;){if(t.name==e)return!0
t=t.parent}}for(var u={children:[]},c=u,d=[];void 0!=e[i];){var f=r()
if("text"==f[0])c.children.push({type:"text",value:f[1],parent:c})
else if("start tag"==f[0]){"chapters"==n&&a("Start tags not allowed in chapter title text.")
var h=f[1]
"v"!=h&&"lang"!=h&&""!=f[3]&&a("Only <v> and <lang> can have an annotation."),"c"==h||"i"==h||"b"==h||"u"==h||"ruby"==h?s(f):"rt"==h&&"ruby"==c.name?s(f):"v"==h?(l("v")&&a("<v> cannot be nested inside itself."),s(f),c.value=f[3],f[3]||a("<v> requires an annotation.")):"lang"==h?(s(f),c.value=f[3]):a("Incorrect start tag.")}else if("end tag"==f[0])"chapters"==n&&a("End tags not allowed in chapter title text."),f[1]==c.name?c=c.parent:"ruby"==f[1]&&"rt"==c.name?c=c.parent.parent:a("Incorrect end tag.")
else if("timestamp"==f[0]){"chapters"==n&&a("Timestamp not allowed in chapter title text.")
var p=new WebVTTCueTimingsAndSettingsParser(f[1],a),m=p.parseTimestamp()
void 0!=m&&((m<=t||m>=o)&&a("Timestamp must be between start timestamp and end timestamp."),d.length>0&&d[d.length-1]>=m&&a("Timestamp must be greater than any previous timestamp."),c.children.push({type:"timestamp",value:m,parent:c}),d.push(m))}}for(;c.parent;)"v"!=c.name&&a("Required end tag missing."),c=c.parent
return u}},WebVTTSerializer=function(){function e(t){for(var n="",r=0;r<t.length;r++){var i=t[r]
if("text"==i.type)n+=i.value
else if("object"==i.type){if(n+="<"+i.name,i.classes)for(var a=0;a<i.classes.length;a++)n+="."+i.classes[a]
i.value&&(n+=" "+i.value),n+=">",i.children&&(n+=e(i.children)),n+="</"+i.name+">"}else n+="<"+i.value+">"}return n}function t(t){return t.startTime+" "+t.endTime+"\n"+e(t.tree.children)+"\n\n"}this.serialize=function(e){for(var n="",r=0;r<e.length;r++)n+=t(e[r])
return n}}
!function(e){e.fn.textareaLinesNumbers=function(t){var n=[],r=e(this).data("textareaLinesNumbers")
if(r&&"string"==typeof t){if(e.inArray(t,n)!==!1)return r[t].apply(r,Array.prototype.slice.call(arguments,1))
throw'Method "'+t+'" does not exist on jQuery.textareaLinesNumbers'}if(!(r||"object"!=typeof t&&t))return t||(t={}),t=e.extend({},e.fn.textareaLinesNumbers.defaults,t),this.each(function(){var n=e(this).data("textareaLinesNumbers")
n||(n=new e.textareaLinesNumbers(e(this),t),n.init(),e(this).data("textareaLinesNumbers",n))})},e.fn.textareaLinesNumbers.defaults={lines:100,trailing:"",resizable:!1,id:null},e.textareaLinesNumbers=function(t,n){this.options=n,t instanceof jQuery?this.$textarea=t:this.$textarea=e(t),this.$main=null,this.$linesContainer=null,this.$availWidth=0,this.init=function(){this.$textarea.closest(".textareaLinesNumbers").length<=0&&this.$textarea.wrap('<div class="textareaLinesNumbers" />'),this.$main=this.$textarea.parent(".textareaLinesNumbers"),this.$main.find(".linesContainer").length<=0&&this.$main.prepend('<textarea class="linesContainer"></textareay>'),this.$linesContainer=this.$main.children(".linesContainer"),null!=this.options.id&&this.$main.attr("id",this.options.id),this.setupLiner(),this.bindEvents(),this.applyResizable(),this.setLine()},this.bindEvents=function(){var t=this.$textarea.data("textareaLinesNumbersEvents")
"boolean"==typeof t&&t===!0||(this.$textarea.on({"input.textareaLinesNumbers":e.proxy(function(){this.setLine()},this),"scroll.textareaLinesNumbers":e.proxy(function(){this.setLine()},this),"blur.textareaLinesNumbers":e.proxy(function(){this.setLine()},this),"focus.textareaLinesNumbers":e.proxy(function(){this.setLine()},this),"resize.textareaLinesNumbers":e.proxy(function(){this.updateSize(),this.setLine()},this)}),this.$textarea.data("textareaLinesNumbersEvents",!0))},this.setupLiner=function(){for(var e="1"+this.options.trailing,t=2;t<=this.options.lines;t++)e+="\n"+t+this.options.trailing
this.$linesContainer.html(e),this.cloneCss(this.$textarea,this.$main,["float","vertical-align","margin-top","margin-bottom","margin-right","margin-left"]),this.$main.css({width:this.$textarea.outerWidth(),height:this.$textarea.outerHeight()}),this.cloneCss(this.$textarea,this.$linesContainer,["font-size","line-height","font-family","vertical-align","padding-top"])
var n=(this.options.lines.toString().length+this.options.trailing.toString().length+1)*this.charWidth(this.$linesContainer.css("font-family"))
this.$linesContainer.css({"padding-top":0+this.toPx(this.$textarea.css("padding-top"))+this.toPx(this.$textarea.css("border-top-width"))-this.toPx(this.$linesContainer.css("border-top-width")),"padding-bottom":0+this.toPx(this.$textarea.css("padding-bottom"))+this.toPx(this.$textarea.css("border-bottom-width"))-this.toPx(this.$linesContainer.css("border-bottom-width")),top:this.$textarea.position().top,left:this.$textarea.position().left,width:n}),this.updateSize(),this.$textarea.css({margin:0,"margin-left":this.$linesContainer.outerWidth(),width:this.$textarea.width()-n}),this.$textarea.attr("wrap","off")},this.applyResizable=function(){this.options.resizable&&jQuery.ui&&this.$textarea.resizable({handles:"se",resize:e.proxy(function(){this.updateSize()},this)})},this.setLine=function(){this.$linesContainer.scrollTop(this.$textarea.scrollTop())},this.updateSize=function(){this.$linesContainer.css({height:this.$textarea.outerHeight()-this.toPx(this.$textarea.css("padding-top"))-this.toPx(this.$textarea.css("padding-bottom"))-this.toPx(this.$textarea.css("border-top-width"))-this.toPx(this.$textarea.css("border-bottom-width"))})},this.cloneCss=function(e,t,n){for(var r=0;r<n.length;r++)t.css(n[r],e.css(n[r]))},this.toPx=function(t){if(t!=t.replace("em","")){var n=parseFloat(t.replace("em","")),r=e('<div style="display:none;font-size:1em;margin:0;padding:0;height:auto;line-height:1;border:0;">&nbsp;</div>').appendTo("body"),i=r.height()
return r.remove(),Math.round(n*i)}return t!=t.replace("px","")?parseInt(t.replace("px","")):parseInt(t)},this.charWidth=function(t){var n=e('<div style="display:none;font-size:1em;font-family:'+t+'margin:0;padding:0;border:0;">0123456789</div>').appendTo("body"),r=n.width()
return n.remove(),Math.floor(r/10)}}}(jQuery),function(e,t){"object"==typeof exports&&"undefined"!=typeof module?module.exports=t():"function"==typeof define&&define.amd?define(t):e.Split=t()}(this,function(){"use strict"
var e=window,t=e.document,n="addEventListener",r="removeEventListener",i="getBoundingClientRect",a=function(){return!1},o=e.attachEvent&&!e[n],s=["","-webkit-","-moz-","-o-"].filter(function(e){var n=t.createElement("div")
return n.style.cssText="width:"+e+"calc(9px)",!!n.style.length}).shift()+"calc",l=function(e){return"string"==typeof e||e instanceof String?t.querySelector(e):e},u=function(u,c){function d(e,t,n){var r=B(A,t,n)
Object.keys(r).forEach(function(t){return e.style[t]=r[t]})}function f(e,t){var n=j(A,t)
Object.keys(n).forEach(function(t){return e.style[t]=n[t]})}function h(e){var t=I[this.a],n=I[this.b],r=t.size+n.size
t.size=e/this.size*r,n.size=r-e/this.size*r,d(t.element,t.size,this.aGutterSize),d(n.element,n.size,this.bGutterSize)}function p(e){var t
if(this.dragging&&(t="touches"in e?e.touches[0][_]-this.start:e[_]-this.start,t<=I[this.a].minSize+O+this.aGutterSize?t=I[this.a].minSize+this.aGutterSize:t>=this.size-(I[this.b].minSize+O+this.bGutterSize)&&(t=this.size-(I[this.b].minSize+this.bGutterSize)),h.call(this,t),c.onDrag)){var n=I[this.a].element,r=I[this.b].element
c.onDrag(R,n,r)}}function m(){var e=I[this.a].element,t=I[this.b].element
this.size=e[i]()[A]+t[i]()[A]+this.aGutterSize+this.bGutterSize,this.start=e[i]()[x]}function g(){var t=this,n=I[t.a].element,i=I[t.b].element
if(t.dragging&&c.onDragEnd){var n=I[this.a].element,i=I[this.b].element
c.onDragEnd(R,n,i)}t.dragging=!1,e[r]("mouseup",t.stop),e[r]("touchend",t.stop),e[r]("touchcancel",t.stop),t.parent[r]("mousemove",t.move),t.parent[r]("touchmove",t.move),delete t.stop,delete t.move,n[r]("selectstart",a),n[r]("dragstart",a),i[r]("selectstart",a),i[r]("dragstart",a),n.style.userSelect="",n.style.webkitUserSelect="",n.style.MozUserSelect="",n.style.pointerEvents="",i.style.userSelect="",i.style.webkitUserSelect="",i.style.MozUserSelect="",i.style.pointerEvents="",t.gutter.style.cursor="",t.parent.style.cursor=""}function v(t){var r=this,i=I[r.a].element,o=I[r.b].element
!r.dragging&&c.onDragStart&&c.onDragStart(R,i,o),t.preventDefault(),r.dragging=!0,r.move=p.bind(r),r.stop=g.bind(r),e[n]("mouseup",r.stop),e[n]("touchend",r.stop),e[n]("touchcancel",r.stop),r.parent[n]("mousemove",r.move),r.parent[n]("touchmove",r.move),i[n]("selectstart",a),i[n]("dragstart",a),o[n]("selectstart",a),o[n]("dragstart",a),i.style.userSelect="none",i.style.webkitUserSelect="none",i.style.MozUserSelect="none",i.style.pointerEvents="none",o.style.userSelect="none",o.style.webkitUserSelect="none",o.style.MozUserSelect="none",o.style.pointerEvents="none",r.gutter.style.cursor=P,r.parent.style.cursor=P,m.call(r)}function b(e){e.forEach(function(t,n){if(n>0){var r=M[n-1],i=I[r.a],a=I[r.b]
i.size=e[n-1],a.size=t,d(i.element,i.size,r.aGutterSize),d(a.element,a.size,r.bGutterSize)}})}function y(e){M.forEach(function(t){e===!0?(t.parent.removeChild(t.gutter),I[t.a].element.style[A]=I[t.a].size+"%"):(t.parent.removeChild(t.gutter),I[t.a].element.style[A]="",I[t.b].element.style[A]="")})}void 0===c&&(c={})
var A,w,_,x,S,k,I,E=l(u[0]).parentNode,C=e.getComputedStyle(E).flexDirection,T=c.sizes||u.map(function(){return 100/u.length}),z=void 0!==c.minSize?c.minSize:100,D=Array.isArray(z)?z:u.map(function(){return z}),L=void 0!==c.gutterSize?c.gutterSize:10,O=void 0!==c.snapOffset?c.snapOffset:30,R=c.direction||"horizontal",P=c.cursor||("horizontal"===R?"ew-resize":"ns-resize"),N=c.gutter||function(e,n){var r=t.createElement("div")
return r.className="gutter gutter-"+n,r},B=c.elementStyle||function(e,t,n){var r={}
return"string"==typeof t||t instanceof String?r[e]=t:o?r[e]=t+"%":r[e]=s+"("+t+"% - "+n+"px)",r},j=c.gutterStyle||function(e,t){return n={},n[e]=t+"px",n
var n}
"horizontal"===R?(A="width",w="clientWidth",_="clientX",x="left",S="paddingLeft",k="paddingRight"):"vertical"===R&&(A="height",w="clientHeight",_="clientY",x="top",S="paddingTop",k="paddingBottom")
var M=[]
return I=u.map(function(e,t){var r,a={element:l(e),size:T[t],minSize:D[t]}
if(t>0&&(r={a:t-1,b:t,dragging:!1,isFirst:1===t,isLast:t===u.length-1,direction:R,parent:E},r.aGutterSize=L,r.bGutterSize=L,r.isFirst&&(r.aGutterSize=L/2),r.isLast&&(r.bGutterSize=L/2),"row-reverse"===C||"column-reverse"===C)){var s=r.a
r.a=r.b,r.b=s}if(!o&&t>0){var c=N(t,R)
f(c,L),c[n]("mousedown",v.bind(r)),c[n]("touchstart",v.bind(r)),E.insertBefore(c,a.element),r.gutter=c}0===t||t===u.length-1?d(a.element,a.size,L/2):d(a.element,a.size,L)
var h=a.element[i]()[A]
return h<a.minSize&&(a.minSize=h),t>0&&M.push(r),a}),o?{setSizes:b,destroy:y}:{setSizes:b,getSizes:function(){return I.map(function(e){return e.size})},collapse:function(e){if(e===M.length){var t=M[e-1]
m.call(t),o||h.call(t,t.size-t.bGutterSize)}else{var n=M[e]
m.call(n),o||h.call(n,n.aGutterSize)}},destroy:y}}
return u}),function(){var e=Handlebars.template,t=Handlebars.templates=Handlebars.templates||{}
t.boilerplate=e({compiler:[7,">= 4.0.0"],main:function(e,t,n,r,i){var a,o,s=null!=t?t:{},l=n.helperMissing,u="function",c=e.escapeExpression
return'<!doctype html>\n<html lang="">\n    <head>\n        <meta charset="utf-8">\n        <meta http-equiv="x-ua-compatible" content="ie=edge">\n        <meta name="description" content="'+c((o=null!=(o=n.description||(null!=t?t.description:t))?o:l,typeof o===u?o.call(s,{name:"description",hash:{},data:i}):o))+'">\n        <meta name="author" content="'+c((o=null!=(o=n.author||(null!=t?t.author:t))?o:l,typeof o===u?o.call(s,{name:"author",hash:{},data:i}):o))+'">\n        <title>'+c((o=null!=(o=n.title||(null!=t?t.title:t))?o:l,typeof o===u?o.call(s,{name:"title",hash:{},data:i}):o))+" - Slide "+c((o=null!=(o=n.index||(null!=t?t.index:t))?o:l,typeof o===u?o.call(s,{name:"index",hash:{},data:i}):o))+'</title>\n        <meta name="viewport" content="width=device-width, initial-scale=1">\n        <script src="https://ft-polyfill-service.herokuapp.com/v2/polyfill.min.js"></script>\n        <style>*,*::after,*::before{-moz-box-sizing:border-box;box-sizing:border-box} html,body{height:100vh;} body{margin:0;overflow:none;} img {object-fit:scale-down;}</style>\n    </head>\n    <body>\n        '+(null!=(o=null!=(o=n.content||(null!=t?t.content:t))?o:l,a=typeof o===u?o.call(s,{name:"content",hash:{},data:i}):o)?a:"")+'\n        <script type="text/javascript">\n        window.addEventListener("load", function load(event){\n            window.removeEventListener("load", load, false);\n            if (parent && parent.pageReady) {\n                parent.pageReady('+c((o=null!=(o=n.index||(null!=t?t.index:t))?o:l,typeof o===u?o.call(s,{name:"index",hash:{},data:i}):o))+");\n            }\n        },false);\n        </script>\n    </body>\n</html>"},useData:!0}),t.imscpmanifest=e({1:function(e,t,n,r,i){var a,o=null!=t?t:{},s=n.helperMissing,l="function",u=e.escapeExpression
return'        <item identifier="I'+u((a=null!=(a=n.identifier||(null!=t?t.identifier:t))?a:s,typeof a===l?a.call(o,{name:"identifier",hash:{},data:i}):a))+'" isvisible="true" identifierref="R'+u((a=null!=(a=n.identifier||(null!=t?t.identifier:t))?a:s,typeof a===l?a.call(o,{name:"identifier",hash:{},data:i}):a))+'">\n         <title>'+u((a=null!=(a=n.title||(null!=t?t.title:t))?a:s,typeof a===l?a.call(o,{name:"title",hash:{},data:i}):a))+"</title>\n        </item>\n"},3:function(e,t,n,r,i){var a,o,s=null!=t?t:{},l=n.helperMissing,u="function",c=e.escapeExpression
return'    <resource identifier="R'+c((o=null!=(o=n.identifier||(null!=t?t.identifier:t))?o:l,typeof o===u?o.call(s,{name:"identifier",hash:{},data:i}):o))+'" type="webcontent" xml:base="'+c((o=null!=(o=n.base||(null!=t?t.base:t))?o:l,typeof o===u?o.call(s,{name:"base",hash:{},data:i}):o))+'" href="'+c((o=null!=(o=n.href||(null!=t?t.href:t))?o:l,typeof o===u?o.call(s,{name:"href",hash:{},data:i}):o))+'">\n'+(null!=(a=n.each.call(s,null!=t?t.files:t,{name:"each",hash:{},fn:e.program(4,i,0),inverse:e.noop,data:i}))?a:"")+"    </resource>\n"},4:function(e,t,n,r,i){var a
return'      <file href="'+e.escapeExpression((a=null!=(a=n.href||(null!=t?t.href:t))?a:n.helperMissing,"function"==typeof a?a.call(null!=t?t:{},{name:"href",hash:{},data:i}):a))+'" />\n'},compiler:[7,">= 4.0.0"],main:function(e,t,n,r,i){var a,o,s=null!=t?t:{},l=n.helperMissing,u="function",c=e.escapeExpression
return'<?xml version="1.0" encoding="UTF-8"?>\n<!-- This package has been created using http://document.scormification.ninja/ -->\n<manifest xmlns="http://www.imsglobal.org/xsd/imscp_v1p1" xmlns:imsmd="http://www.imsglobal.org/xsd/imsmd_v1p2" xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" identifier="MANIFEST-648345a17d5d94d9b6ad419e526bee21" xsi:schemaLocation="http://www.imsglobal.org/xsd/imscp_v1p1 imscp_v1p1.xsd http://www.imsglobal.org/xsd/imsmd_v1p2 imsmd_v1p2p2.xsd">\n  <organizations default="O'+c((o=null!=(o=n.timestamp||(null!=t?t.timestamp:t))?o:l,typeof o===u?o.call(s,{name:"timestamp",hash:{},data:i}):o))+'">\n    <organization identifier="O'+c((o=null!=(o=n.timestamp||(null!=t?t.timestamp:t))?o:l,typeof o===u?o.call(s,{name:"timestamp",hash:{},data:i}):o))+'" structure="hierarchical">\n      <title>'+c((o=null!=(o=n.name||(null!=t?t.name:t))?o:l,typeof o===u?o.call(s,{name:"name",hash:{},data:i}):o))+"</title>\n"+(null!=(a=n.each.call(s,null!=t?t.resources:t,{name:"each",hash:{},fn:e.program(1,i,0),inverse:e.noop,data:i}))?a:"")+"    </organization>\n  </organizations>\n  <resources>\n"+(null!=(a=n.each.call(s,null!=t?t.resources:t,{name:"each",hash:{},fn:e.program(3,i,0),inverse:e.noop,data:i}))?a:"")+"  </resources>\n</manifest>"},useData:!0}),t.marker=e({compiler:[7,">= 4.0.0"],main:function(e,t,n,r,i){var a,o=null!=t?t:{},s=n.helperMissing,l="function",u=e.escapeExpression
return'<div class="marker" data-fileid="'+u((a=null!=(a=n.fileid||(null!=t?t.fileid:t))?a:s,typeof a===l?a.call(o,{name:"fileid",hash:{},data:i}):a))+'" onclick="UI.Dom.Slide.Select(this)">\n\t<div class="index"></div>\n\t<div class="action"><a href=\'javascript:UI.Dom.Slide.Remove("'+u((a=null!=(a=n.fileid||(null!=t?t.fileid:t))?a:s,typeof a===l?a.call(o,{name:"fileid",hash:{},data:i}):a))+'")\' title=\'Remove this slide\'><i class="ninja-cancel"></i></a></div>\n\t<div class="time" data-action="set-marker" data-seconds="'+u((a=null!=(a=n.seconds||(null!=t?t.seconds:t))?a:s,typeof a===l?a.call(o,{name:"seconds",hash:{},data:i}):a))+'">'+u((n.hhmmss||t&&t.hhmmss||s).call(o,null!=t?t.seconds:t,{name:"hhmmss",hash:{},data:i}))+'</div>\n\t<div contenteditable="true" class="caption" placeholder="Enter a caption (optional)">'+u((a=null!=(a=n.caption||(null!=t?t.caption:t))?a:s,typeof a===l?a.call(o,{name:"caption",hash:{},data:i}):a))+"</div>\n</div>"},useData:!0}),t.nonemanifest=e({1:function(e,t,n,r,i){var a
return'      <file href="'+e.escapeExpression((a=null!=(a=n.href||(null!=t?t.href:t))?a:n.helperMissing,"function"==typeof a?a.call(null!=t?t:{},{name:"href",hash:{},data:i}):a))+'" />\n'},compiler:[7,">= 4.0.0"],main:function(e,t,n,r,i){var a,o,s=null!=t?t:{},l=n.helperMissing,u="function",c=e.escapeExpression
return'<?xml version="1.0" standalone="no"?>\n<manifest>\n  <organizations default="O'+c((o=null!=(o=n.timestamp||(null!=t?t.timestamp:t))?o:l,typeof o===u?o.call(s,{name:"timestamp",hash:{},data:i}):o))+'">\n    <organization identifier="O'+c((o=null!=(o=n.timestamp||(null!=t?t.timestamp:t))?o:l,typeof o===u?o.call(s,{name:"timestamp",hash:{},data:i}):o))+'">\n      <title>'+c((o=null!=(o=n.name||(null!=t?t.name:t))?o:l,typeof o===u?o.call(s,{name:"name",hash:{},data:i}):o))+'</title>\n      <item identifier="I'+c((o=null!=(o=n.timestamp||(null!=t?t.timestamp:t))?o:l,typeof o===u?o.call(s,{name:"timestamp",hash:{},data:i}):o))+'" identifierref="R'+c((o=null!=(o=n.timestamp||(null!=t?t.timestamp:t))?o:l,typeof o===u?o.call(s,{name:"timestamp",hash:{},data:i}):o))+'">\n        <title>'+c((o=null!=(o=n.name||(null!=t?t.name:t))?o:l,typeof o===u?o.call(s,{name:"name",hash:{},data:i}):o))+'</title>\n      </item>\n    </organization>\n  </organizations>\n  <resources>\n    <resource identifier="R'+c((o=null!=(o=n.timestamp||(null!=t?t.timestamp:t))?o:l,typeof o===u?o.call(s,{name:"timestamp",hash:{},data:i}):o))+'" type="webcontent" adlcp:scormtype="sco" href="index.html">\n'+(null!=(a=n.each.call(s,null!=t?t.files:t,{name:"each",hash:{},fn:e.program(1,i,0),inverse:e.noop,data:i}))?a:"")+"    </resource>\n  </resources>\n</manifest>"},useData:!0}),t.playercss=e({1:function(e,t,n,r,i){var a,o=null!=t?t:{},s=n.helperMissing,l="function",u=e.escapeExpression
return"\twidth: "+u((a=null!=(a=n.width||(null!=t?t.width:t))?a:s,typeof a===l?a.call(o,{name:"width",hash:{},data:i}):a))+"px;\n\theight: "+u((a=null!=(a=n.height||(null!=t?t.height:t))?a:s,typeof a===l?a.call(o,{name:"height",hash:{},data:i}):a))+"px;\n\tmin-height: "+u((a=null!=(a=n.height||(null!=t?t.height:t))?a:s,typeof a===l?a.call(o,{name:"height",hash:{},data:i}):a))+"px;\n\tmargin: 0 auto;\n}\n\n.slide-split-wrapper .slides {\n\tmax-height: "+u((a=null!=(a=n.height||(null!=t?t.height:t))?a:s,typeof a===l?a.call(o,{name:"height",hash:{},data:i}):a))+"px;\n"},3:function(e,t,n,r,i){return"\tpadding-top: 56.25%;\n\t"},5:function(e,t,n,r,i){var a
return null!=(a=(n.compare||t&&t.compare||n.helperMissing).call(null!=t?t:{},null!=t?t.aspectRatio:t,"4:3",{name:"compare",hash:{},fn:e.program(6,i,0),inverse:e.noop,data:i}))?a:""},6:function(e,t,n,r,i){return"\n\tpadding-top: 75%;\n\t"},compiler:[7,">= 4.0.0"],main:function(e,t,n,r,i){var a,o,s=null!=t?t:{},l=n.helperMissing,u="function",c=e.escapeExpression
return"html, body, .slide-split-wrapper {\n\tmargin: 0;\n\tmin-height: 100vh;\n}\n\nbody {\n\tbackground-color: "+c((o=null!=(o=n["body-bg-colour"]||(null!=t?t["body-bg-colour"]:t))?o:l,typeof o===u?o.call(s,{name:"body-bg-colour",hash:{},data:i}):o))+";\n\tcolor: "+c((o=null!=(o=n["body-text-colour"]||(null!=t?t["body-text-colour"]:t))?o:l,typeof o===u?o.call(s,{name:"body-text-colour",hash:{},data:i}):o))+";\n\toverflow: hidden;\n\tmargin: 0;\n\tfont-family: sans-serif;\n\tfont-size: 16px;\n}\n\n.slide-split-wrapper {\n\tposition: relative;\n"+(null!=(a=(n.compare||t&&t.compare||l).call(s,null!=t?t.size:t,"fixed",{name:"compare",hash:{},fn:e.program(1,i,0),inverse:e.noop,data:i}))?a:"")+'}\n\n.slide-split-wrapper:-webkit-full-screen {\n\twidth: 100%; height: 100%;\n}\n\n.slide-split-wrapper .header,\n.slide-split-wrapper .audio-player {\n\tdisplay: flex;\n\tz-index: 1;\n\tposition: absolute;\n\tleft:10px;\n\twidth:calc(100% - 20px);\n\topacity: 0;\n\ttransition: opacity .2s ease;\n}\n\nbody:hover .slide-split-wrapper .audio-player,\nbody:hover .slide-split-wrapper .header {\n\topacity: 1;\n}\n\n\n/* ------------------------------------------------\n\tThe page header\n   ------------------------------------------------ */\n\n@font-face {\n  font-family: \'presninja\';\n    src: url(data:application/font-woff2;charset=utf-8;base64,d09GMgABAAAAAAYcABEAAAAADFQAAAW5AAEAAAAAAAAAAAAAAAAAAAAAAAAAAAAAP0ZGVE0cGh4GYACCbggGCYRlEQgKhnSFXgE2AiQDJgsaAAQgBYM9B4EIDC4/d2ViZgYbcQrIDiURSoggoqgGQFDUGtmzu3f3hKwgwChMFBDryKhHF0T3QDLAQiV1/7+u9vexZNYlyAsPT8ZXTGY9wUcyqxpUcg41FI11e4OIB5WikQq+ydVYqy/aHYk3ndAgVFq63de9vcPcEv+J6KUQkphGWmA+hMoDtgnefv2LAAGM/r31K8DY+vsv3PIHs7nPiQHSADAIEY1wsZeA9f/rGhzOa+LuAcrD/dgxCJoE0ApTAhzUDflpD46FxwC7ipNziCEXxIw1TU4+7UcW+5P5LAaIIwKDjyhY9s8P/Vz00x6GbQF8fM3JQPj5Y2S6JfV78gwQ4uZ0Chbkg6xozMrWqPG/waF9b7YXj0hIYgM2emSsn1YQWEka+qJcpKQ/tk2hr5Ek2tKsKIl+xCjRikZqaJOrmCIQB1ipL41it0cWrD7Fik5qdojAhM3yF/6Twte5Vv6X/6PwTEBPlLF6WsmUGvR1uCdFb15jRV8yisi5kUfTg5vX8UgX7YFklCTdpUdHSAnxNM9uxUiJbhuA7uCTKNpldYyiW16P4Fmvq7qXeuNzeUFQeD3maMPBdNTMWuP4OKG39miJvlxKMgZeYMdAXCdTWsOqvf1UpgFfc6yjYkcF+liqF9To1V6mF+jFQynWcSmWsrA2TNRhqRqB+hw3yuyit2mFAk/f6lsADQbrKNI5LxaqDMZLjL4d+FBG5YZ2XkApsr6YkXVML6b6Akt5K0dZdOqsmHAE1gSVOHn00iWB0p0ko1M2rQLp2mSJzlyd3bJD6wNMD7DAIxfyN3KvTZFOU6rS8nLScCEO/NhYsWyNDIeslJmPIqycpy1KKnBJd5t8CihU7Co/RSiBqUj9mK4uGKc2VcKcWoZYJ1qBoDAkHni13AgZAKQCcB9QAWjHO+AN8xAg3epYqVbrnNAZgHK0q0hMijwYq/miw2MEP1rT08nFrNmsdsRyq4Nat9od7I7h4tf2dAW6wNHhGVor1hsqt/q3aN1dULQpXRmeFrprvPvdu+iLo52dcPqbN+wc6Xj9OurCWFcX8dK3b9ftfFP0aDTy4njJuq5rb/XXhQ9HtM7EiCfj5PhYcQZF0L2zgVtDzcmfKo6aR22ghVtODx4rAYCmjMCPQGJ55X0nXrIqUmDnSmaTxzvTdsPp050eBTuOgoXlFgi9wWNYgOLqFG9nRuXt3F4zV6G1zNVs2mS2VFQ8NvUVMQl7q5nbVHrQ1Y35Yt8RrU/MzzdLNVOAkCapcUfEvsKdXWokG8SU/GoP8gBAv6C+8FQwX39c/T43E3jtvDoMm2XzegYCi/knssRDETs6N8pEzmUfQPoi7MjbvhDTuC7OcKQaA9MIJ9XgcFYDDjm3azQNrsRS9NwsN9aZWOLCRXZsdWOciRYX6VtW0bIytDLOmDMSU0zDQ8Tg0SvjE876MVlLXAVLU/PAWGSLTzhN0qIIHvqK3tlMcfnZwLeNsYW/RuSHAR/X+RAei4DgGPAR09SGD2LDeqBmmgj5LwCB+Q2VAJgHD0mV/V67TMfkaC+dxLDsq8XmqeG0LLMcGxPhZc+r7PjTVgEfXqeaHZnhcT4iC0KQi3wmTTYIA+Tnt+T0OAiPNGDCx9ApomiBAvGWFBgR73DAPvGeGIatHxwvfmUyhCx4cXR0XJ0Y7hvu99I2tWdq0DtOu1VfcGR4cgfYwHx+FyrjTNDHCMNQcIINHLCD6jhNsv09qAzXIC/WqgQgrw8NCnX4qcnEerU26MZmH8FW0X5md9DLFBQqZfbncKbdmwf54HYlcFbqMy5wgBNyIIBKEC9TDDLJKCo9MZpg10/MqLadMZL6QOrbqwz+nawJP44BGVk5rDz5ChShSEUp2t83qI32Op0RrtADw30OTTndLFdWdUVuVZ7DYXf6y5wVzkpH1RNd1RfI/6f7yGEa+sI8skHIlQ1G9Rd1NCYoDZjU5vUeUxai/yU6QsEkEchGd+pfAA==) format(\'woff2\'),\n         url(data:application/font-woff;charset=utf-8;base64,d09GRgABAAAAAAhkABEAAAAADFQAAQAAAAAAAAAAAAAAAAAAAAAAAAAAAABGRlRNAAABgAAAABwAAAAcgqAlP0dERUYAAAGcAAAAHAAAAB4AJwAST1MvMgAAAbgAAABAAAAAYBwaEzxjbWFwAAAB+AAAAGEAAAFulrFVGWN2dCAAAAJcAAAABgAAAAYFEQBEZnBnbQAAAmQAAAGxAAACZVO0L6dnYXNwAAAEGAAAAAgAAAAIAAAAEGdseWYAAAQgAAACAgAAA3SEUGJoaGVhZAAABiQAAAAzAAAANhPk3EZoaGVhAAAGWAAAABwAAAAkD4IHYGhtdHgAAAZ0AAAAIwAAACYWfgLEbG9jYQAABpgAAAAaAAAAGgQ6Ax5tYXhwAAAGtAAAACAAAAAgASgAo25hbWUAAAbUAAABBAAAAb07CR5/cG9zdAAAB9gAAABTAAAAiFqsWrpwcmVwAAAILAAAAC4AAAAusPIrFHdlYmYAAAhcAAAABgAAAAYX+1ozAAAAAQAAAADV7pT1AAAAANZYx9EAAAAA1ljIeHjaY2BkYGDgAWIxIGZiYARCbiBmAfMYAAQXADp42mNgZvvLOIGBlYGF1Yh1BgMDoxyEZr7GkMYkxIAKGAXQBBgcGBhf6bM3/G9gYGBvYFgBUoMkq8DACAD5swl9eNpjYGBgZoBgGQZGBhDIAPIYwXwWBh8gzcfAwcDEwAYUU1D985Lxldwr/f//wSpBfIZXMhD+/ye3OMXZRN+I3gGq5GNABowg8xnZgJgZKsAEJJgYGNBUAS0c3gAAKB0SqQAAAAAAAEQFEQAAeNpdUbtOW0EQ3Q0PA4HE2CA52hSzmZDGe6EFCcTVjWJkO4XlCGk3cpGLcQEfQIFEDdqvGaChpEibBiEXSHxCPiESM2uIojQ7O7NzzpkzS8qRqnfpa89T5ySQwt0GzTb9Tki1swD3pOvrjYy0gwdabGb0ynX7/gsGm9GUO2oA5T1vKQ8ZTTuBWrSn/tH8Cob7/B/zOxi0NNP01DoJ6SEE5ptxS4PvGc26yw/6gtXhYjAwpJim4i4/plL+tzTnasuwtZHRvIMzEfnJNEBTa20Emv7UIdXzcRRLkMumsTaYmLL+JBPBhcl0VVO1zPjawV2ys+hggyrNgQfYw1Z5DB4ODyYU0rckyiwNEfZiq8QIEZMcCjnl3Mn+pED5SBLGvElKO+OGtQbGkdfAoDZPs/88m01tbx3C+FkcwXe/GUs6+MiG2hgRYjtiKYAJREJGVfmGGs+9LAbkUvvPQJSA5fGPf50ItO7YRDyXtXUOMVYIen7b3PLLirtWuc6LQndvqmqo0inN+17OvscDnh4Lw0FjwZvP+/5Kgfo8LK40aA4EQ3o3ev+iteqIq7wXPrIn07+xWgAAAAABAAH//wAPeNqVUT1vE0EQfXOfNhJWLnI4KUgGOzE+2ZYvvrNjYSzSXKRIiSBNmlQuKJBrfsD9DEoqNzR7xrTUFL4rqfgLNHRYYJj1nm0QNOxqb3bezHvzdAsNEaC9MG+gw0YnIfijmW3QlyCxzM+jma7xFYkuYVPCM9vSvo9mJPHQqTr1qlONtIerY3q9emneLN9GRgqA8Nvq/n9uAD/jAuwYFu6ijPtA3yXXqbpFsquOXaSB3Dy8QbznNJ2uMF3dctRkNK6mNJ2vbhnlXF17c1U1vnKyRr/J1hxVPXL8P2YfqDGOGqoskK4MbbnbiSY2Nua5sTivGZuBy6uNB22eGwBRjNjizZZRdzg1OccP6UnjHxTb4Jp8pxYEfGGEglJhBvwlUfAFPgk9FfpeYlBL2GlSpBZOunV+JLkJWiwPKy4hD8/baVbWiiwntYytVpqYWxFi1posl870NwWYYzQwxDNcQ9R8cRiKTirOAnHpi34oSqmwAhLP13JeKry95JytldPkmlrJuefsv7dKh7XgybH7GMllx9l/h3LlDmcnXad3OnhKYXDvAanoVuigbNklOqo98knFRocGZVkJg9Mz4qwmG0wFMK3fky1HjF5EkRiPRbRYqBhd/I18aDe9yXA48bLMm7yaeM22/jFTSLO9qelxzs6yncYfed6+WOSkxY4sb/gFZLvd+wAAeNpjYGRgYADiuQezX8fz23xlkOdgAIFrEccvQugTFQwM/xs4GNgbgFwOBiaQKABd6wvJAHjaY2BkYGBv+B/BwMDBAAJAkpEBFbADADoJAfh42mN6w+DCAARMqxjAgAWImV8wMHCAeYwNjAyMQBoAU1ADWQAAAAAsADQANAA8AEQATACKAMYA1AD+ARwBugAAAAEAAAAMAE8ABAAAAAAAAgABAAIAFgAAAQAAUAAAAAB42k2Ou07DQBBFT2ITCQokGiSgwBJ9lEAQSmgRUgoaQKS2w8YYWZtgJwVVKj6JL6DhUUHH33CzXiLb2pkzd+6MBtjhhwarrx6bLlccOKo4ZG/NLeV9dRvhpijkwHNTvUPPQY1D/f+8wS5Hnlua6Hveose553d5pp4/6PDi+ZNtXj1/id8q/g10zfdyVpjSZvYxjq5NusjjIhqZZDK18yVtqneHoaAk03pLRFdqR/qlq+dSUjmsc8WqDffSEp4Vh4zlutJbeduM1E2YrCerXbc8sFB1oe7YqT0X+ww4UR5w6pRjebucab/RjlgzubbMVKWqStVl7aobnqRkuqqQI/8DFo04v3jaY2BiwA94GBgYmRiZGVkYmBlZGdkY2Rk5GDkZuRi52dJzKgsyDCGUEXtpXqaBgYEhiDYydXMG0a6WBgZQGizu6mjoDKVdoLQrhDZyAwCxcRcJALgB/4WwAY0AS7AIUFixAQGOWbFGBitYIbAQWUuwFFJYIbCAWR2wBitcWFmwFCsAAAABWjMX+gAA) format(\'woff\');\n  font-weight: normal;\n  font-style: normal;\n}\n\n[class^="pn-"], [class*=" pn-"] {\n  font-family: \'presninja\' !important;\n  speak: none;\n  font-style: normal;\n  font-weight: normal;\n  font-variant: normal;\n  text-transform: none;\n  line-height: 1;\n\n  /* Better Font Rendering for webfonts =========== */\n  -webkit-font-smoothing: antialiased;\n  -moz-osx-font-smoothing: grayscale;\n}\n\n.pn-play:before {\n  content: "\\ea1c";\n}\n.pn-pause:before {\n  content: "\\ea1d";\n}\n.pn-stop:before {\n  content: "\\ea1e";\n}\n.pn-seek:before {\n  content: "\\ea2f";\n}\n.pn-shrink:before {\n  content: "\\e900";\n}\n.pn-expand:before {\n  content: "\\e901";\n}\n\n/* ------------------------------------------------\n\tThe page header\n   ------------------------------------------------ */\n\n.slide-split-wrapper .header {\n\ttop: 10px;\n\tflex-direction: row;\n\tjustify-content: space-between;\n}\n.header > h1 {\n\tmargin: 0; padding: 2px;\n\tfont-size: 24px;\n\tfont-weight: normal;\n\ttext-shadow: 1px 1px 1px rgba(0,0,0,.5);\n}\n.header > .powered-by span {\n\topacity: 0;\n\ttransition: opacity .3s;\n}\n.header > .powered-by img {\n\tvertical-align: bottom;\n\tmargin-right: .3em;\n}\n.header > .powered-by {\n\tfont-size: 10px;\n\tpadding: 2px;\n\topacity: 0.5;\n\ttransform: translateX(110px);\n\ttransition: opacity .3s, transform .3s ease;\n}\n.header > .powered-by:hover {\n\ttransform: translateX(0);\n\topacity: 1;\n}\n.header > .powered-by:hover span {\n\topacity: 1;\n}\n.header > .powered-by a {\n\tcolor: inherit;\n}\n\n\n/* ------------------------------------------------\n\tThe audio player and ranges\n   ------------------------------------------------ */\n\n.audio-player {\n\tbottom: 10px;\n\tbackground-color: '+c((o=null!=(o=n["bg-colour"]||(null!=t?t["bg-colour"]:t))?o:l,typeof o===u?o.call(s,{name:"bg-colour",hash:{},data:i}):o))+";\n\tborder-radius: 3px;\n\tfont-size: 12px;\n\tfont-family: sans-serif;\n\tcolor: "+c((o=null!=(o=n["text-colour"]||(null!=t?t["text-colour"]:t))?o:l,typeof o===u?o.call(s,{name:"text-colour",hash:{},data:i}):o))+";\n\ttext-shadow: none;\n\tbox-shadow: 0 0 1px rgba(0,0,0,.25);\n}\n.audio-player .cue-control,\n.audio-player .fullscreen-control {\n\theight: 40px;\n\twidth: 40px;\n\tdisplay: flex;\n\tfont-weight: bold;\n\tfont-size: 2em;\n}\n.audio-player .cue-control {\n\tfont-size: 1.7em;\n}\n.audio-player button {\n\twidth: 100%;\n\tbackground: none;\n\tborder: none;\n\toutline: none;\n\tfont-size: inherit;\n\tcolor: "+c((o=null!=(o=n["text-colour"]||(null!=t?t["text-colour"]:t))?o:l,typeof o===u?o.call(s,{name:"text-colour",hash:{},data:i}):o))+";\n}\n.audio-player .time-info {\n\twhite-space: nowrap;\n}\n.audio-player .cue-ranges {\n\tflex: 1;\n}\n.audio-player .cue-ranges .split {\n\theight: 8px;\n\tmargin: 8px 0 0;\n}\n.audio-player .cue-ranges .split > div[data-cue]:first-of-type {\n\tborder-radius: 4px 0 0 4px;\n}\n.audio-player .cue-ranges .split > div[data-cue]:last-of-type {\n\tborder-radius: 0 4px 4px 0;\n\tborder-right-width: 0;\n}\n.audio-player .cue-ranges .split > div[data-cue] {\n\theight: 100%;\n\tfloat: left;\n\tposition: relative;\n\tbackground-color: "+c((n.rgba||t&&t.rgba||l).call(s,null!=t?t["range-colour"]:t,".5",{name:"rgba",hash:{},data:i}))+";\n\tborder-right: 1px solid "+c((o=null!=(o=n["bg-colour"]||(null!=t?t["bg-colour"]:t))?o:l,typeof o===u?o.call(s,{name:"bg-colour",hash:{},data:i}):o))+";\n\tposition: relative;\n}\n.audio-player .cue-ranges .split > div[data-cue].current > span {\n\tdisplay: block;\n\tposition: absolute;\n\ttop: 0; left: 0;\n\tbottom: 0; right: 0;\n\tbackground-color: "+c((o=null!=(o=n["range-colour"]||(null!=t?t["range-colour"]:t))?o:l,typeof o===u?o.call(s,{name:"range-colour",hash:{},data:i}):o))+";\n}\n\n.audio-player .cue-ranges .scrub {\n\tposition: relative;\n}\n.audio-player .cue-ranges .scrub:after,\n.audio-player .cue-ranges .split:after {\n\tcontent: '';\n\tdisplay: table;\n\tclear: both;\n}\n.audio-player .cue-ranges .scrub input[type='range'] {\n\tposition: absolute;\n}\n.audio-player .cue-ranges .scrub .precache,\n.audio-player .cue-ranges .scrub .played {\n\tposition:  absolute;\n\ttop: 8px;\n\twidth: 0;\n\theight: 8px;\n\tbackground-color: "+c((o=null!=(o=n["range-colour"]||(null!=t?t["range-colour"]:t))?o:l,typeof o===u?o.call(s,{name:"range-colour",hash:{},data:i}):o))+";\n\tborder-radius: 8px 0 0 8px;\n}\n.audio-player .cue-ranges .scrub .precache {\n\tbackground-color: "+c((n.rgba||t&&t.rgba||l).call(s,null!=t?t["range-colour"]:t,".25",{name:"rgba",hash:{},data:i}))+";\n\tborder-radius: 8px;\n}\n\n.audio-player .audio-control {\n\twidth:  80px;\n}\n.audio-player .audio-control input[type='range'] {\n\tmargin-top: 13px;\n}\n\n.audio-player .time-info {\n\tdisplay: flex;\n\talign-items: center;\n}\n.audio-player .time-info .time-separator {\n\tpadding: 0 .3em;\n}\n\n\n\n/* ------------------------------------------------\n\tA tooltip that appears above the range selection\n   ------------------------------------------------ */\n\n.audio-player .cue-ranges div[data-cue]:hover:after {\n\tposition: absolute;\n\tbottom: 16px;\n\tleft: calc(50% - 11px);\n\tmin-width: 20px;\n\tdisplay: inline-block;\n\ttext-align: center;\n\tbackground-color: "+c((o=null!=(o=n["bg-colour"]||(null!=t?t["bg-colour"]:t))?o:l,typeof o===u?o.call(s,{name:"bg-colour",hash:{},data:i}):o))+";\n\tcolor: "+c((o=null!=(o=n["text-colour"]||(null!=t?t["text-colour"]:t))?o:l,typeof o===u?o.call(s,{name:"text-colour",hash:{},data:i}):o))+";\n\tfont-size: 12px;\n\tpadding: 4px;\n\tborder-radius: 3px;\n\tcontent: attr(data-title);\n\twhite-space: nowrap;\n\tbox-shadow: 1px 1px 1px rgba(0,0,0,.5);\n}\n\n\n\n/* ------------------------------------------------\n\tPresentation iframe and page number animation\n   ------------------------------------------------ */\n\n.slide-split-wrapper .slides {\n\twidth: 100%;\n\tdisplay: block;\n\tposition: relative;\n\tmax-height: 100vh;\n}\n.slide-split-wrapper .slides::after {\n\tcontent:'';\n\tdisplay:block;\n"+(null!=(a=(n.compare||t&&t.compare||l).call(s,null!=t?t.aspectRatio:t,"16:9",{name:"compare",hash:{},fn:e.program(3,i,0),inverse:e.program(5,i,0),data:i}))?a:"")+"\n}\n.slide-split-wrapper .slides > iframe {\n\tposition: absolute;\n\ttop: 0;\n\tleft: 0;\n\tright: 0;\n\tbottom: 0;\n\tbackground-color: "+c((o=null!=(o=n["body-bg-colour"]||(null!=t?t["body-bg-colour"]:t))?o:l,typeof o===u?o.call(s,{name:"body-bg-colour",hash:{},data:i}):o))+";\n\twidth: 100%;\n\theight: 100%;\n\tborder: none;\n}\n.slide-split-wrapper .slides > output {\n\tfont-size: 28px;\n\tfont-family: Roboto, Arial, sans-serif;\n\tcolor: rgba(255,255,255,.5);\n\ttext-shadow: 1px 1px 0 rgba(0,0,0,.25);\n\ttransform: scale(1);\n\tpointer-events: none;\n\tposition: absolute;\n\ttop: 24px; right: 24px;\n\topacity: 0;\n}\n.slide-split-wrapper .slides > output.puff {\n\tanimation: ninja-puff .8s linear;\n}\n\n@keyframes ninja-puff {\n\t0% {\n\t\topacity: 0;\n\t\ttransform: scale(1);\n\t}\n\t50% {\n\t\topacity: 1;\n\t\ttransform: scale(2);\n\t}\n\t100% {\n\t\topacity: 0;\n\t\ttransform: scale(3);\n\t}\n}\n\n\n\n/* ------------------------------------------------\n\tRange Input slider\n   ------------------------------------------------ */\n\ninput[type=range].ninja-range {\n  -webkit-appearance: none;\n  width: 100%;\n  margin: 4px 0;\n  height: 16px;\n  background:transparent;\n}\ninput[type=range].ninja-range:focus {\n  outline: none;\n}\ninput[type=range].ninja-range::-webkit-slider-runnable-track {\n  width: 100%;\n  height: 8px;\n  cursor: pointer;\n  box-shadow: none;\n  background: "+c((n.rgba||t&&t.rgba||l).call(s,null!=t?t["range-colour"]:t,".25",{name:"rgba",hash:{},data:i}))+";\n  border-radius: 8px;\n  border: 0px solid #000000;\n}\ninput[type=range].ninja-range::-webkit-slider-thumb {\n  box-shadow: none;\n  border: 2px solid "+c((o=null!=(o=n["bg-colour"]||(null!=t?t["bg-colour"]:t))?o:l,typeof o===u?o.call(s,{name:"bg-colour",hash:{},data:i}):o))+";\n  height: 16px;\n  width: 16px;\n  border-radius: 16px;\n  background: "+c((o=null!=(o=n["range-colour"]||(null!=t?t["range-colour"]:t))?o:l,typeof o===u?o.call(s,{name:"range-colour",hash:{},data:i}):o))+";\n  cursor: pointer;\n  -webkit-appearance: none;\n  margin-top: -4px;\n}\ninput[type=range].ninja-range:focus::-webkit-slider-runnable-track {\n  background: "+c((n.rgba||t&&t.rgba||l).call(s,null!=t?t["range-colour"]:t,".25",{name:"rgba",hash:{},data:i}))+";\n}\ninput[type=range].ninja-range::-moz-range-track {\n  width: 100%;\n  height: 8px;\n  cursor: pointer;\n  box-shadow: none;\n  background: "+c((n.rgba||t&&t.rgba||l).call(s,null!=t?t["range-colour"]:t,".25",{name:"rgba",hash:{},data:i}))+";\n  border-radius: 8px;\n  border: 0px solid #000000;\n}\ninput[type=range].ninja-range::-moz-range-thumb {\n  box-shadow: none;\n  border: 2px solid "+c((o=null!=(o=n["bg-colour"]||(null!=t?t["bg-colour"]:t))?o:l,typeof o===u?o.call(s,{name:"bg-colour",hash:{},data:i}):o))+";\n  height: 16px;\n  width: 16px;\n  border-radius: 16px;\n  background: "+c((o=null!=(o=n["range-colour"]||(null!=t?t["range-colour"]:t))?o:l,typeof o===u?o.call(s,{name:"range-colour",hash:{},data:i}):o))+";\n  cursor: pointer;\n}\ninput[type=range].ninja-range::-ms-track {\n  width: 100%;\n  height: 8px;\n  cursor: pointer;\n  background: transparent;\n  border-color: transparent;\n  color: transparent;\n}\ninput[type=range].ninja-range::-ms-fill-lower {\n  background: "+c((n.rgba||t&&t.rgba||l).call(s,null!=t?t["range-colour"]:t,".25",{name:"rgba",hash:{},data:i}))+";\n  border: 0px solid #000000;\n  border-radius: 16px;\n  box-shadow: none;\n}\ninput[type=range].ninja-range::-ms-fill-upper {\n  background: "+c((n.rgba||t&&t.rgba||l).call(s,null!=t?t["range-colour"]:t,".25",{name:"rgba",hash:{},data:i}))+";\n  border: 0px solid #000000;\n  border-radius: 16px;\n  box-shadow: 0px 0px 0 #830000, 0px 0px 0px #9c0000;\n}\ninput[type=range].ninja-range::-ms-thumb {\n  box-shadow: none;\n  border: 2px solid "+c((o=null!=(o=n["bg-colour"]||(null!=t?t["bg-colour"]:t))?o:l,typeof o===u?o.call(s,{name:"bg-colour",hash:{},data:i}):o))+";\n  height: 16px;\n  width: 16px;\n  border-radius: 16px;\n  background: "+c((o=null!=(o=n["range-colour"]||(null!=t?t["range-colour"]:t))?o:l,typeof o===u?o.call(s,{name:"range-colour",hash:{},data:i}):o))+";\n  cursor: pointer;\n  height: 8px;\n}\ninput[type=range].ninja-range:focus::-ms-fill-lower {\n  background: "+c((n.rgba||t&&t.rgba||l).call(s,null!=t?t["range-colour"]:t,".25",{name:"rgba",hash:{},data:i}))+";\n}\ninput[type=range].ninja-range:focus::-ms-fill-upper {\n  background: "+c((n.rgba||t&&t.rgba||l).call(s,null!=t?t["range-colour"]:t,".25",{name:"rgba",hash:{},data:i}))+";\n}"},useData:!0}),t.playerhtml=e({1:function(e,t,n,r,i){var a,o,s=null!=t?t:{},l=n.helperMissing,u="function",c=e.escapeExpression
return'\t\t\t\t\t\t<div data-slide="'+c((o=null!=(o=n.index||i&&i.index)?o:l,typeof o===u?o.call(s,{name:"index",hash:{},data:i}):o))+'"'+(null!=(a=n.if.call(s,i&&i.first,{name:"if",hash:{},fn:e.program(2,i,0),inverse:e.noop,data:i}))?a:"")+' data-fileid="'+c((o=null!=(o=n.fileid||(null!=t?t.fileid:t))?o:l,typeof o===u?o.call(s,{name:"fileid",hash:{},data:i}):o))+'" data-cue="'+c((o=null!=(o=n.cue||(null!=t?t.cue:t))?o:l,typeof o===u?o.call(s,{name:"cue",hash:{},data:i}):o))+'" style="width:'+(null!=(a=n.if.call(s,i&&i.last,{name:"if",hash:{},fn:e.program(4,i,0),inverse:e.program(6,i,0),data:i}))?a:"")+'" data-title="'+c((o=null!=(o=n.label||(null!=t?t.label:t))?o:l,typeof o===u?o.call(s,{name:"label",hash:{},data:i}):o))+'"><span/></div>\n'},2:function(e,t,n,r,i){return' class="current"'},4:function(e,t,n,r,i){var a
return e.escapeExpression((a=null!=(a=n.size||(null!=t?t.size:t))?a:n.helperMissing,"function"==typeof a?a.call(null!=t?t:{},{name:"size",hash:{},data:i}):a))+"%"},6:function(e,t,n,r,i){var a
return"calc("+e.escapeExpression((a=null!=(a=n.size||(null!=t?t.size:t))?a:n.helperMissing,"function"==typeof a?a.call(null!=t?t:{},{name:"size",hash:{},data:i}):a))+"% - 1px)"},compiler:[7,">= 4.0.0"],main:function(e,t,n,r,i){var a,o,s=null!=t?t:{},l=n.helperMissing,u="function",c=e.escapeExpression
return'<!DOCTYPE html>\n<html lang="en">\n\t<head>\n\t\t<meta content="IE=edge" http-equiv="X-UA-Compatible">\n\t\t<meta charset="utf-8">\n\t\t<meta content="width=device-width, initial-scale=1" name="viewport">\n\t\t<meta content="'+c((o=null!=(o=n.name||(null!=t?t.name:t))?o:l,typeof o===u?o.call(s,{name:"name",hash:{},data:i}):o))+'" name="title">\n\t\t<meta content="'+c((o=null!=(o=n.description||(null!=t?t.description:t))?o:l,typeof o===u?o.call(s,{name:"description",hash:{},data:i}):o))+'" name="description">\n\t\t<meta content="'+c((o=null!=(o=n.copyright||(null!=t?t.copyright:t))?o:l,typeof o===u?o.call(s,{name:"copyright",hash:{},data:i}):o))+'" name="copyright">\n\t\t<meta content="'+c((o=null!=(o=n.timestamp||(null!=t?t.timestamp:t))?o:l,typeof o===u?o.call(s,{name:"timestamp",hash:{},data:i}):o))+'" name="timestamp">\n\t\t<meta content="https://www.coursesuite.ninja/store/info/presninja" name="author">\n\t\t<title>'+c((o=null!=(o=n.name||(null!=t?t.name:t))?o:l,typeof o===u?o.call(s,{name:"name",hash:{},data:i}):o))+'</title>\n\t\t<link href="_package.css" rel="stylesheet" type="text/css">\n\t\t<script src="https://cdn.polyfill.io/v2/polyfill.min.js"></script>\n\t</head>\n\t<body onunload="doUnload()" onbeforeunload="doUnload()">\n\t\t<noscript>This course will only function if JavaScript is enabled.</noscript>\n\t\t<div class="slide-split-wrapper">\n\t\t\t<div class="header">\n\t\t\t\t<h1>'+c((o=null!=(o=n.name||(null!=t?t.name:t))?o:l,typeof o===u?o.call(s,{name:"name",hash:{},data:i}):o))+'</h1>\n\t\t\t\t<div class="powered-by"><img src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAwAAAAMCAYAAABWdVznAAAACXBIWXMAAAsTAAALEwEAmpwYAAAORmlUWHRYTUw6Y29tLmFkb2JlLnhtcAAAAAAAPD94cGFja2V0IGJlZ2luPSLvu78iIGlkPSJXNU0wTXBDZWhpSHpyZVN6TlRjemtjOWQiPz4gPHg6eG1wbWV0YSB4bWxuczp4PSJhZG9iZTpuczptZXRhLyIgeDp4bXB0az0iQWRvYmUgWE1QIENvcmUgNS42LWMxNDAgNzkuMTYwNDUxLCAyMDE3LzA1LzA2LTAxOjA4OjIxICAgICAgICAiPiA8cmRmOlJERiB4bWxuczpyZGY9Imh0dHA6Ly93d3cudzMub3JnLzE5OTkvMDIvMjItcmRmLXN5bnRheC1ucyMiPiA8cmRmOkRlc2NyaXB0aW9uIHJkZjphYm91dD0iIiB4bWxuczp4bXA9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC8iIHhtbG5zOmRjPSJodHRwOi8vcHVybC5vcmcvZGMvZWxlbWVudHMvMS4xLyIgeG1sbnM6eG1wTU09Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9tbS8iIHhtbG5zOnN0RXZ0PSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvc1R5cGUvUmVzb3VyY2VFdmVudCMiIHhtbG5zOnN0UmVmPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvc1R5cGUvUmVzb3VyY2VSZWYjIiB4bWxuczpwaG90b3Nob3A9Imh0dHA6Ly9ucy5hZG9iZS5jb20vcGhvdG9zaG9wLzEuMC8iIHhtbG5zOnRpZmY9Imh0dHA6Ly9ucy5hZG9iZS5jb20vdGlmZi8xLjAvIiB4bWxuczpleGlmPSJodHRwOi8vbnMuYWRvYmUuY29tL2V4aWYvMS4wLyIgeG1wOkNyZWF0b3JUb29sPSJBZG9iZSBQaG90b3Nob3AgQ0MgMjAxNSAoTWFjaW50b3NoKSIgeG1wOkNyZWF0ZURhdGU9IjIwMTUtMTEtMTlUMTQ6MTg6MTkrMTE6MDAiIHhtcDpNZXRhZGF0YURhdGU9IjIwMTctMTItMDdUMTA6NTA6NTMrMTE6MDAiIHhtcDpNb2RpZnlEYXRlPSIyMDE3LTEyLTA3VDEwOjUwOjUzKzExOjAwIiBkYzpmb3JtYXQ9ImltYWdlL3BuZyIgeG1wTU06SW5zdGFuY2VJRD0ieG1wLmlpZDpjOWYwNDFjOS0wMDAzLTQxZDgtODQ0Yi0wNDA4OTAzMzY4YzEiIHhtcE1NOkRvY3VtZW50SUQ9ImFkb2JlOmRvY2lkOnBob3Rvc2hvcDozNmQwZjhiNC04MzBmLTUyNGUtODFiNi1jYzA3NTUwYjM4NjYiIHhtcE1NOk9yaWdpbmFsRG9jdW1lbnRJRD0ieG1wLmRpZDo1OTFmZTVkYS1mZjBkLTYzNDgtOWIzNS1mMTg4MmZmMmQyMjQiIHBob3Rvc2hvcDpDb2xvck1vZGU9IjMiIHBob3Rvc2hvcDpJQ0NQcm9maWxlPSJzUkdCIElFQzYxOTY2LTIuMSIgdGlmZjpPcmllbnRhdGlvbj0iMSIgdGlmZjpYUmVzb2x1dGlvbj0iNzIwMDAwLzEwMDAwIiB0aWZmOllSZXNvbHV0aW9uPSI3MjAwMDAvMTAwMDAiIHRpZmY6UmVzb2x1dGlvblVuaXQ9IjIiIGV4aWY6Q29sb3JTcGFjZT0iMSIgZXhpZjpQaXhlbFhEaW1lbnNpb249IjYzIiBleGlmOlBpeGVsWURpbWVuc2lvbj0iNjMiPiA8eG1wTU06SGlzdG9yeT4gPHJkZjpTZXE+IDxyZGY6bGkgc3RFdnQ6YWN0aW9uPSJjcmVhdGVkIiBzdEV2dDppbnN0YW5jZUlEPSJ4bXAuaWlkOjU5MWZlNWRhLWZmMGQtNjM0OC05YjM1LWYxODgyZmYyZDIyNCIgc3RFdnQ6d2hlbj0iMjAxNS0xMS0xOVQxNDoxODoxOSsxMTowMCIgc3RFdnQ6c29mdHdhcmVBZ2VudD0iQWRvYmUgUGhvdG9zaG9wIENDIDIwMTUgKFdpbmRvd3MpIi8+IDxyZGY6bGkgc3RFdnQ6YWN0aW9uPSJzYXZlZCIgc3RFdnQ6aW5zdGFuY2VJRD0ieG1wLmlpZDo0NTM2ZDY0NC1lYjA4LWQ1NDEtYjA2MC0wMTkzOTQ4YTQyZTIiIHN0RXZ0OndoZW49IjIwMTUtMTEtMTlUMTQ6MTk6MzQrMTE6MDAiIHN0RXZ0OnNvZnR3YXJlQWdlbnQ9IkFkb2JlIFBob3Rvc2hvcCBDQyAyMDE1IChXaW5kb3dzKSIgc3RFdnQ6Y2hhbmdlZD0iLyIvPiA8cmRmOmxpIHN0RXZ0OmFjdGlvbj0iY29udmVydGVkIiBzdEV2dDpwYXJhbWV0ZXJzPSJmcm9tIGltYWdlL2pwZWcgdG8gYXBwbGljYXRpb24vdm5kLmFkb2JlLnBob3Rvc2hvcCIvPiA8cmRmOmxpIHN0RXZ0OmFjdGlvbj0iZGVyaXZlZCIgc3RFdnQ6cGFyYW1ldGVycz0iY29udmVydGVkIGZyb20gaW1hZ2UvanBlZyB0byBhcHBsaWNhdGlvbi92bmQuYWRvYmUucGhvdG9zaG9wIi8+IDxyZGY6bGkgc3RFdnQ6YWN0aW9uPSJzYXZlZCIgc3RFdnQ6aW5zdGFuY2VJRD0ieG1wLmlpZDo2YjhmNDAwZS00YTRmLTk4NGEtODZhNi1jYjRiMGUzNjg1YTQiIHN0RXZ0OndoZW49IjIwMTUtMTEtMTlUMTQ6MTk6MzQrMTE6MDAiIHN0RXZ0OnNvZnR3YXJlQWdlbnQ9IkFkb2JlIFBob3Rvc2hvcCBDQyAyMDE1IChXaW5kb3dzKSIgc3RFdnQ6Y2hhbmdlZD0iLyIvPiA8cmRmOmxpIHN0RXZ0OmFjdGlvbj0ic2F2ZWQiIHN0RXZ0Omluc3RhbmNlSUQ9InhtcC5paWQ6MzQyMTkwOTItOWJhYi00MjdmLWJhYjgtYjkzMGI1YjA3YjA3IiBzdEV2dDp3aGVuPSIyMDE2LTAxLTMxVDA4OjM2OjA1KzExOjAwIiBzdEV2dDpzb2Z0d2FyZUFnZW50PSJBZG9iZSBQaG90b3Nob3AgQ0MgMjAxNSAoTWFjaW50b3NoKSIgc3RFdnQ6Y2hhbmdlZD0iLyIvPiA8cmRmOmxpIHN0RXZ0OmFjdGlvbj0iY29udmVydGVkIiBzdEV2dDpwYXJhbWV0ZXJzPSJmcm9tIGFwcGxpY2F0aW9uL3ZuZC5hZG9iZS5waG90b3Nob3AgdG8gaW1hZ2UvcG5nIi8+IDxyZGY6bGkgc3RFdnQ6YWN0aW9uPSJkZXJpdmVkIiBzdEV2dDpwYXJhbWV0ZXJzPSJjb252ZXJ0ZWQgZnJvbSBhcHBsaWNhdGlvbi92bmQuYWRvYmUucGhvdG9zaG9wIHRvIGltYWdlL3BuZyIvPiA8cmRmOmxpIHN0RXZ0OmFjdGlvbj0ic2F2ZWQiIHN0RXZ0Omluc3RhbmNlSUQ9InhtcC5paWQ6MTQ0ZjI0NDctZjJhMi00NGQwLTk5ZGUtN2MwMTBmODdhNjY0IiBzdEV2dDp3aGVuPSIyMDE2LTAxLTMxVDA4OjM2OjA1KzExOjAwIiBzdEV2dDpzb2Z0d2FyZUFnZW50PSJBZG9iZSBQaG90b3Nob3AgQ0MgMjAxNSAoTWFjaW50b3NoKSIgc3RFdnQ6Y2hhbmdlZD0iLyIvPiA8cmRmOmxpIHN0RXZ0OmFjdGlvbj0ic2F2ZWQiIHN0RXZ0Omluc3RhbmNlSUQ9InhtcC5paWQ6YzlmMDQxYzktMDAwMy00MWQ4LTg0NGItMDQwODkwMzM2OGMxIiBzdEV2dDp3aGVuPSIyMDE3LTEyLTA3VDEwOjUwOjUzKzExOjAwIiBzdEV2dDpzb2Z0d2FyZUFnZW50PSJBZG9iZSBQaG90b3Nob3AgQ0MgKE1hY2ludG9zaCkiIHN0RXZ0OmNoYW5nZWQ9Ii8iLz4gPC9yZGY6U2VxPiA8L3htcE1NOkhpc3Rvcnk+IDx4bXBNTTpEZXJpdmVkRnJvbSBzdFJlZjppbnN0YW5jZUlEPSJ4bXAuaWlkOjM0MjE5MDkyLTliYWItNDI3Zi1iYWI4LWI5MzBiNWIwN2IwNyIgc3RSZWY6ZG9jdW1lbnRJRD0iYWRvYmU6ZG9jaWQ6cGhvdG9zaG9wOjU4Mzg2YWRlLThlNmMtMTFlNS05NDVlLWYxMTVmOWZkZDI5NiIgc3RSZWY6b3JpZ2luYWxEb2N1bWVudElEPSJ4bXAuZGlkOjU5MWZlNWRhLWZmMGQtNjM0OC05YjM1LWYxODgyZmYyZDIyNCIvPiA8cGhvdG9zaG9wOkRvY3VtZW50QW5jZXN0b3JzPiA8cmRmOkJhZz4gPHJkZjpsaT5hZG9iZTpkb2NpZDpwaG90b3Nob3A6YzJkNDgwYzktMDRmZS0xMWU1LTljMGItOGQwNDFhZTNhNWNjPC9yZGY6bGk+IDxyZGY6bGk+YWRvYmU6ZG9jaWQ6cGhvdG9zaG9wOmM2NTdiZDI4LTU3MGUtMTFlMy05NzY2LWVlYmQ2NmM1OGZlZTwvcmRmOmxpPiA8cmRmOmxpPnhtcC5kaWQ6NDVFQjA0RkUyMDIwNjgxMTgyMkFFODg1NEE4RjVCMzQ8L3JkZjpsaT4gPC9yZGY6QmFnPiA8L3Bob3Rvc2hvcDpEb2N1bWVudEFuY2VzdG9ycz4gPC9yZGY6RGVzY3JpcHRpb24+IDwvcmRmOlJERj4gPC94OnhtcG1ldGE+IDw/eHBhY2tldCBlbmQ9InIiPz7YvOynAAACBElEQVQoFQXB0UtTURwH8O/vd869d7vbWiudpWYZYRAypOhBCUWKCiIKRr0Y9BQ9RdH/0Gsg9OAf0FMQ+BCEf0BRi0CIKDW0JUzBOddm995zz7nn9PnQo1cMOED6BC+HAV/aM57l7uufz35td+4UKfzN4KAHFoBzYCIAAITEYz+P7yLPjfBotlGfWHxZKDV9R8NXiMUF2AwAIGrXCCypHoRYIqALh64RdGTYz2Z2+6VGS93apUJ8n6wlsmZTpjHKLHBXRVhhhhUeBjzL/QS2FqIzChb7kL5EwX+OXvtAZhoTOnH7JkUTnh2XATLPoFpM0dzTZ9fhYw5EJXi5Qfj5p9IoFDNnd5zEVi4pvad+YTTj3csf9fnPG27hIgXtGYAVmANIryaT2GpBeHvCzI5X0qsPbJpZpT68eJOv583xypKQrR+O/EGATkNFkTh1Cd0hmj42Zh++cxzNGkQjxX/lsQOdW90Jy7edF0wRU4ioV7Z7f5bFxJSvRlB/IgJ9U5nu1zRVGwkp/2S8vdqO05W/NphzSg+5/VYD6vCeDPUkEs1bLDtgFsJaa5XlFgk5f+Pwy3K7921+E5VqatJPFcQQtckpWJVfU6Y/LYSYds51MmN6aeb6iUXVU724GrcaQ/rAlrII0iIFM8VRFF+PonjR87xzzrlUa93VWq9lGa87KhgWDAD4DzOT++tsbZeHAAAAAElFTkSuQmCC"><span>Powered by <a href="https://www.coursesuite.ninja/" target="_blank">CourseSuite</a></span></div>\n\t\t\t</div>\n\t\t\t<div class="slides">\n\t\t\t\t<iframe id="presentation" src="data/'+c((n.zeroth||t&&t.zeroth||l).call(s,null!=t?t.slides:t,"fileid",{name:"zeroth",hash:{},data:i}))+'.html"></iframe>\n\t\t\t\t<output id="pageNumber">1</output>\n\t\t\t</div>\n\t\t\t<div class="audio-player">\n\t\t\t\t<div class="cue-control">\n\t\t\t\t\t<button data-icon-stopped="pn-stop" data-icon-ended="pn-stop" data-icon-paused="pn-pause" data-icon-playing="pn-play" data-icon-waiting="pn-seek"><span class=\'pn-stop\'></span></button>\n\t\t\t\t</div>\n\t\t\t\t<div class="cue-ranges">\n\t\t\t\t\t<div class="split">\n'+(null!=(a=n.each.call(s,null!=t?t.slides:t,{name:"each",hash:{},fn:e.program(1,i,0),inverse:e.noop,data:i}))?a:"")+'\t\t\t\t\t</div>\n\t\t\t\t\t<div class="scrub">\n\t\t\t\t\t\t<div class="precache"></div><div class="played"></div>\n\t\t\t\t\t\t<input type="range" step="0.01" min="0" max="'+c((o=null!=(o=n.duration||(null!=t?t.duration:t))?o:l,typeof o===u?o.call(s,{name:"duration",hash:{},data:i}):o))+'" value="0" class="ninja-range">\n\t\t\t\t\t</div>\n\t\t\t\t</div>\n\t\t\t\t<div class="time-info">\n\t\t\t\t\t<span class="current-time">00:00</span>\n\t\t\t\t\t<span class="time-separator">/</span>\n\t\t\t\t\t<span class="total-time">'+c((n.mmss||t&&t.mmss||l).call(s,null!=t?t.duration:t,{name:"mmss",hash:{},data:i}))+'</span>\n\t\t\t\t</div>\n\t\t\t\t<div class="audio-control">\n\t\t\t\t\t<input type="range" class="ninja-range" min="0" max="100" value="'+c((o=null!=(o=n.volume||(null!=t?t.volume:t))?o:l,typeof o===u?o.call(s,{name:"volume",hash:{},data:i}):o))+'" />\n\t\t\t\t</div>\n\t\t\t\t<div class="fullscreen-control">\n\t\t\t\t\t<button title="Toggle fullscreen"><span class=\'pn-expand\'></span></button>\n\t\t\t\t</div>\n\t\t\t</div>\n\t\t</div>\n\t\t<audio id="page-audio-obj" preload="true">\n\t\t\t<source src="data/media.ogg">\n\t\t\t<source src="data/media.mp3">\n\t\t\t<track kind="chapters" default="true" src="data/media.vtt">\n\t\t</audio>\n\t\t<script type="text/javascript" src="_package.js"></script>\n\t</body>\n</html>'},useData:!0}),t.playerjs=e({compiler:[7,">= 4.0.0"],main:function(e,t,n,r,i){var a,o=null!=t?t:{},s=n.helperMissing,l="function",u=e.escapeExpression
return'!function(t,e){"use strict";"object"==typeof module&&"object"==typeof module.exports?module.exports=e(t,document):"function"==typeof define&&define.amd?define(null,function(){e(t,document)}):t.rangetouch=e(t,document)}("undefined"!=typeof window?window:this,function(t,e){"use strict";function n(t){return t instanceof HTMLElement&&t.classList.contains(l.selectors.disabled)}function o(t,e,n){t.addEventListener(e,n,!1)}function i(t){var e=(""+t).match(/(?:\\.(\\d+))?(?:[eE]([+-]?\\d+))?$/);return e?Math.max(0,(e[1]?e[1].length:0)-(e[2]?+e[2]:0)):0}function u(t,e){if(e<1){var n=i(e);return parseFloat(t.toFixed(n))}return Math.round(t/e)*e}function r(t){var e,n=t.target,o=t.changedTouches[0],i=parseFloat(n.getAttribute("min"))||0,r=parseFloat(n.getAttribute("max"))||100,a=parseFloat(n.getAttribute("step"))||1,c=r-i,s=n.getBoundingClientRect(),d=100/s.width*(l.thumbWidth/2)/100;return e=100/s.width*(o.clientX-s.left),e<0?e=0:e>100&&(e=100),e<50?e-=(100-2*e)*d:e>50&&(e+=2*(e-50)*d),i+u(c*(e/100),a)}function a(t){l.enabled&&"range"===t.target.type&&!n(t.target)&&(t.preventDefault(),t.target.value=r(t),s(t.target,t.type===l.events.end?"change":"input"))}function c(){o(e.body,l.events.start,a),o(e.body,l.events.move,a),o(e.body,l.events.end,a)}function s(t,e,n){t.dispatchEvent(new CustomEvent(e,n))}function d(){return[l.selectors.range,":not(.",l.selectors.disabled,")"].join("")}var l={enabled:!0,selectors:{range:\'[type="range"]\',disabled:"rangetouch--disabled"},thumbWidth:15,events:{start:"touchstart",move:"touchmove",end:"touchend"}};return function(){if("ontouchstart"in e.documentElement){for(var t=e.querySelectorAll(d()),n=t.length-1;n>=0;n--)t[n].style.touchAction="manipulation",t[n].style.webkitUserSelect="none";c()}}(),{set:function(t,e){l[t]=e}}}),function(){"use strict";function t(t,e){e=e||{bubbles:!1,cancelable:!1,detail:void 0};var n=document.createEvent("CustomEvent");return n.initCustomEvent(t,e.bubbles,e.cancelable,e.detail),n}if("function"==typeof window.CustomEvent)return!1;t.prototype=window.Event.prototype,window.CustomEvent=t}();\nvar domReady=function(d){var b=!1,e=function(){document.addEventListener?(document.removeEventListener("DOMContentLoaded",a),window.removeEventListener("load",a)):(document.detachEvent("onreadystatechange",a),window.detachEvent("onload",a))},a=function(){b||!document.addEventListener&&"load"!==event.type&&"complete"!==document.readyState||(b=!0,e(),d())};if("complete"===document.readyState)d();else if(document.addEventListener)document.addEventListener("DOMContentLoaded",a),window.addEventListener("load",\na);else{document.attachEvent("onreadystatechange",a);window.attachEvent("onload",a);var c=!1;try{c=null==window.frameElement&&document.documentElement}catch(g){}c&&c.doScroll&&function f(){if(!b){try{c.doScroll("left")}catch(a){return setTimeout(f,50)}b=!0;e();d()}}()}};\nfunction debounce(b,f,c){var a;return function(){var d=this,e=arguments,g=c&&!a;clearTimeout(a);a=setTimeout(function(){a=null;c||b.apply(d,e)},f);g&&b.apply(d,e)}};\n\n/* https://github.com/sindresorhus/screenfull.js/ | v3.3.2 - 2017-10-27 | (c) Sindre Sorhus; MIT License */\n!function(){"use strict";var a="undefined"!=typeof window&&void 0!==window.document?window.document:{},b="undefined"!=typeof module&&module.exports,c="undefined"!=typeof Element&&"ALLOW_KEYBOARD_INPUT"in Element,d=function(){for(var b,c=[["requestFullscreen","exitFullscreen","fullscreenElement","fullscreenEnabled","fullscreenchange","fullscreenerror"],["webkitRequestFullscreen","webkitExitFullscreen","webkitFullscreenElement","webkitFullscreenEnabled","webkitfullscreenchange","webkitfullscreenerror"],["webkitRequestFullScreen","webkitCancelFullScreen","webkitCurrentFullScreenElement","webkitCancelFullScreen","webkitfullscreenchange","webkitfullscreenerror"],["mozRequestFullScreen","mozCancelFullScreen","mozFullScreenElement","mozFullScreenEnabled","mozfullscreenchange","mozfullscreenerror"],["msRequestFullscreen","msExitFullscreen","msFullscreenElement","msFullscreenEnabled","MSFullscreenChange","MSFullscreenError"]],d=0,e=c.length,f={};d<e;d++)if((b=c[d])&&b[1]in a){for(d=0;d<b.length;d++)f[c[0][d]]=b[d];return f}return!1}(),e={change:d.fullscreenchange,error:d.fullscreenerror},f={request:function(b){var e=d.requestFullscreen;b=b||a.documentElement,/ Version\\/5\\.1(?:\\.\\d+)? Safari\\//.test(navigator.userAgent)?b[e]():b[e](c&&Element.ALLOW_KEYBOARD_INPUT)},exit:function(){a[d.exitFullscreen]()},toggle:function(a){this.isFullscreen?this.exit():this.request(a)},onchange:function(a){this.on("change",a)},onerror:function(a){this.on("error",a)},on:function(b,c){var d=e[b];d&&a.addEventListener(d,c,!1)},off:function(b,c){var d=e[b];d&&a.removeEventListener(d,c,!1)},raw:d};if(!d)return void(b?module.exports=!1:window.screenfull=!1);Object.defineProperties(f,{isFullscreen:{get:function(){return Boolean(a[d.fullscreenElement])}},element:{enumerable:!0,get:function(){return a[d.fullscreenElement]}},enabled:{enumerable:!0,get:function(){return Boolean(a[d.fullscreenEnabled])}}}),b?module.exports=f:window.screenfull=f}();\n\n// scorm 1.2 & 2004 combined functions\nfunction learnerWillReturn(a){"API_1484_11"==_sAPI?a?scormSetValue("cmi.exit","suspend"):scormSetValue("cmi.exit","normal"):"API"==_sAPI&&(a?scormSetValue("cmi.core.exit","suspend"):scormSetValue("cmi.core.exit",""))}\nfunction isFirstLaunch(){if("API_1484_11"==_sAPI)var a=scormGetValue("cmi.entry");else if("API"==_sAPI)a=scormGetValue("cmi.core.entry");else return!0;return"ab-initio"!=a?!1:!0}\nfunction startSessionTime(){return _timeSessionStart=new Date}\nfunction setSessionTime(a){var b=(new Date).getTime();a=Math.round((b-a)/1E3);a=formatTime(a);"API_1484_11"==_sAPI?scormSetValue("cmi.session_time",a):"API"==_sAPI&&scormSetValue("cmi.core.session_time",a)}\nfunction getBookmark(){return"API_1484_11"==_sAPI?scormGetValue("cmi.location"):"API"==_sAPI?scormGetValue("cmi.core.lesson_location"):""}\nfunction setBookmark(a){"API_1484_11"==_sAPI?scormSetValue("cmi.location",a+""):"API"==_sAPI&&scormSetValue("cmi.core.lesson_location",a+"")}\nfunction getSuspendData(){return"API_1484_11"==_sAPI||"API"==_sAPI?scormGetValue("cmi.suspend_data"):""}\nfunction setSuspendData(a){"API_1484_11"!=_sAPI&&"API"!=_sAPI||scormSetValue("cmi.suspend_data",a+"")}\nfunction setCompletionStatus(a){if("API_1484_11"==_sAPI)scormSetValue("cmi.completion_status",a+"");else if("API"==_sAPI&&("completed"==a||"incomplete"==a||"not attempted"==a)){var b=scormGetValue("cmi.core.lesson_status");"passed"==b||"failed"==b?"incomplete"!=a&&"not attempted"!=a||scormSetValue("cmi.core.lesson_status",a+""):scormSetValue("cmi.core.lesson_status",a+"")}}\nfunction getCompletionStatus(){if("API_1484_11"==_sAPI)return scormGetValue("cmi.completion_status");if("API"==_sAPI){var a=scormGetValue("cmi.core.lesson_status");return"passed"==a||"failed"==a?"completed":a}return"not attempted"}\nfunction setPassFail(a){"API_1484_11"==_sAPI?scormSetValue("cmi.success_status",a+""):"API"==_sAPI&&scormSetValue("cmi.core.lesson_status",a+"")}\nfunction setScore(a){if("API_1484_11"==_sAPI)scormSetValue("cmi.score.scaled",a+"");else if("API"==_sAPI){scormSetValue("cmi.core.score.min","0");scormSetValue("cmi.core.score.max","100");var b=100*a;100<b&&(b=100);0>a-0?scormSetValue("cmi.core.score.raw","0"):scormSetValue("cmi.core.score.raw",Math.round(b)+"")}}\nfunction scormInitialize(){var a=getAPI();if(null==a)return"false";a="API"==_sAPI?a.LMSInitialize(""):a.Initialize("");return a}\nfunction scormTerminate(){var a=getAPI();if(null==a)return"false";a="API"==_sAPI?a.LMSFinish(""):a.Terminate("");return a}\nfunction scormCommit(){var a=getAPI();if(null==a)return"false";a="API"==_sAPI?a.LMSCommit(""):a.Commit("");return a}\nfunction scormGetValue(a){var b=getAPI();if(null==b)return"";if("API"==_sAPI)var c=b.LMSGetValue(a),b=b.LMSGetLastError();else c=b.GetValue(a),b=b.GetLastError();return"0"!=b?"":c}\nfunction scormSetValue(a,b){var c=getAPI();if(null==c)return"true";c="API"==_sAPI?c.LMSSetValue(a,b):c.SetValue(a,b);return c}\nfunction formatTime(a){var b=Math.floor(a/3600);a-=3600*b;var c=Math.floor(a/60);a-=60*c;return"API_1484_11"==_sAPI?"PT"+b+"H"+c+"M"+a+"S":"API"==_sAPI?(10>b&&(b="0"+b),10>c&&(c="0"+c),10>a&&(a="0"+a),b+":"+c+":"+a):""}\nfunction findAPI(a,b){var c=0;try{for(;null==a[b]&&null!=a.parent&&a.parent!=a;){c++;if(7<c)return console.log("findAPI gave up",a,b),alert("Error finding API -- too deeply nested."),null;a=a.parent}}catch(d){return console.log("findAPI forced to stop at domain boundary",a,b),null}return a[b]}\nfunction getAPI(){if(null!=apiHandle)return apiHandle;var a=findAPI(window,"API_1484_11");null==a&&null!=window.opener&&"undefined"!=typeof window.opener&&(a=findAPI(window.opener,"API_1484_11"));null==a?(a=findAPI(window,"API"),null==a&&null!=window.opener&&"undefined"!=typeof window.opener&&(a=findAPI(window.opener,"API")),null!=a&&(_sAPI="API")):_sAPI="API_1484_11";null==a&&alert("Unable to find an API adapter");return a};\nMath.clip = function(n,i,x){return Math.max(i,Math.min(n,x));}\n\nscormInitialize();\n\nvar _bDebug=0,_sAPI="",\n\tapiHandle = (parent && parent !== self && parent.ninjaApiProxy) ? parent.ninjaApiProxy : getAPI(),\n\t_timeSessionStart=null,\n\t_timeout,\n\t_now,\n\t_unloaded = false,\n\tCourse = {\n\t\tRequired: '+u((a=null!=(a=n.score||(null!=t?t.score:t))?a:s,typeof a===l?a.call(o,{name:"score",hash:{},data:i}):a))+",\n\t\tDuration: "+u((a=null!=(a=n.duration||(null!=t?t.duration:t))?a:s,typeof a===l?a.call(o,{name:"duration",hash:{},data:i}):a))+',\n\t\t_timestamp: 0,\n\t\tScore: 0,\n\t\tCompleted: false,\n\t\tSetComplete: function () {\n\t\t\tif (!Course.Completed) {\n\t\t\t\tlearnerWillReturn(false);\n\t\t\t\tif ("API_1484_11"==_sAPI) setPassFail("passed");\n\t\t\t\tsetCompletionStatus("completed");\n\t\t\t\tsetScore(Course.Score/100);\n\t\t\t\tscormCommit();\n\t\t\t\tCourse.Completed = true;\n\t\t\t\treturn true;\n\t\t\t}\n\t\t\treturn false;\n\t\t},\n\t\tPlayerState: "not-started"\n\t},\n\tHtmlAudioObject = document.querySelector("#page-audio-obj"),\n\tHtmlFrameObject = document.getElementById("presentation"),\n\tHtmlPageNumber = document.getElementById("pageNumber");\n\tAudioUI = document.querySelector(".audio-player"),\n\tAudioScrub = AudioUI.querySelector(".scrub input[type=\'range\']"),\n\tAudioPrecache = AudioUI.querySelector(".scrub .precache"),\n\tAudioPlayed = AudioUI.querySelector(".scrub .played"),\n\tAudioVolume = AudioUI.querySelector(".audio-control input[type=\'range\']"),\n\tAudioCue = AudioUI.querySelector(".cue-control button"),\n\tAudioTimestamp = AudioUI.querySelector(".current-time"),\n\tChapterContainer = AudioUI.querySelector(".cue-ranges .split"),\n\tChapters = ChapterContainer.querySelectorAll(":scope>div"),\n\tFullScreenButton = AudioUI.querySelector(\'.fullscreen-control > button\');\n\nObject.defineProperty(HtmlAudioObject, "begun", {\n\tget: function() {\n\t\treturn !!(this.currentTime > 0 && !this.ended && this.readyState > 2);\n\t}\n});\n\nObject.defineProperty(HtmlAudioObject, "playing", {\n    get: function() {\n        return !!(this.currentTime > 0 && !this.paused && !this.ended && this.readyState > 2);\n    }\n});\n\nObject.defineProperty(Course, "Seconds", {\n\tconfigurable: false,\n\tget: function () {\n\t\treturn typeof _timestamp !== "undefined" ? _timestamp : 0;\n\t},\n\tset: function (value) {\n\t\t_timestamp = value;\n\t\tsetBookmark("" + Math.round(value)); // persist where we are up to; but commit later\n\t\tvar changed = false;\n\t\tif (!isFirstLaunch() && getCompletionStatus() == "completed") {\n\t\t\tCourse.Completed = true; //  bypass setComplete (reset score)\n\t\t}\n\t\tCourse.Score = ~~ChapterContainer.querySelector(".current").dataset.slide; // 1-based index\n\t\tif (Course.Score >= Course.Required) {\n\t\t\tchanged = Course.SetComplete(); // true if record was changed\n\t\t}\n\t\tif (Course.PlayerState == "pause" || Course.PlayerState == "ended" || Course.PlayerState == "waiting" || changed) { // only during pause or end events, or when the required score is reached\n\t\t\tsetScore(Course.Score); // always set score, even if not yet completed\n\t\t}\n\t}\n});\n\n\n\n// public method called by body unload event(s)\nfunction doUnload() {\n\tif (!_unloaded) {\n\t\t// setSuspendData(JSON.stringify(Course.Cues));\n\t\tscormCommit();\n\t\tsetSessionTime(_timeSessionStart);\n\t\tscormTerminate();\n\t\t_unloaded = true;\n\t}\n}\n\nHtmlAudioObject.addEventListener("progress", function(e) {\n\tif (!HtmlAudioObject.buffered.end) {\n\t\tAudioPrecache.style.width = "0";\n\t\treturn;\n\t}\n\tif (HtmlAudioObject.buffered.length > 0) {\n\t\tvar pc = (HtmlAudioObject.buffered.end(HtmlAudioObject.buffered.length-1) / Course.duration) * 100;\n\t\tAudioPrecache.style.width = pc + "%";\n\t}\n});\n\nAudioVolume.addEventListener("input", function(e) {\n\tHtmlAudioObject.volume = ~~e.target.value/100;\n}, false);\n\nAudioScrub.addEventListener("input",function (e) {\n\tHtmlAudioObject.currentTime = this.value;\n}, false);\n\nHtmlAudioObject.addEventListener("playing", function (e) {\n\tAudioCue.innerHTML = \'<span class="\' + AudioCue.dataset.iconPlaying + \'"></span>\';\n\tCourse.PlayerState = "playing";\n});\n\nHtmlAudioObject.addEventListener("timeupdate", _do_time_update, false);\n\nHtmlAudioObject.addEventListener("ended", function (e) {\n\tAudioCue.innerHTML = \'<span class="\' + AudioCue.dataset.iconStopped + \'"></span>\';\n\tCourse.PlayerState = "ended";\n});\n\nHtmlAudioObject.addEventListener("pause", function (e) {\n\tAudioCue.innerHTML = \'<span class="\' + AudioCue.dataset.iconPaused + \'"></span>\';\n\tCourse.PlayerState = "pause";\n});\n\nHtmlAudioObject.addEventListener("seeking", function (e) {\n\tif (HtmlAudioObject.begun) {\n\t\tAudioCue.innerHTML = \'<span class="\' + AudioCue.dataset.iconWaiting + \'"></span>\';\n\t}\n\tCourse.PlayerState = "seeking";\n});\n\nAudioCue.addEventListener("click", function (e) {\n\tif (HtmlAudioObject.playing) {\n\t\tHtmlAudioObject.pause();\n\t} else {\n\t\tHtmlAudioObject.play();\n\t}\n}, false);\n\nfunction HHMMSS(seconds) {\n    var date = new Date(1970,0,1);\n    date.setSeconds(seconds);\n    result = (date.toTimeString().replace(/.*(\\d{2}:\\d{2}:\\d{2}).*/, "$1"));\n    return result.replace(/^00:/,"");\n}\n\nfunction _do_time_update(e) {\n\tAudioScrub.value = HtmlAudioObject.currentTime;\n\tCourse.Seconds = AudioScrub.value;\n\tAudioTimestamp.textContent = HHMMSS(HtmlAudioObject.currentTime);\n\tvar pc = (HtmlAudioObject.currentTime / Course.Duration) * 100;\n\tAudioPlayed.style.width = pc + "%";\n\tfor (var i=0,k=Chapters.length ; i<k ; i++) {\n\t\tvar start = Chapters[i].dataset.cue,\n\t\t\tend = Chapters[i+1] ? Chapters[i+1].dataset.cue : Course.Duration;\n\t\tif (HtmlAudioObject.currentTime >= start && HtmlAudioObject.currentTime <= end) {\n\t\t\tif (!Chapters[i].classList.contains("current")) {\n\t\t\t\tHtmlFrameObject.setAttribute("src", "data/" + Chapters[i].dataset.fileid + ".html");\n\t\t\t\tHtmlPageNumber.textContent = (~~Chapters[i].dataset.slide + 1);\n\t\t\t\tHtmlPageNumber.classList.add("puff");\n\t\t\t\tsetTimeout(function() {\n\t\t\t\t\tHtmlPageNumber.classList.remove("puff");\n\t\t\t\t}, 550);\n\t\t\t\t[].forEach.call(Chapters,function(n) {\n\t\t\t\t\tn.classList[n===Chapters[i]?"add":"remove"]("current");\n\t\t\t\t});\n\t\t\t}\n\t\t}\n\t}\n}\n\ndomReady(function () {\n\tstartSessionTime();\n\tsetCompletionStatus("incomplete");\n\tlearnerWillReturn(true);\n\tscormCommit();\n\n\tvar bm = ~~getBookmark();\n\tif (!isFirstLaunch() && bm>0) {\n\t\tHtmlAudioObject.currentTime = bm;\n\t\t_do_time_update();\n\t}\n\n\tChapterContainer.addEventListener("click", function (e) {\n\t\tHtmlAudioObject.currentTime = e.target.dataset.cue;\n\t\tif (Course.PlayerState !== "playing") {\n\t\t\tHtmlAudioObject.play();\n\t\t}\n\t}, false);\n\n\tif (!screenfull.enabled) {\n\t\tFullScreenButton.style.display = "none";\n\t} else {\n\t\tFullScreenButton.addEventListener(\'click\', function (e) {\n\t\t\tscreenfull.toggle(document.querySelector(".slide-split-wrapper"));\n\t\t\tscreenfull.on(\'change\', function() {\n\t\t\t\tif (screenfull.isFullscreen) {\n\t\t\t\t\tFullScreenButton.innerHTML = "<span class=\'pn-shrink\'></span>";\n\t\t\t\t} else {\n\t\t\t\t\tFullScreenButton.innerHTML = "<span class=\'pn-expand\'></span>";\n\t\t\t\t}\n\t\t\t});\n\t\t}, false);\n\t}\n\n});'},useData:!0}),t.scorm12manifest=e({1:function(e,t,n,r,i){var a
return'      <file href="'+e.escapeExpression((a=null!=(a=n.href||(null!=t?t.href:t))?a:n.helperMissing,"function"==typeof a?a.call(null!=t?t:{},{name:"href",hash:{},data:i}):a))+'" />\r\n'},compiler:[7,">= 4.0.0"],main:function(e,t,n,r,i){var a,o,s=null!=t?t:{},l=n.helperMissing,u="function",c=e.escapeExpression
return'<?xml version="1.0" ?>\r\n<manifest identifier="ninja.coursesuite.presentationninja.scorm12.I'+c((o=null!=(o=n.timestamp||(null!=t?t.timestamp:t))?o:l,typeof o===u?o.call(s,{name:"timestamp",hash:{},data:i}):o))+'" version="1"\r\n       xmlns="http://www.imsproject.org/xsd/imscp_rootv1p1p2"\r\n       xmlns:adlcp="http://www.adlnet.org/xsd/adlcp_rootv1p2"\r\n       xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"\r\n       xsi:schemaLocation="http://www.imsproject.org/xsd/imscp_rootv1p1p2 imscp_rootv1p1p2.xsd\r\n                           http://www.imsglobal.org/xsd/imsmd_rootv1p2p1 imsmd_rootv1p2p1.xsd\r\n                           http://www.adlnet.org/xsd/adlcp_rootv1p2 adlcp_rootv1p2.xsd">\r\n  <metadata>\r\n    <schema>ADL SCORM</schema>\r\n    <schemaversion>1.2</schemaversion>\r\n  </metadata>\r\n  <organizations default="O'+c((o=null!=(o=n.timestamp||(null!=t?t.timestamp:t))?o:l,typeof o===u?o.call(s,{name:"timestamp",hash:{},data:i}):o))+'">\r\n    <organization identifier="O'+c((o=null!=(o=n.timestamp||(null!=t?t.timestamp:t))?o:l,typeof o===u?o.call(s,{name:"timestamp",hash:{},data:i}):o))+'">\r\n      <title>'+c((o=null!=(o=n.name||(null!=t?t.name:t))?o:l,typeof o===u?o.call(s,{name:"name",hash:{},data:i}):o))+'</title>\r\n      <item identifier="I'+c((o=null!=(o=n.timestamp||(null!=t?t.timestamp:t))?o:l,typeof o===u?o.call(s,{name:"timestamp",hash:{},data:i}):o))+'" identifierref="R'+c((o=null!=(o=n.timestamp||(null!=t?t.timestamp:t))?o:l,typeof o===u?o.call(s,{name:"timestamp",hash:{},data:i}):o))+'" isvisible="true">\r\n        <title>'+c((o=null!=(o=n.name||(null!=t?t.name:t))?o:l,typeof o===u?o.call(s,{name:"name",hash:{},data:i}):o))+'</title>\r\n      </item>\r\n    </organization>\r\n  </organizations>\r\n  <resources>\r\n    <resource identifier="R'+c((o=null!=(o=n.timestamp||(null!=t?t.timestamp:t))?o:l,typeof o===u?o.call(s,{name:"timestamp",hash:{},data:i}):o))+'" type="webcontent" adlcp:scormtype="sco" href="index.html">\r\n'+(null!=(a=n.each.call(s,null!=t?t.files:t,{name:"each",hash:{},fn:e.program(1,i,0),inverse:e.noop,data:i}))?a:"")+"    </resource>\r\n  </resources>\r\n</manifest>"},useData:!0}),t.scorm2004manifest=e({1:function(e,t,n,r,i){var a
return'      <file href="'+e.escapeExpression((a=null!=(a=n.href||(null!=t?t.href:t))?a:n.helperMissing,"function"==typeof a?a.call(null!=t?t:{},{name:"href",hash:{},data:i}):a))+'" />\r\n'},compiler:[7,">= 4.0.0"],main:function(e,t,n,r,i){var a,o,s=null!=t?t:{},l=n.helperMissing,u="function",c=e.escapeExpression
return'\ufeff<?xml version="1.0" encoding="UTF-8"?>\r\n<manifest xmlns="http://www.imsglobal.org/xsd/imscp_v1p1" xmlns:imsmd="http://ltsc.ieee.org/xsd/LOM" xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xmlns:adlcp="http://www.adlnet.org/xsd/adlcp_v1p3" xmlns:imsss="http://www.imsglobal.org/xsd/imsss" xmlns:adlseq="http://www.adlnet.org/xsd/adlseq_v1p3" xmlns:adlnav="http://www.adlnet.org/xsd/adlnav_v1p3" identifier="MANIFEST-'+c((o=null!=(o=n.timestamp||(null!=t?t.timestamp:t))?o:l,typeof o===u?o.call(s,{name:"timestamp",hash:{},data:i}):o))+'" xsi:schemaLocation="http://www.imsglobal.org/xsd/imscp_v1p1 imscp_v1p1.xsd http://ltsc.ieee.org/xsd/LOM lom.xsd http://www.adlnet.org/xsd/adlcp_v1p3 adlcp_v1p3.xsd http://www.imsglobal.org/xsd/imsss imsss_v1p0.xsd http://www.adlnet.org/xsd/adlseq_v1p3 adlseq_v1p3.xsd http://www.adlnet.org/xsd/adlnav_v1p3 adlnav_v1p3.xsd">\r\n  <metadata>\r\n    <schema>ADL SCORM</schema>\r\n    <schemaversion>2004 4th Edition</schemaversion>\r\n    <imsmd:lom>\r\n      <imsmd:general>\r\n        <imsmd:title>\r\n          <imsmd:string>'+c((o=null!=(o=n.name||(null!=t?t.name:t))?o:l,typeof o===u?o.call(s,{name:"name",hash:{},data:i}):o))+"</imsmd:string>\r\n        </imsmd:title>\r\n        <imsmd:language>en</imsmd:language>\r\n        <imsmd:description>\r\n          <imsmd:string><![CDATA["+c((o=null!=(o=n.description||(null!=t?t.description:t))?o:l,typeof o===u?o.call(s,{name:"description",hash:{},data:i}):o))+']]></imsmd:string>\r\n        </imsmd:description>\r\n      </imsmd:general>\r\n    </imsmd:lom>\r\n  </metadata>\r\n  <organizations default="O'+c((o=null!=(o=n.timestamp||(null!=t?t.timestamp:t))?o:l,typeof o===u?o.call(s,{name:"timestamp",hash:{},data:i}):o))+'">\r\n    <organization identifier="O'+c((o=null!=(o=n.timestamp||(null!=t?t.timestamp:t))?o:l,typeof o===u?o.call(s,{name:"timestamp",hash:{},data:i}):o))+'" structure="hierarchical">\r\n      <title>'+c((o=null!=(o=n.name||(null!=t?t.name:t))?o:l,typeof o===u?o.call(s,{name:"name",hash:{},data:i}):o))+'</title>\r\n      <item identifier="I'+c((o=null!=(o=n.timestamp||(null!=t?t.timestamp:t))?o:l,typeof o===u?o.call(s,{name:"timestamp",hash:{},data:i}):o))+'" identifierref="R'+c((o=null!=(o=n.timestamp||(null!=t?t.timestamp:t))?o:l,typeof o===u?o.call(s,{name:"timestamp",hash:{},data:i}):o))+'" isvisible="true">\r\n        <title>'+c((o=null!=(o=n.name||(null!=t?t.name:t))?o:l,typeof o===u?o.call(s,{name:"name",hash:{},data:i}):o))+'</title>\r\n      </item>\r\n      <imsss:sequencing>\r\n        <imsss:controlMode choiceExit="true" flow="true" />\r\n        <imsss:deliveryControls completionSetByContent="true" objectiveSetByContent="false" />\r\n      </imsss:sequencing>\r\n    </organization>\r\n  </organizations>\r\n  <resources>\r\n    <resource identifier="R'+c((o=null!=(o=n.timestamp||(null!=t?t.timestamp:t))?o:l,typeof o===u?o.call(s,{name:"timestamp",hash:{},data:i}):o))+'" adlcp:scormType="sco" type="webcontent" href="index.html">\r\n'+(null!=(a=n.each.call(s,null!=t?t.files:t,{name:"each",hash:{},fn:e.program(1,i,0),inverse:e.noop,data:i}))?a:"")+"    </resource>\r\n  </resources>\r\n</manifest>"},useData:!0}),t["script-transform-scale"]=e({compiler:[7,">= 4.0.0"],main:function(e,t,n,r,i){return'<script type="text/javascript" id="transformScaleCenter">\n(function (win, doc, undefined) {\n    function debounce(b,f,c){var a;return function(){var d=this,e=arguments,g=c&&!a;clearTimeout(a);a=setTimeout(function(){a=null;c||b.apply(d,e)},f);g&&b.apply(d,e)}};\n    var node = doc.querySelector("#page-container img.bi"),\n        w = parseInt(win.getComputedStyle(node,null).getPropertyValue("width"),10),\n        h = parseInt(win.getComputedStyle(node,null).getPropertyValue("height"),10);\n    var scaleFn = function() {\n            var scale = Math.min(\n                    (win.innerWidth || doc.body.clientWidth) / w,\n                    (win.innerHeight || doc.body.clientHeight) / h\n                );\n            [].forEach.call(doc.querySelectorAll(".pf"), function(el) {\n                el.style.transform = "translate(-50%, -50%) " + "scale(" + scale + ") ";\n            });\n        },\n        scaleDown = debounce(scaleFn,20);\n    scaleFn();\n    win.addEventListener(\'resize\', scaleDown);\n})(window, document);\n</script>'},useData:!0}),t["style-transform-scale"]=e({compiler:[7,">= 4.0.0"],main:function(e,t,n,r,i){return"<style>\nbody {\n\tbackground-color: black;\n\tmargin: 0;\n}\n.pf {\n\ttransform: scale(1,1) translate(-50%, -50%);\n\ttransform-style: flat;\n\ttransform-origin: center center 0px;\n\tposition: absolute;\n\ttop: 50%;\n\tleft: 50%;\n}\n</style>"},useData:!0}),t.xapimanifest=e({1:function(e,t,n,r,i){var a
return'<file href="'+e.escapeExpression((a=null!=(a=n.href||(null!=t?t.href:t))?a:n.helperMissing,"function"==typeof a?a.call(null!=t?t:{},{name:"href",hash:{},data:i}):a))+'" />\n'},compiler:[7,">= 4.0.0"],main:function(e,t,n,r,i){var a,o,s=null!=t?t:{},l=n.helperMissing,u="function",c=e.escapeExpression
return'<?xml version="1.0" standalone="no"?>\n<manifest>\n  <organizations default="O'+c((o=null!=(o=n.timestamp||(null!=t?t.timestamp:t))?o:l,typeof o===u?o.call(s,{name:"timestamp",hash:{},data:i}):o))+'">\n    <organization identifier="O'+c((o=null!=(o=n.timestamp||(null!=t?t.timestamp:t))?o:l,typeof o===u?o.call(s,{name:"timestamp",hash:{},data:i}):o))+'">\n      <title>'+c((o=null!=(o=n["option-course-name"]||(null!=t?t["option-course-name"]:t))?o:l,typeof o===u?o.call(s,{name:"option-course-name",hash:{},data:i}):o))+'</title>\n      <item identifier="I'+c((o=null!=(o=n.timestamp||(null!=t?t.timestamp:t))?o:l,typeof o===u?o.call(s,{name:"timestamp",hash:{},data:i}):o))+'" identifierref="R'+c((o=null!=(o=n.timestamp||(null!=t?t.timestamp:t))?o:l,typeof o===u?o.call(s,{name:"timestamp",hash:{},data:i}):o))+'">\n        <title>'+c((o=null!=(o=n["option-course-name"]||(null!=t?t["option-course-name"]:t))?o:l,typeof o===u?o.call(s,{name:"option-course-name",hash:{},data:i}):o))+'</title>\n      </item>\n    </organization>\n  </organizations>\n  <resources>\n    <resource identifier="R'+c((o=null!=(o=n.timestamp||(null!=t?t.timestamp:t))?o:l,typeof o===u?o.call(s,{name:"timestamp",hash:{},data:i}):o))+'" type="webcontent" adlcp:scormtype="sco" href="index.html">\n      <file href="index.html" />\n      <file href="_package.js" />\n      <file href="_package.css" />\n      '+(null!=(a=n.each.call(s,null!=(a=null!=t?t.manifest:t)?a.files:a,{name:"each",hash:{},fn:e.program(1,i,0),inverse:e.noop,data:i}))?a:"")+"    </resource>\n  </resources>\n</manifest>"},useData:!0})}(),function(e,t){"use strict"
function n(e,t){for(var n in t)t.hasOwnProperty(n)&&(e[n]=t[n])
return e}function r(e,t){this.el=e,this.options=n({},this.options),n(this.options,t),this._init()}r.prototype.options={speedIn:500,easingIn:mina.linear},r.prototype._init=function(){var e=Snap(this.el.querySelector("svg"))
this.path=e.select("path"),this.initialPath=this.path.attr("d")
var t=this.el.getAttribute("data-opening")
if(this.openingSteps=t?t.split(";"):"",this.openingStepsTotal=t?this.openingSteps.length:0,0!==this.openingStepsTotal){var n=this.el.getAttribute("data-closing")?this.el.getAttribute("data-closing"):this.initialPath
this.closingSteps=n?n.split(";"):"",this.closingStepsTotal=n?this.closingSteps.length:0,this.isAnimating=!1,this.options.speedOut||(this.options.speedOut=this.options.speedIn),this.options.easingOut||(this.options.easingOut=this.options.easingIn)}},r.prototype.show=function(){if(this.isAnimating)return!1
this.isAnimating=!0
var e=this,n=function(){t(e.el).addClass("pageload-loading")}
this._animateSVG("in",n),t(e.el).addClass("show")},r.prototype.hide=function(){var e=this
t(this.el).removeClass("pageload-loading"),this._animateSVG("out",function(){e.path.attr("d",e.initialPath),t(e.el).removeClass("show"),e.isAnimating=!1})},r.prototype._animateSVG=function(e,t){var n=this,r=0,i="out"===e?this.closingSteps:this.openingSteps,a="out"===e?this.closingStepsTotal:this.openingStepsTotal,o="out"===e?n.options.speedOut:n.options.speedIn,s="out"===e?n.options.easingOut:n.options.easingIn,l=function(e){return e>a-1?void(t&&"function"==typeof t&&t()):(n.path.animate({path:i[e]},o,s,function(){l(e)}),void e++)}
l(r)},e.SVGLoader=r}(window,jQuery),function(e){"use strict"
function t(e,t){for(var n in t)t.hasOwnProperty(n)&&(e[n]=t[n])
return e}function n(e){this.el=e,this.paths=[].slice.call(this.el.querySelectorAll("path")),this.pathsArr=new Array,this.lengthsArr=new Array,this._init()}function r(e,n){this.el=e,this.options=t({},this.options),t(this.options,n),this._init()}var i={WebkitTransition:"webkitTransitionEnd",MozTransition:"transitionend",OTransition:"oTransitionEnd",msTransition:"MSTransitionEnd",transition:"transitionend"},a=i[Modernizr.prefixed("transition")],o={transitions:Modernizr.csstransitions}
n.prototype._init=function(){var e=this
this.paths.forEach(function(t,n){e.pathsArr[n]=t,t.style.strokeDasharray=e.lengthsArr[n]=t.getTotalLength()}),this.draw(0)},n.prototype.draw=function(e){for(var t=0,n=this.pathsArr.length;t<n;++t)this.pathsArr[t].style.strokeDashoffset=this.lengthsArr[t]*(1-e)},r.prototype.options={statusTime:1500},r.prototype._init=function(){this.button=this.el.querySelector("button"),this.progressEl=new n(this.el.querySelector("svg.progress-circle")),this.successEl=new n(this.el.querySelector("svg.checkmark")),this.errorEl=new n(this.el.querySelector("svg.cross")),this._initEvents(),this._enable()},r.prototype._initEvents=function(){var e=this
this.button.addEventListener("click",function(){e._submit()})},r.prototype._submit=function(){this.el.classList.add("loading")
var e=this,t=function(n){if(o.transitions){if("width"!==n.propertyName)return!1
this.removeEventListener(a,t)}this.setAttribute("disabled",""),"function"==typeof e.options.callback?e.options.callback(e):(e.setProgress(1),e.stop()),"function"==typeof e.options.onbegin&&e.options.onbegin(e)}
o.transitions?this.button.addEventListener(a,t):t()},r.prototype.stop=function(e){var t=this,n=function(){if(t.progressEl.draw(0),"number"==typeof e){var n=e>=0?"success":"error",r=e>=0?t.successEl:t.errorEl
r.draw(1),t.el.classList.add(n),setTimeout(function(){t.el.classList.remove(n),r.draw(0),t._enable()},t.options.statusTime)}else t._enable()
t.el.classList.remove("loading"),"function"==typeof t.options.onend&&t.options.onend(t)}
setTimeout(n,300)},r.prototype.setProgress=function(e){this.progressEl.draw(e)},r.prototype._enable=function(){this.button.removeAttribute("disabled")},e.UIProgressButton=r}(window)
var body=document.body,header=document.getElementById("banner"),nav=document.getElementById("tabs"),splitterContainer=document.querySelector("#slides .cue-ranges > .split"),splitterContainerChildren,splitterControl,sections=document.querySelectorAll("body > main > section"),slideSection=document.querySelector("section#slides"),completionInput=document.querySelector("#completion input"),chapterControl=slideSection.querySelector(".slide-webvtt-wrapper textarea:not(.linesContainer)"),chapterFeedback=document.getElementById("webvtt-errors"),audioCueControl=slideSection.querySelector(".audio-player>.cue-control>button"),audioScrubControl=slideSection.querySelector(".audio-player>.cue-ranges input[type='range']"),audioScrubPrecache=slideSection.querySelector(".audio-player>.cue-ranges .precache"),audioScrubPlayed=slideSection.querySelector(".audio-player>.cue-ranges .played"),audioVolumeControl=slideSection.querySelector(".audio-player>.audio-control input[type='range']"),audioTimeCurrent=slideSection.querySelector(".audio-player .current-time"),audioTimeTotal=slideSection.querySelector(".audio-player .total-time"),previewPageNumber=slideSection.querySelector(".slides>output"),previewFrame=slideSection.querySelector(".slides>iframe"),aspectRatios=document.querySelectorAll("section#design .aspect-ratio")
if(previewIframe=document.querySelector(".presentation-frame > iframe"),previewTitle=document.querySelector(".presentation-header .slide-info"),previewInfo=document.querySelector(".presentation-header .chapter-info"),snd=new Audio("swoosh_quiet.mp3"),speed=128,_remaining=-1,_player=null,_playback_metadata={},loader=new SVGLoader(document.getElementById("loader"),{speedIn:128,easingIn:mina.easeinout}),baseUrl=window.location.href,URL=window.URL||window.webkitURL,props={slides:[],split:!1,webvtt:""},CLOUD_CONVERT_APIKEY="8pxT0DHRE5lpcVzildrPoEbztL9rc5Es89xG0incUfPNB93LLZueEr7zTK7PTuZmcV1hXkRMITbhjS-U1NnnzQ",KLOUDLESS_APP_ID="UNhGZvmzssuPCnJvnMg_EbQy1Z9kK5z_gQMOFM5qxTSEgJlq",MUTED=!1,AUTOCONVERT=!0,_colour_pickers=[],audioPreviewSvg=document.querySelector("#audio-preview-svg"),ArrowKeys={LEFT:37,UP:38,RIGHT:39,DOWN:40},CurrentSlide=0,Object.defineProperty(props,"duration",{enumerable:!0,get:function(){return this._duration||0},set:function(e){this._duration=e,e>0&&this.split===!1&&splitAudio()}}),localforage.config({name:"AudioPresNinja"}),window.File&&window.FileList&&window.FileReader&&(new XMLHttpRequest).upload){var dragHandler={},pasteHandler={},thisObj=void 0
dragHandler.IsOver=!1,dragHandler.DragEnter=function(e){e.preventDefault(),"move"!=e.dataTransfer.effectAllowed&&(dragHandler.IsOver=!0,setTimeout(function(){dragHandler.IsOver=!1},0),body.classList.add("drag-over"))},dragHandler.DragOver=function(e){e.preventDefault()},dragHandler.DragLeave=function(e){"move"!=e.dataTransfer.effectAllowed&&(dragHandler.IsOver||body.classList.remove("drag-over"),dragHandler.IsOver=!1)},dragHandler.Load=function(e,t,n){var r=new FileReader
r.onabort=function(e){},r.onprogress=function(e){if(e.lengthComputable){Math.round(e.loaded/e.total*100)}},r.onloadstart=function(e){},r.onload=function(r){performance.mark("file-reader-begin")
var i=new Blob([new Uint8Array(r.target.result)])
if("slides"===t)UI.Converting("slide"),dragHandler.convertSlides(e.name,i)
else{UI.Converting("audio")
var a=[];["m4a","wma","wav","weba"].indexOf(n)!==-1&&(a.push("mp3"),a.push("ogg")),"ogg"===n&&(UI.Dom.Audio.AddSource(i,"ogg",!0),UI.Dom.Cache.Save(),a.push("mp3")),"mp3"===n&&(UI.Dom.Audio.AddSource(i,"mp3",!0),UI.Dom.Cache.Save(),a.push("ogg")),_remaining=a.length
for(var o=0;o<_remaining;o++)dragHandler.convertAudio(e.name,n,a[o],i)}},r.readAsArrayBuffer(e)},dragHandler.Drop=function(e){var t=e.clipboardData?e.clipboardData:e.dataTransfer
if(e.srcElement===document.querySelector(".slide-urlzone input"))return!0
if("move"!==t.effectAllowed)if(dragHandler.IsOver=!1,body.classList.remove("drag-over"),t.files.length)for(var n=0;n<t.files.length;n++){var r=t.files[n].name.split(".").pop();["ogg","mp3","m4a","wma","wav","weba"].indexOf(r)!==-1?(e.preventDefault(),dragHandler.Load(t.files[n],"audio",r),$(".audio-urlzone .controls-container").hide()):["ppt","pptx","odp","pdf","key"].indexOf(r)!==-1&&(e.preventDefault(),UI.Dom.Design.SetAspectRatio("16:9"),dragHandler.Load(t.files[n],"slides",r))}else{if("TEXTAREA"===e.target.nodeName||"INPUT"===e.target.nodeName)return!0
var i=t.getData("text/uri-list")||t.getData("url")||t.getData("text/plain")||void 0
if(i.indexOf("slideshare")===-1&&i.indexOf(".google.com")===-1)return!0
i?(e.preventDefault(),oEmbed(i)):console.log("Drop yielded no gatherable data")}},dragHandler.DragStart=function(e){e.dataTransfer.effectAllowed="move"},dragHandler.conversion=function(e,t,n,r){performance.mark("conversion-begin"),e.apikey=CLOUD_CONVERT_APIKEY,e.wait=!0,e.delete=!0,e.download="",e.input="upload"
var i="https://api.cloudconvert.com/convert?"+xhrFields(e),a=new XMLHttpRequest
"slides"!==n&&(a.responseType="arraybuffer"),a.open("POST",i,!0),a.onload=function(){if(200!=a.status)throw new Error("Document conversion error "+a.status)
if("slides"===n)splitDocument(r,a.responseText).then(function(){UI.Dom.Slide.Ready(),splitAudio()})
else{var t=new Blob([new Uint8Array(this.response)],{type:"audio/"+i}),i=e.outputformat
_remaining--,UI.Dom.Audio.AddSource(t,i,!0)}},a.send(t)},dragHandler.convertAudio=function(e,t,n,r){var i={inputformat:t,outputformat:n},a=new FormData
a.append("file",r,e),dragHandler.conversion(i,a,"audio",e)},dragHandler.convertSlides=function(e,t){var n={"converteroptions[bg_format]":"jpg",inputformat:e.split(".").pop().toLowerCase(),outputformat:"html"},r=new FormData
r.append("file",t,e),dragHandler.conversion(n,r,"slides",e)},dragHandler.Input=function(){var e=document.querySelector(".slide-urlzone input").value.trim()
e.length&&oEmbed(e)},body.addEventListener("dragenter",dragHandler.DragEnter,!1),body.addEventListener("dragover",dragHandler.DragOver,!1),body.addEventListener("dragleave",dragHandler.DragLeave,!1),body.addEventListener("drop",dragHandler.Drop,!1),body.addEventListener("dragstart",dragHandler.DragStart,!1),body.addEventListener("paste",dragHandler.Drop,!1),document.querySelector(".slide-urlzone button").addEventListener("click",dragHandler.Input,!1)}var SplitterControl=function(){function e(e){if(0!==props.slides.length&&!props.slides[0].hasOwnProperty("size")){for(var t=[],n=0,r=props.slides.length;n<r;n++)t.push(props.slides[n].cue/e*100)
t.shift(),t.push(100),t.map(function(e,n){var r=0===n?0:t[n-1]
props.slides[n].size=t[n]-r})}}function t(){if(0!==props.duration&&0!==props.slides.length&&!splitterContainer.querySelector(".split-h")){for(var e=[],t=0,n=props.slides.length;t<n;t++)e.push('<div class="split-h" data-index="'+t+'" data-human-index="'+(t+1)+'"><div class="handle"></div></div>')
splitterContainer.innerHTML=e.join("")}}function n(e){var t,n=new WebVTTParser,r=n.parse(props.webvtt,"chapters"),i=[],a=0
for(r.cues.length;t=r.cues[a];a++){var o=(t.endTime-t.startTime)/props.duration*100
i.push(o),props.slides[a].size=o}splitterControl.setSizes(i),e===!0&&UI.Dom.Cache.Save()}function r(e,t,n){var r=e!==!1,i=splitterControl.getSizes()
i.unshift(0),i.reduce(function(e,t,n){const r=e/100*props.duration
return props.slides[n-1].size=t,props.slides[n-1].cue=Math.round(1e3*r)/1e3,e+t}),generateWebVtt(r)}function i(e){console.dir("init splitters"),t()
var n=props.slides.length&&props.slides[0].hasOwnProperty("size")?function(){return props.slides.map(function(e){return e.size})}():null
if(splitterContainerChildren=splitterContainer.querySelectorAll(".split-h"),splitterContainerChildren.length){var i={minSize:1,gutterSize:splitterContainerChildren.length<20?5:splitterContainerChildren.length<50?2:1,snapOffset:0,direction:"horizontal",onDragEnd:r}
null!==n&&(i.sizes=n),splitterControl=Split(Array.from(splitterContainerChildren),i),null===n&&r(!1),e===!0&&r(!0)}}return{Init:i,Adjust:n,CalculateSizes:e}}(),Downloader=function(){var e=function(e,t,n,r){return new Promise(function(i,a){var o=new FileReader
o.onload=function(t){var a=document.implementation.createHTMLDocument(e)
a.documentElement.innerHTML=t.target.result
for(var o=a.documentElement.getElementsByTagName("a"),s=0;s<o.length;s++)o[s].getAttribute("href")&&(o[s].getAttribute("href").indexOf("javascript:")!==-1||o[s].hasAttribute("target")||o[s].setAttribute("target","_blank"));[].forEach.call(a.querySelectorAll("[contenteditable]"),function(e){e.removeAttribute("contenteditable")}),[].forEach.call(a.querySelectorAll("img[src*='data:image']"),function(e){var t=e.getAttribute("src"),i=t.substring(t.indexOf("/")+1,t.indexOf(";")).toLowerCase(),a=md5(t)+"."+i
"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAEAAAABACAMAAACdt4HsAAADAFBMVEUAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAFAAAAAAAAAAACAAAAAAAAAAAAAAAAAAAAAAABAAAGAQEFAQELAgMPAwIRAwUWBAcfBQoYBgUmBwsjCQgqCQwvCwxlDCZfDCNZDCA3DRB3Di1ADxL7D25+DzBUDxv3EGvdEV6NETaGETPeEl3vEmZOEhRVEhrgE17mE2CYEzngFF3oFGGQFDWbFThRFRVWFRjoF15YFxdhGBqoGD2jGDqgGDlbGRdzGh+tGj6pGjzwG16yG0CSHSr9HWRhHRa6H0B2IB39IGLwIFnyIVrvIVj5Il7yIlloIhbBI0BsIxb0JFiwJTPIJkH3J1j1J1jxJ1T4KFfzKVXPKUHxKVG/KTV1KRaOKiH5KlX0K1R6Kxf8LFXxLVD7LlGALhj2LlH8L1LYMECGMBnyMU3PMTeJMRnzMkvtM0neM0H/NFLUNTPlNTunNST4NU2PNRrqNkXkNkLoNjv2Nkn4N0qUNxr/OE7qODv8OUnmOTebOxr/O0zwPDyhPRypPh7/Pkn4P0SsPx/0P0G0QCK3QCP/QEjwQTu8QSX+QkD2RD3CRCb5RT/HRSf+R0D+R0HORyfPSSj9Sz30TDXWTSn9TTz6TTncUCn8UDnsUS7+UjjpUiv8UzP+VDb3VDHjVSj5Vi7lVyf/WDTxWCn/WTPxWSrzWiv+WzHnWyXuWyb+XDDrXCX9XS7zXifxXibyXyXpXyPzXyfwXyXuXyP+YCzwYCPtYiLxYiPvYiLwYiPuYyDxYyLzYyP+ZCn1ZSLxZCLxZSDuZiDyZiDzZiH+ZyfxaR7/aSX2bh33cBz+byD/cB/8dRr6dBr9dxn9dxn/eBn/dxr/dxr/dhr/dRv/dRv/dBz/cx3/biH/bSL/bCP/aiT/REP/QkX/QUb/MVX/LVj/K1n/Klr/KVv/KVv/HGb/Gmf/F2r/FWv/E23/EHD/DXL/DXKQ0dgzAAAA5HRSTlMjJR8bExANCQYBAAAAAAAAAAAAAAAAAAAAAEJHS09QU1U8XWA3Y2ZqN2w2azSOj49pl2H7lZH10p2ezO0tlMHhm9fmoJ5clLyUUq+oo5UnvLazwCD9lsZJ92a1WfBSlMuVSxrRtOtjRenVYxeXQj/pmTXpK5u1Mtqf6BOiYeTe/hEPOLek4+AKX7mo/gwqBan+CLC0/rm4W8DD/gfHKl7NvdD8/TLV/FjZ+7jc+1j9LCj+td0q3v4r/li0/t9a/YP8j4la3q9+efx03pamqGxcnP5eoWjfZGH+3f7f4P7+6eTy9f3T2A6mAAAAAWJLR0QAiAUdSAAACGlJREFUWMOll3tUkmkex3m5CPz3/tc54g5lU03KrOOOZpOXFLecmsnxgjZ0rHa94mYXIzLTIk3pwoSkjDcUFAzFHI5YiUpr5Ko51W7rzrKRDjWTns4aq3jroJS5zwOipeg6s8854nN4n+fD8/wu39/vxaDLj/SwsEPo/xqYFZ6FWa0hpLn5ESb7FwOOTE1PW4Ptc+bs7CxhdQB2YvIF+yxyChL22va/BYCPVwfgTL5ipcNJCoMBCfRoNCdsZmZmdnbr6gBHJyZfWRLZKDuOAQlT09ZI/zdvIMGPtEoAJFhYcRZLHD1kW6xfCP219Q1EbEFWAxCMjwPCpCUp6rNPqK4IBofDIOt+u9VvCyD4wOf7g/yDVgLkcCEhwdsdiU9O3MeKiwsJi2T+8TTBw3v7jD+TGTkLB20FwBEul5vgRYlnHrXAwWDYTRnGPI332T7z1rZ/dpMTQE7JxSvw/3luZqDbEQ40RFJq1BefeYdGxNIZwJ3+TPaarVtmbAA3J4CqsXKRKJ93hh+7MZwzPj5+PMKL6opxAYYnEbEewdumrdbXTEG4HzyEH+IEwBuFBKEwlFqSyeWe8aYi7zmNRNvtb7X6saMhwQ/rBPCt2TxaXi6Kcc3m8zND1+KW+osWZbVu2U/eOvN2N8EJoNIMCTHrzguFGZudOhwl7/IH10CDZvycAVCe3GzOonwrEh10xy+XXuHboSGCPg1Kv7AUcFcuL6NKxspjqaTlEzQ6BBCuboeZMftp5IX3ABI5b32JeTSBSl5JPg7Rrf7h+0FUwogIfg/QodgTIDOfXe/89+fVJN5q3UYOsxO83gE03lVWuNXLZZ5OVSOZZdnrmDOByJz2hwQ/tzlAY3fTDZWqYWeNQp61xP5Xwd9JkJ5fLAjdNJ3GBNnpv4loB7S2NKvValU1pV7Boy7afvIMB1wpZYIV6E6cv830dPBVIBHeyJwXurUtzQARU9OgPIFdBPiGnwmWsSeOg8/kfck5c1JHx0e+pq91uPEbHSQ0rO1QNbgvuf0l7g6byHCO/okNkjOEmS5A2VNTu9KtQch8HNS0a1taKpAbqtKlEZjNj0DZHCgRB0n7WDDB48LRkKkoMj1kzUIgfQcIaTVq9Z7FLhRcucI/i7vC5Y4fjQ3EkhAPn6gky+9RJoOORE5vO7QQiXfatZ61zQ2LTSioEl06I6ShnAjucTcXeyCxLLGEdAbDgwkkIpLtAIhv6agdLXWUhb2VkkoULbEnOErE2U0BZCfRwtrkcuFrhk861GtrZM5cILVdpzRpy+xzMdooqVTKZbmoZCzflydMAA7M5kbYgiLxVZInSDUWIzTHpvjW3WTbpr/0XEOatIW2U4rrwyVKnkIu5xElownISVHmOhAPwBRgP2ciyQt6ep/lqzVfQ620+uAh4HFvrxTT2X4ZppGgSZWXo1Re+1wmP1FpzsChPBE4vSCTD5SYPT4RaHNUoiWKAOrO1PRuKjiB+O8GQ28FrlOXZctqtTqNeENVhJcoqqPlMgTNLo8A4PP8UPAw09sVtQNicQBA96KQUIymf6TPYJDiOnsug0fftzRnUdAOVSlRrFTQquS70JIxHjj9RZsp4ufMDE6Aj2OEbITXwTwZHgaEOkxbTzEJbdVqs0CO3VTV4dB6RZpEXkGuHB37HYhpITSFYyRaIggW1npb5mL+aoKE20hXbwXhpq798m+gIRtUNFSiLM6Rye90mEdPwJjO8Hynfk6GxltC7cqHOVds/M/wiMG123ALq+m5VdAIv21SF6G1Sike6JycZ04FpydRFoQ6Z2LSN8WSSpyLRDKtwDg8sqPV0PsRertH165raxXXqhu+a1JVY6/y5PKYL30XJWnKxMSG5FeW4IVQDugcLhD3GdLQ8FNSXXu7Nq9RDSWiDIvG58VQiItVkjOeSkkEInN4QdIE+mvEtj4pSCaXdQeKr1e73GiuUDfsJDrVR0HmeAQN9iFJhxc0sd/o8Y8Rg4e9gGA9sB0thbs2Iss0X1yuZ8q4rfwGOACap8Y8cd9I4fyim9q6ZcvLJX6qG8feh3zsAHS9fNpJeDBsCHAsEuvaPZbZf5LPD4zm2vqQ1A1zgMdDQy+fHhMbh4vnl7W1H3O+X5wvzKByuNyzX3l/QsXbAZqfB18MvdQTuk3Dhx3rWm8dc15iskVC31x+hu8HCHHejQ8GBiChQPDEpA93LEQQpzUOiEwE5ZLQF/9ucQUASHh+WGM06eNXbK0rZWO89ReFwh3vVWdxgVSq/+n5kH7NI6Op89yK+835m3PLRcLQReUdj8EgHxUMPUT/Bs6gWXZ/rUwu2xmQD5qhVKKzNu/HFw/Re0aT8dEy9u9QKHi+tCozbKdozgD9gy8eCv5sNJm6Gp3sv1mlVPA2h1eBTgYQvnQG+AmYskuc22ky9T1cdA9BbT0o4EXuuVUgwSHhoMtSgMDmjH4N6YQeiMz9exqx4+ytd3Wg/F77nCJRKivKpGdl5tE/4JcCNAOQMPjvB4IP8wACCN39LjDaOtu1oHjWxVBzm1TKPQgBj/1whyfFyRX+NWAbg0M//lOMTyvWj4wYgF739vTodNcLPSm5d1Vq1ZLy9y7gEdj9rDjN88DzoWfdGjLG40BBcWlpWdHlAxsoHq1Ntj6kznUFgPiH0mPuMMLvgbh+2f/gsUbsgsfh8Oc033fp4DVAH1KNrPTCQcbbTasBcQ3S02ga7uvT3we36O2RVuhshGrsql77+gcHAcFYWvAMmhIYovADAq0I9iHS1QF+gKZ8FkNxydXbCLfdYWbuva5tOYVfFQD6Q78JPqoBNWOkL81eE4hpadTVvbmKfx54stH+W3dAQNym/uJ359w06txZxU9Mw6cwv/Ll2zbOFV+mov8PADh3xf79v52XwlPkIy1xAAAAAElFTkSuQmCC"===t?e.parentNode.removeChild(e):(n.file(a,t.substring(t.indexOf("base64,")+7),{base64:!0}),e.setAttribute("src",a),void 0!==r&&r.files.push({href:"data/"+a}))}),[].forEach.call(a.querySelectorAll("script:not([src])"),function(e){var t=e.innerHTML,i=md5(t)+".js"
n.file(i,t),e.innerHTML="",e.setAttribute("type","text/javascript"),e.setAttribute("src",i),void 0!==r&&r.files.push({href:"data/"+i})}),[].forEach.call(a.querySelectorAll("style"),function(e){var t=e.innerHTML,i=md5(t)+".css"
n.file(i,t)
var a=document.createElement("link")
a.setAttribute("rel","stylesheet"),a.setAttribute("type","text/css"),a.setAttribute("href",i),e.parentNode.replaceChild(a,e),void 0!==r&&r.files.push({href:"data/"+i})}),n.file(e,"<!doctype html>"+a.documentElement.outerHTML),void 0!==r&&r.files.push({href:"data/"+e}),i(e)},o.readAsText(t)})},t=function(e){var t=e.el.dataset.destination
if(""==document.querySelector("input[name='option-course-name']").value.trim())return performAlert("Hold up there chief!","<p>You need to at least name your course.</p>"),void e.stop(-1)
if(0===splitterContainer.querySelectorAll(".split-h").length&&SplitterControl.Init(!0),0===splitterContainer.querySelectorAll(".split-h").length)return performAlert("Uh oh!","<p>It looks like there are no slide markers. Try re-visiting the Slide Markers tab, or if that fails reloading your browser (it's ok, your data will stick around).</p>"),void e.stop(-1)
if(!document.querySelector("#sources .slide-processing").classList.contains("done")||!document.querySelector("#sources .audio-processing").classList.contains("done"))return performAlert("Wait a bit longer","<p>Either your Slides or your Audio are not yet ready - please wait or try again before you download.</p>"),void e.stop(-1)
switch(t){case"kloudless":var s=window.Kloudless.explorer({app_id:KLOUDLESS_APP_ID,types:["folders"],flavor:"chooser",retrieve_token:!0})
s.on("success",function(t){n(r,e,t)}),s.on("cancel",function(){e.stop(-1)}),s.choose()
break
case"download":n(o,e)
break
case"publish":n(i,e)
break
case"preview":n(a,e)}},n=function(t,n,r){performance.mark("createpackage-begin")
var i=(n.el.getAttribute("data-destination"),8),a=1/i,o=0,s=document.querySelector("input[name='option-course-name']").value.trim(),l=s.replace(/\s/g,"_").replace(/[^0-9a-zA-Z_]/g,"").toLowerCase(),u=document.querySelector("input[name='option-course-api']:checked").value,c=[l,u,"zip"].join("."),d=new JSZip,f=d.folder("data"),h={creator:"presninja",files:[{href:"pres.ninja"},{href:"index.html"},{href:"data/media.vtt"},{href:"data/media.ogg"},{href:"data/media.mp3"},{href:"_package.js"},{href:"_package.css"}]}
Promise.resolve().then(function(){return props.score?(props.timestamp=(new Date).getTime().toString(36),props.tier=App.Tier,props.api=u,i+=props.slides.length-1,a=1/i,o+=a,n.setProgress(o),Promise.resolve(props)):(performAlert("Missing score","No score has been set, or was set to zero (Current value: "+props.score+"). You can change this on the Slide Markers page.</p>"),void n.stop(-1))}).then(function(e){return o+=a,n.setProgress(o),e.score-=1,Promise.all([d.file("index.html",Handlebars.templates.playerhtml(e)),d.file("_package.js",Handlebars.templates.playerjs(e)),d.file("_package.css",Handlebars.templates.playercss(e))])}).then(function(t){var r=props.slides.map(function(t){return new Promise(function(r,i){localforage.getItem(t.fileid).then(function(i){o+=a,n.setProgress(o),r(e(t.fileid+".html",i,f,h))})})})
return Promise.all(r)}).then(function(e){var t={name:props.name,timestamp:props.timestamp,description:props.description,files:[]}
Array.from(new Set(h.files.map(function(e){return e.href}))).forEach(function(e,n){t.files.push({href:e})}),o+=a,n.setProgress(o),d.file("imsmanifest.xml",Handlebars.templates[props.api+"manifest"](t))}).then(function(e){var t=["mp3","ogg","webvtt"].map(function(e){return new Promise(function(t,r){localforage.getItem(e).then(function(r){o+=a,n.setProgress(o),"webvtt"===e?f.file("media.vtt",r):f.file("media."+e,r),t()})})})
return Promise.all(t)}).then(function(e){return fetch("/app/compiled/"+u+".zip")}).then(function(e){return e.arrayBuffer()}).then(function(e){return d.loadAsync(e)}).then(function(e){return o+=a,n.setProgress(o),d.file("pres.ninja",JSON.stringify(props)),o+=a,n.setProgress(o),d.generateAsync({type:"blob"})}).then(function(e){performance.mark("createpackage-end"),t(e,c,r),n.stop(1)}).catch(function(e){console.log(e),n.stop(-1)})},r=function(e,t,n,r){$.ajax({beforeSend:function(e){$("div.progress-button[data-destination='kloudless'] > button > span").html("<i class='fa fa-circle-o-notch fa-spin'></i> Uploading ..."),e.setRequestHeader("X-Kloudless-Metadata",JSON.stringify({parent_id:r[0].id,name:t}))},url:"https://api.kloudless.com/v0/accounts/"+r[0].account+"/files",method:"POST",contentType:"application/octet-stream",headers:{Authorization:"Bearer "+r[0].bearer_token.key},data:e,processData:!1,success:function(e,t){$("div.progress-button[data-destination='kloudless'] > button > span").html("<i class='ninja-upload2'></i> Save to Cloud"),alert("Your package has been uploaded.")}})},i=function(e,t){$("div.progress-button[data-destination='publish'] > button > span").html("<i class='fa fa-circle-o-notch fa-spin'></i> Uploading ...")
var n=XMLHttpRequest?new XMLHttpRequest:new ActiveXObject("Microsoft.XMLHttp"),r=new FormData
r.append("file",e,t),n.open(App.Method,App.Publish,!0),n.onload=function(e){$("div.progress-button[data-destination='preview'] > button > span").html("<i class='ninja-upload'></i> Publish to LMS"),200==this.status&&alert("Your package has been uploaded.")},n.setRequestHeader("Authorization","Bearer "+App.Bearer),n.setRequestHeader("X-Filename",t),n.send(r)},a=function(e,t){$("div.progress-button[data-destination='preview'] > button > span").html("<i class='fa fa-circle-o-notch fa-spin'></i> Uploading ...")
var n=XMLHttpRequest?new XMLHttpRequest:new ActiveXObject("Microsoft.XMLHttp"),r=new FormData
r.append("file",e,t),n.open("POST","https://preview.coursesuite.ninja/",!0),n.onload=function(e){if($("div.progress-button[data-destination='preview'] > button > span").html("<i class='fa fa-eye'></i> Open in Preview Ninja"),200==this.status){var t=JSON.parse(this.responseText),n=window.open(t.href,"previewninja")
null!=n&&"undefined"!=typeof n||performAlert("Popup blocked!","<p>We tried to popup up the window, but your browser has blocked it (check your browser location bar). Please allow popups from this site, or copy and open this link:</p><p><a target='_blank' href='"+t.href+"'>"+t.href+"</a></p>")}},n.setRequestHeader("Authorization",location.search),n.setRequestHeader("X-Filename",t),n.send(r)},o=function(e,t,n){saveAs(e,t)}
return{Begin:t}}(),UI=function(){function e(){return document.getElementById("page-audio-obj")}function t(e){0===props.duration&&e.target.readyState>0&&(props.duration=e.target.duration,splitAudio())}var n=function(n,r,i){var a=e()
a.removeEventListener("loadedmetadata",t),a.addEventListener("loadedmetadata",t)
var o=document.createElement("source")
o.setAttribute("src",URL.createObjectURL(n)),o.setAttribute("type","audio/"+("ogg"===r?"ogg":"mpeg")),a.appendChild(o),$(".audio-dropzone p").html("Audio was converted to "+r),0===_remaining&&UI.Dom.Audio.Ready(),i===!0&&(localforage.setItem(r,n),UI.Dom.Cache.Save())},r=function(t){var n=e(),r=n.querySelector("track")
r||(r=document.createElement("track"),r.setAttribute("kind","chapters"),r.setAttribute("defualt",!0),n.appendChild(r)),r.setAttribute("src","data:text/vtt,"+props.webvtt),chapterControl.value=props.webvtt,t===!0&&(localforage.setItem("webvtt",props.webvtt),UI.Dom.Cache.Save())},i=function(e){$("."+e+"-dropzone p").html("Converting "+e+" to HTML5 ... please wait")},a=function(e){var t=arguments.length>1&&void 0!==arguments[1]?arguments[1]:0,n=arguments.length>2&&void 0!==arguments[2]?arguments[2]:"",r=document.querySelector("#timeline .marker[data-fileid='"+e+"']")
r?(t&&(r.querySelector(".time").textContent=hhmmss(t),r.querySelector(".time").setAttribute("data-seconds",t)),n&&(r.querySelector("textarea").value=n)):document.getElementById("timeline").insertAdjacentHTML("beforeend",Handlebars.templates.marker({fileid:e,caption:n,seconds:t}))},o=function(e){window.confirm("This action can't be undone - are you sure?")&&localforage.removeItem(e,function(){var t=document.querySelector("#timeline .marker[data-fileid='"+e+"']")
t&&t.parentNode.removeChild(t),UI.Dom.Cache.Save()})},s=debounce(function(){return props.aspectRatio=document.querySelector(".aspect-ratio.active > span").textContent,props.colours=document.getElementById("fiddle").textContent,props.size=document.forms["design-options"].size.value,props.width=document.forms["design-options"].width.value,props.height=document.forms["design-options"].height.value,props.volume=document.forms["design-options"].volume.value,props.name=document.forms.settings.elements["option-course-name"].value,props.description=document.forms.settings.elements["option-course-description"].value,props.copyright=document.forms.settings.elements["option-course-copyright"].value,props.api=document.forms.settings.elements["option-course-api"].value,localforage.setItem("props",props)},999),l=function(){return new Promise(function(e,t){localforage.getItem("props").then(function(t){[["split",void 0],["slides",[]],"webvtt",["duration",0],["score",0],"colours","name","description","copyright",["api","scorm12"],["range-colour","rgb(3,145,206)"],["bg-colour","rgb(255,255,255)"],["text-colour","rgb(0,0,0)"],["body-text-colour","rgb(3,145,206)"],["body-bg-colour","rgb(0,0,0)"],["volume","80"],["width","800"],["height","600"],["size","responsive"],["aspectRatio","16:9"]].forEach(function(e){Array.isArray(e)?props[e[0]]=t&&t[e[0]]||e[1]:props[e]=t&&t[e]||""}),UI.Dom.Design.SetAspectRatio(props.aspectRatio),document.getElementById("fiddle").textContent=props.colours,document.getElementById("range-colour").setAttribute("data-default",props["range-colour"]),document.getElementById("bg-colour").setAttribute("data-default",props["bg-colour"]),document.getElementById("text-colour").setAttribute("data-default",props["text-colour"]),document.getElementById("body-bg-colour").setAttribute("data-default",props["body-bg-colour"]),document.getElementById("body-text-colour").setAttribute("data-default",props["body-text-colour"]),document.forms["design-options"].volume.value=props.volume,document.forms["design-options"].querySelector("[value='"+props.size+"']").checked=!0,document.forms["design-options"].width.value=props.width,document.forms["design-options"].height.value=props.height,document.forms.settings.elements["option-course-name"].value=props.name,document.forms.settings.elements["option-course-description"].value=props.description,document.forms.settings.elements["option-course-copyright"].value=props.copyright,document.forms.settings.querySelector("[value='"+props.api+"']").checked=!0,generateWebVtt(!1),["ogg","mp3"].forEach(function(e){localforage.getItem(e).then(function(t){t&&UI.Dom.Audio.AddSource(t,e,!1)})}),props.slides.length>0&&UI.Dom.Slide.Ready(),props.duration>0&&UI.Dom.Audio.Ready(),e()})})},u=function(e){props.slides[e]
previewPageNumber.textContent=e+1,previewPageNumber.classList.add("puff"),setTimeout(function(){previewPageNumber.classList.remove("puff")},550),localforage.getItem(props.slides[e].fileid).then(function(e){previewFrame.setAttribute("src",window.URL.createObjectURL(e))})},c=function(){localforage.setItem("bodyclases",body.className)},d=function(){localforage.getItem("bodyclases",function(e,t){t&&(body.className=t)})},f=function(){document.querySelector("#sources .audio-processing").classList.add("done")
var t=e()
t.addEventListener("timeupdate",function(e){audioScrubControl.value=t.currentTime,audioTimeCurrent.textContent=HHMMSS(t.currentTime)
var n=t.currentTime/props.duration*100
audioScrubPlayed.style.width=n+"%"
for(var r=0;r<props.slides.length;r++){var i=props.slides[r].cue,a=props.slides[r+1]?props.slides[r+1].cue:props.duration
t.currentTime<a&&t.currentTime>=i&&(t.slide=r)}},!1),t.addEventListener("progress",function(e){if(!t.buffered.end)return void(audioScrubPrecache.style.width="0")
if(t.buffered.length>0){var n=t.buffered.end(t.buffered.length-1)/props.duration*100
audioScrubPrecache.style.width=n+"%"}}),t.addEventListener("playing",function(e){audioCueControl.innerHTML="<span class='pn-pause'></span>"},!1),t.addEventListener("pause",function(e){audioCueControl.innerHTML="<span class='pn-play'></span>"},!1),t.addEventListener("seeking",function(e){audioCueControl.innerHTML="<span class='pn-seek' title='buffering'></span>"},!1),t.addEventListener("stalled",function(e){audioCueControl.innerHTML="<span class='pn-seek' title='stalled'></span>"},!1),t.addEventListener("ended",function(e){audioCueControl.innerHTML="<span class='pn-stop'></span>"},!1),audioVolumeControl.addEventListener("input",function(e){t.volume=~~e.target.value/100}),splitterContainer.addEventListener("click",function(e){var n=e.srcElement
if(n.classList.contains("handle")){var r=~~n.parentNode.dataset.index
t.currentTime=props.slides[r].cue,t.play()}},!1),audioCueControl.addEventListener("click",function(e){t.playing?t.pause():(t.currentTime===props.duration&&(t.currentTime=0),t.play())}),audioScrubControl.addEventListener("input",function(e){t.currentTime=this.value}),audioCueControl.innerHTML="<span class='pn-play'></span>",audioTimeCurrent.textContent="00:00",audioTimeTotal.textContent=HHMMSS(props.duration),audioScrubControl.setAttribute("max",props.duration),audioScrubControl.value=0,t.currentTime=0,t.load()},h=function(){document.querySelector("#sources .slide-presentation").classList.add("done"),document.querySelector("#sources .slide-processing").classList.add("done"),UI.Nav.Slides.Show()},p=function(e){var t=[]
_colour_pickers.forEach(function(e){switch(props[e[1].id]=e[0].colorRGB,e[1].id){case"bg-colour":t.push(".audio-preview > svg > rect { fill: "+e[0].colorHex+";} ")
break
case"range-colour":t.push(".audio-preview > svg > g:last-of-type > * { fill: "+e[0].colorHex+";} ")
break
case"text-colour":t.push(".audio-preview > svg > g:first-of-type > * { fill: "+e[0].colorHex+";} ")}}),document.getElementById("fiddle").textContent=t.join("\n"),e!==!1&&UI.Dom.Cache.Save()},m=function(e){props.aspectRatio=e,[].forEach.call(document.querySelectorAll(".aspect-ratio > span"),function(t){t.textContent===e?t.parentNode.classList.add("active"):t.parentNode.classList.remove("active")})},g=function(e){var t=props.slides[CurrentSlide]
t&&t.fileid&&(previewInfo.textContent="Slide "+(CurrentSlide+1)+" of "+props.slides.length,previewTitle.textContent=t.label,localforage.getItem(t.fileid).then(function(t){null===t&&e!==!0?setTimeout(g,199,!0):previewIframe.setAttribute("src",window.URL.createObjectURL(t))}))},v=function(){CurrentSlide>0&&(CurrentSlide--,UI.Nav.Slides.Show())},b=function(){CurrentSlide<props.slides.length-1&&(CurrentSlide++,UI.Nav.Slides.Show())}
return{Converting:i,Dom:{Slide:{Add:a,Update:a,Remove:o,Preview:u,Ready:h},Audio:{AddSource:n,AddTrack:r,Ready:f},Cache:{Save:s,Load:l},Settings:{Save:c,Load:d},Design:{Compute:p,SetAspectRatio:m}},Nav:{Slides:{Show:g,Left:v,Right:b}}}}()
$(function(){if(performance.mark("jquery-init"),document.addEventListener("keydown",function(e){var t=e.keyCode||e.which
switch(t){case ArrowKeys.LEFT:UI.Nav.Slides.Left()
break
case ArrowKeys.RIGHT:UI.Nav.Slides.Right()}},!1),$(document.body).css("margin-top",function(){return $("#banner").height()+$("#tabs").height()+"px"}()),$(".continue-button button").on("click",function(){$("a[data-tab='slides']",nav).trigger("click")}),$(nav).on("click","a[data-tab]",function(e){e.preventDefault(),loader.show(),document.body.classList.remove("settings","sources","slides","design","download"),MUTED||snd.play(),setTimeout(function(){window.scrollTo(0,0),document.body.classList.add(e.target.dataset.tab),loader.hide(),UI.Dom.Settings.Save()},2*speed)}),chapterControl.addEventListener("input",function(e){var t,n=new WebVTTParser,r=n.parse(e.target.value,"chapters"),i=[],a=0
for(r.errors.length;t=r.errors[a];a++)i.push("<li value='"+t.line+"''>"+(t.col?"Column "+t.col+", ":"")+t.message+"</li>")
chapterFeedback.innerHTML=i.length?"<ol>"+i.join("")+"</ol>":"",i.length||(props.webvtt=e.target.value,SplitterControl.Adjust(!0))},!1),completionInput.addEventListener("input",function(e){this.nextElementSibling.value=this.value,props.score=this.value,UI.Dom.Cache.Save()},!1),UI.Dom.Cache.Load().then(function(){[].forEach.call(document.querySelectorAll(".tinycolorpicker"),function(e){var t=tinycolorpicker(e)
_colour_pickers.push([t,e]),t.setColor(e.dataset.default),e.addEventListener("change",function(){UI.Dom.Design.Compute(!0)},!1)})}).then(function(){UI.Dom.Design.Compute(!1),null===document.querySelector("section#sources .done + .done + .continue-button")&&document.querySelector("a[data-tab='slides']").setAttribute("data-ready","false")}).then(function(){const e=new MutationObserver(function(e){e.forEach(function(e){if("attributes"===e.type&&"class"===e.attributeName)if(document.body.classList.contains("slides")){if(null!==document.querySelector("section#sources .done + .done + .continue-button")&&document.querySelector("a[data-tab='slides']").removeAttribute("data-ready"),null===document.querySelector("section#sources .done + .done + .continue-button"))return performAlert("Missing content","<p>You need to add your audio and presentation before you can modify the slide markers.</p>"),void $("a[data-tab='sources']").trigger("click")
if(splitterContainer.innerHTML="",SplitterControl.Init(!0),props.slides.length>0){var t=~~props.score
console.dir(t),completionInput.setAttribute("max",props.slides.length),completionInput.value=0===t?props.slides.length:t,completionInput.nextElementSibling.value=completionInput.value,triggerEvent(completionInput,"input")}$(chapterControl).textareaLinesNumbers()}else document.body.classList.contains("download")&&0===document.querySelector("input[name='option-course-name']").value.trim().length&&props.slides.length>0&&(document.querySelector("input[name='option-course-name']").value=props.slides[0].label.replace(" - Page 1",""))})})
e.observe(document.body,{attributes:!0,attributeOldValue:!0,attributeFiter:["class"],characterData:!1})}).then(function(){UI.Dom.Settings.Load()}),$("#clearStorage").on("click",function(e){e.preventDefault(),$("#confirm").addClass("active"),$("#reset-hint-text").text("Really?")}),$("#cancelReset").on("click",function(e){e.preventDefault(),$("#confirm").removeClass("active"),$("#reset-hint-text").text("Reset")}),$("#confirmReset").on("click",function(e){_player&&_player.destroy(),e.preventDefault(),$("#confirm").removeClass("active"),$("#reset-hint-text").text("Reset"),localforage.clear().then(function(){location.reload(!0)})}),[].forEach.call(document.querySelectorAll(".progress-button"),function(e){new UIProgressButton(e,{callback:function(e){},onbegin:Downloader.Begin})}),$("#alert").on("click","button",function(e){$("#alert").removeClass("pop"),$("#alert-text").html("")}),$("#cog").on("click","a",function(e){e.preventDefault()
var t=(e.currentTarget.dataset.action?e.currentTarget.dataset.action:e.currentTarget.parentNode.dataset.action).replace("toggle-","")
document.body.classList.toggle(t),UI.Dom.Settings.Save(),MUTED=body.classList.contains("mute"),AUTOCONVERT=!body.classList.contains("no-autoconvert")}),[].forEach.call(aspectRatios,function(e){e.addEventListener("click",function(e){[].forEach.call(aspectRatios,function(t){t.classList[t===e.target.parentNode?"add":"remove"]("active")}),UI.Dom.Cache.Save()})}),document.forms["design-options"].querySelector("select").addEventListener("change",UI.Dom.Cache.Save,!1),$("input[name]").on("change",function(e){UI.Dom.Cache.Save()}),$('a[href="#webvtt-editor"]').on("click",function(e){e.preventDefault()
var t=$(this.getAttribute("href"))
t.toggleClass("visible"),t.hasClass("visible")?this.innerHTML="<i class='fa fa-fw fa-compress'></i> Hide chapter editor":this.innerHTML="<i class='fa fa-fw fa-expand'></i> Show chapter editor"}),navigator.mediaDevices){(function(){var e=document.querySelector('[data-action="record"]'),t=e.querySelector("span"),n=document.querySelector('[data-action="delete"]'),r=document.querySelector('[data-action="use"]'),i=document.getElementById("recorder-audio"),a=document.querySelector("canvas.visualiser"),o={audio:!0},s=[]
e.classList.add("visible"),a.classList.add("visible")
var l=function(o){e.removeEventListener("click",c)
var l=new MediaRecorder(o,{mimeType:"audio/webm"}),u=!1,d=document.getElementById("recorder-timestamp")
recordingTimestamp=0,recordingTimerResolution=50,recordingInterval=void 0,recordingTimer=function(){recordingTimestamp+=recordingTimerResolution,props.slides.length&&(props.slides[CurrentSlide].cue=Math.round(recordingTimestamp/1e3*1e3)/1e3,props.split=!0),d.innerHTML=HHMMSS(recordingTimestamp/1e3)},visualize(a,o),e.addEventListener("click",function(){n.classList.remove("visible"),r.classList.remove("visible"),u?(t.textContent="Record",e.classList.remove("button-error"),e.classList.add("button-secondary"),u=!1,l.stop(),clearInterval(recordingInterval)):(s=[],t.textContent="Stop",e.classList.add("button-error"),e.classList.remove("button-secondary"),u=!0,l.start(),recordingInterval=setInterval(recordingTimer,recordingTimerResolution))},!1),l.addEventListener("stop",function(t){var o=new Blob(s,{type:"audio/ogg; codecs=opus"})
i.src=window.URL.createObjectURL(o),r.classList.add("visible"),i.classList.add("visible"),a.classList.remove("visible"),e.classList.remove("visible"),n.classList.add("visible"),clearInterval(recordingInterval)},!1),n.addEventListener("click",function(){s=[],a.classList.add("visible"),r.classList.remove("visible"),i.pause(),i.removeAttribute("src"),i.classList.remove("visible"),e.classList.add("visible"),n.classList.remove("visible"),recordingTimestamp=0,d.innerHTML=""},!1),l.addEventListener("dataavailable",function(e){s.push(e.data)},!1),r.addEventListener("click",function(){UI.Converting("audio"),props.slides.length&&props.split===!0&&SplitterControl.CalculateSizes(recordingTimestamp/1e3)
var e=new Blob(s,{type:"audio/ogg; codecs=opus"}),t=["ogg","mp3"]
_remaining=t.length
for(var n=0;n<_remaining;n++)dragHandler.convertAudio("microphone.oga","oga",t[n],e)},!1)},u=function(e){console.log("The following error occured: "+e)},c=function(){navigator.mediaDevices.getUserMedia(o).then(l,u)}
navigator.mediaDevices.enumerateDevices().then(function(e){return e.some(function(e){return"audioinput"===e.kind&&""!==e.label})}).then(function(t){t?c():e.addEventListener("click",c,!1)})})()}else $(".audio-urlzone .controls-container").hide(),$("small.microphone").hide()
$('a[data-action="pop-help"]').on("click",function(e){e.preventDefault(),PopupCenter(this.href,"Help & Documentation",650,~~($(window).height()/5*4))})})
