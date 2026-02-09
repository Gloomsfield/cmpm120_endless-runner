class Object3DChunk extends Quad {
	constructor(scene, pipeline_key) {
		super(scene, 640, 640, pipeline_key);

		scene.add.existing(this);
	}

	update_projection_matrix_uniform(new_projection_matrix) {
		this.pipeline.setMatrix4fv('projection_matrix', false, new_projection_matrix);
	}

	update_view_matrix_uniform(new_view_matrix) {
		this.pipeline.setMatrix4fv('view_matrix', false, new_view_matrix);
	}

	update_chunk_index_uniform(new_index) {
		this.pipeline.set2f('chunk_index', new_index.x, new_index.y);
	}

	update_chunk_radius_uniform(new_radius) {
		this.pipeline.set1f('chunk_radius', new_radius);
	}
}

