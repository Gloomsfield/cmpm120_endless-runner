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

		this.player = new Player(this, {
			parent_position: new Phaser.Math.Vector3(0.0, 0.0, 13.25),
			local_rotation: new Phaser.Math.Quaternion().identity().rotateY(Math.PI - wall_rotation),
			local_scale: 1.0,
		});

		this.world.add_3d_existing(this.player);

		player_global = this.player;

		this.wall = new Wall(this, {
			parent_position: new Phaser.Math.Vector3(0.0, 0.0, 14.0),
			local_rotation: new Phaser.Math.Quaternion().identity().rotateY(-wall_rotation),
			local_scale: 50.0,
		});

		this.world.add_3d_existing(this.wall);

		this.face = this.spawn_obstacle(Face, {
			parent_position: new Phaser.Math.Vector3(0.0, 10.0, 13.95),
			local_rotation: new Phaser.Math.Quaternion().identity().rotateY(-wall_rotation),
			local_scale: 7.5,
		});
	}

	align_with_wall(unaligned_vector, wall_x) {
		let x = (wall_x) * Math.cos(wall_rotation);
		let z = (wall_x) * Math.sin(wall_rotation) + 13.95;

		console.log(x);
		console.log(z);

		return new Phaser.Math.Vector3(x, unaligned_vector.y, z);
	}

	spawn_obstacle(obstacle_class, obstacle_config) {
		let obstacle = new obstacle_class(this, obstacle_config);

		obstacle.on('collide_player', () => {
			this.player.die();

			this.scene.launch('death_scene');
		});

		this.world.add_3d_existing(obstacle);

		return obstacle;
	}

	update(time, delta) {
		player_light_radius += ((player_base_light_radius + 0.25 * Math.sin(time / 1000.0)) - player_light_radius) * delta / 1000.0;

		height += delta / 1000.0;

		let inverse_view_projection_matrix = new Phaser.Math.Matrix4(
			this.world.camera_3d.view_matrix
		).invert();

		let mouse_x = (this.input.activePointer.x / 400.0 - 0.5) * 2.0;
		let mouse_y = 1.0 - (this.input.activePointer.y / 300) * 2.0;

		let clipspace_pos_vec4 = new Phaser.Math.Vector4(
			mouse_x,
			mouse_y,
			-1.0,
			1.0
		).transformMat4(inverse_view_projection_matrix);

		let w = clipspace_pos_vec4.w;

		let clipspace_pos = new Phaser.Math.Vector3(
			clipspace_pos_vec4.x / w,
			clipspace_pos_vec4.y / w,
			clipspace_pos_vec4.z / w,
		);

		let phi_x = Math.atan(0.75 * clipspace_pos.x);
		let x = 14.0 * (0.75 * clipspace_pos.x) * (1.0 + Math.sin(phi_x) * Math.sin(wall_rotation) / Math.cos(phi_x + (wall_rotation)));

		let target_pos = new Phaser.Math.Vector3(
			x,
			0.0,
			0.0
		);

		target_pos.z = mouse_z_multiplier * target_pos.x + 13.25;
		target_pos.y = Math.sqrt(x * x + target_pos.z * target_pos.z) * clipspace_pos.y * 0.5;

		this.player.set_move_target(target_pos);

		this.player.update(time, delta);
		this.wall.update(time, delta);
		this.face.update(time, delta);

		if(this.face.global_position.y < -12.5) {
			this.face.reset();

			this.face.parent_position = this.align_with_wall(this.face.global_position, -3.5);
			this.face.parent_position.y = 12.5;
		}
	}
}

