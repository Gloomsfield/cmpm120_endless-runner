class Object3D extends Renderable {
	constructor(scene, config) {
		let pipeline_key = config.pipeline_key;

		super(scene, pipeline_key);

		this.scene = scene;

		this.pipeline_key = pipeline_key;

		this.children = [];

		this.renderWebGL = config.shape_renderer;

		this.local_rotation = new Phaser.Math.Quaternion(config.local_rotation);
		this.parent_rotation = new Phaser.Math.Quaternion(fallback(
			config.parent_rotation,
			new Phaser.Math.Quaternion().identity()
		));
		this.global_rotation = new Phaser.Math.Quaternion(this.local_rotation).multiply(this.parent_rotation);

		this.local_position = new Phaser.Math.Vector3(config.local_position);
		this.parent_position = new Phaser.Math.Vector3(fallback(
			config.parent_position,
			new Phaser.Math.Vector3(0.0, 0.0, 0.0)
		));
		this.global_position = new Phaser.Math.Vector3(this.local_position).add(this.parent_position);

		this.local_scale = fallback(config.local_scale, 1.0);
		this.parent_scale = fallback(config.parent_scale, 1.0);
		this.global_scale = this.local_scale * this.parent_scale;

		scene.add.existing(this);
	}

	add_child(config) {
		let modified_config = config.config;

		modified_config.parent_rotation = this.global_rotation;
		modified_config.parent_position = this.global_position;
		modified_config.parent_scale = this.global_scale;

		let child = new config.object_class(this.scene, modified_config);

		this.children.push(child);

		this.emit('add-child', child);

		return this;
	}

	add_children(child_configs) {
		for(let child_config of child_configs) {
			this.add_child(child_config);
		}

		return this;
	}

	get_forward_vector() {
		let forward = new Phaser.Math.Vector3(
			0.0, 0.0, -1.0
		).normalize();

		return forward;
	}

	// see references [2]
	look_at(look_position) {
		let forward = this.get_forward_vector();
		let delta = new Phaser.Math.Vector3(look_position).subtract(this.global_position);
		
		let q = align_vector3(forward, delta);

		this.local_rotation = q;
	}

	update() {
		this.global_scale = this.parent_scale * this.local_scale;
		this.global_rotation = new Phaser.Math.Quaternion(this.parent_rotation).multiply(this.local_rotation);

		let transformed_local_position = new Phaser.Math.Vector3(this.local_position);
		transformed_local_position.transformQuat(this.global_rotation);

		this.global_position = new Phaser.Math.Vector3(this.parent_position).add(transformed_local_position);

		this.model_matrix = new Phaser.Math.Matrix4().fromRotationTranslation(this.global_rotation, this.global_position);

		for(let child of this.children) {
			child.parent_position = this.global_position;
			child.parent_rotation = this.global_rotation;
			child.parent_scale = this.global_scale;

			child.update();
		}
	}
}

