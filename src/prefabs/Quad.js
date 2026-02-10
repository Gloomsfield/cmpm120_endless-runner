let Quad = new Phaser.Class({
	Extends: Phaser.GameObjects.GameObject,

	Mixins: [
		Phaser.GameObjects.Components.Pipeline,
		Phaser.GameObjects.Components.Texture,
		Phaser.GameObjects.Components.Transform,
		Phaser.GameObjects.Components.Size,
		Phaser.GameObjects.Components.Origin,
		Phaser.GameObjects.Components.Visible,
		Phaser.GameObjects.Components.GetBounds,
		Phaser.GameObjects.Components.BlendMode,
	],

	initialize: function Quad(scene, width, height, pipeline_key, texture_key = 0) {
		if(texture_key === 0) { texture_key = Phaser.Math.RND.uuid(); };

		scene.textures.addDynamicTexture(texture_key, width, height);

		Phaser.GameObjects.GameObject.call(this, scene, 'Quad');

		this.setTexture(texture_key);
		this.setPosition(0, 0);
		this.setSizeToFrame();
		this.setOriginFromFrame();

		this.initPipeline(pipeline_key);

		this.pipeline.setTexture2D(this.texture.getWebGLTexture());
	},

	renderWebGL: function(renderer, src, camera, parentMatrix) {
		camera.addToRenderList(src, camera, parentMatrix);

		let pipeline = renderer.pipelines.set(src.pipeline, src);

		pipeline.batchAttributes(this,
			{
				'pos_attribute': [
					-0.5, 0.5, 0.0,
					-0.5, -0.5, 0.0,
					0.5, -0.5, 0.0,
					-0.5, 0.5, 0.0,
					0.5, -0.5, 0.0,
					0.5, 0.5, 0.0,
				],
				'uv_attribute': [
					0.0, 0.0,
					0.0, 1.0,
					1.0, 1.0,
					0.0, 0.0,
					1.0, 1.0,
					1.0, 0.0,
				],
			}
		);

		renderer.pipelines.postBatch(src);
	},
});

