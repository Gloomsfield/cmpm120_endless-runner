// amory acosta
// CMPM120 - endless runner project
//
// title: TODO
// work hours: TODO
//
// creative tilt & justification
// TODO

const VIEWPORT_DIMENSIONS = {
	width: 640,
	height: 480
};

let phaser_config = {
	type: Phaser.WebGL,
	width: VIEWPORT_DIMENSIONS.width,
	height: VIEWPORT_DIMENSIONS.height,
	antialias: false,
	roundPixels: true,
	scene: [ ],
};

let game = new Phaser.Game(phaser_config);

