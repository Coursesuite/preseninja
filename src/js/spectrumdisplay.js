function SpectrumDisplay(e, t) {
    this.rootElement = e,
    this.canvasRef = document.createElement("canvas"),
    this.canvasRef.id = "editor-spectrum",
    this.canvasRef.height = 100,
    t.appendChild(this.canvasRef),
    this.canvasRef.width = t.clientWidth,
    this.canvasRef.height = t.clientHeight,
    this.buffer = new Float32Array(this.canvasRef.width),
    this.min = -150,
    this.max = 0,
    this.range = this.max - this.min,
    this.minRange = this.canvasRef.height,
    this.updateBuffer = function(e) {
        this.min = -150,
        this.max = 0;
        for (var t = 0; t < this.buffer.length; ++t) {
            var i = e[Math.round(e.length / this.buffer.length * t)];
            i = Math.min(this.max, Math.max(this.min, i));
            this.buffer[t] = i;
        }
    }, this.paintSpectrum = function() {
        var e = this.canvasRef.getContext("2d");
        e.clearRect(0, 0, this.canvasRef.width, this.canvasRef.height), e.strokeStyle = "#369bd7", e.beginPath();
        for (var t = this.canvasRef.height / this.range, i = 0; i < this.buffer.length - 1; ++i) e.moveTo(i + .5, -1 * this.buffer[i] * t), e.lineTo(i + 1.5, -1 * this.buffer[i + 1] * t);
        e.stroke(), e.fillStyle = e.strokeStyle, e.fillText(Math.round(this.max) + " db", 0, 20), e.fillText(Math.round(this.min) + " db", 0, this.canvasRef.height)
    }
}


record_spectrum = new SpectrumDisplay(i.parent(),i[0]);

record_node.onaudioprocess=function(e){
	if(recording){
		for(var t=e.inputBuffer.getChannelData(0),i=[],o=0;o<t.length;++o)i.push(150*t[o]-150);record_spectrum.updateBuffer(i),record_spectrum.paintSpectrum()
	}
}

<canvas id="editor-spectrum" height="105" width="1030"></canvas>