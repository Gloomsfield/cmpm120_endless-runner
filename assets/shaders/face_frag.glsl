precision mediump float;

uniform sampler2D face_sampler2D;

varying vec2 frag_uv;

void main() {
	vec4 color = texture2D(face_sampler2D, frag_uv);
	//color = vec4(frag_uv.x, frag_uv.y, 1.0, 1.0);
	if(length(color.xyz) < 0.01) { color.a = 0.0; discard; }
	gl_FragColor = color;
}

