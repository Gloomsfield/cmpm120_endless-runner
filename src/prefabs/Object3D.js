class Object3D extends Renderable {
	constructor(scene, config) {
		let pipeline_key = config.pipeline_key;
		let position = config.position;
		let rotation = config.rotation;

		super(scene, pipeline_key, position, rotation);

		this.scene = scene;

		this.pipeline_key = pipeline_key;

		this.position_v = position;
		this.rotation_q = rotation;

		this.scale_s = fallback(config.scale, 1.0);

		this.rotation_pivot = fallback(config.rotation_pivot, new Phaser.Math.Vector3(0.0, 0.0, 0.0));

		this.children = [];

		this.renderWebGL = config.shape_renderer;

		this.world_pos = new Phaser.Math.Vector3(0.0, 0.0, 0.0);

		scene.add.existing(this);
	}

	add_child(config) {
		config.config.rotation_pivot = new Phaser.Math.Vector3(config.config.position);
		config.config.position = new Phaser.Math.Vector3(this.position_v);
		config.config.position.subtract(config.config.rotation_pivot);

		let child = new config.child_class(this.scene, config.config);

		child.rotate(config.config.rotation);
		child.rotate(this.rotation_q);

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

	translate(translation) {
		this.position_v.add(translation);

		this.propagate_transformation(translation, 0);
	}

	rotate(rotation) {
		this.rotation_q.multiply(rotation).normalize();

		this.propagate_transformation(0, rotation);
	}

	get_forward_vector() {
		let forward = new Phaser.Math.Vector3(
			0.0, 0.0, -1.0
		).normalize();

		return forward;
	}

	look_at(look_position) {
		let forward = this.get_forward_vector();
		let delta = new Phaser.Math.Vector3(look_position).subtract(this.world_pos);
		
		let q = align_vector3(forward, delta);

		this.rotation_q = q;

		this.propagate_transformation(0, q);
	}

	propagate_transformation(translation, rotation) {
		for(let child of this.children) {
			if(translation !== 0) {
				child.translate(translation);
			}

			if(rotation !== 0) {
				//child.rotation_q = this.rotation_q;
			}
		}
	}

	update() {
		this.model_matrix.fromRotationTranslation(this.rotation_q, this.position_v);

		this.world_pos = new Phaser.Math.Vector3(this.position_v);
		this.world_pos.add(this.rotation_pivot);

		this.world_pos.transformMat4(this.model_matrix);

		this.world_pos = new Phaser.Math.Vector3(this.world_pos).subtract(this.rotation_pivot);

		for(let child of this.children) {
			child.update();
		}
	}
}

