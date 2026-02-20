class ArmPipeline extends DefaultPipeline {
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
			'arm_sampler2D': {
				type: 'sampler2D',
			},
		};

		super(
			'arm_pipeline',
			'default_vertex',
			'arm_fragment',
			attributes,
			uniforms
		);
	}
}

