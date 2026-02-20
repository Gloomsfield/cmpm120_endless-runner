class Face extends Object3D {
	constructor(scene, config) {
		let modified_config = config;
		modified_config.shape_renderer = render_quad;
		modified_config.pipeline_key = 'face_pipeline';

		super(scene, modified_config);

		this.scene = scene;

		this.face_texture = scene.add.image(-128, -128, 'face_sheet', 1);

		this.face_sampler2D = this.face_texture.texture.frames[0].glTexture;

		this.index_mod = 1;
		this.index_offset = 0;

		this.awaken_timestamp = 0;

		this.animation_index = 0;
	}

	update(time, delta) {
		let animation_index = Math.floor((time - this.awaken_timestamp) / 100 % this.index_mod) + this.index_offset;

		this.face_texture.setTexture(`face_${animation_index}_texture`);
		this.face_sampler2D = this.face_texture.texture.source[0].glTexture;
		
		this.parent_position.y -= ascent_pace * delta / 1000.0;

		super.update(time, delta);

		if(animation_index > 9) {
			this.index_mod = 3;
			this.index_offset = 8;
		}

		if(this.global_position.distance(get_player_position()) < 2.5 && this.awaken_timestamp < 1) {
			this.awaken(time);
		}
	}

	awaken(time) {
		this.index_mod = 10;
		this.index_offset = 1;
		this.awaken_timestamp = time;
	}
}

