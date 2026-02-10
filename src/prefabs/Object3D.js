class Object3D extends Phaser.GameObjects.GameObject {
	constructor(scene, pipeline_key, translation, rotation) {
		super(scene, 'object3d');

		this.scene = scene;

		this.pipeline_key = pipeline_key;

		this.radius = 0;

		this.translation = translation;
		this.rotation = rotation;

		this.model_matrix = new Phaser.Math.Matrix4().fromRotationTranslation(this.rotation, this.translation);
	}

	determine_radius() {
		console.error('Object3D determine_radius not overloaded!');
		return 2;
	}

	translate(translation) {
		this.translation.add(translation);
	}

	rotate(rotation) {
		this.rotation.multiply(rotation);
	}

	update() {
		this.model_matrix.fromRotationTranslation(this.rotation, this.translation);
	}
}
