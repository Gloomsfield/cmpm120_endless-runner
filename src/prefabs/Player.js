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
			},
		});

		this.move_target = new Phaser.Math.Vector3(0.0, 0.0, 0.0);

		this.body = this.add_child_deferred({
			object_class: PlayerBody,
			config: {
				local_position: new Phaser.Math.Vector3(0.0, -1.75 + 1.0, 0.0),
				local_rotation: new Phaser.Math.Quaternion().identity().rotateY(Math.PI / 1.0),
			},
		});

		this.climb_1_audio = scene.sound.add('climb-1_audio', { loop: true, });
		this.climb_1_audio.play();
	}

	set_move_target(target_pos) {
		this.move_target = target_pos;
	}

	die() {
		this.is_dying = true;
		this.death_time = this.time;

		this.emit('dead');
	}

	update(time, delta) {
		this.time = time;

		super.update(time, delta);

		if(this.is_dying) {
			this.climb_1_audio.stop();

			this.local_rotation.rotateX(delta / 200.0);
			this.parent_position.y -= (delta / 50.0) * Math.pow(this.time / 1000.0 - this.death_time / 1000.0, 2.0);
			this.parent_position.z -= Math.cos(wall_rotation) * delta / 1000.0 * 5.0;
			this.parent_position.x += Math.sin(wall_rotation) * delta / 1000.0 * 5.0;
			return;
		}

		let move_direction = new Phaser.Math.Vector3(this.move_target).subtract(this.parent_position);
		let move_direction_magnitude = move_direction.length();

		if(move_direction_magnitude > 0.1) {
			move_direction.normalize();
			move_direction.subtract(new Phaser.Math.Vector3(0.0, 0.25, 0.0));
			this.parent_position.add(move_direction.scale(delta / 200.0));
		}
	}
}

