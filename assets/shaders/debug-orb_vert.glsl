precision mediump float;

uniform mat4 projection_matrix;
uniform mat4 view_matrix;

attribute vec3 pos_attribute;
attribute vec2 uv_attribute;

varying vec2 frag_uv;

void main() {
	// float frag_u = (1.0 - inTexCoord.x) * (float(chunk_index.x) + chunk_radius / 2.0) + (inTexCoord.x) * (float(chunk_index.x + 1) + chunk_radius / 2.0);
	// float frag_v = (1.0 - inTexCoord.y) * (float(chunk_index.y) + chunk_radius / 2.0) + (inTexCoord.y) * (float(chunk_index.y + 1) + chunk_radius / 2.0);
	frag_uv = uv_attribute;

	gl_Position = projection_matrix * view_matrix * vec4(pos_attribute, 1.0);
}

