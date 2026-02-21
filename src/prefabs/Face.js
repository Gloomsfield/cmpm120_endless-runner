class Face extends Object3D {
	constructor(scene, config) {
		let modified_config = config;
		modified_config.shape_renderer = render_quad;
		modified_config.pipeline_key = 'face_pipeline';

		super(scene, modified_config);

		this.scene = scene;

		this.face_texture = scene.add.image(-512, -512);

		this.index_mod = 1;
		this.index_offset = 0;

		this.awaken_timestamp = 0;

		let animation_index = this.index_offset;

		this.face_texture.setTexture(`face_${animation_index}_texture`);
		this.face_sampler2D = this.face_texture.texture.source[0].glTexture;
	}

	update(time, delta) {
		this.player_pos = get_player_position();

		let animation_index = Math.floor((time - this.awaken_timestamp) / 100 % this.index_mod) + this.index_offset;

		this.face_texture.setTexture(`face_${animation_index}_texture`);
		this.face_sampler2D = this.face_texture.texture.source[0].glTexture;
		
		this.parent_position.y -= ascent_pace * delta / 1000.0;

		super.update(time, delta);

		if(animation_index > 9) {
			this.index_mod = 3;
			this.index_offset = 8;
		}

		if(this.global_position.distance(get_player_position()) < 2.5) {
			if(this.awaken_timestamp < 1) {
				this.awaken(time);
			}

			if(animation_index > 2 && this.global_position.y - get_player_position().y > 0.25) {
				this.emit('collide_player');
			}
		}

		if(this.global_position.y < -12.5) {
			this.emit('despawn');
		}
	}

	awaken(time) {
		this.index_mod = 10;
		this.index_offset = 1;
		this.awaken_timestamp = time;
	}

	reset() {
		this.index_mod = 1;
		this.index_offset = 0;
		this.awaken_timestamp = 0;
	}
}

