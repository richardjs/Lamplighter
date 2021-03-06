'use strict';

function Collider(game){
	this.game = game;
	this.entities = this.game.world.entities;
}
Collider.prototype.update = function(delta){
	this.entities.playerWeapons.forEach(function(weapon){
		this.entities.bushes.forEach(function(bush){
			if(weapon.collideTest(bush)){
				if(!bush.onFire){
					bush.setOnFire();
				}
			}
		});
		this.entities.lamps.forEach(function(lamp){
			if(weapon.collideTest(lamp)){
				if(!lamp.onFire){
					lamp.setOnFire();
				}
			}
		});
		this.entities.blobs.forEach(function(blob){
			if(weapon.collideTest(blob)){
				this.game.world.remove(weapon);
				blob.hit();
			}
		}.bind(this));
	}.bind(this));

	this.entities.blobs.forEach(function(blob){
		if(!blob.stuck){
			if(blob.collideTest(this.game.player)){
				blob.stick();
				this.game.player.hurt();
			}
		}
	}.bind(this));

	this.entities.lamps.forEach(function(lamp){
		if(lamp.onFire){
			if(lamp.collideTest(this.game.player)){
				this.game.player.recover();
			}
		}
	}.bind(this));
}
