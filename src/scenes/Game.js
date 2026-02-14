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

		this.head_renderable_1 = this.world.add_3d(
			{
				object_class: PlayerHead,
				config: {
					parent_position: new Phaser.Math.Vector3(0.0, 0.0, 3.5),
					local_rotation: new Phaser.Math.Quaternion().identity(),
					radius: 0.25,
				}
			}
		).add_children([
			{
				object_class: PlayerEye,
				config: {
					local_position: new Phaser.Math.Vector3(0.0, 0.0, -0.5),
					local_rotation: new Phaser.Math.Quaternion().identity().rotateY(-0.5),
					local_scale: 0.5,
				},
			},
			{
				object_class: PlayerEye,
				config: {
					local_position: new Phaser.Math.Vector3(0.0, 0.0, -0.5),
					local_rotation: new Phaser.Math.Quaternion().identity().rotateY(0.5),
					local_scale: 0.5,
				},
			}
		]);
	}

	update(time, delta) {
		this.head_renderable_1.look_at(new Phaser.Math.Vector3(this.input.activePointer.x / 300.0 - 0.5, 0.5 - this.input.activePointer.y / 200.0, 0.0));

		this.head_renderable_1.update();
	}
}
