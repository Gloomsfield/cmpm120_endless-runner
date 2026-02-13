precision mediump float;

uniform mat4 projection_matrix;
uniform mat4 view_matrix;
uniform mat4 model_matrix;

uniform float global_scale;

attribute vec3 pos_attribute;
attribute vec2 uv_attribute;

varying vec2 frag_uv;

void main() {
	frag_uv = uv_attribute;

	vec4 global_pos = model_matrix * vec4(pos_attribute * global_scale, 1.0);

	gl_Position = projection_matrix * (view_matrix * global_pos);
}

