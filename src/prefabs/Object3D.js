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
		config.config.rotation_pivot = config.config.position.negate();
		config.config.position = new Phaser.Math.Vector3(this.position_v);
		// config.config.position.add(config.config.rotation_pivot);

		let child = new config.child_class(this.scene, config.config);

		child.rotate(config.config.rotation);

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
		this.rotation_q.multiply(rotation);

		this.propagate_transformation(0, rotation);
	}

	propagate_transformation(translation, rotation) {
		for(let child of this.children) {
			if(translation !== 0) {
				child.translate(translation);
			}

			if(rotation !== 0) {
				child.rotate(rotation);
			}
		}
	}

	update() {
		let offset_position = this.position_v;
		//offset_position.subtract(this.rotation_pivot);
		this.model_matrix.fromRotationTranslation(this.rotation_q, offset_position);
		this.model_matrix.translate(this.rotation_pivot);

		this.world_pos.setFromMatrixColumn(this.model_matrix, 3);

		for(let child of this.children) {
			child.update();
		}
	}
}

