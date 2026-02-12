precision mediump float;

uniform mat4 projection_matrix;
uniform mat4 view_matrix;
uniform mat4 model_matrix;

uniform float scale_s;

attribute vec3 pos_attribute;
attribute vec2 uv_attribute;

varying vec2 frag_uv;

void main() {
	frag_uv = uv_attribute;

	vec4 transformed_pos = model_matrix * vec4(pos_attribute * scale_s, 1.0);

	gl_Position = projection_matrix * (view_matrix * transformed_pos);
}

