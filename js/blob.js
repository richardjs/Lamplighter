'use strict';

function Blob(game, x, y){
	this.speed = Math.random()*(BLOB_MAX_SPEED - BLOB_MIN_SPEED) + BLOB_MIN_SPEED;
	this.size = Math.random()*(BLOB_MAX_SIZE - BLOB_MIN_SIZE) + BLOB_MIN_SIZE;

	Entity.call(this, game, blobImage, {
		x: x,
		y: y,
		speed: this.speed,
		collideRadius: this.size/2
	});

	this.imageScale = this.size / this.image.width;


	this.imageAngle = 0;
	this.imageRotateSpeed = Math.PI * BLOB_MAX_ROTATE_SPEED * Math.random();
	if(Math.random() < .5){
		this.imageRotateSpeed *= -1;
	}

}
Blob.prototype = Object.create(Entity.prototype);
Blob.prototype.constructor = Blob;
Blob.prototype.update = function(delta){
	Entity.prototype.update.call(this, delta);
	this.imageAngle += this.imageRotateSpeed * delta / 1000;

	this.angle = Math.atan2(
		this.game.player.y - this.y,
		this.game.player.x - this.x
	);
	this.updateDirection();
}
Blob.prototype.render = function(canvas, ctx){
	Entity.prototype.render.call(
		this, canvas, ctx, this.imageAngle, this.imageScale
	);
}
Blob.prototype.explode = function(){
	this.game.world.remove(this);
}
