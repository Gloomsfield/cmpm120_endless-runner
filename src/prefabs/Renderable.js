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

function render_box(renderer, src, camera, parent_matrix) {
	camera.addToRenderList(src, camera, parent_matrix);

	let pipeline = renderer.pipelines.set(src.pipeline, src);

	let vertices = [
		{ x: -0.5, y: 0.5, z: -0.5 },
		{ x: -0.5, y: -0.5, z: -0.5 },
		{ x: 0.5, y: -0.5, z: -0.5 },
		{ x: 0.5, y: 0.5, z: -0.5 },
		{ x: -0.5, y: 0.5, z: 0.5 },
		{ x: -0.5, y: -0.5, z: 0.5 },
		{ x: 0.5, y: -0.5, z: 0.5 },
		{ x: 0.5, y: 0.5, z: 0.5 },
	];

	let faces = [
		[ 0, 1, 2, 0, 2, 3 ], // front
		[ 4, 5, 1, 4, 1, 0 ], // left
		[ 3, 2, 6, 3, 6, 7 ], // right
		[ 4, 0, 3, 4, 3, 7 ], // top
		[ 1, 2, 6, 1, 6, 5 ], // bottom
		[ 7, 6, 5, 7, 5, 4 ], // back
	];

	for(let quad_index = 0; quad_index < 6; quad_index++) {
		let v0 = vertices[faces[quad_index][0]];
		let v1 = vertices[faces[quad_index][1]];
		let v2 = vertices[faces[quad_index][2]];
		let v3 = vertices[faces[quad_index][3]];
		let v4 = vertices[faces[quad_index][4]];
		let v5 = vertices[faces[quad_index][5]];

		pipeline.batchAttributes(this, {
			// ensure CCW winding order
			'pos_attribute': [
				v0.x, v0.y, v0.z,
				v1.x, v1.y, v1.z,
				v2.x, v2.y, v2.z,
				v3.x, v3.y, v3.z,
				v4.x, v4.y, v4.z,
				v5.x, v5.y, v5.z,
			],	
			'uv_attribute': [
				0.0, 0.0,
				0.0, 1.0,
				1.0, 1.0,
				0.0, 0.0,
				1.0, 1.0,
				1.0, 0.0,
			],
		});
		
		renderer.pipelines.postBatch(src);
	}
}

