class OrganismQuad extends Phaser.GameObjects.Shader {
	constructor(scene, node_count, edge_count) {
		super(scene, 'organism_shader', 0, 0, 64, 64);

		scene.add.existing(this);

		// nodes/edges must be set by the
		// parent Organism GameObject to
		// which this OrganismQuad belongs.
		this.node_positions = array(node_count * 2);
		this.radii = array(node_count);
		this.edges = array(edge_count);

		this.render_vertices = [];

		this.uniforms.render_vertices = { type: '2fv', value: this.node_positions };
		this.uniforms.render_radii = { type: '1fv', value: this.radii };
		this.uniforms.render_edges = { type: '2fi', value: this.edges };
	}

	update() {
		if(!this.nodes || !this.edges) {
			console.error("OrganismQuad nodes or edges undefined!");
		}

		//
		// we might not need to set the uniforms
		// every frame? (as long as phaser takes
		// care of maintaining the arrays...)
		//
		// this.setUniform('render_vertices', this.render_vertices);
		// thithis.setUniform('render_radii', this.render_radii);
		// thithis.setUniform('render_edges', this.edges);
	}

	update_node(node_index, new_r, new_theta, new_h, looking_down) {
		let x = new_r * Math.cos(new_theta);
		let y = 0.0;

		if(looking_down) {
			y = new_r * Math.sin(new_theta);
		} else {
			y = new_h;
		}

		node_positions[node_index * 2] = x;
		node_positions[node_index * 2 + 1] = y;
	}
}
