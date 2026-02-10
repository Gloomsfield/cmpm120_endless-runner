class DebugOrbPipeline extends DefaultPipeline {
	constructor() {
		let config = {
			game: game,
			name: 'debug-orb_pipeline',
			vertShader: `
				precision mediump float;

				attribute vec2 pos_attribute;
				attribute vec2 uv_attribute;

				varying vec2 frag_uv;

				void main() {
					frag_uv = uv_attribute;
					gl_Position = vec4(pos_attribute, 1.0, 1.0);
				}
			`,
			fragShader: `
				precision mediump float;

				varying vec2 frag_uv;

				void main() {
					gl_FragColor = vec4(frag_uv.x, frag_uv.y, 1.0, 1.0);
				}
			`,
			vertexSize: 4,
			batchSize: 12,
			attributes: [
				{
					name: 'pos_attribute',
					size: 2
				},
				{
					name: 'uv_attribute',
					size: 2
				}
			]
		};

		super(config);

		this.config = config;
	}

	batchQuad(gameobject, x0, y0, x1, y1, x2, y2, x3, y3, texture) {
		let hasFlushed = false;

		if(this.shouldFlush(6)) {
			this.flush();
			hasFlushed = true;
		}

		if(!this.currentBatch) {
			this.setTexture2D(texture);
		}

		let vertex_view_f32 = this.vertexViewF32;

		let vertex_index = (this.vertexCount * this.currentShader.vertexComponentCount) - 1;

		vertex_view_f32[++vertex_index] = x0;
		vertex_view_f32[++vertex_index] = y0;
		vertex_view_f32[++vertex_index] = 0;
		vertex_view_f32[++vertex_index] = 0;

		vertex_view_f32[++vertex_index] = x1;
		vertex_view_f32[++vertex_index] = y1;
		vertex_view_f32[++vertex_index] = 0;
		vertex_view_f32[++vertex_index] = 1;

		vertex_view_f32[++vertex_index] = x2;
		vertex_view_f32[++vertex_index] = y2;
		vertex_view_f32[++vertex_index] = 1;
		vertex_view_f32[++vertex_index] = 0;

		vertex_view_f32[++vertex_index] = x0;
		vertex_view_f32[++vertex_index] = y0;
		vertex_view_f32[++vertex_index] = 0;
		vertex_view_f32[++vertex_index] = 0;

		vertex_view_f32[++vertex_index] = x2;
		vertex_view_f32[++vertex_index] = y2;
		vertex_view_f32[++vertex_index] = 1;
		vertex_view_f32[++vertex_index] = 0;

		vertex_view_f32[++vertex_index] = x3;
		vertex_view_f32[++vertex_index] = y3;
		vertex_view_f32[++vertex_index] = 1;
		vertex_view_f32[++vertex_index] = 1;

		this.vertexCount += 6;

		this.currentBatch.count = (this.vertexCount - this.currentBatch.start);

		this.onBatch(gameobject);

		return hasFlushed;
	}

	batchVert(x, y, texture) {
		if(this.shouldFlush(1)) {
			this.flush();
		}

		if(!this.currentBatch) {
			this.setTexture2D(texture);
		}

		let vertex_view_f32 = this.vertexViewF32;

		let vertex_index = (this.vertexCount * this.currentShader.vertexComponentCount) - 1;

		vertex_view_f32[++vertex_index] = x;
		vertex_view_f32[++vertex_index] = y;

		this.vertexCount++;
		this.currentBatch.count = (this.vertexCount - this.currentBatch.start);
	}
}

