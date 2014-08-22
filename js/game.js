'use strict';

function Game(canvas){
	var game = this;

	this.canvas = canvas;
	this.canvas.width = window.innerWidth;
	this.canvas.height = window.innerHeight;
	window.addEventListener('resize', function(){
		game.canvas.width = window.innerWidth;
		game.canvas.height = window.innerHeight;
	});
	this.ctx = canvas.getContext('2d');

	this.world = new World(this);
	this.player = new Player(this);
	this.world.add(this.player, 'player');
	this.controller = new Controller(this);
	this.collider = new Collider(this);
	this.spawner = new Spawner(this);

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

		game.world.render(game.canvas, game.ctx);

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

		window.requestAnimationFrame(frame);
	}
	window.requestAnimationFrame(frame);
}

window.addEventListener('load', function(){
	var canvas = document.getElementById('screen');
	window.game = new Game(canvas);
});
