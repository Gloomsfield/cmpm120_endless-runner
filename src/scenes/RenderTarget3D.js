class RenderTarget3D extends Phaser.Scene {
	constructor(scene_key) {
		super(scene_key);

		this.renderables = new Map();
	}

	register_renderable(handle, renderable) {
		this.renderables.set(handle, renderable);
	}

	unregister_renderable(handle) {
		this.renderables.delete(handle);
	}

	render_scene(view_matrix) {
		this.renderables.forEach((renderable, handle) => {
			this.renderables.get(handle).update();

			this.renderables.get(handle).set_view_matrix(view_matrix);
			this.renderables.get(handle).set_projection_matrix(camera_projection_matrix);
		});
	}

	update() {

	}
}
