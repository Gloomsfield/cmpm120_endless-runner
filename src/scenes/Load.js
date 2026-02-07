class Load extends Phaser.Scene {
	constructor() {
		super('load_scene');
	}

	preload() {
		let load_stack = [];

		load_stack.push(this.load.text('organism_vert-source', 'assets/shaders/organism_vert.glsl'));
		load_stack.push(this.load.text('organism_frag-source', 'assets/shaders/organism_frag.glsl'));

		let down_view_matrix = [
			1.0, 0.0, 0.0, 0.0,
			0.0, 1.0, 0.0, 0.0,
			0.0, 0.0, 1.0, 0.0,
			128.0, 0.0, 0.0, 1.0
		];

		let side_view_matrix = [
			1.0, 0.0, 0.0, 0.0,
			0.0, 1.0, 0.0, 0.0,
			0.0, 0.0, 1.0, 0.0,
			0.0, 0.0, 0.0, 1.0
		];

		load_stack.push(this.cache.shader.add(
		 	'organism-down_shader',
			new Phaser.Display.BaseShader(
				'organism-down_shader',
				this.cache.text.get('organism_frag-source'),
				this.cache.text.get('organism_vert-source'),
				{
					uViewMatrix: { type: 'mat4', value: down_view_matrix },
				}
			)
		));

		load_stack.push(this.cache.shader.add(
		 	'organism-side_shader',
			new Phaser.Display.BaseShader(
				'organism-side_shader',
				this.cache.text.get('organism_frag-source'),
				this.cache.text.get('organism_vert-source'),
				{
					uViewMatrix: { type: 'mat4', value: side_view_matrix },
				}
			)
		));

		this.load.once('complete', () => {
			console.log(this.cache.shader.get('organism-side_shader'));

			this.scene.start('play_scene');
		});
	}
}
