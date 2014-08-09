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
	this.game.world.add(new Flare(
		this.game,
		this.x,
		this.y,
		this.angle,
		FLAME_SPEED,
		FLAME_LUMENS,
		FLAME_TTL
	), true);
};
