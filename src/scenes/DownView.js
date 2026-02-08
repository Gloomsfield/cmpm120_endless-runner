class DownView extends Phaser.Scene {
	constructor() {
		super('down-view_scene');

		this.organism_edge_shader_key = 'organism-down_edge_shader';
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
