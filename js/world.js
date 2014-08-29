'use strict';

function World(game){
	this.game = game;
	// We need to add this here, so created entities can use it right away
	this.game.world = this;

	this.entities = {
		'roads': [],
		'bushes': [],
		'lamps': [],
		'playerWeapons': [],
		'player': [],
		'blobs': []
	};

	// Scatter bushes around the world
	for(var i = 0; i < BUSH_COUNT; i++){
		var x = Math.random()*BUSH_SPREAD - BUSH_SPREAD/2;
		var y = Math.random()*BUSH_SPREAD - BUSH_SPREAD/2;
		this.add(new Bush(this.game, x, y), 'bushes');
	}

	// Add lampstands
	var angle = Math.PI*2 * Math.random();
	for(var i = 0; i < 7; i++){
		var distance = (LAMPSTAND_MAX_DISTANCE - LAMPSTAND_MIN_DISTANCE)*Math.random() + LAMPSTAND_MIN_DISTANCE;
		var x = Math.sin(angle) * distance;
		var y = Math.cos(angle) * distance;
		this.add(new Lampstand(this.game, x, y), 'lamps');
		angle += (Math.PI*2)/7;
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
