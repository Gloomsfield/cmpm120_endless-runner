class SideView extends Phaser.Scene {
	constructor() {
		super('side-view_scene');
	}

	create() {
		this.cameras.main.setViewport(
			0, 0,
			tunnel_diameter,
			phaser_config.height
		);
	}
}
