let player_global = null;

function get_player_position() {
	return player_global.global_position;
}

class Game extends Phaser.Scene {
	constructor() {
		super('game_scene');
	}

	create() {
		this.anims.create({
			key: 'face_idle',
			frames: this.anims.generateFrameNumbers('face_sheet', { frames: [ 0 ] }),
			frameRate: 12,
			repeat: 0,
		});

		this.anims.create({
			key: 'face_awaken',
			frames: this.anims.generateFrameNumbers('face_sheet', { frames: [ 0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10 ] }),
			frameRate: 12,
			repeat: -1,
		});

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

		this.face = new Face(this, {
			parent_position: new Phaser.Math.Vector3(0.0, 10.0, 13.75),
			local_rotation: new Phaser.Math.Quaternion().identity().rotateY(-Math.PI / 6.0),
			local_scale: 7.5,
		});

		this.world.add_3d_existing(this.face);
	}

	update(time, delta) {
		let inverse_view_projection_matrix = new Phaser.Math.Matrix4(
			this.world.cameras_3d[0].view_matrix
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
		let x = 14.0 * (0.75 * clipspace_pos.x) * (1.0 + Math.sin(phi_x) * Math.sin(Math.PI / 6.0) / Math.cos(phi_x + (Math.PI / 6.0)));

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
	}
}

