'use strict';

function Collider(game){
	this.game = game;
	this.entities = this.game.world.entities;
}
Collider.prototype.update = function(delta){
	this.entities['playerWeapons'].forEach(function(weapon){
		this.entities['bushes'].forEach(function(bush){
			if(weapon.collideTest(bush)){
				if(!bush.onFire){
					bush.setOnFire();
				}
			}
		});
	}.bind(this));
}
