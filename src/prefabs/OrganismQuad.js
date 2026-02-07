class OrganismQuad extends Phaser.GameObjects.Shader {
	constructor(scene, node_position, radius) {
		super(scene, scene.organism_shader_key, 0, 0, 64, 64);

		scene.add.existing(this);

		this.node_position = node_position;
		this.radius = radius;
	}

	update() {
	}
}
