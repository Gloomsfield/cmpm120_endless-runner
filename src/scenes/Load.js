class Load extends Phaser.Scene {
	constructor() {
		super('load_scene');
	}

	preload() {
		game.renderer.pipelines.add('debug-orb_pipeline', new DebugOrbPipeline());

		this.load.text('debug-orb_vert-source', 'assets/shaders/debug-orb_vert.glsl');
		this.load.text('debug-orb_frag-source', 'assets/shaders/debug-orb_frag.glsl');

		this.load.image('car', 'assets/car.jpg');

		this.load.once('complete', () => {
			this.cache.shader.add(
			 	'debug-orb_shader',
				new Phaser.Display.BaseShader(
					'debug-orb_shader',
					this.cache.text.get('debug-orb_frag-source'),
					this.cache.text.get('debug-orb_vert-source'),
					{
						projection_matrix: { type: 'mat4', value: camera_projection_matrix },
						view_matrix: { type: 'mat4', value: [] }
					}
				)
			);

			this.scene.start('game_scene');
		});
	}
}
