'use strict';

function Freezer(game){
	this.game = game;
	this.world = game.world;
	this.player = this.game.player;
	this.entities = this.game.world.entities;
	this.frozen = [];
	this.timer = FREEZER_DELAY;

	this.xFreezeDistance = FREEZER_MARGIN + window.innerWidth/2;
	this.yFreezeDistance = FREEZER_MARGIN + window.innerHeight/2;
}
Freezer.prototype.update = function(delta){
	if(this.timer < 0){
		this.check();
		this.timer = FREEZER_DELAY;
	}
	this.timer -= delta;
};
Freezer.prototype.check = function(){
	var toFreeze = [];
	var count = 0;
	Object.keys(this.entities).forEach(function(group){
		this.entities[group].forEach(function(entity){
			// For now, lamps need to be left out, so roads show up
			count++;
			if(entity.group == 'lamps'){
				return;
			}
			var diffX = Math.abs(this.player.x - entity.x);
			var diffY = Math.abs(this.player.y - entity.y);
			if(this.shouldFreeze(entity)){
				toFreeze.push(entity);
			}
		}.bind(this));
	}.bind(this));

	var toThaw = [];
	this.frozen.forEach(function(entity){
		if(!this.shouldFreeze(entity)){
			toThaw.push(entity);
		}
	}.bind(this));

	toFreeze.forEach(function(entity){
		this.world.remove(entity);
		this.frozen.push(entity);
	}.bind(this));
	toThaw.forEach(function(entity){
		var index = this.frozen.indexOf(entity);
		this.frozen.splice(index, 1);
		this.world.add(entity, entity.group);
	}.bind(this));
}
Freezer.prototype.shouldFreeze = function(entity){
	var diffX = Math.abs(this.player.x - entity.x);
	var diffY = Math.abs(this.player.y - entity.y);
	return diffX > this.xFreezeDistance || diffY > this.yFreezeDistance;
};
