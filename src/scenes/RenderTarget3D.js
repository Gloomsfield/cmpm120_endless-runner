class RenderTarget3D extends Phaser.Scene {
	constructor(scene_key) {
		super(scene_key);

		this.renderables = new Map();
	}

	register_renderable(handle, renderable) {
		this.renderables.set(handle, { renderable: renderable, chunks: [] });
	}

	unregister_renderable(handle) {
		this.renderables.delete(handle);
	}

	render_scene(view_matrix) {
		this.renderables.forEach((renderable, handle) => {
			this.renderables.get(handle).renderable.update();
    
			let old_radius = renderable.renderable.radius;
			let new_radius = renderable.renderable.determine_radius();
    
			if(new_radius < old_radius) {
				for(let _ = 0; _ < old_radius * old_radius - new_radius * new_radius; _++) {
					this.renderables.get(handle).chunks.pop();
				}
			} else if(old_radius < new_radius) {
				for(let _ = 0; _ < new_radius * new_radius - old_radius * old_radius; _++) {
					this.renderables.get(handle).chunks.push(
						new Object3DChunk(
							this,
							renderable.renderable.pipeline_key,
							renderable.renderable.uniforms
						)
					);
				}
			}
    
			this.renderables.get(handle).renderable.radius = new_radius;
    
			for(let i = 0; i < this.renderables.get(handle).chunks.length; i++) {
				let x = i % (new_radius) - (new_radius / 2);
				let y = Math.floor(i / new_radius) - (new_radius / 2);

				this.renderables.get(handle).chunks[i].update_quad_offset_uniform({
					x: x,
					y: y
				});
    
				this.renderables.get(handle).chunks[i].update_view_matrix_uniform(view_matrix);
				this.renderables.get(handle).chunks[i].update_projection_matrix_uniform(camera_projection_matrix);
			}
		});
	}

	update() {

	}
}
