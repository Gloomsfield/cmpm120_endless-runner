class PlayerHead extends Object3D {
	constructor(scene, config) {
		let modified_config = config;
		modified_config.shape_renderer = render_quad;
		modified_config.pipeline_key = 'head_pipeline';

		super(
			scene,
			modified_config
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

		this.radius = config.radius;
	}
}

