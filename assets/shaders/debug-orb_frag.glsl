precision mediump float;

varying vec2 frag_uv;

void main() {
	gl_FragColor = vec4(frag_uv.x, frag_uv.y, 0.25, 1.0);
}
