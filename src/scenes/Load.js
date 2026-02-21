class Load extends Phaser.Scene {
	constructor() {
		super('load_scene');
	}

	preload() {
		game.renderer.gl.enable(game.renderer.gl.DEPTH_TEST);
		game.renderer.gl.depthFunc(game.renderer.gl.LESS);

		this.load.text('default_vertex', 'assets/shaders/default_vert.glsl');
		this.load.text('billboard_vertex', 'assets/shaders/billboard_vert.glsl');
		this.load.text('box_vertex', 'assets/shaders/box_vert.glsl');
		this.load.text('face_fragment', 'assets/shaders/face_frag.glsl');
		this.load.text('face_vertex', 'assets/shaders/face_vert.glsl');
		this.load.text('eye_fragment', 'assets/shaders/eye_frag.glsl');
		this.load.text('arm_fragment', 'assets/shaders/arm_frag.glsl');
		this.load.text('head_fragment', 'assets/shaders/head_frag.glsl');
		this.load.text('debug_fragment', 'assets/shaders/uv_frag.glsl');
		this.load.text('wall_fragment', 'assets/shaders/wall_frag.glsl');
		this.load.text('wall_vertex', 'assets/shaders/wall_vert.glsl');

		this.load.spritesheet('face_sheet', 'assets/obstacles/doctorchomp.png', { frameWidth: 64, frameHeight: 64, });

		for(let i = 0; i < 11; i++) {
			this.load.image(`face_${i}_texture`, `assets/obstacles/doctorchomp-${i + 1}.png`);
		}

		this.load.audio('climb-1_audio', 'assets/audio/climb-1.mp3');
		this.load.audio('scream-1_audio', 'assets/audio/scream-1.mp3');
		this.load.audio('scream-2_audio', 'assets/audio/scream-2.mp3');
		this.load.audio('scream-3_audio', 'assets/audio/scream-3.mp3');

		this.load.audio('sisyphus_audio', 'assets/audio/sisyphus.wav');

		this.load.image('eye_texture', 'assets/eye.png');
		this.load.image('arm_texture', 'assets/arm.png');
		this.load.image('car_texture', 'assets/car.jpg');

		this.load.once('complete', () => {
			this.textures.addDynamicTexture('eye_dynamic', 16, 16).draw('eye_texture');

			game.renderer.pipelines.add('eye_pipeline', new EyePipeline());
			game.renderer.pipelines.add('arm_pipeline', new ArmPipeline());
			game.renderer.pipelines.add('face_pipeline', new FacePipeline());
			game.renderer.pipelines.add('head_pipeline', new HeadPipeline());
			game.renderer.pipelines.add('box_pipeline', new BoxPipeline());
			game.renderer.pipelines.add('wall_pipeline', new WallPipeline());

			this.scene.start('start_scene');
		});
	}
}
