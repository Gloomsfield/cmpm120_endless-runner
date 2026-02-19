class Wall extends Object3D {
	constructor(scene, config) {
		let modified_config = config;
		modified_config.shape_renderer = render_quad;
		modified_config.pipeline_key = 'wall_pipeline';

		super(scene, modified_config);

		this.wall_color = new Phaser.Math.Vector3(0.8, 0.1, 0.0);
		this.player_pos = get_player_position();
	}
}

