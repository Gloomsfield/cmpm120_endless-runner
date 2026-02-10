// amory acosta
// CMPM120 - endless runner project
//
// title: TODO
// work hours: TODO
//
// creative tilt & justification
// TODO

let phaser_config = {
	type: Phaser.WEBGL,
	width: 640,
	height: 480,
	antialias: false,
	roundPixels: true,
	scene: [ Load, Game, RenderTarget3D, Scene3D ],
};

let game = new Phaser.Game(phaser_config);

let tunnel_diameter = phaser_config.width / 4.0;

function mult_m4_vector4(matrix, vector) {
	return {
		x: matrix[0] * vector.x + matrix[1] * vector.y + matrix[2] * vector.z + matrix[3] * vector.w,
		y: matrix[4] * vector.x + matrix[5] * vector.y + matrix[6] * vector.z + matrix[7] * vector.w,
		z: matrix[8] * vector.x + matrix[9] * vector.y + matrix[10] * vector.z + matrix[11] * vector.w,
		w: matrix[12] * vector.x + matrix[13] * vector.y + matrix[14] * vector.z + matrix[15] * vector.w
	};
}

function cross_vector3(a, b) {
	return {
		x: -a.z * b.y + a.y * b.z,
		y: a.z * b.x - a.x * b.z,
		z: -a.y * b.x + a.x * b.y
	};
}

function dot_vector3(a, b) {
	return a.x * b.x + a.y * b.y + a.z * b.z;
}

function fallback(x, fallback_value) {
	if(x === undefined || x === null) {
		return fallback_value;
	}

	return x;
}

