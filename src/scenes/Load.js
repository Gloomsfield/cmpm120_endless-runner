class Load extends Phaser.Scene {
	constructor() {
		super('load_scene');
	}

	preload() {
		this.load.text('default_vertex', 'assets/shaders/default_vert.glsl');
		this.load.text('debug-orb_fragment', 'assets/shaders/debug-orb_frag.glsl');

		this.load.once('complete', () => {
			game.renderer.pipelines.add('debug-orb_pipeline', new DebugOrbPipeline());

			this.scene.start('game_scene');
		});
	}
}
