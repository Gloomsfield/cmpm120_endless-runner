// amory acosta
// CMPM120 - endless runner project
//
// title: TODO
// work hours: TODO
//
// creative tilt & justification
// TODO

let phaser_config = {
	type: Phaser.WEBGL,
	width: 640,
	height: 480,
	antialias: false,
	roundPixels: true,
	scene: [ Debug, ],
};

let game = new Phaser.Game(phaser_config);

let tunnel_diameter = phaser_config.width / 5.0;

