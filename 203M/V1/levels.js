function levelA(){
	level = 0
	platforms.push(new platform([0.0,-0.8], 1.0,0.05));
	platforms.push(new platform([-0.8, -0.7], 0.1,0.05));
	platforms.push(new platform([0.5, -0.7], 0.1,0.05));
	platforms.push(new platform([0.7, -0.6], 0.1,0.05));
	platforms.push(new platform([0.7, -0.4], 0.1,0.05));
	platforms.push(new platform([0.7, -0.2], 0.1,0.05));
	platforms.push(new platform([0.4, -0.2], 0.1,0.05));
	platforms.push(new platform([0.4, 0.0], 0.1,0.05));
	platforms.push(new platform([0.4, 0.2], 0.1,0.05));
	platforms.push(new platform([0.0,0.4], 0.3,0.05));
	platforms.push(new platform([0.2, 0.6], 0.1,0.05));
	platforms.push(new platform([-0.1, 0.7], 0.2,0.05));
	platforms.push(new platform([-0.5,0.7], 0.1,0.05));
	platforms.push(new platform([-0.6,-0.4], 0.1,0.05));
}

function levelB(){
	level = 1
	platforms.push(new platform([0.0,-0.8], 1.0,0.05));
	platforms.push(new platform([-0.8,-0.4], 0.2,0.6));
	platforms.push(new platform([0.6,-0.6], 0.3,0.2));
}
	/*
	platforms.push(new platform([], 0.1,0.2));
	platforms.push(new platform([], 0.1,0.2));
	platforms.push(new platform([], 0.1,0.2));
	platforms.push(new platform([], 0.1,0.2));
	*/