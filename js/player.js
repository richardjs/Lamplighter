'use strict';

var playerImage = document.getElementById('playerImage');

function Player(game){
	Entity.call(this, game, playerImage, {
		x: 0,
		y: 0,
		lumens: PLAYER_LUMENS
	});
}
Player.prototype = Object.create(Entity.prototype);
Player.prototype.constructor = Player;
Player.prototype.shootFlame = function(){
	var spread = Math.random()*FLAME_SPREAD - FLAME_SPREAD/2;
	this.game.world.add(new Flare(
		this.game,
		this.x,
		this.y,
		this.angle + spread,
		FLAME_SPEED,
		FLAME_LUMENS,
		FLAME_TTL
	), 'playerWeapons');
};
Player.prototype.shootFireball = function(targetX, targetY){
	this.game.world.add(new Fireball(
		this.game,
		this.x,
		this.y,
		targetX,
		targetY
	));
}
