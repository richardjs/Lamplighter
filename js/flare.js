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
}
Flare.prototype = Object.create(Entity.prototype);
Flare.prototype.constructor = Flare;
