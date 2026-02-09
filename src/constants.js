const POOL_SIZE = 100;

// see references [1]
let camera_fov = 60.0 * (Math.PI / 180.0);
let camera_far = 200.0;
let camera_near = 1.0;
let camera_scale = 1.0 / (Math.tan(camera_fov / 2.0));
let camera_projection_matrix = [
	camera_scale, 0.0, 0.0, 0.0,
	0.0, camera_scale, 0.0, 0.0,
	0.0, 0.0, -camera_far / (camera_far - camera_near), -1.0,
	0.0, 0.0, -camera_far * camera_near / (camera_far - camera_near), 0.0
];

