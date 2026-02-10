precision mediump float;

uniform sampler2D eye_sampler2D;

varying vec2 frag_uv;

void main() {
	gl_FragColor = texture2D(eye_sampler2D, frag_uv);
}

