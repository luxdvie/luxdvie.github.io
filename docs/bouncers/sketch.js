class Ball {
	constructor(i) {
		this.heartStrokeColor = Math.floor(Math.random() * 254) + 1;
		this.heartFillIndex = Math.floor(Math.random() * 359) + 1;
		this.heartFillColor = 0;

		this.lifeSpan = Math.floor(Math.random() * 5) + 1;
		window.setTimeout(function () {
			delete balls[i];
		}, this.lifeSpan * 1000);

		this.r = Math.random() * 100 + 1;
		this.strokeWeight = 2;
		this.offsetMin = this.r + this.strokeWeight + 2;
		this.offsetMax = this.r + this.strokeWeight - 2;
		this.pos = createVector(
			this.offsetMin + (Math.floor(Math.random() * width) + 0),
			this.offsetMin + (Math.floor(Math.random() * height) + 0)
		);
		this.vel = createVector(
			Math.random() * 1 + 0.2,
			Math.random() * 1 + 0.2
		);
		this.acc = createVector(
			Math.random() * 2.5 + 0.1,
			Math.random() * 2.5 + 0.1
		);
	}

	setColor() {
		this.heartFillIndex++;
		if (this.heartFillIndex > 360) {
			this.heartFillIndex = 0;
		}

		this.heartFillColor = color("hsl(" + this.heartFillIndex + ",80%,50%)");
	}

	update() {
		this.setColor();
		if (this.pos.x < this.offsetMin) {
			this.vel.x = Math.abs(Math.random() * 1 + 0.2);
			this.acc = createVector(this.acc.x * -1, this.acc.y);
		} else if (this.pos.x > width - this.offsetMax && this.vel.x > 0) {
			this.vel.x = Math.abs(Math.random() * 1 + 0.2) * -1;
			this.acc = createVector(this.acc.x * -1, this.acc.y);
		}

		if (this.pos.y < this.offsetMin) {
			this.vel.y = Math.abs(Math.random() * 1 + 0.2);
			this.acc = createVector(this.acc.x, this.acc.y * -1);
		} else if (this.pos.y > height - this.offsetMax && this.vel.y > 0) {
			this.vel.y = Math.abs(Math.random() * 1 + 0.2) * -1;
			this.acc = createVector(this.acc.x, this.acc.y * -1);
		}

		this.vel.add(this.acc);
		this.pos.add(this.vel);
	}

	draw() {
		stroke(255);
		strokeWeight(this.strokeWeight);
		fill(this.heartFillColor);
		ellipse(this.pos.x, this.pos.y, this.r * 2);
	}
}

let balls = [];
let ballCount = 1;
let addBall = function () {
	balls[ballCount] = new Ball(ballCount);
	ballCount++;
};

let isSurging = false;
let surge = function () {
	if (isSurging) {
		return;
	}

	isSurging = true;
	let surgeCount = Math.floor(Math.random() * 50) + 1;
	let adder = window.setInterval(function () {
		if (surgeCount > 0) {
			addBall();
			surgeCount -= 1;
		} else {
			isSurging = false;
			window.clearInterval(adder);
		}
	}, 10);
};

function setup() {
	createCanvas(windowWidth, windowHeight);
	addBall();
	window.setInterval(function () {
		surge();
	}, 2000);
	surge();
}

let backgroundIndex = 0;
let backDir = 1;
function draw() {
	background(backgroundIndex);
	backgroundIndex += backDir;
	if (backgroundIndex > 30) {
		backDir = -1;
	} else if (backgroundIndex <= 0) {
		backDir = 1;
	}

	for (var obj in balls) {
		if (balls.hasOwnProperty(obj)) {
			balls[obj].update();
			balls[obj].draw();
		}
	}
}

function mouseClicked() {
	addBall();
}

function windowResized() {
	resizeCanvas(windowWidth, windowHeight);
}
