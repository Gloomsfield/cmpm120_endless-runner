class Credits extends Phaser.Scene {
	constructor() {
		super('credits_scene');
	}

	create() {
		this.input.on('pointerdown', () => {
			this.scene.start('start_scene');
		});

		this.title_text = this.add.text(
			this.cameras.main.width / 2.0,
			this.cameras.main.height / 2.0,
			`
			a project by amory acosta
			(i wasn't really sure
			what to put here lol)
			`,
			default_text_style
		).setOrigin(0.5, 0.5);

		this.title_text = this.add.text(
			this.cameras.main.width / 2.0,
			this.cameras.main.height - 5.0,
			'click to return to the main menu',
			default_text_style
		).setOrigin(0.5, 1.0);

		this.credits_text = this.add.text(
			this.cameras.main.width / 2.0,
			5.0,
			'credits',
			default_text_style
		).setOrigin(0.5, 0.0);
	}
}
