class Load extends Phaser.Scene {
	constructor() {
		super('load_scene');
	}

	preload() {
		this.load.text('default_vertex', 'assets/shaders/default_vert.glsl');
		this.load.text('debug-orb_fragment', 'assets/shaders/debug-orb_frag.glsl');
		this.load.text('eye_fragment', 'assets/shaders/eye_frag.glsl');

		this.load.image('eye_texture', 'assets/eye.png');
		this.load.image('car_texture', 'assets/car.jpg');

		this.load.once('complete', () => {
			this.textures.addDynamicTexture('eye_dynamic', 16, 16).draw('eye_texture');

			game.renderer.pipelines.add('debug-orb_pipeline', new DebugOrbPipeline());
			game.renderer.pipelines.add('eye_pipeline', new EyePipeline());

			this.scene.start('game_scene');
		});
	}
}
