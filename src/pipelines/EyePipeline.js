class EyePipeline extends DefaultPipeline {
	constructor() {
		let attributes = {
			'pos_attribute': {
				size: 3
			},
			'uv_attribute': {
				size: 2
			},
		};

		let uniforms = {
			'eye_sampler2D': {
				type: 'sampler2D',
			},
		};

		super(
			'eye_pipeline',
			'default_vertex',
			'eye_fragment',
			attributes,
			uniforms
		);
	}
}

