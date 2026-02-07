class OrganismQuad extends Phaser.GameObjects.Shader {
	constructor(scene, shader_key, node_position, radius) {
		super(scene, shader_key, 0, 0, 64, 64);

		scene.add.existing(this);

		this.node_position = node_position;
		this.radius = radius;
	}

	update() {
	}
}
