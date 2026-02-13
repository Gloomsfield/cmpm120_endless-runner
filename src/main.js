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
	scale: {
		width: 4 * 100,
		height: 3 * 100,
		zoom: 1.5,
	},
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

function dot_vector2(a, b) {
	return a.x * b.x + a.y * b.y;
}

function align_vector3(a, b) {
	let a_quat = new Phaser.Math.Quaternion(a.x, a.y, a.z, 0.0);
	let b_quat = new Phaser.Math.Quaternion(b.x, b.y, b.z, 0.0);

	let ab_quat = new Phaser.Math.Quaternion(a_quat).multiply(b_quat);

	let q_quat_1 = new Phaser.Math.Quaternion(0.0, 0.0, 1.0, 0.0).normalize();
	let q_quat_2 = new Phaser.Math.Quaternion(q_quat_1);

	let bqa_quat = new Phaser.Math.Quaternion(b_quat).multiply(q_quat_2).multiply(a_quat);

	q_quat_1.scale(ab_quat.length());
	q_quat_1.subtract(bqa_quat).normalize();

	return q_quat_1;
}

function fallback(x, fallback_value) {
	if(x === undefined || x === null) {
		return fallback_value;
	}

	return x;
}

