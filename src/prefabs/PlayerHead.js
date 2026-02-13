class PlayerHead extends Object3D {
	constructor(scene, config) {
		let modified_config = config;
		modified_config.shape_renderer = render_quad;
		modified_config.pipeline_key = 'head_pipeline';

		super(
			scene,
			modified_config
		);

		this.radius = config.radius;
	}
}
