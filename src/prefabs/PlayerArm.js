class PlayerArm extends Object3D {
	constructor(scene, config) {
		let modified_config = config;
		modified_config.shape_renderer = render_quad;
		modified_config.pipeline_key = 'arm_pipeline';

		super(
			scene,
			modified_config
		);

		this.quad_width = 1.25 / 2.0;
		this.quad_height = 6.0 / 2.0;

		this.arm_texture = scene.add.image(-512, -512, 'arm_texture');

		this.arm_sampler2D = this.arm_texture.texture.source[0].glTexture;
	}
}
