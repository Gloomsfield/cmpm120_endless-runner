class Death extends Phaser.Scene {
	constructor() {
		super('death_scene');
	}

	create() {
		this.death_text = this.add.text(
			this.cameras.main.width - 10.0,
			this.cameras.main.height - 10.0,
			`
				you fall backwards,
				cast once again into
				the depths of hell...
			`
		).setOrigin(1.0, 1.0).setAlpha(0.0);

		this.score_text = this.add.text(
			this.cameras.main.width / 2.0,
			this.cameras.main.height / 2.0,
			`you climbed ${Math.floor(height)} yards.`
		).setOrigin(0.5, 0.5).setAlpha(0.0);

		this.replay_text = this.add.text(
			this.cameras.main.width / 2.0,
			this.cameras.main.height / 2.0 + 15.0,
			`click to ascend once more.`
		).setOrigin(0.5, 0.5).setAlpha(0.0);

		this.fadeout = false;

		this.time.addEvent({
			delay: 2000.0,
			callback: () => {
				this.scene.stop('game_scene');
				this.fadein = true;
			},
			callbackScope: this,
			loop: false,
		});

		this.time.addEvent({
			delay: 5000.0,
			callback: () => {
				this.fadein = false;
				this.fadeout = true;
			},
			callbackScope: this,
			loop: false,
		});
	}

	update(time, delta) {
		if(this.fadein){
			this.death_text.setAlpha(this.death_text.alpha + delta / 1500.0);

			this.score_text.setAlpha(this.score_text.alpha + delta / 4000.0);
			this.replay_text.setAlpha(this.score_text.alpha + delta / 4000.0);
		}

		if(this.fadeout){
			this.death_text.setAlpha(this.death_text.alpha - delta / 2500.0);

			this.score_text.setAlpha(this.score_text.alpha + delta / 4000.0);
			this.replay_text.setAlpha(this.score_text.alpha + delta / 4000.0);
		}
	}
}

