class Organism extends Phaser.GameObjects.Sprite {
	constructor(game_scene, side_scene, down_scene, world_pos, node_info, edge_indices) {
		super(game_scene, 0, 0, 'organism', 0);

		this.node_info = node_info;

		game_scene.add.existing(this);

		this.edges = [];
		this.edge_quads = [];

		for(let i = 0; i < edge_indices.length; i += 2) {
			this.edges.push([this.node_info[i], this.node_info[i + 1]]);

			this.edge_quads.push(new OrganismEdgeQuad(down_scene, [
				{
					x: this.node_info[i].x,
					y: this.node_info[i].y,
					z: this.node_info[i].z,
					radius: this.node_info[i].radius
				},
				{
					x: this.node_info[i + 1].x,
					y: this.node_info[i + 1].y,
					z: this.node_info[i + 1].z,
					radius: this.node_info[i + 1].radius
				}
			]));

			this.edge_quads.push(new OrganismEdgeQuad(side_scene, [
				{
					x: this.node_info[i].x,
					y: this.node_info[i].z,
					z: this.node_info[i].y,
					radius: this.node_info[i].radius
				},
				{
					x: this.node_info[i + 1].x,
					y: this.node_info[i + 1].z,
					z: this.node_info[i + 1].y,
					radius: this.node_info[i + 1].radius
				}
			]));
		}

		this.world_pos = world_pos;
	}

	move_node(node_index, delta_x, delta_y, delta_z) {
		this.node_info[node_index].x[0] += delta_x;
		this.node_info[node_index].y[0] += delta_y;
		this.node_info[node_index].z[0] += delta_z;
	}

	update(time) {
		for(let edge_quad of this.edge_quads) {
			edge_quad.update();
		}

		this.move_node(1, 0.0, Math.sin(time / 500.0), 0.0);
	}
}
