class Quad extends Phaser.GameObjects.Image {
	constructor(scene, width, height, pipeline_key, texture_key = 0) {
		if(texture_key === 0) { texture_key = Phaser.Math.RND.uuid(); };

		scene.textures.addDynamicTexture(texture_key, width, height);

		super(scene, 0, 0, texture_key);

		this.initPipeline(pipeline_key);

		scene.add.existing(this);
	}
}

