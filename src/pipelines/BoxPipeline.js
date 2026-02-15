class BoxPipeline extends DefaultPipeline {
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
			'local_width': {
				type: '1f',
			},
			'local_height': {
				type: '1f',
			},
			'local_depth': {
				type: '1f',
			},
		};

		super(
			'box_pipeline',
			'box_vertex',
			'debug_fragment',
			attributes,
			uniforms
		);
	}
}

