precision mediump float;

uniform float radius;

varying vec2 frag_uv;

void main() {
	float x = frag_uv.x - 0.5;
	float y = frag_uv.y - 0.5;

	float color = float(x * x + y * y < radius);

	if(color < 0.01) {
		discard;
	}

	gl_FragColor = vec4(color, color, color, color);
}

