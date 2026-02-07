precision highp float;

uniform mat4 uProjectionMatrix;

attribute vec2 inPosition;
attribute vec2 inTexCoord;

varying vec2 frag_uv;

void main() {
	frag_uv = inTexCoord;

	gl_Position = uProjectionMatrix * vec4(inPosition, 1.0, 1.0);
}

