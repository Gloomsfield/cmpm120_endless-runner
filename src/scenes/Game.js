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

		this.head_renderable = this.world.add_3d(
			{
				object_class: PlayerHead,
				config: {
					position: new Phaser.Math.Vector3(0.0, 0.0, 5.5),
					rotation: new Phaser.Math.Quaternion().identity(),
					radius: 0.25,
				}
			}
		).add_children([
			{
				child_class: PlayerEye,
				config: {
					position: new Phaser.Math.Vector3(0.0, 0.0, 0.5),
					rotation: new Phaser.Math.Quaternion().identity().rotateY(-0.25),
					scale: 0.5,
				},
			},
			{
				child_class: PlayerEye,
				config: {
					position: new Phaser.Math.Vector3(0.0, 0.0, 0.5),
					rotation: new Phaser.Math.Quaternion().identity().rotateY(0.25),
					scale: 0.5,
				},
			}
		]);
	}

	update(time, delta) {
		this.head_renderable.rotate(new Phaser.Math.Quaternion().identity().rotateY(delta / 1000.0));
		this.head_renderable.update();
	}
}
