// this class is an abomination. we need it to be able to pass
// data to the GPU in a (debatably) ergonomic way.
// TODO - figure out how to, um, not do it like this

let current_id = 0;

class OrganismQuadInfoTextureWrapper extends Phaser.GameObjects.GameObject {
	constructor(scene, texture_key) {
		super(scene, 'organism-info-texture-wrapper');

		scene.add.existing(this);

		this.node_positions_texture_key = `${texture_key}_${current_id}_node_positions`;
		this.node_radii_texture_key = `${texture_key}_${current_id}_node_radii`;

		// limit of 64 nodes
		this.node_positions_texture = scene.textures.addDynamicTexture(this.node_positions_texture_key, 8, 8);
		this.radii_texture = scene.textures.addDynamicTexture(this.node_radii_texture_key, 8, 8);

		current_id++;
	}

	texture_pos_from_node_index(node_index) {
		return {
			x: node_index % 8,
			y: Math.floor(node_index / 8)
		};
	}

	update_node_position(node_index, new_x, new_y) {
		let tex_pos = texture_pos_from_node_index(node_index);
		
		// position stored in the texture like this (bit 0 = MSB):
		// bits [0, 17] --- unused (TODO)
		// bits [17, 24] -- position.x
		// bits [25, 32] - position.y
		let color = new_x << 8 | new_y;

		this.texture.fill(color, 1, tex_pos.x, tex_pos.y, 1, 1);
	}

	update_node_radius(node_index, new_radius) {
		let tex_pos = texture_pos_from_node_index(node_index);

		this.texture.fill(radius, 1, tex_pos.x, tex_pos.y, 1, 1);
	}
}
