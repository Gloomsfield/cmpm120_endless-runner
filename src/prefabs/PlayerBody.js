class PlayerBody extends Object3D {
	constructor(scene, config) {
		let modified_config = config;
		modified_config.shape_renderer = render_box;
		modified_config.pipeline_key = 'box_pipeline';

		super(
			scene,
			modified_config
		);

		this.local_width = fallback(config.local_width, 1.0);
		this.local_height = fallback(config.local_height, 1.5);
		this.local_depth = fallback(config.local_depth, 0.35);

		this.left_arm = this.add_child_deferred({
			object_class: PlayerArm,
			config: {
				local_position: new Phaser.Math.Vector3(-0.5, 1.75, 0.0),
				local_rotation: new Phaser.Math.Quaternion().identity().rotateY(Math.PI / 4.0),
			},
		});

		this.right_arm = this.add_child_deferred({
			object_class: PlayerArm,
			config: {
				local_position: new Phaser.Math.Vector3(0.5, 1.75, 0.5),
				local_rotation: new Phaser.Math.Quaternion().identity().rotateY(Math.PI / 4.0),
			},
		});
	}

	update(time, delta) {
		this.right_arm.local_rotation = new Phaser.Math.Quaternion().identity().rotateX(Math.max(0.0, Math.sin(time / 500.0 - Math.PI / 2.0)));
		this.left_arm.local_rotation = new Phaser.Math.Quaternion().identity().rotateX(Math.max(0.0, -Math.sin(time / 500.0 - Math.PI / 2.0)));

		super.update(time, delta);
	}
}

