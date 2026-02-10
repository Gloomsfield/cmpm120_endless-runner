class Object3D extends Phaser.GameObjects.GameObject {
	constructor(scene, config) {
		let pipeline_key = config.pipeline_key;
		let translation = config.translation;
		let rotation = config.rotation;

		super(scene, 'object3d');

		this.scene = scene;

		this.pipeline_key = pipeline_key;

		this.radius = 0;

		this.translation = translation;
		this.rotation = rotation;

		this.model_matrix = new Phaser.Math.Matrix4().fromRotationTranslation(this.rotation, this.translation);

		this.children = [];
	}

	add_child(child_class, config) {
		this.children.push(new child_class(config));
	}

	determine_radius() {
		console.error('Object3D determine_radius not overloaded!');
		return 2;
	}

	translate(translation) {
		this.translation.add(translation);

		this.propagate_transformation(translation, 0);
	}

	rotate(rotation) {
		this.rotation.multiply(rotation);

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
		this.model_matrix.fromRotationTranslation(this.rotation, this.translation);
	}
}
