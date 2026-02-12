class PlayerEye extends Object3D {
	constructor(scene, config) {
		super(
			scene,
			{
				shape_renderer: render_quad,
				pipeline_key: 'eye_pipeline',
				position: config.position,
				rotation: config.rotation,
				rotation_pivot: config.rotation_pivot,
				scale: config.scale
			}
		);

		this.eye_sampler2D = scene.textures.get('eye_dynamic').getWebGLTexture();
	}
}
