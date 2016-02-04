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
	platforms.push(new platform([-0.8,-0.4], 0.2,0.3));
	platforms.push(new platform([0.55,-0.6], 0.3,0.2));
	platforms.push(new platform([0.70,0.2], 0.2,0.2));
	platforms.push(new platform([0.4,-0.5], 0.1,0.05, 0.4, 0.1, 0.01, true));
	platforms.push(new platform([0.7,0.3], 0.1,0.05, 0.7, 0.8, 0.01, true));
	platforms.push(new platform([-0.8,0.3], 0.2,0.2));
	platforms.push(new platform([-0.5,0.-0.8], 0.1,0.05, -0.5, 0.2, 0.01, true));
	platforms.push(new platform([-0.2,0.5], 0.0,0.05));
	platforms.push(new platform([0.0,0.5], 0.2,0.05));
	platforms.push(new platform([0.2,0.5], 0.4,0.05));
	platforms.push(new platform([-0.2,0.5], 0.5,0.05));
	platforms.push(new platform([-0.9,-0.2], 0.2,0.05));
	platforms.push(new platform([-0.9,-0.3], 0.2,0.05));
}

function changeLevel() {
	platforms = []

	levelB()
	jack.position.x = 0.0
	jack.position.y = 0.0
	jack.position.ground = platforms[0].position.y
	jack.false()
	jack.falling = true
	jack.coins = 0
	score.scoreCard = []
	coins.coinArray = []
	score.position.x = -0.85
}
	/*
	platforms.push(new platform([], 0.1,0.2));
	*/