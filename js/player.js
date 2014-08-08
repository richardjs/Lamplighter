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
