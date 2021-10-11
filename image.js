var colors = ["#ff0000", "#feb30f", "#8400ff", "#000000", "#ffffff"];
var weights = [1, 2, 2, 1, 1, 1];
var nAgents = 400;
let agent = [];
var direction = -1;
var par = 0;
let border =-50;

function setup() {
	createCanvas(1400,1400);
	colorMode(HSB, 360, 100, 100, 100);
	strokeCap(SQUARE);
	background(0,0,0);
	for (let i = 0; i < nAgents; i++) {
		agent.push(new Agent());
	}
}

function draw() {	
	if(frameCount >1700) {
		noLoop();
	}
	for (let i = 0; i < agent.length; i++) {
		  agent[i].update();
	}	
}

class Agent {
	constructor() {
		this.p = createVector(random(border,width-border),random(border,height-border));
		this.pOld = createVector(this.p.x, this.p.y);
		this.step = 0.5;
		this.scale = 4;
		this.color = generateColor();
		if(random(0,1) > 0.5)
		{
			this.direction = 1;
		}else
		{
			this.direction = -1;
		}
		this.strokeWidth = random(1,2);
	}
	
	getPartner() {
		return this.partner;
	}

	getP() {
		return this.p;
	}
	
	getColor(){
		return this.color;
	}


	update() {
		if (random(0,1) < 1.0e-4)
		{
		   this.direction *= -1;
		}
		this.p.x += this.direction * vector_field(this.p.x, this.p.y,this.scale).x * this.step;
		this.p.y += this.direction * vector_field(this.p.x, this.p.y,this.scale).y * this.step;
		strokeWeight(this.strokeWidth);
		stroke(this.color);
		line(this.pOld.x, this.pOld.y, this.p.x, this.p.y);
	}

}

function vector_field(x, y,myScale) {
	x = map(x, 0, width, -myScale, myScale);
	y = map(y, 0, height, -myScale, myScale);
	let k1 = 5;
	let k2 = 3;
	let u = sin(k1 * y) + cos(k2 * y);
	let v = sin(k2 * x) - cos(k1 * x);
	return createVector(u,v);
}

function generateColor() {
	let temp = myRandom(colors, weights);
	myColor = color(hue(temp) + randomGaussian()*12,
		              saturation(temp) + randomGaussian()*12,
		              brightness(temp)*0.8, 
									random(0,40));
	return myColor;
}

function myRandom(colors, weights) {
	let sum = 0;
	for (let i = 0; i < colors.length; i++) {
		sum += weights[i];
	}
	let rr = random(0, sum);
	for (let j = 0; j < weights.length; j++) {

		if (weights[j] >= rr) {
			return colors[j];
		}
		rr -= weights[j];
	}
}