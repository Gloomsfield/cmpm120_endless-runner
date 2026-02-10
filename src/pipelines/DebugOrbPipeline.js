class DebugOrbPipeline extends DefaultPipeline {
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
			'quad_offset': {
				type: '2f',
			},
		};

		super(
			'debug-orb_pipeline',
			'default_vertex',
			'debug-orb_fragment',
			attributes,
			uniforms
		);
	}
}

