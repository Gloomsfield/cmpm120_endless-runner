precision highp float;

uniform vec3 a_pos;
uniform vec3 b_pos;

uniform float a_radius;
uniform float b_radius;

uniform vec2 uResolution;

varying vec2 frag_uv;

void main() {
	vec3 scaled_a_pos = a_pos;
	vec3 scaled_b_pos = b_pos;

	float scaled_a_radius = a_radius;
	float scaled_b_radius = b_radius;

	float color = get_color(scaled_a_pos, scaled_b_pos, frag_uv, scaled_a_radius, scaled_b_radius);

	gl_FragColor = vec4(frag_uv.x, frag_uv.y, 1.0, color);
}

