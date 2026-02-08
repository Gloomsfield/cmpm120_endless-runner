class Load extends Phaser.Scene {
	constructor() {
		super('load_scene');
	}

	preload() {
		this.load.text('organism_edge_vert-source', 'assets/shaders/organism_edge_vert.glsl');
		this.load.text('organism_edge_frag-source', 'assets/shaders/organism_edge_frag.glsl');

		this.load.once('complete', () => {
			this.scene.start('play_scene');
		});

		let down_view_matrix = [
			1.0, 0.0, 0.0, 0.0,
			0.0, 1.0, 0.0, 0.0,
			0.0, 0.0, 1.0, 0.0,
			tunnel_diameter, 0.0, 0.0, 1.0
		];

		let side_view_matrix = [
			1.0, 0.0, 0.0, 0.0,
			0.0, 1.0, 0.0, 0.0,
			0.0, 0.0, 1.0, 0.0,
			0.0, 0.0, 0.0, 1.0
		];

		this.load.once('complete', () => {
			this.cache.shader.add(
			 	'organism-down_edge_shader',
				new Phaser.Display.BaseShader(
					'organism-down_edge_shader',
					this.cache.text.get('organism_edge_frag-source'),
					this.cache.text.get('organism_edge_vert-source')
				)
			);

			this.cache.shader.add(
			 	'organism-side_edge_shader',
				new Phaser.Display.BaseShader(
					'organism-side_edge_shader',
					this.cache.text.get('organism_edge_frag-source'),
					this.cache.text.get('organism_edge_vert-source'),
					{
						uViewMatrix: { type: 'mat4', value: side_view_matrix },
					}
				)
			);

		});
	}
}
