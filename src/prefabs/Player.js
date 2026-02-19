class Player extends Object3D {
	constructor(scene, config) {
		super(
			scene,
			config
		);

		this.head = this.add_child_deferred({
			object_class: PlayerHead,
			config: {
				local_position: new Phaser.Math.Vector3(0.0, -0.5 + 1.0, 0.0),
				local_rotation: new Phaser.Math.Quaternion().identity(),
				radius: 0.25,
			}
		});

		this.move_target = new Phaser.Math.Vector3(0.0, 0.0, 0.0);

		this.body = this.add_child_deferred({
			object_class: PlayerBody,
			config: {
				local_position: new Phaser.Math.Vector3(0.0, -1.75 + 1.0, 0.0),
				local_rotation: new Phaser.Math.Quaternion().identity().rotateY(Math.PI / 1.0),
			}
		});
	}

	set_move_target(target_pos) {
		this.move_target = target_pos;
	}

	update(time, delta) {
		this.parent_position.add(new Phaser.Math.Vector3(this.move_target).subtract(this.parent_position).scale(delta / 3500.0));

		super.update();
	}
}

