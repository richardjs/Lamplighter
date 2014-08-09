'use strict';

var BUSH_IMAGE = document.getElementById('bushImage');

function Bush(game, x, y){
	Entity.call(this, game, BUSH_IMAGE, {
		x: x,
		y: y,
		angle: Math.random() * Math.PI*2
	});
}
Bush.prototype = Object.create(Entity.prototype);
Bush.prototype.contructor = Bush;
