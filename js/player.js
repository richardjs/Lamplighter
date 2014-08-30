'use strict';

var playerImage = document.getElementById('playerImage');

function Player(game){
	this.level = 0;
	setPlayerLevel(this.level);
	Entity.call(this, game, playerImage, {
		x: 0,
		y: 0,
		lumens: PLAYER_LUMENS,
		collideRadius: PLAYER_COLLIDE_RADIUS
	});

	this.damage = 0;
}
Player.prototype = Object.create(Entity.prototype);
Player.prototype.constructor = Player;
Player.prototype.weaponOrigin = function(){
	var vectorX = PLAYER_WEAPON_SPAWN_DISTANCE_X;
	var vectorY = PLAYER_WEAPON_SPAWN_DISTANCE_Y;
	var offsetX = vectorX*Math.cos(this.angle) - vectorY*Math.sin(this.angle);
	var offsetY = vectorX*Math.sin(this.angle) + vectorY*Math.cos(this.angle);
	return {
		x: this.x + offsetX,
		y: this.y + offsetY
	}
}
Player.prototype.shootFlame = function(){
	if(this.level - this.damage < 0){
		return;
	}
	var weaponOrigin = this.weaponOrigin();
	var spread = Math.random()*FLAME_SPREAD - FLAME_SPREAD/2;
	this.game.world.add(new Flare(
		this.game,
		weaponOrigin.x,
		weaponOrigin.y,
		this.angle + spread,
		FLAME_SPEED,
		FLAME_LUMENS,
		FLAME_TTL
	), 'playerWeapons');
};
Player.prototype.shootFireball = function(targetX, targetY){
	if(this.level - this.damage < 0){
		return;
	}
	var weaponOrigin = this.weaponOrigin();
	this.game.world.add(new Fireball(
		this.game,
		weaponOrigin.x,
		weaponOrigin.y,
		targetX,
		targetY
	));
};
Player.prototype.levelUp = function(){
	this.level++;
	setPlayerLevel(this.level);
	this.lumens = PLAYER_LUMENS;
};
Player.prototype.hurt = function(){
	if(this.level - this.damage > -1){
		this.damage++;
		setPlayerLevel(this.level - this.damage);
		this.lumens = PLAYER_LUMENS;
	}
};
Player.prototype.recover = function(){
	this.damage = 0;
	setPlayerLevel(this.level);
	this.lumens = PLAYER_LUMENS;
}
