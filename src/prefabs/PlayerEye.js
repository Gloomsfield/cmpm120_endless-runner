class PlayerEye extends Object3D {
	constructor(scene, config) {
		super(
			scene,
			{
				shape_renderer: render_quad,
				pipeline_key: 'eye_pipeline',
				position: config.position,
				rotation: config.rotation,
			}
		);

		this.eye_sampler2D = scene.textures.get('eye_dynamic').getWebGLTexture();
	}

	determine_radius() {
		return 2;
	}
}
