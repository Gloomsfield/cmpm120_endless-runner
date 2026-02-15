precision mediump float;

varying vec2 frag_uv;

void main() {
	float x = frag_uv.x;
	float y = frag_uv.y;

	gl_FragColor = vec4(x, y, 0.5, 1.0);
}
