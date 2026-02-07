class SideView extends Phaser.Scene {
	constructor() {
		super('side-view_scene');

		this.organism_shader_key = 'organism-side_shader';
	}

	create() {
		this.cameras.main.setViewport(
			0, 0,
			tunnel_diameter,
			phaser_config.height
		);
	}
}
