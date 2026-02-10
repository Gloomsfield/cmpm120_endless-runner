class Object3D extends Phaser.GameObjects.GameObject {
	constructor(scene, pipeline_key, uniforms) {
		super(scene, 'object3d');

		this.scene = scene;

		this.pipeline_key = pipeline_key;

		this.radius = 0;
	}

	determine_radius() {
		console.error('Object3D determine_radius not overloaded!');
		return 2;
	}

	update() {

	}
}
