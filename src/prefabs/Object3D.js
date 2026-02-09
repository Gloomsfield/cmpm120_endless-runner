class Object3D extends Phaser.GameObjects.GameObject {
	constructor(scene, pipeline_key, uniforms) {
		super(scene, 'object3d');

		this.scene = scene;

		this.pipeline_key = pipeline_key;

		this.uniforms = {};
		this.uniforms.view_matrix = { type: 'mat4' };

		let uniforms_deep_copy = structuredClone(uniforms);
		Object.assign(this.uniforms, uniforms_deep_copy);

		this.radius = 0;
	}

	determine_radius() {
		return 2;
	}

	update() {

	}
}
