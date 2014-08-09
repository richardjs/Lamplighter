'use strict';

function World(game){
	this.game = game;

	this.entities = [];

	//this.add(new Bush(this, 0, -50));

	for(var i = 0; i < 200; i++){
		var x = Math.random()*4000 - 2000;
		var y = Math.random()*4000 - 2000;
		this.add(new Bush(this, x, y));
	}
}
World.prototype.add = function(entity, at_front){
	if(at_front){
		this.entities.unshift(entity);
	}else{
		this.entities.push(entity);
	}
};
World.prototype.remove = function(entity){
	this.entities.splice(
		this.entities.indexOf(entity), 1
	);
};
World.prototype.update = function(delta){
	this.entities.forEach(function(entity){
		entity.update(delta);
	});
};
World.prototype.render = function(canvas, ctx){
	ctx.save();

	// Fill with black
	ctx.fillStyle = '#000';
	ctx.fillRect(0, 0, canvas.width, canvas.height);

	// Translate to put player in the center of the canvas
	ctx.translate(
		this.game.canvas.width/2 - this.game.player.x,
		this.game.canvas.height/2 - this.game.player.y
	);

	// Clip to lighted areas
	ctx.beginPath();
	this.entities.forEach(function(entity){
		entity.light(canvas, ctx);
	});
	ctx.clip();

	// Draw the lit background
	// Since we're translated, we need the left and top values
	// player's to the player's position
	ctx.fillStyle = '#001a00';
	ctx.fillRect(
		this.game.player.x - this.game.canvas.width/2,
		this.game.player.y - this.game.canvas.height/2,
		canvas.width,
		canvas.height
	);
	// Render entities
	this.entities.forEach(function(entity){
		entity.render(canvas, ctx);
	});

	ctx.restore();
}
