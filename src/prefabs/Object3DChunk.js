class Object3DChunk extends Quad {
	constructor(scene, pipeline_key) {
		super(scene, 64, 64, pipeline_key);

		scene.add.existing(this);

		this.quad_offset = { x: 0, y: 0 };
		this.model_matrix = undefined;
		this.view_matrix = undefined;
		this.projection_matrix = undefined;
	}

	set_projection_matrix(new_projection_matrix) {
		this.projection_matrix = new_projection_matrix;
	}

	set_view_matrix(new_view_matrix) {
		this.view_matrix = new_view_matrix;
	}

	set_model_matrix(new_model_matrix) {
		this.model_matrix = new_model_matrix;
	}

	set_quad_offset(new_offset) {
		this.quad_offset = new_offset;
	}
}

