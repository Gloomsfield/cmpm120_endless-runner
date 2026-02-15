precision mediump float;

uniform mat4 projection_matrix;
uniform mat4 view_matrix;
uniform mat4 model_matrix;

uniform float global_scale;

uniform float local_width;
uniform float local_height;
uniform float local_depth;

attribute vec3 pos_attribute;
attribute vec2 uv_attribute;

varying vec2 frag_uv;

void main() {
	frag_uv = uv_attribute;

	vec4 local_pos = vec4(
		pos_attribute.x * local_width,
		pos_attribute.y * local_height,
		pos_attribute.z * local_depth,
		1.0
	);

	vec4 global_pos = model_matrix * (local_pos * global_scale);

	gl_Position = projection_matrix * (view_matrix * global_pos);
}

