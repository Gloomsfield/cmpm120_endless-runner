class Play extends Phaser.Scene {
	constructor() {
		super('play_scene');
	}

	preload() {

	}

	create() {
		this.scene.launch('game_scene');
	}
}
