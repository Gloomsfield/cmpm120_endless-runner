precision mediump float;

uniform sampler2D face_sampler2D;
uniform vec3 player_pos;

varying vec2 frag_uv;
varying vec3 world_pos;

void main() {
	vec4 color = texture2D(face_sampler2D, frag_uv);

	float brightness = distance(player_pos, world_pos);

	brightness = 1.0 - floor(brightness * brightness / 30.0) / 2.5;

	if(length(color.xyz) < 0.01) { color.a = 0.0; discard; }

	color *= brightness;
	color.a = 1.0;

	gl_FragColor = color;
}

