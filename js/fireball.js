'use strict';

var FIREBALL_IMAGE = document.getElementById('fireballImage');

function Fireball(game, x, y, targetX, targetY){
	Entity.call(this, game, FIREBALL_IMAGE, {
		x: x,
		y: y,
		angle: Math.atan2(targetY - y, targetX - x),
		speed: FIREBALL_SPEED,
		lumens: FIREBALL_LUMENS 
	});
	this.targetX = targetX;
	this.targetY = targetY;

	var distance = Math.sqrt(
		Math.pow(x - targetX, 2) + Math.pow(y - targetY, 2)
	);
	this.ttl = distance/FIREBALL_SPEED * 1000;
}
Fireball.prototype = Object.create(Entity.prototype);
Fireball.prototype.constructor = Fireball;
Fireball.prototype.update = function(delta){
	Entity.prototype.update.call(this, delta);

	this.ttl -= delta;
	if(this.ttl <= 0){
		this.explode();
	}
};
Fireball.prototype.explode = function(){
	this.game.world.remove(this);
	for(var i = 0; i < FIREBALL_FLARES; i++){
		this.game.world.add(new Flare(
			this.game,
			this.x,
			this.y,
			Math.PI*2 * Math.random(),
			FIREBALL_FLARES_MAX_SPEED * Math.random(),
			FIREBALL_FLARES_LUMENS,
			FIREBALL_FLARES_MAX_TTL * Math.random()
		), 'playerWeapons');
	}
};
