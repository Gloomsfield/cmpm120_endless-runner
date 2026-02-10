class DebugOrb extends Object3D {
	constructor(scene, radius) {
		super(scene, 'debug-orb_pipeline', {});
	}

	determine_radius() {
		return 2;
	}
}
