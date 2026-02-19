class WallPipeline extends DefaultPipeline {
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
			'wall_color': {
				type: '3f',
			},
			'player_pos': {
				type: '3f',
			}
		};

		super(
			'wall_pipeline',
			'wall_vertex',
			'wall_fragment',
			attributes,
			uniforms
		);
	}
}
