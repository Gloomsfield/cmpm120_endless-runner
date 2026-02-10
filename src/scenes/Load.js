class Load extends Phaser.Scene {
	constructor() {
		super('load_scene');
	}

	preload() {
		this.load.text('default_vertex', 'assets/shaders/default_vert.glsl');
		this.load.text('debug-orb_fragment', 'assets/shaders/debug-orb_frag.glsl');
		this.load.text('eye_fragment', 'assets/shaders/eye_frag.glsl');

		this.load.texture('eye_texture', 'assets/eye.png');

		this.load.once('complete', () => {
			game.renderer.pipelines.add('debug-orb_pipeline', new DebugOrbPipeline());
			game.renderer.pipelines.add('eye_pipeline', new EyePipeline());

			this.scene.start('game_scene');
		});
	}
}
