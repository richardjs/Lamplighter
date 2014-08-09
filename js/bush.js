'use strict';

var BUSH_IMAGE = document.getElementById('bushImage');

function Bush(game, x, y){
	Entity.call(this, game, BUSH_IMAGE, {
		x: x,
		y: y,
		angle: Math.random() * Math.PI*2
	});
	this.onFire = false;
	this.flare = null;
}
Bush.prototype = Object.create(Entity.prototype);
Bush.prototype.contructor = Bush;
Bush.prototype.update = function(delta){
	Entity.prototype.update.call(this, delta);
	if(this.flare){
		this.flare.update(delta);
	}
};
Bush.prototype.light = function(canvas, ctx){
	Entity.prototype.light.call(this, canvas, ctx);
	if(this.flare){
		this.flare.light(canvas, ctx);
	}
};
Bush.prototype.render = function(canvas, ctx){
	Entity.prototype.render.call(this, canvas, ctx);
	if(this.flare){
		this.flare.render(canvas, ctx);
	}
};
Bush.prototype.setOnFire = function(){
	this.onFire = true;
	this.flare = new Flare(
		this.game,
		this.x,
		this.y,
		0,
		0,
		50,
		null
	);
};
