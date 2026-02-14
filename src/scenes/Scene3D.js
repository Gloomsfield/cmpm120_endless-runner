class Scene3D extends Phaser.Scene {
	constructor() {
		super('scene-3d_scene');

		this.cameras_3d = [];
		this.render_targets = [];

		world_3d = this;
	}

	// config
	//		camera_index - index into this.cameras_3d
	//		target_index - index into this.render_targets
	//		position - world position of the new camera
	//			{ x, y, z }
	//		look - look vector of the new camera
	//			{ x, y, z }
	//		up - camera up vector
	//			{ x, y, z }
	//		right - camera right vector
	//			{ x, y, z }
	add_camera(config) {
		let camera = {
			view_matrix: new Phaser.Math.Matrix4().fromArray([
				config.right.x, config.right.y, config.right.z, 0.0,
				config.up.x, config.up.y, config.up.z, 0.0,
				config.look.x, config.look.y, config.look.z, 0.0,
				config.position.x, config.position.y, config.position.z, 1.0
			]),
			render_target: config.target_index,
			depth_sorted_object_handles: Array(POOL_SIZE),
		};

		this.cameras_3d.push(camera);
	}

	rotate_camera(camera_index, angle, axis) {
		this.cameras_3d[camera_index].view_matrix.rotate(angle, axis);
	}

	add_render_target(config) {
		this.render_targets.push({
			x: config.x,
			y: config.y,
			width: config.width,
			height: config.height,
			camera_index: undefined,
			scene: undefined,
		});

		return this.render_targets.length - 1;
	}

	link_render_target(camera_index, target_index) {
		let target_config = this.render_targets[target_index];

		this.scene.add(`render-target-3d-${target_index}_scene`, RenderTarget3D, false);
		this.scene.launch(`render-target-3d-${target_index}_scene`);

		this.render_targets[target_index].scene = this.scene.get(`render-target-3d-${target_index}_scene`);
		this.render_targets[target_index].camera_index = camera_index;

		this.render_targets[target_index].scene.cameras.main.setViewport(
			target_config.x,
			target_config.y,
			target_config.width,
			target_config.height
		);
	}

	add_3d(config) {
		let new_object = new config.object_class(this, config.config);

		for(let render_target of this.render_targets) {
			render_target.scene.register_renderable(new_object);
		}

		new_object.on('add-child', (child) => { this.add_3d_existing(child); });

		return new_object;
	}

	add_3d_existing(obj) {
		while(obj.deferred_child_queue.length > 0) {
			this.add_3d_existing(obj.deferred_child_queue.shift());
		}

		for(let render_target of this.render_targets) {
			render_target.scene.register_renderable(obj);
		}

		obj.on('add-child', (child) => { this.add_3d_existing(child); });

		return obj;
	}

	update() {
		for(let i = 0; i < this.render_targets.length; i++) {
			this.render_targets[i].scene.render_scene(
				this.cameras_3d[this.render_targets[i].camera_index].view_matrix
			);
		}
	}
}

