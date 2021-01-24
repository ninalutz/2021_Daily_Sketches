/*
Forked from Justin Turner's perlin color sketch
*/

const unit = 1.5;
const nums = 10;//Math.round((screen.width + screen.height) / (unit));
const noiseScale = 300;

let a, b, c, d, e, f;
let group1;
let ac, bc, cc, aColor, bColor, cColor;
let sizes = [unit, unit];

/////////////////////////////////////////////////////////////////

function setup() {
  var canvas;
  if(windowWidth>=600 && windowHeight >=600){
    canvas = createCanvas(600, 600);
  }
  else{
    canvas = createCanvas(windowWidth, windowHeight - 100);
  }

  var x = (windowWidth - width) / 2;
  var y = (windowHeight - height) / 2;

  canvas.position(x, y);
  background(0);

  angleMode(DEGREES);
  noStroke();

  a = new ParticleGroup(color(rCol(128)), nums, sizes);
  b = new ParticleGroup(color(rCol(128)), nums, sizes);
  c = new ParticleGroup(color(rCol(128)), nums, sizes);
  d = new ParticleGroup(color(rCol(128)), nums, sizes);
  e = new ParticleGroup(color(rCol(128)), nums, sizes);
  f = new ParticleGroup(color(rCol(128)), nums, sizes);

  group1=[a,b,c,d,e,f];
  
  for (let group of group1){
    ParticleGroup.populate(group);
  }

}

/////////////////////////////////////////////////////////////////////////////

function draw() {

  for (let group of group1) {
    group.update();

  }

  fill(255);
  noStroke();
  text("1.24.21", 30, height-30)
}

/////////////////////////////////////////////////////////////////////////

class ParticleGroup {

  static populate(aGroup) {
    for (let i = 0; i < aGroup.amount; i++) {
      let newParticle = new Particle(rInc(width, unit), rInc(height, unit),random([aGroup.sizeRange[0], aGroup.sizeRange[1]]));
      aGroup.container.push(newParticle);
    }
  }

  constructor(color, amount, sizeRange = [0.1, 0.3]) {

    this.color = color;
    this.sizeRange = sizeRange;
    this.amount = amount;
    this.container = [];
    this.populated = false;
  }

  update() {
    for (let particles of this.container) {
      stroke(this.color)
      // strokeWeight(10)
      particles.move();
      particles.checkEdge();
      particles.display();
    }
  }
}

/////////////////////////////////////////////////////////////////////////

class Particle {
  constructor(x, y, size) {
    this.angle = noise(x / noiseScale, y / noiseScale);
    this.pos = createVector(x, y);
    this.speed = size/3
    this.size = size;
    this.dir = createVector(cos(this.angle), sin(this.angle));
    this.noiseScale = noiseScale;

  }

  move() {
    this.angle = noise(this.pos.x / this.noiseScale, this.pos.y / this.noiseScale);
    this.angle *=360
    this.angle = (ceil(360*Math.cos(radians(this.angle>>this.dir.heading())))&this.angle);
    
    this.dir.x = cos(this.angle);
    this.dir.y = sin(this.angle);
    this.dir.rotate(radians(this.pos.heading()*this.angle/this.dir.mag()));
    
    this.dir.x *= this.speed;
    this.dir.y *= this.speed;
    this.pos.x += this.dir.x;
    this.pos.y += this.dir.y;

  }

  checkEdge() {

    if (this.pos.x < width-width*1.1 || this.pos.x > width*1.1 || this.pos.y < height-height*1.1 || this.pos.y > height*1.1) {
      this.pos.x = round(random(width) / unit) * unit;
      this.pos.y = round(random(height) / unit) * unit;
//this.speed *= random([1, -1]);
    }

  }

  display() {
    noFill();
    rectMode(CENTER);
    if(second() %2 == 0){
        triangle(this.pos.x, this.pos.y, this.pos.x + 70, this.pos.y + 100, this.pos.x - 70, this.pos.y + 100);
    }
    else{
        rect(this.pos.x, this.pos.y, 100, 100);
    }
  }
}

//////////////////////////////////////////////////////////////////////

function rCol(alpha = 255) {
  return [Math.random() * 255, Math.random() * 255, Math.random() * 255, alpha];
}

function rInc(input, increment){
  return Math.round((Math.random()*input)/increment) * increment;
}

function rRange(minimum, maximum){
  return minimum + Math.random() * (maximum - minimum);
}