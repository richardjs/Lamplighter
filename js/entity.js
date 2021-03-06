'use strict';

function Entity(game, image, options){
	this.game = game;
	this.image = image;

	this.x = options.x || 0;
	this.y = options.y || 0;
	this.angle = options.angle || 0;
	this.speed = options.speed || 0;
	this.dx = options.dx || 0;
	this.dy = options.dx || 0;
	this.lumens = options.lumens || 0;
	this.collideRadius = options.collideRadius || this.image.width/2;

	if(options.dx === undefined && options.dy === undefined){
		this.updateDirection();
	}
}
Entity.prototype.updateDirection = function(){
	this.dx = Math.cos(this.angle) * this.speed;
	this.dy = Math.sin(this.angle) * this.speed;
};
Entity.prototype.update = function(delta){
	this.x += this.dx * delta / 1000;
	this.y += this.dy * delta / 1000;
};
Entity.prototype.light = function(canvas, ctx){
	if(this.lumens > 0){
		ctx.moveTo(this.x, this.y);
		ctx.arc(this.x, this.y, this.lumens, 0, Math.PI*2);
	}
};
Entity.prototype.render = function(canvas, ctx, angle, scale){
	angle = angle || this.angle;
	scale = scale || 1;
	ctx.save();
	ctx.translate(
		this.x,
		this.y
	)
	ctx.rotate(angle);
	ctx.scale(scale, scale);
	ctx.drawImage(
		this.image, 
		-this.image.width/2,
		-this.image.height/2
	);
	ctx.restore();
};
Entity.prototype.collideTest = function(other){
	var collideDistance = this.collideRadius + other.collideRadius;
	if(Math.abs(this.x - other.x) >= collideDistance){
		return false;
	}
	if(Math.abs(this.y - other.y) >= collideDistance){
		return false;
	}
	var distance = Math.sqrt(Math.pow(this.x - other.x, 2) + Math.pow(this.y - other.y, 2));
	return distance < collideDistance;
}
