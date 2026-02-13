let Renderable = new Phaser.Class({
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
		Phaser.GameObjects.Components.Depth,
	],

	initialize: function Renderable(scene, pipeline_key) {
		let texture_key = Phaser.Math.RND.uuid();

		scene.textures.addDynamicTexture(texture_key, 64, 64);

		Phaser.GameObjects.GameObject.call(this, scene, 'Renderable');
		
		this.setTexture(texture_key);
		this.setPosition(0.0, 0.0);
		this.setSizeToFrame();
		this.setOriginFromFrame();

		this.initPipeline(pipeline_key);

		this.model_matrix = new Phaser.Math.Matrix4();
		this.view_matrix = new Phaser.Math.Matrix4();
		this.projection_matrix = new Phaser.Math.Matrix4();

		this.pipeline.setTexture2D(this.texture.getWebGLTexture());
	},

	set_view_matrix: function(view_matrix) {
		this.view_matrix = view_matrix;
	},

	set_projection_matrix: function(projection_matrix) {
		this.projection_matrix = projection_matrix;
	},
});

function render_quad(renderer, src, camera, parent_matrix) {
	camera.addToRenderList(src, camera, parent_matrix);

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
}

