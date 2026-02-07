class Organism extends Phaser.GameObjects.Sprite {
	constructor(game_scene, side_scene, down_scene, nodes, edges, radii) {
		super(game_scene, 0, 0, 'organism', 0);

		game_scene.add.existing(this);

		this.nodes = nodes;
		this.edges = edges;
		this.radii = radii;

		this.down_view = new OrganismQuad(down_scene, nodes.length, edges.length);
		this.side_view = new OrganismQuad(side_scene, nodes.length, edges.length);
	}

	update() {
		this.down_view.update();
		this.side_view.update();
	}

	alter_position(node_index, new_r, new_theta, new_h) {
		this.down_view.update_node(node_index, new_r, new_theta, new_h, true);
		this.side_view.update_node(node_index, new_r, new_theta, new_h, false);

		this.nodes[node_index].r = new_r;
		this.nodes[node_index].theta = new_theta;
		this.nodes[node_index].h = new_h;
	}
}
