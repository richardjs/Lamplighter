'use strict';

var playerImage = document.getElementById('playerImage');

function Player(game){
	Entity.call(this, game, playerImage, {
		x: 0,
		y: 0,
		lumens: 65
	});
}
Player.prototype = Object.create(Entity.prototype);
Player.prototype.constructor = Player;
