class RenderTarget3D extends Phaser.Scene {
	constructor() {
		super('render-target-3d_scene');

		this.renderables = [ ];
	}

	register_renderable(renderable) {
		this.renderables.push(renderable);
	}

	unregister_renderable(renderable) {
		let i = this.renderables.indexOf(renderable);

		if(i > -1) {
			this.renderables.splice(i, 1);
		}
	}

	render_scene(view_matrix) {
		// get camera x and z position from view matrix
		let view_flat_position = new Phaser.Math.Vector2(view_matrix[12], view_matrix[14]);

		let depth_sorted_renderables = [ ];

		for(let renderable of this.renderables) {
			// does this work when rotating the camera on the x-axis...?
			let renderable_position = renderable.global_position;
			let renderable_flat_position = new Phaser.Math.Vector2(renderable_position.x, renderable_position.z);
			let view_renderable_dot = dot_vector2(renderable_flat_position, view_flat_position);
			let view_renderable_angle = Math.acos(view_renderable_dot / renderable_flat_position.length / view_flat_position.length);
			let renderable_depth = view_flat_position.distance(renderable_flat_position) * Math.sin(view_renderable_angle);

			let lower_bound = 0;
			let upper_bound = depth_sorted_renderables.length;

			while(lower_bound < upper_bound) {
				let midpoint = Math.floor((upper_bound - lower_bound) / 2.0);

				if(depth_sorted_renderables[midpoint].depth < renderable_depth) {
					lower_bound = midpoint + 1;
				} else {
					upper_bound = midpoint;
				}
			}

			depth_sorted_renderables.splice(lower_bound, 0, { renderable: renderable, depth: renderable_depth })
		}

		for(let [ i, { renderable, _ } ] of depth_sorted_renderables.entries()) {
			renderable.setDepth(i);
			renderable.set_view_matrix(view_matrix);
			renderable.set_projection_matrix(camera_projection_matrix);
		}
	}
}
