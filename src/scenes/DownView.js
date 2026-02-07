class DownView extends Phaser.Scene {
	constructor() {
		super('down-view_scene');
	}

	create() {
		this.cameras.main.setViewport(
			tunnel_diameter, 0,
			phaser_config.width - tunnel_diameter,
			phaser_config.height
		).setBackgroundColor(0xfacade);
	}

	update() {
		
	}
}
