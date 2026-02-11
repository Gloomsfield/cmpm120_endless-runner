class HeadPipeline extends DefaultPipeline {
	constructor() {
		let attributes = {
			'pos_attribute': {
				size: 3
			},
			'uv_attribute': {
				size: 2
			}
		};

		let uniforms = {
			'radius': {
				type: '1f',
			},
		};

		super(
			'head_pipeline',
			'billboard_vertex',
			'head_fragment',
			attributes,
			uniforms
		);
	}
}
