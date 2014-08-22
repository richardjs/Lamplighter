'use strict';

function Spawner(game){
	this.game = game;
	this.world = game.world;

	this.blobSpawnTimer = Math.random()*(BLOB_SPAWN_MAX_DELAY - BLOB_SPAWN_MIN_DELAY) + BLOB_SPAWN_MIN_DELAY;
}
Spawner.prototype.update = function(delta){
	if(this.blobSpawnTimer < 0){
		var relativeX = Math.random()*(BLOB_SPAWN_MAX_DISTANCE - BLOB_SPAWN_MIN_DISTANCE) + BLOB_SPAWN_MIN_DISTANCE;
		if(Math.random() < .5){
			relativeX *= -1;
		}
		var relativeY = Math.random()*(BLOB_SPAWN_MAX_DISTANCE - BLOB_SPAWN_MIN_DISTANCE) + BLOB_SPAWN_MIN_DISTANCE;
		if(Math.random() < .5){
			relativeY *= -1;
		}
		this.world.add(new Blob(
			this.game,
			this.game.player.x + relativeX,
			this.game.player.y + relativeY
		), 'blobs');
		this.blobSpawnTimer = Math.random()*(BLOB_SPAWN_MAX_DELAY - BLOB_SPAWN_MIN_DELAY) + BLOB_SPAWN_MIN_DELAY;
	}
	if(this.blobSpawnTimer > 0){
		this.blobSpawnTimer -= delta;
	}
}
