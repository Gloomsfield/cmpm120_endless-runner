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

		this.view = this.world.add_render_target({ x: 0, y: 0, width: 640, height: 480 });

		this.world.link_render_target(0, 0);

		this.player = new Player(this, {
			parent_position: new Phaser.Math.Vector3(0.0, 0.0, 3.5),
			local_rotation: new Phaser.Math.Quaternion().identity(),
			local_scale: 1.0,
		});

		this.world.add_3d_existing(this.player);
	}

	update(time, delta) {
		this.player.local_rotation = new Phaser.Math.Quaternion().identity().rotateY(time / 1000.0);

		this.player.update();
	}
}

