class Scene3D extends Phaser.Scene {
	constructor() {
		super('scene-3d_scene');

		this.camera_3d = {
			view_matrix: new Phaser.Math.Matrix4().fromArray([
				1.0, 0.0, 0.0, 0.0, // right
				0.0, 1.0, 0.0, 0.0, // up
				0.0, 0.0, -1.0, 0.0, // look
				0.0, 0.0, 0.0, 1.0, // position
			]),
		};
	}

	create() {
		this.scene.launch('render-target-3d_scene');
	}

	add_3d(config) {
		let new_object = new config.object_class(this, config.config);

		this.scene.get('render-target-3d_scene').register_renderable(new_object);

		new_object.on('add-child', (child) => { this.add_3d_existing(child); });

		return new_object;
	}

	add_3d_existing(obj) {
		while(obj.deferred_child_queue.length > 0) {
			this.add_3d_existing(obj.deferred_child_queue.shift());
		}

		this.scene.get('render-target-3d_scene').register_renderable(obj);

		obj.on('add-child', (child) => { this.add_3d_existing(child); });

		return obj;
	}

	update() {
		this.scene.get('render-target-3d_scene').render_scene(
			this.camera_3d.view_matrix
		);
	}
}

