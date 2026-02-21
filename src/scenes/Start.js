class Start extends Phaser.Scene {
	constructor() {
		super('start_scene');
	}

	create() {
		this.input.on('pointerdown', () => {
			this.scene.start('game_scene');
		});

		this.input.keyboard.on('keydown-C', () => {
			this.scene.start('credits_scene');
		});

		this.title_text = this.add.text(
			this.cameras.main.width / 2.0,
			this.cameras.main.height / 2.0,
			'sisyphus, the hellbound boulderer',
			default_text_style
		).setOrigin(0.5, 0.5);


		this.start_text = this.add.text(
			this.cameras.main.width / 2.0,
			this.cameras.main.height / 2.0 + 15.0,
			'click to start',
			default_text_style
		).setOrigin(0.5, 0.5);

		this.credits_text = this.add.text(
			this.cameras.main.width / 2.0,
			this.cameras.main.height - 5.0,
			'click (c) for credits',
			default_text_style
		).setOrigin(0.5, 1.0);
	}
}
