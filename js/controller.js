function Controller(game){
	this.game = game;

	document.addEventListener('mousemove', function(event){
		this.game.player.angle = Math.atan2(
			event.pageY - this.game.canvas.height/2,
			event.pageX - this.game.canvas.width/2
		);
	}.bind(this));

	document.addEventListener('keydown', function(event){
		event.preventDefault();
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
		}
	}.bind(this));

	document.addEventListener('keyup', function(event){
		event.preventDefault();
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
		}
	}.bind(this));
}
