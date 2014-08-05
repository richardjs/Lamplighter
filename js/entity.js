'use strict';

function Entity(game, image, x, y, angle, speed){
	this.game = game;
	this.image = image;

	this.x = x;
	this.y = y;

	this.angle = angle || 0;
	this.speed = speed || 0;
	this.dx = .05;
	this.dy = 0;
}
Entity.prototype.updateDirection = function(){
};
Entity.prototype.update = function(delta){
	this.x += this.dx * delta;
	this.y += this.dy;
};
Entity.prototype.light = function(canvas, ctx){};
Entity.prototype.render = function(canvas, ctx, angle){
	angle = angle || this.angle;
	ctx.save();
	ctx.translate(
		this.x - this.image.width/2,
		this.y - this.image.height/2
	)
	ctx.rotate(angle);
	ctx.drawImage(this.image, 0, 0);
};

