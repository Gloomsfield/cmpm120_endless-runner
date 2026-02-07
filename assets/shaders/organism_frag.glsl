precision highp float;

uniform vec2 positions[20];
uniform ivec2 edges[50];
uniform float radii[20];

uniform int node_count;
uniform int edge_count;

void main() {
	float color = 0.0;

	for(int i = 0; i < edge_count; i++) {
		vec2 a_pos = positions[edges[i].x];
		vec2 b_pos = positions[edges[i].y];
		vec2 c_pos = gl_FragCoord.xy;

		float m = (a_pos.y - b_pos.y) / (a_pos.x - b_pos.x);

		float closest_point_x = (c_pos.x / m + m * a_pos.x - a_pos.y + c_pos.y ) / (1.0 / m + m);

		float clamped_point_x = min(a_pos.x, b_pos.x);

		// TODO - branchless (this is gonna be grody)
		if(closest_point_x < min(a_pos.x, b_pos.x)) {
			clamped_point_x = min(a_pos.x, b_pos.x);
		}

		if(max(a_pos.x, b_pos.x) < closest_point_x) {
			clamped_point_x = max(a_pos.x, b_pos.x);
		}



		color += 
	}

	gl_FragColor = vec4(color, color, color, color);
}

