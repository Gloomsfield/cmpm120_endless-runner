precision mediump float;

uniform sampler2D face_sampler2D;
uniform vec3 player_pos;
uniform float player_light_radius;

varying vec2 frag_uv;
varying vec3 world_pos;

void main() {
	vec4 color = texture2D(face_sampler2D, frag_uv);

	float d = distance(player_pos, world_pos);
	float within_range = float(d < player_light_radius);
	float brightness = within_range * (floor(sqrt(-d + player_light_radius)) / 3.0);

	if(length(color.xyz) < 0.01) { color.a = 0.0; discard; }

	color *= brightness;
	color.a = 1.0;

	gl_FragColor = color;
}

