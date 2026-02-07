class Play extends Phaser.Scene {
	constructor() {
		super('play_scene');
	}

	preload() {
		this.load.text('organism_vert-source', 'assets/shaders/organism_vert.glsl');
		this.load.text('organism_frag-source', 'assets/shaders/organism_frag.glsl');
	}

	create() {
		this.cache.shader.add(
		 	'organism_shader',
			new Phaser.Display.BaseShader(
				'organism_shader',
				this.cache.text.get('organism_frag-source'),
				this.cache.text.get('organism_vert-source')
			)
		);

		this.scene.launch('game_scene');
	}
}
