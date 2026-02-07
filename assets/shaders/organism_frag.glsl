precision highp float;

varying vec2 frag_uv;

void main() {
	gl_FragColor = vec4(frag_uv.x, 0.0, 1.0, 1.0);
}

