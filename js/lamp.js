'use strict';

var LAMPSTAND_LIT_IMAGE = document.getElementById('lampstandLitImage');
var LAMPSTAND_UNLIT_IMAGE = document.getElementById('lampstandUnlitImage');

function Lampstand(game, x, y){
	Entity.call(this, game, LAMPSTAND_UNLIT_IMAGE, {
		x: x,
		y: y
	});
	this.onFire = false;
	this.fireballTimer = 0;

	this.game.world.add(new Road(
		game,
		0, 0,
		this.x, this.y
	), 'roads');
}
Lampstand.prototype = Object.create(Entity.prototype);
Lampstand.prototype.constructor = Lampstand;
Lampstand.prototype.update = function(delta){
	Entity.prototype.update.call(this, delta);
	if(this.onFire){
		if(this.lumens < LAMPSTAND_LUMENS){
			this.lumens += LAMPSTAND_LUMENS_SPEED * delta / 1000;
		}
		if(this.lumens > LAMPSTAND_LUMENS){
			this.lumens = LAMPSTAND_LUMENS;
		}

		if(this.fireballTimer <= 0){
			this.game.world.add(new Fireball(
				this.game,
				this.x,
				this.y,
				this.x,
				this.y
			));
			this.fireballTimer = LAMPSTAND_FIREBALL_DELAY;
		}
		if(this.fireballTimer > 0){
			this.fireballTimer -= delta;
		}
	}
}
Lampstand.prototype.render = function(canvas, ctx){
	Entity.prototype.render.call(this, canvas, ctx);
}
Lampstand.prototype.setOnFire = function(){
	this.onFire = true;
	this.image = LAMPSTAND_LIT_IMAGE;
	this.game.player.levelUp();
}
