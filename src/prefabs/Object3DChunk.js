class Object3DChunk extends Quad {
	constructor(scene, pipeline_key) {
		super(scene, 64, 64, pipeline_key);

		scene.add.existing(this);

		this.quad_offset = { x: 0, y: 0 };
	}

	update_projection_matrix_uniform(new_projection_matrix) {
		for(let shader of this.pipeline.shaders) {
			shader.setMatrix4fv('projection_matrix', false, new_projection_matrix);
		}
	}

	update_view_matrix_uniform(new_view_matrix) {
		for(let shader of this.pipeline.shaders) {
			shader.setMatrix4fv('view_matrix', false, new_view_matrix);
		}
	}

	update_quad_offset_uniform(new_offset) {
		this.quad_offset = new_offset;
	}
}

