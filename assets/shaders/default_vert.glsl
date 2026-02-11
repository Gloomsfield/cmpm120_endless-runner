precision mediump float;

uniform mat4 projection_matrix;
uniform mat4 view_matrix;
uniform mat4 model_matrix;

uniform vec3 rotation_pivot;

attribute vec3 pos_attribute;
attribute vec2 uv_attribute;

varying vec2 frag_uv;

void main() {
	frag_uv = uv_attribute;

	vec4 offset_pos = vec4(pos_attribute + rotation_pivot, 1.0);
	vec4 transformed_offset_pos = model_matrix * offset_pos;
	vec4 transformed_pos = transformed_offset_pos - vec4(rotation_pivot, 0.0);

	gl_Position = projection_matrix * (view_matrix * transformed_pos);
}

