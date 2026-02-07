class Play extends Phaser.Scene {
	constructor() {
		super('play_scene');
	}

	preload() {
		this.load.glsl({
			key: 'organism_frag-shader',
			shaderType: 'fragment',
			url: './assets/shaders/organism_frag.glsl'
		});
	}

	create() {
		this.scene.launch('game_scene');
	}
}
