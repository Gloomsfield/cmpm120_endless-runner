class Organism extends Phaser.GameObjects.Sprite {
	constructor(game_scene, side_scene, down_scene, world_pos, node_pos, node_radius) {
		super(game_scene, 0, 0, 'organism', 0);

		game_scene.add.existing(this);

		this.down_view = new OrganismQuad(down_scene, 'organism-down_shader', node_pos, node_radius);
		this.side_view = new OrganismQuad(side_scene, 'organism-side_shader', node_pos, node_radius);

		this.world_pos = world_pos;
	}

	update(time) {
		// this.down_view.setPosition(this.world_pos.x, this.world_pos.y);
		// this.side_view.setPosition(this.world_pos.x, this.world_pos.z);

		this.down_view.update();
		this.side_view.update();
	}
}
