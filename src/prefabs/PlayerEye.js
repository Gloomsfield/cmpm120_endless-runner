class PlayerEye extends Object3D {
	constructor(scene, config) {
		let modified_config = config;
		modified_config.shape_renderer = render_quad;
		modified_config.pipeline_key = 'eye_pipeline';

		super(
			scene,
			modified_config
		);

		this.eye_sampler2D = scene.textures.get('eye_dynamic').getWebGLTexture();
	}
}
