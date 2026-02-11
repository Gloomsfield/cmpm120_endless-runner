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
		// get camerax and z position from view matrix
		let view_projected_position = new Phaser.Math.Vector2(view_matrix[12], view_matrix[14]);

		let depth_sorted_renderables = [ ];

		this.renderables.forEach((renderable, handle) => {
			let current_projected_position = new Phaser.Math.Vector2(renderable.x, renderable.z);

			let dot = dot_vector2(current_projected_position, view_projected_position);
			let angle_between = Math.acos(dot / current_projected_position.length / view_projected_position.length);
			let current_depth = view_projected_position.distance(current_projected_position) * Math.sin(angle_between);

			let lower_bound = 0;
			let upper_bound = depth_sorted_renderables.length;

			while(lower_bound < upper_bound) {
				let midpoint = Math.floor((upper_bound - lower_bound) / 2.0);

				if(depth_sorted_renderables[midpoint].depth < current_depth) {
					lower_bound = midpoint + 1;
				} else {
					upper_bound = midpoint;
				}
			}

			depth_sorted_renderables.splice(lower_bound, 0, { handle: handle, depth: current_depth });
		});

		for(let [ i, renderable ] of depth_sorted_renderables.entries()) {
			let handle = renderable.handle;

			this.renderables.get(handle).setDepth(depth_sorted_renderables.length - i);
			this.renderables.get(handle).set_view_matrix(view_matrix);
			this.renderables.get(handle).set_projection_matrix(camera_projection_matrix);
		}
	}

	update() {

	}
}
