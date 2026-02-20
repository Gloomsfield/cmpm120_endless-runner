class FacePipeline extends DefaultPipeline {
	constructor() {
		let attributes = {
			'pos_attribute': {
				size: 3,
			},
			'uv_attribute': {
				size: 2,
			},
		};

		let uniforms = {
			'face_sampler2D': {
				type: 'sampler2D',
			},
		};

		super(
			'face_pipeline',
			'default_vertex',
			'face_fragment',
			attributes,
			uniforms
		);
	}
}
