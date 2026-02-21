const POOL_SIZE = 100;

// see references [1]
let camera_fov = 60.0 * (Math.PI / 180.0);
let camera_far = 200.0;
let camera_near = 1.0;

function default_projection_matrix() {
	let fov = 60 * (Math.PI / 180);
	let aspect_ratio = 400.0 / 300.0;

	let f = 200.0;
	let n = 1.0;
	let t = Math.tan(fov / 2.0) * n;
	let b = -t;
	let l = -t * aspect_ratio;
	let r = t * aspect_ratio;
	
	return new Phaser.Math.Matrix4().fromArray([
		2.0 * n / (r - l), 0.0, 0.0, 0.0,
		0.0, 2.0 * n / (t - b), 0.0, 0.0,
		(r + l) / (r - l), (t + b) / (t - b), -(f + n) / (f - n), -1.0,
		0.0, 0.0, -2.0 * f * n / (f - n), 0.0
	]);
}

let camera_projection_matrix = default_projection_matrix();
let inverse_camera_projection_matrix = default_projection_matrix().invert();

const wall_rotation = Math.PI / 6.0;
const mouse_z_multiplier = Math.tan(wall_rotation);

let default_text_style = {
	align: 'center',
};

const ascent_pace = 2.5;

