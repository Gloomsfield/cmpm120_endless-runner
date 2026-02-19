precision mediump float;

varying vec2 frag_uv;
varying vec3 world_pos;

uniform vec3 wall_color;
uniform vec3 player_pos;

void main() {
	float x = frag_uv.x;
	float y = frag_uv.y;

	float brightness = distance(player_pos, world_pos);

	brightness = 2.0 - floor(brightness * brightness / 30.0) / 2.5;

	gl_FragColor = vec4(wall_color * brightness / 5.5, 1.0);
}

