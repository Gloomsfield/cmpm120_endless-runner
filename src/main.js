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
	scale: {
		width: 4 * 100,
		height: 3 * 100,
		zoom: 1.5,
	},
	antialias: false,
	roundPixels: true,
	scene: [ Load, Start, Credits, Game, RenderTarget3D, Scene3D, Death ],
};

let game = new Phaser.Game(phaser_config);

let tunnel_diameter = phaser_config.width / 4.0;

