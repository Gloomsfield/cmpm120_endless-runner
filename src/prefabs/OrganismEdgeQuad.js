class OrganismEdgeQuad extends Phaser.GameObjects.Shader {
	constructor(scene, edge_nodes) {
		super(scene, scene.organism_edge_shader_key, 0, 0, 128, 128);

		scene.add.existing(this);

		this.nodes = edge_nodes;

		this.uniforms.a_pos = { type: '3f', value: { x: this.nodes[0].x[0], y: this.nodes[0].y[0], z: this.nodes[0].z[0] } };
		this.uniforms.b_pos = { type: '3f', value: { x: this.nodes[1].x[0], y: this.nodes[1].y[0], z: this.nodes[1].z[0] } };

		this.uniforms.a_radius = { type: '1f', value: this.nodes[0].radius[0] };
		this.uniforms.b_radius = { type: '1f', value: this.nodes[1].radius[0] };

		this.initUniforms();
	}

	update() {
		this.setUniform('a_pos.value.x', this.nodes[0].x[0]);
		this.setUniform('a_pos.value.y', this.nodes[0].y[0]);
		this.setUniform('a_pos.value.z', this.nodes[0].z[0]);
		this.setUniform('b_pos.value.x', this.nodes[1].x[0]);
		this.setUniform('b_pos.value.z', this.nodes[1].z[0]);
	}
}
