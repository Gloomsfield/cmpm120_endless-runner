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
			{ x: 0.0, y: 0.0, z: 0.0 },
			{ x: 0.0, y: 0.0, z: 0.0 },
			10.0
		);
	}

	update(time) {
		this.test_organism.update(time);
	}
}
