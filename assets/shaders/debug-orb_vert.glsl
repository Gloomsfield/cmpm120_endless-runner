precision mediump float;

uniform mat4 uProjectionMatrix;
uniform mat4 projection_matrix;

attribute vec2 inPosition;
attribute vec2 inTexCoord;

uniform float time;

uniform vec2 position;

varying vec2 frag_uv;

void main() {
	// float frag_u = (1.0 - inTexCoord.x) * (float(chunk_index.x) + chunk_radius / 2.0) + (inTexCoord.x) * (float(chunk_index.x + 1) + chunk_radius / 2.0);
	// float frag_v = (1.0 - inTexCoord.y) * (float(chunk_index.y) + chunk_radius / 2.0) + (inTexCoord.y) * (float(chunk_index.y + 1) + chunk_radius / 2.0);

	mat4 rotation_matrix;
	rotation_matrix[0] = vec4(1.0, 0.0, 0.0, 0.0);
	rotation_matrix[1] = vec4(0.0, cos(time), sin(time), 0.0);
	rotation_matrix[2] = vec4(0.0, sin(time), cos(time), 0.0);
	rotation_matrix[3] = vec4(0.0, 0.0, 0.0, 1.0);

	frag_uv = inTexCoord;

	gl_Position = projection_matrix * rotation_matrix * vec4(inPosition + position, 1.0, 1.0);
}

