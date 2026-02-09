class DebugOrbPipeline extends DefaultPipeline {
	constructor() {
		let config = {
			game: game,
			name: 'debug-orb_pipeline',
			vertShader: `
				precision mediump float;

				attribute vec2 inPosition;

				uniform mat4 uProjectionMatrix;

				void main() {
					gl_Position = vec4(inPosition, 1.0, 1.0);
				}
			`,
			fragShader: `
				precision mediump float;

				void main() {
					gl_FragColor = vec4(1.0, 0.0, 0.0, 1.0);
				}
			`,
			vertexSize: 2,
			batchSize: 6,
			vertices: [
				-1.0, 1.0,
				1.0, 1.0,
				1.0, -1.0,
				-1.0, 1.0,
				-1.0, -1.0,
				1.0, -1.0
			],
			attributes: [
				{
					name: 'inPosition',
					size: 2
				}
			]
		};

		super(config);

		this.config = config;
	}

	//boot() {
	//	var i;
    //    var gl = this.gl;
    //    var config = this.config;
    //    var renderer = this.renderer;
    //
    //    if (!this.isPostFX)
    //    {
    //        this.projectionMatrix = new Phaser.Math.Matrix4().identity();
    //    }
    //
    //    //  Create the Render Targets
    //
    //    var renderTargets = this.renderTargets;
    //
    //    var targets = config.renderTarget;
    //
    //    //  If boolean, set to number = 1
    //    if (typeof(targets) === 'boolean' && targets)
    //    {
    //        targets = 1;
    //    }
    //
    //    var width = renderer.width;
    //    var height = renderer.height;
    //
    //    if (typeof(targets) === 'number')
    //    {
    //        //  Create this many default RTs
    //        for (i = 0; i < targets; i++)
    //        {
    //            renderTargets.push(new RenderTarget(renderer, width, height, 1, 0, true));
    //        }
    //    }
    //
    //    //  Create the Shaders
	//	this.setShadersFromConfig(config);
    //
	//	// TODO research why this was written the way it
	//	// used to be.
    //    var shaders = this.shaders;
    //    var vertexSize = config.vertexSize;
    //
    //    var batchSize = config.batchSize;
    //
    //    //  * 6 because there are 6 vertices in a quad and 'batchSize' represents the quantity of quads in the batch
    //
    //    this.vertexCapacity = batchSize * 6;
    //
    //    var data = new ArrayBuffer(this.vertexCapacity * vertexSize);
    //
    //    this.vertexData = data;
    //    this.bytes = new Uint8Array(data);
    //    this.vertexViewF32 = new Float32Array(data);
    //    this.vertexViewU32 = new Uint32Array(data);
    //
    //    var configVerts = config.vertices;
    //
    //    if (configVerts)
    //    {
    //        this.vertexViewF32.set(configVerts);
    //
    //        this.vertexBuffer = renderer.createVertexBuffer(data, gl.STATIC_DRAW);
    //    }
    //
    //    //  Set-up shaders
    //
    //    this.setVertexBuffer();
    //
    //    for (i = shaders.length - 1; i >= 0; i--)
    //    {
    //        shaders[i].rebind();
    //    }
    //
    //    this.hasBooted = true;
    //
    //    renderer.on(Phaser.Renderer.Events.RESIZE, this.resize, this);
    //    renderer.on(Phaser.Renderer.Events.PRE_RENDER, this.onPreRender, this);
    //    renderer.on(Phaser.Renderer.Events.RENDER, this.onRender, this);
    //    renderer.on(Phaser.Renderer.Events.POST_RENDER, this.onPostRender, this);
    //
    //    this.emit(Phaser.Renderer.Events.BOOT, this);
    //
    //    this.onBoot();
	//}
}

