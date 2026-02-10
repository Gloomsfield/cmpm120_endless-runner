class DefaultPipeline extends Phaser.Renderer.WebGL.WebGLPipeline {
	constructor(pipeline_name, vertex_shader_key, fragment_shader_key, attributes, uniforms) {
		let vertex_size = 0;
		let attribute_array = [];

		for(let [ key, value ] of Object.entries(attributes)) {
			vertex_size += fallback(value.size, 1);

			attribute_array.push({ name: key, size: fallback(value.size, 1), });
		}
		
		let config = {
			game: game,
			name: pipeline_name,
			vertShader: game.cache.text.get(vertex_shader_key),
			fragShader: game.cache.text.get(fragment_shader_key),
			vertexSize: vertex_size,
			batchSize: 4096,
			attributes: attribute_array,
		};

		super(config);

		this.attributes = attributes;

		this.uniforms = {
			'model_matrix': {
				type: 'mat4',
			},
			'view_matrix': {
				type: 'mat4',
			},
			'projection_matrix': {
				type: 'mat4',
			},
		};
		Object.assign(this.uniforms, uniforms);
	}

	onBind(gameobject) {
		if(gameobject) {
			for(let [ key, value ] of Object.entries(this.uniforms)) {
				if(!Object.keys(gameobject).includes(key)) {
					continue;
				}

				switch(value.type) {
					case '1f':
						this.set1f(key, gameobject[key]);
						break;
					case '2f':
						this.set2f(key, gameobject[key].x, gameobject[key].y);
						break;
					case 'mat4':
						this.setMatrix4fv(key, false, gameobject[key].val);
						break;
					case 'sampler2D':
						let unit = this.setTexture2D(gameobject[key]);
						this.set1i(key, unit);
						break;
				}
			}
		}
	}

	batchAttributes(gameobject, attributes, texture) {
		if(Object.keys(attributes).length != Object.keys(this.attributes).length) {
			console.error('attribute size mismatch!');

			return;
		}

		let vertex_count = Object.values(attributes)[0].length / this.attributes[Object.keys(attributes)[0]].size;

		for(let [ key, value ] of Object.entries(attributes)) {
			if(!Object.keys(this.attributes).includes(key)) {
				console.error('vertex data provided to batchQuad contained unknown attributes!');

				return;
			}

			if(value.length / this.attributes[key].size != vertex_count) {
				console.error('vertex data provided to batchQuad was not consistently sized!');

				return;
			}
		}

		
		if(this.shouldFlush(vertex_count)) {
			this.flush();
		}

		if(!this.currentBatch) {
			this.setTexture2D(texture);
		}

		let vertex_view_f32 = this.vertexViewF32;

		let vertex_index = (this.vertexCount * this.currentShader.vertexComponentCount) - 1;

		for(let i = 0; i < vertex_count; i++) {
			for(let [ key, value ] of Object.entries(this.attributes)) {
				for(let j = 0; j < value.size; j++) {
					vertex_view_f32[++vertex_index] = attributes[key][i * value.size + j];
				}
			}
		}

		this.vertexCount += vertex_count;

		this.currentBatch.count = (this.vertexCount - this.currentBatch.start);

		this.onBatch(gameobject);
	}

	onBatch() {
		this.flush();
	}
}

