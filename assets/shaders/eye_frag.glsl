precision mediump float;

uniform sampler2D eye_sampler2D;

varying vec2 frag_uv;

void main() {
	vec4 color = texture2D(eye_sampler2D, frag_uv);
	if(length(color.xyz) < 0.01) { color.a = 0.0; }
	gl_FragColor = color;
}

