'use strict';

var FLARE_IMAGE = document.getElementById('flareImage');

function Flare(game, x, y, angle, speed, lumens, ttl){
	Entity.call(this, game, FLARE_IMAGE, {
		x: x,
		y: y,
		angle: angle,
		speed: speed,
		lumens: lumens
	});
	this.ttl = ttl;

	this.imageAngle = 0;
	this.imageRotateSpeed = Math.PI * FLARE_MAX_ROTATE_SPEED * Math.random();
	if(Math.random() < .5){
		this.imageRotateSpeed *= -1;
	}
}
Flare.prototype = Object.create(Entity.prototype);
Flare.prototype.constructor = Flare;
Flare.prototype.update = function(delta){
	Entity.prototype.update.call(this, delta);
	this.imageAngle += this.imageRotateSpeed * delta / 1000;
	
	if(this.ttl !== null){
		this.ttl -= delta;
		if(this.ttl < 0){
			this.game.world.remove(this);
		}
	}
}
Flare.prototype.render = function(canvas, ctx){
	Entity.prototype.render.call(
		this, canvas, ctx, this.imageAngle
	);
};
