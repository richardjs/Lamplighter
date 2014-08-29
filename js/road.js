'use strict';

function Road(game, startX, startY, endX, endY){
	this.game = game;
	this.startX = startX;
	this.startY = startY;
	this.endX = endX;
	this.endY = endY;
}
Road.prototype = Object.create(Entity.prototype);
Road.prototype.constructor = Road;
Road.prototype.render = function(canvas, ctx){
	ctx.strokeStyle = ROAD_COLOR;
	ctx.lineWidth = ROAD_WIDTH;
	ctx.beginPath();
	ctx.moveTo(this.startX, this.startY);
	ctx.lineTo(this.endX, this.endY);
	ctx.stroke();
}
