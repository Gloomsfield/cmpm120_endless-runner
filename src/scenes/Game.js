class Game extends Phaser.Scene {
	constructor() {
		super('game_scene');
	}

	create() {
		this.scene.launch('side-view_scene');
		this.scene.launch('down-view_scene');

		this.test_organism = new Organism(
			this,
			this.scene.get('side-view_scene'),
			this.scene.get('down-view_scene'),
			[
				{ r: 15.0, theta: Math.PI / 2.0, h: 0.0 },
				{ r: 25.0, theta: Math.PI / 3.0, h: 5.0 },
			],
			[ 0, 1, ],
			[ 5.0, 4.0, ],
		);
	}

	update() {
		this.test_organism.update();
	}
}
