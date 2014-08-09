'use strict';

function World(game){
	this.game = game;

	this.entities = {
		'playerWeapons': [],
		'bushes': []
	};

	// Scatter bushes around the world (stub)
	for(var i = 0; i < 300; i++){
		var x = Math.random()*4000 - 2000;
		var y = Math.random()*4000 - 2000;
		this.add(new Bush(this.game, x, y), 'bushes');
	}
}
World.prototype.add = function(entity, group){
	if(!(group in this.entities)){
		this.entities[group] = [];
	}
	this.entities[group].push(entity);
	entity.group = group;
};
World.prototype.remove = function(entity, group){
	group = group || entity.group;
	var index = this.entities[group].indexOf(entity);
	if(index >= 0){
		this.entities[group].splice(index, 1);
	}
};
World.prototype.update = function(delta){
	Object.keys(this.entities).forEach(function(group){
		this.entities[group].forEach(function(entity){
			entity.update(delta);
		});
	}.bind(this));
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
	Object.keys(this.entities).forEach(function(group){
		this.entities[group].forEach(function(entity){
			entity.light(canvas, ctx);
		});
	}.bind(this));
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
	Object.keys(this.entities).forEach(function(group){
		this.entities[group].forEach(function(entity){
			entity.render(canvas, ctx);
		});
	}.bind(this));

	ctx.restore();
}
