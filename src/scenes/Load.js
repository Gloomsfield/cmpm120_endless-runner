class Load extends Phaser.Scene {
	constructor() {
		super('load_scene');
	}

	preload() {
		game.renderer.gl.enable(game.renderer.gl.DEPTH_TEST);
		game.renderer.gl.depthFunc(game.renderer.gl.LESS);

		this.load.text('default_vertex', 'assets/shaders/default_vert.glsl');
		this.load.text('billboard_vertex', 'assets/shaders/billboard_vert.glsl');
		this.load.text('eye_fragment', 'assets/shaders/eye_frag.glsl');
		this.load.text('head_fragment', 'assets/shaders/head_frag.glsl');

		this.load.image('eye_texture', 'assets/eye.png');
		this.load.image('car_texture', 'assets/car.jpg');

		this.load.once('complete', () => {
			this.textures.addDynamicTexture('eye_dynamic', 16, 16).draw('eye_texture');

			game.renderer.pipelines.add('eye_pipeline', new EyePipeline());
			game.renderer.pipelines.add('head_pipeline', new HeadPipeline());

			this.scene.start('game_scene');
		});
	}
}
