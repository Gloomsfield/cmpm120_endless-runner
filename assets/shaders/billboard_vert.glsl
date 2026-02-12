precision mediump float;

uniform mat4 projection_matrix;
uniform mat4 view_matrix;
uniform mat4 model_matrix;

attribute vec3 pos_attribute;
attribute vec2 uv_attribute;

varying vec2 frag_uv;

void main() {
	frag_uv = uv_attribute;

	vec4 retrieved_scale_x = vec4(length(model_matrix[0].xyz), 0.0, 0.0, 0.0);
	vec4 retrieved_scale_y = vec4(0.0, length(model_matrix[1].xyz), 0.0, 0.0);
	vec4 retrieved_scale_z = vec4(0.0, 0.0, length(model_matrix[2].xyz), 0.0);
	vec4 retrieved_translation = model_matrix[3];

	mat4 unrotated_model_matrix = mat4(0.0);
	unrotated_model_matrix[0] = retrieved_scale_x;
	unrotated_model_matrix[1] = retrieved_scale_y;
	unrotated_model_matrix[2] = retrieved_scale_z;
	unrotated_model_matrix[3] = retrieved_translation;

	gl_Position = projection_matrix * (view_matrix * (unrotated_model_matrix * vec4(pos_attribute, 1.0)));
}

