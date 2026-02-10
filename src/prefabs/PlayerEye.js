class PlayerEye extends Object3D {
	constructor(scene, config) {
		super(
			scene,
			{
				pipeline_key: 'eye_pipeline',
				translation: config.translation,
				rotation: config.rotation,
			}
		);

		this.eye_sampler2D = scene.textures.addDynamicTexture('eye_dynamic', 16, 16).draw('eye_texture').getWebGLTexture();
	}

	determine_radius() {
		return 2;
	}
}
