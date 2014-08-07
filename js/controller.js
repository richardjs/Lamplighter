function Controller(game){
	this.game = game;

	document.addEventListener('mousemove', function(event){
		this.game.player.angle = Math.atan2(
			event.pageY - this.game.canvas.height/2,
			event.pageX - this.game.canvas.width/2
		);
	}.bind(this));
}
