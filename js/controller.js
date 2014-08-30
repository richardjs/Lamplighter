'use strict';

function Controller(game){
	this.game = game;

	this.mouseX = 0;
	this.mouseY = 0;

	this.flameTimer = 0;
	this.flameOn = false;

	this.fireballTimer = 0;

	this.keyStates = {
		left: false,
		right: false,
		up: false,
		down: false
	}

	document.addEventListener('mousemove', function(event){
		this.game.player.angle = Math.atan2(
			event.pageY - this.game.canvas.height/2,
			event.pageX - this.game.canvas.width/2
		);
		this.mouseX = event.pageX;
		this.mouseY = event.pageY;
	}.bind(this));

	document.addEventListener('mousedown', function(event){
		switch(event.button){
			case 0:
				this.flameOn = true;
				break
			case 2:
				if(this.fireballTimer <= 0){
					this.game.player.shootFireball(
						event.pageX - this.game.canvas.width/2 + this.game.player.x,
						event.pageY - this.game.canvas.height/2 + this.game.player.y
					);
					this.fireballTimer = FIREBALL_DELAY;
				}
				break;
		}
	}.bind(this));
	document.addEventListener('mouseup', function(event){
		if(event.button == 0){
			this.flameOn = false;
		}
	}.bind(this));

	document.addEventListener('contextmenu', function(event){
		event.preventDefault();
	}.bind(this));

	document.addEventListener('keydown', function(event){
		var c = String.fromCharCode(event.keyCode);
		switch(c){
			case 'W':
				this.keyStates.up = true;
				break;
			case 'S':
				this.keyStates.down = true;
				break;
			case 'A':
				this.keyStates.left = true;
				break;
			case 'D':
				this.keyStates.right = true;
				break;
			default:
				return;
		}
		event.preventDefault();
	}.bind(this));

	document.addEventListener('keyup', function(event){
		var c = String.fromCharCode(event.keyCode);
		switch(c){
			case 'W':
				this.keyStates.up = false;
				break;
			case 'S':
				this.keyStates.down = false;
				break;
			case 'A':
				this.keyStates.left = false;
				break;
			case 'D':
				this.keyStates.right = false;
				break;
			default:
				return;
		}
		event.preventDefault();
	}.bind(this));
}
Controller.prototype.update = function(delta){
	this.game.player.dx = 0;
	this.game.player.dy = 0;
	if(this.keyStates.up){
		this.game.player.dy -= PLAYER_SPEED;
	}
	if(this.keyStates.down){
		this.game.player.dy += PLAYER_SPEED;
	}
	if(this.keyStates.left){
		this.game.player.dx -= PLAYER_SPEED;
	}
	if(this.keyStates.right){
		this.game.player.dx += PLAYER_SPEED;
	}

	if(this.flameTimer > 0){
		this.flameTimer -= delta;
	}
	if(this.flameOn && this.flameTimer <= 0){
		this.game.player.shootFlame();
		this.flameTimer = FLAME_DELAY;
	}

	if(this.fireballTimer > 0){
		this.fireballTimer -= delta;
	}
};
