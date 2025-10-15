(function (cjs, an) {

var p; // shortcut to reference prototypes
var lib={};var ss={};var img={};
lib.ssMetadata = [
		{name:"NEWTON_atlas_1", frames: [[0,0,200,100]]}
];


(lib.AnMovieClip = function(){
	this.actionFrames = [];
	this.ignorePause = false;
	this.gotoAndPlay = function(positionOrLabel){
		cjs.MovieClip.prototype.gotoAndPlay.call(this,positionOrLabel);
	}
	this.play = function(){
		cjs.MovieClip.prototype.play.call(this);
	}
	this.gotoAndStop = function(positionOrLabel){
		cjs.MovieClip.prototype.gotoAndStop.call(this,positionOrLabel);
	}
	this.stop = function(){
		cjs.MovieClip.prototype.stop.call(this);
	}
}).prototype = p = new cjs.MovieClip();
// symbols:



(lib.Mobil = function() {
	this.initialize(ss["NEWTON_atlas_1"]);
	this.gotoAndStop(0);
}).prototype = p = new cjs.Sprite();



(lib.Tween1 = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = true; }
if (reversed == null) { reversed = false; }
	var props = new Object();
	props.mode = mode;
	props.startPosition = startPosition;
	props.labels = {};
	props.loop = loop;
	props.reversed = reversed;
	cjs.MovieClip.apply(this,[props]);

	// Layer_1
	this.instance = new lib.Mobil();
	this.instance.setTransform(-100,-50);

	this.timeline.addTween(cjs.Tween.get(this.instance).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-100,-50,200,100);


// stage content:
(lib.NEWTON = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = true; }
if (reversed == null) { reversed = false; }
	var props = new Object();
	props.mode = mode;
	props.startPosition = startPosition;
	props.labels = {};
	props.loop = loop;
	props.reversed = reversed;
	cjs.MovieClip.apply(this,[props]);

	// Layer_2
	this.instance = new lib.Tween1("synched",0);
	this.instance.setTransform(128,198);

	this.timeline.addTween(cjs.Tween.get(this.instance).to({x:592.9,y:1124.35},49).wait(1));

	// Layer_1
	this.shape = new cjs.Shape();
	this.shape.graphics.f("#FFFFFF").s().p("EAhfBfqQiBgJhkgfQgBgGAEgFQAFgFAGgCQAJgCARAEQCAAhC/AAQBsABDZgEQgCglALgoQAGgbAJgUQALgYANgXQBRiUCAhuQAVgTAPgGQAVgIAnAFQAsAGASgEIAFAPQgTAKgoACQgsABgSAGQgZAJgcAdQhwBohECJQgiBFgDAxQgBASgCAHQgDAOgIAHQgJAHgYAAIjKABIguABQh6AAhDgFgEgjbBeYQhUhsh2hEQg0gehYglQhkgqhLgZQhgghhVgPQhSgPhpgEQhAgDh+ABIgEgPQANgGAjgBQBxgBA0ABQBcADBIAMQBlARB1AqQBRAdCAA6QA3AYAbAOQAsAYAgAYQAWASA0A0IA5A6QAOAOAKAAQANABAPgUQAQgZAOgJQAYgPATALIAFAPQguAOgZArQgLAUgIAFQgGADgGAAQgTAAgXgfgEg1ZhX5QgMgDgEgKQAegLAmglQAxgwAOgKQAogcA7gJQAmgGBHgBIF6gCQBjgBAzgFQBTgIA+gaQAfgNAkgVQAWgNArgcIBLgyQAwggAWgUQAjggAOgkQALgaAEgHQAKgRAPgBQAKAGgBAOQgBAMgHANQglBEhMA+QgvAlhjA9QgtAbgTALQglATgfALQgyAShCAGQgpAEhPABImvADQg0ABgZADQgrAEgfAPQgZAMgaAWQgTAQgbAcQgVAWgOAFQgGACgGAAIgKgCgEAvqhaUQgtAAgbgEQgdgFgigOQgTgHgqgTQhSgmg7gUQhOgbhFgJQgggDhAgDIpagYQgbgBgFgOQAWgIAxABIH5AQQBnADA3AGQBYAKBCAYQARAGB2A3QBRAmA6AHQAcADAugBIBmgBQA6AAAggGQAygIAfgZQAPgLAagfQAZgdAQgMQANANgKAVQgHARgSAPQgoAkgXAQQgmAZgjAHQgSAEgsAAg");
	this.shape.setTransform(371.4801,634.3577);

	this.timeline.addTween(cjs.Tween.get(this.shape).wait(50));

	this._renderFirstFrame();

}).prototype = p = new lib.AnMovieClip();
p.nominalBounds = new cjs.Rectangle(388,661.7,326.9,585.3);
// library properties:
lib.properties = {
	id: '504DBB63A220B849BD68ED0E69BB5635',
	width: 720,
	height: 1280,
	fps: 24,
	color: "#191970", // Biru Dongker Tua
	opacity: 1.00,
	manifest: [
		{src:"images/NEWTON_atlas_1.png", id:"NEWTON_atlas_1"}
	],
	preloads: []
};



// bootstrap callback support:

(lib.Stage = function(canvas) {
	createjs.Stage.call(this, canvas);
}).prototype = p = new createjs.Stage();

p.setAutoPlay = function(autoPlay) {
	this.tickEnabled = autoPlay;
}
p.play = function() { this.tickEnabled = true; this.getChildAt(0).gotoAndPlay(this.getTimelinePosition()) }
p.stop = function(ms) { if(ms) this.seek(ms); this.tickEnabled = false; }
p.seek = function(ms) { this.tickEnabled = true; this.getChildAt(0).gotoAndStop(lib.properties.fps * ms / 1000); }
p.getDuration = function() { return this.getChildAt(0).totalFrames / lib.properties.fps * 1000; }

p.getTimelinePosition = function() { return this.getChildAt(0).currentFrame / lib.properties.fps * 1000; }

an.bootcompsLoaded = an.bootcompsLoaded || [];
if(!an.bootstrapListeners) {
	an.bootstrapListeners=[];
}

an.bootstrapCallback=function(fnCallback) {
	an.bootstrapListeners.push(fnCallback);
	if(an.bootcompsLoaded.length > 0) {
		for(var i=0; i<an.bootcompsLoaded.length; ++i) {
			fnCallback(an.bootcompsLoaded[i]);
		}
	}
};

an.compositions = an.compositions || {};
an.compositions['504DBB63A220B849BD68ED0E69BB5635'] = {
	getStage: function() { return exportRoot.stage; },
	getLibrary: function() { return lib; },
	getSpriteSheet: function() { return ss; },
	getImages: function() { return img; }
};

an.compositionLoaded = function(id) {
	an.bootcompsLoaded.push(id);
	for(var j=0; j<an.bootstrapListeners.length; j++) {
		an.bootstrapListeners[j](id);
	}
}

an.getComposition = function(id) {
	return an.compositions[id];
}


an.makeResponsive = function(isResp, respDim, isScale, scaleType, domContainers) {		
	var lastW, lastH, lastS=1;		
	window.addEventListener('resize', resizeCanvas);		
	resizeCanvas();		
	function resizeCanvas() {			
		var w = lib.properties.width, h = lib.properties.height;			
		var iw = window.innerWidth, ih=window.innerHeight;			
		var pRatio = window.devicePixelRatio || 1, xRatio=iw/w, yRatio=ih/h, sRatio=1;			
		if(isResp) {                
			if((respDim=='width'&&lastW==iw) || (respDim=='height'&&lastH==ih)) {                    
				sRatio = lastS;                
			}				
			else if(!isScale) {					
				if(iw<w || ih<h)						
					sRatio = Math.min(xRatio, yRatio);				
			}				
			else if(scaleType==1) {					
				sRatio = Math.min(xRatio, yRatio);				
			}				
			else if(scaleType==2) {					
				sRatio = Math.max(xRatio, yRatio);				
			}			
		}
		domContainers[0].width = w * pRatio * sRatio;			
		domContainers[0].height = h * pRatio * sRatio;
		domContainers.forEach(function(container) {				
			container.style.width = w * sRatio + 'px';				
			container.style.height = h * sRatio + 'px';			
		});
		stage.scaleX = pRatio*sRatio;			
		stage.scaleY = pRatio*sRatio;
		lastW = iw; lastH = ih; lastS = sRatio;            
		stage.tickOnUpdate = false;            
		stage.update();            
		stage.tickOnUpdate = true;		
	}
}
an.handleSoundStreamOnTick = function(event) {
	if(!event.paused){
		var stageChild = stage.getChildAt(0);
		if(!stageChild.paused || stageChild.ignorePause){
			stageChild.syncStreamSounds();
		}
	}
}
an.handleFilterCache = function(event) {
	if(!event.paused){
		var target = event.target;
		if(target){
			if(target.filterCacheList){
				for(var index = 0; index < target.filterCacheList.length ; index++){
					var cacheInst = target.filterCacheList[index];
					if((cacheInst.startFrame <= target.currentFrame) && (target.currentFrame <= cacheInst.endFrame)){
						cacheInst.instance.cache(cacheInst.x, cacheInst.y, cacheInst.w, cacheInst.h);
					}
				}
			}
		}
	}
}


})(createjs = createjs||{}, AdobeAn = AdobeAn||{});
var createjs, AdobeAn;
