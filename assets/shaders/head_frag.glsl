precision mediump float;

uniform float radius;

varying vec2 frag_uv;

void main() {
	float x = frag_uv.x - 0.5;
	float y = frag_uv.y - 0.5;

	float x_2 = x * 0.5;
	float y_2 = (y + 0.3) * 0.75;

	float color = float(x * x + y * y < radius);

	if(color < 0.01) {
		discard;
	}

	color *= 1.0 - 1.0 * (x_2 * x_2 + y_2 * y_2);

	color = floor(color * 7.5) / 7.0;


	gl_FragColor = vec4(color, color, color, color);
}

