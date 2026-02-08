precision highp float;

uniform vec3 a_pos;
uniform vec3 b_pos;

uniform float a_radius;
uniform float b_radius;

uniform vec2 uResolution;

varying vec2 frag_uv;

float get_color(vec3 a, vec3 b, vec2 c, float r_a, float r_b) {
	float m = (a.y - b.y) / (a.x - b.x);
	float n = (c.x / m + m * a.x - a.y + c.y) / (1.0 / m + m);

	bool n_condition_1 = min(a.x, b.x) < n;
	bool n_condition_2 = n < max(a.x, b.x);

	bool n_condition_3 = n_condition_1 && n_condition_2;

	float n_2 = float(n_condition_3) * n + float(!n_condition_1) * min(a.x, b.x) + float(!n_condition_2) * max(a.x, b.x);

	float p = (n_2 - a.x) / (b.x - a.x);
	float smoothed_radius = (1.0 - p) * r_a + p * r_b;
	
	float p_2 = (n_2 - max(a.x, b.x)) / (min(a.x, b.x) - max(a.x, b.x));
	float smoothed_z = p_2 * (max(a.z, b.z) - min(a.z, b.z)) + min(a.z, b.z);

	float d = sqrt(pow(c.x - n_2, 2.0) + pow(c.y - m * (n_2 - a.x) + a.y, 2.0));

	if(d < smoothed_radius) {
		//return (2.0 * (1.125 - d * 7.5) * (smoothed_z / 5.0));
		return 1.0;
	}

	return 0.0;
}

void main() {
	vec3 scaled_a_pos = a_pos;
	vec3 scaled_b_pos = b_pos;

	float scaled_a_radius = a_radius;
	float scaled_b_radius = b_radius;

	float color = get_color(scaled_a_pos, scaled_b_pos, frag_uv, scaled_a_radius, scaled_b_radius);

	gl_FragColor = vec4(frag_uv.x, frag_uv.y, 1.0, color);
}

