'use strict';

function World(game){
	this.game = game;

	this.entities = [];

	this.add(new Entity(
		this.game,
		document.getElementById('fireburst'),
		100, 100
	));
}
World.prototype.add = function(entity){
	this.entities.push(entity);
};
World.prototype.remove = function(entity){
	this.entites.splice(
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

	ctx.fillStyle = '#000';
	ctx.fillRect(0, 0, canvas.width, canvas.height);

	ctx.beginPath();
	this.entities.forEach(function(entity){
		entity.light(canvas, ctx);
	});
	//ctx.clip();

	ctx.fillStyle = '#001a00';
	ctx.fillRect(0, 0, canvas.width, canvas.height);
	this.entities.forEach(function(entity){
		entity.render(canvas, ctx);
	});

	ctx.restore();
}
