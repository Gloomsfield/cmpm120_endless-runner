class Player extends Object3D {
	constructor(scene, config) {
		super(
			scene,
			config
		);

		this.head = this.add_child_deferred(
			{
				object_class: PlayerHead,
				config: {
					local_position: new Phaser.Math.Vector3(0.0, 0.0, 0.0),
					local_rotation: new Phaser.Math.Quaternion().identity(),
					radius: 0.25,
				}
			},

		);

		this.left_eye = this.add_child_deferred({
			object_class: PlayerEye,
			config: {
				local_position: new Phaser.Math.Vector3(0.0, 0.0, -0.5),
				local_rotation: new Phaser.Math.Quaternion().identity().rotateY(-0.5),
				local_scale: 0.5,
			},
		});
        
		this.right_eye = this.add_child_deferred({
			object_class: PlayerEye,
			config: {
				local_position: new Phaser.Math.Vector3(0.0, 0.0, -0.5),
				local_rotation: new Phaser.Math.Quaternion().identity().rotateY(0.5),
				local_scale: 0.5,
			},
		});
	}
}

