function Controller(game){
	this.game = game;

	this.mouseX = 0;
	this.mouseY = 0;

	this.flameTimer = 0;
	this.flameOn = false;

	this.fireballTimer = 0;

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
				this.game.player.dy = -PLAYER_SPEED;
				break;
			case 'S':
				this.game.player.dy = PLAYER_SPEED;
				break;
			case 'A':
				this.game.player.dx = -PLAYER_SPEED;
				break;
			case 'D':
				this.game.player.dx = PLAYER_SPEED;
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
				if(this.game.player.dy === -PLAYER_SPEED){
					this.game.player.dy = 0;
				}
				break;
			case 'S':
				if(this.game.player.dy === PLAYER_SPEED){
					this.game.player.dy = 0;
				}
				break;
			case 'A':
				if(this.game.player.dx === -PLAYER_SPEED){
					this.game.player.dx = 0;
				}
				break;
			case 'D':
				if(this.game.player.dx === PLAYER_SPEED){
					this.game.player.dx = 0;
				}
				break;
			default:
				return;
		}
		event.preventDefault();
	}.bind(this));
}
Controller.prototype.update = function(delta){
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
