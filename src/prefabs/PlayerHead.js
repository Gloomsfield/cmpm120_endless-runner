class PlayerHead extends Object3D {
	constructor(scene, config) {
		super(
			scene,
			{
				shape_renderer: render_quad,
				pipeline_key: 'head_pipeline',
				position: config.position,
				rotation: config.rotation,
				rotation_pivot: config.rotation_pivot
			}
		);

		this.radius = config.radius;
	}
}
