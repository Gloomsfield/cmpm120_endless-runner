class Game extends Phaser.Scene {
	constructor() {
		super('game_scene');
	}

	create() {
		this.scene.launch('scene-3d_scene');
		this.world = this.scene.get('scene-3d_scene');

		this.world.add_camera({
			camera_index: 0,
			target_index: 0,
			position: { x: 0, y: 0, z: 0 },
			look: { x: 0, y: 0, z: -1 },
			up: { x: 0, y: 1, z: 0 },
			right: { x: 1, y: 0, z: 0 },
		});

		this.down_view = this.world.add_render_target({ x: 0, y: 0, width: 640, height: 480 });

		this.world.link_render_target(0, 0);


		this.head_handle = this.world.add_3d(
			PlayerHead,
			{
				position: new Phaser.Math.Vector3(0.0, 0.0, 2.5),
				rotation: new Phaser.Math.Quaternion().identity(),
				radius: 0.25
			}
		);

		this.world.add_3d_as_child(PlayerEye,
			{
				position: new Phaser.Math.Vector3(0.0, 0.0, 1.95),
				rotation: new Phaser.Math.Quaternion().identity(),
				scale: 0.3,
				rotation_pivot: new Phaser.Math.Vector3(0.0, 0.0, -0.55)
			},
			this.head_handle
		);
	}

	update(time, delta) {
		this.world.pool[this.head_handle].rotate(new Phaser.Math.Quaternion().identity().rotateY(delta / 1000.0));
		//this.world.pool[this.head_handle].translate(new Phaser.Math.Vector3(delta / 1000.0 * 1.0, 0.0, 0.0));
		this.world.pool[this.head_handle].update();
	}
}
