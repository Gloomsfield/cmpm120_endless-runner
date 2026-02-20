class Face extends Object3D {
	constructor(scene, config) {
		let modified_config = config;
		modified_config.shape_renderer = render_quad;
		modified_config.pipeline_key = 'face_pipeline';

		super(scene, modified_config);

		this.scene = scene;

		this.face_texture = scene.add.image(64, 64, 'face_sheet', 1);

		this.face_sampler2D = this.face_texture.texture.frames[0].glTexture;
	}

	update(time, delta) {
		this.face_texture.setTexture(`face_${Math.floor(time / 100 % 11)}_texture`);
		this.face_sampler2D = this.face_texture.texture.source[0].glTexture;
		
		super.update(time, delta);
	}
}

