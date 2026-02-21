precision mediump float;

varying vec2 frag_uv;
varying vec3 world_pos;

uniform vec3 wall_color;
uniform vec3 player_pos;
uniform float player_light_radius;

void main() {
	float x = frag_uv.x;
	float y = frag_uv.y;

	float d = distance(player_pos, world_pos);
	float within_range = float(d < player_light_radius);
	float brightness = within_range * (floor( 3.0 * sqrt(-d + player_light_radius)) / 3.0);

	gl_FragColor = vec4(wall_color * brightness / 5.5, 1.0);
}

