'use strict';

function Entity(game, image, options){
	this.game = game;
	this.image = image;

	this.x = options.x || 0;
	this.y = options.y || 0;
	this.angle = options.angle || 0;
	this.speed = options.speed || 0;
	this.dx = options.dx || .05;
	this.dy = options.dx || 0;
	this.lumens = options.lumens || 0;
}
Entity.prototype.updateDirection = function(){
};
Entity.prototype.update = function(delta){
	this.x += this.dx * delta;
	this.y += this.dy;
};
Entity.prototype.light = function(canvas, ctx){
	if(this.lumens > 0){
		ctx.moveTo(this.x, this.y);
		ctx.arc(this.x, this.y, this.lumens, 0, Math.PI*2);
	}
};
Entity.prototype.render = function(canvas, ctx, angle){
	angle = angle || this.angle;
	ctx.save();
	ctx.translate(
		this.x - this.image.width/2,
		this.y - this.image.height/2
	)
	ctx.rotate(angle);
	ctx.drawImage(this.image, 0, 0);
	ctx.restore();
};

