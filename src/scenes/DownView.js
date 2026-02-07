class DownView extends Phaser.Scene {
	constructor() {
		super('down-view_scene');

		this.organisms = [];
	}

	create() {
		this.cameras.main.setViewport(
			tunnel.diameter, 0,
			phaser_config.width - tunnel_diameter,
			phaser_config.height
		);
	}

	update() {
		
	}
}
