// amory acosta
// CMPM120 - endless runner project
//
// title: sisyphus, the hellbound boulderer
// work hours: ~60. i stopped counting around there.
//
// creative tilt & justification
// i essentially wrote my own 3d renderer for
// this project, while still using phaser's event
// system, animation handler, and ultimately code
// structure. this was very ambitious, and
// honestly my game suffered for it. i'm not sure
// why i'm arguing against myself when i'm
// supposed to be stating my case... but i digress.
// i worked very hard on this project-- much harder
// than i needed to. if i'd focused more on the
// "game" aspect of the game, i'm sure i'd have
// something more substantial.
// next time!

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

