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

		scene.add.existing(this);
	}

	add_child(child) {
		// child.translate(this.position_v);

		this.children.push(child);
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
		this.model_matrix.fromRotationTranslation(this.rotation_q, this.position_v);

		for(let child of this.children) {
			child.update();
		}
	}
}

