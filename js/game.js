'use strict';

function Game(canvas){
	var game = this;

	this.canvas = canvas;
	this.canvas.width = window.innerWidth;
	this.canvas.height = window.innerHeight;
	window.addEventListener('resize', function(){
		game.canvas.width = window.innerWidth;
		game.canvas.height = window.innerHeight;

		// Update freeze distance
		game.freezer.xFreezeDistance = FREEZER_MARGIN + window.innerWidth/2;
		game.freezer.yFreezeDistance = FREEZER_MARGIN + window.innerHeight/2;
	});
	this.ctx = canvas.getContext('2d');

	this.world = new World(this);
	this.player = new Player(this);
	this.world.add(this.player, 'player');
	this.controller = new Controller(this);
	this.collider = new Collider(this);
	this.spawner = new Spawner(this);
	this.freezer = new Freezer(this);
	this.freezer.check();

	var lastTime = 0;
	var fpsTime = 0;
	var fpsThisSecond = 0;
	var fpsLastSecond = 0;
	function frame(time){
		var delta = time - lastTime;
		lastTime = time;

		game.world.update(delta);
		game.controller.update(delta);
		game.collider.update(delta);
		game.spawner.update(delta);
		game.freezer.update(delta);

		game.world.render(game.canvas, game.ctx);

		if(DEBUG){
			fpsThisSecond++;
			fpsTime += delta;
			if(fpsTime > 1000){
				fpsTime -= 1000;
				fpsLastSecond = fpsThisSecond;
				fpsThisSecond = 0;
			}
			game.ctx.font = '20px courier';
			game.ctx.fillStyle = '#fff';
			game.ctx.fillText(fpsLastSecond + ' FPS', 10, 30);

			var entityCount = 0;
			Object.keys(game.world.entities).forEach(function(group){
				entityCount += game.world.entities[group].length;
			});
			game.ctx.font = '14px courier';
			game.ctx.fillText(
				entityCount + ' entities (' + game.freezer.frozen.length + ' frozen)',
				10, 50
			);
		}

		window.requestAnimationFrame(frame);
	}
	window.requestAnimationFrame(frame);
}

window.addEventListener('load', function(){
	var canvas = document.getElementById('screen');
	window.game = new Game(canvas);
});
