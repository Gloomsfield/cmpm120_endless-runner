class DebugOrb extends Object3D {
	constructor(scene, radius) {
		super(scene,
			'debug-orb_pipeline',
			new Phaser.Math.Vector3(0.0, 0.0, -10.0),
			new Phaser.Math.Quaternion().identity()
		);
	}

	determine_radius() {
		return 2;
	}
}
