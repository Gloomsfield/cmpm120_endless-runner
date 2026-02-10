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

		super(
			'debug-orb_pipeline',
			'debug-orb_vertex',
			'debug-orb_fragment',
			attributes
		);
	}

	onBind(gameobject) {
		if(gameobject) {
			this.set2f('quad_offset', gameobject.quad_offset.x, gameobject.quad_offset.y);
			this.setMatrix4fv('view_matrix', false, gameobject.view_matrix.val);
			this.setMatrix4fv('projection_matrix', false, gameobject.projection_matrix.val);
		}
	}
}

