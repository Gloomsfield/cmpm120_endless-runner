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

		this.body = this.add_child_deferred({
			object_class: PlayerBody,
			config: {
				local_position: new Phaser.Math.Vector3(0.0, -1.75 + 1.0, 0.0),
				local_rotation: new Phaser.Math.Quaternion().identity().rotateY(Math.PI / 1.0),
			}
		});
	}
}

