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
			look: { x: 0, y: 0, z: 1 },
			up: { x: 0, y: 1, z: 0 },
			right: { x: 1, y: 0, z: 0 },
		});

		//this.left_view = world.add_render_target({ x: 0, y: 0, width: 320, height: 480 });
		this.down_view = this.world.add_render_target({ x: 0, y: 0, width: 640, height: 480 });

		this.world.link_render_target(0, 0);

		let orb_handle = this.world.add_geometry({
			type: 'debug-orb',
			radius: 10.0,
		});
	}

	update(time, delta) {
		this.world.rotate_camera(0, delta / 1000.0, new Phaser.Math.Vector3(0.0, 1.0, 0.0));
	}
}
