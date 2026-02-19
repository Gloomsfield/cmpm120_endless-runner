let player_global = null;

function get_player_position() {
	return player_global.global_position;
}

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
			parent_position: new Phaser.Math.Vector3(0.0, 0.0, 13.25),
			local_rotation: new Phaser.Math.Quaternion().identity().rotateY(5.0 * Math.PI / 6.0),
			local_scale: 1.0,
		});

		this.world.add_3d_existing(this.player);

		player_global = this.player;

		this.wall = new Wall(this, {
			parent_position: new Phaser.Math.Vector3(0.0, 0.0, 14.0),
			local_rotation: new Phaser.Math.Quaternion().identity().rotateY(-Math.PI / 6.0),
			local_scale: 30.0,
		});

		this.world.add_3d_existing(this.wall);
	}

	update(time, delta) {
		this.player.update();
		this.wall.update();
	}
}

