class Play extends Phaser.Scene {
	constructor() {
		super('play_scene');
	}

	preload() {
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

		this.cache.shader.add(
		 	'organism-down_edge_shader',
			new Phaser.Display.BaseShader(
				'organism-down_edge_shader',
				this.cache.text.get('organism_edge_frag-source'),
				this.cache.text.get('organism_edge_vert-source'),
				{
					uViewMatrix: { type: 'mat4', value: down_view_matrix },
				}
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
	}

	create() {
		this.scene.launch('game_scene');
	}
}
