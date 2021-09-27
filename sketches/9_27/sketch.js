//Based off the particle system example on p5.js
//https://p5js.org/examples/simulate-particle-system.html 

//Nina Lutz, Jan 1 2021
let system;

function setup() {
  var canvas;
  if(windowWidth>=600 && windowHeight >=600){
    canvas = createCanvas(600, 600);
  }
  else{
    canvas = createCanvas(windowWidth, windowHeight - 100);
  }
  system = new ParticleSystem(createVector(width/2, height/2));

  var x = (windowWidth - width) / 2;
  var y = (windowHeight - height) / 2;

  canvas.position(x, y);
  background(0)

}

function draw() {
  background(0, 1);
  system.addParticle();
  frameRate(20)
  system.run();
  fill(255);
}

// A simple Particle class
let Particle = function(position) {
  this.acceleration = createVector(-0.05, 0.05);
  this.velocity = createVector(random(-10, 10), random(-10, 10));
  this.position = position.copy();
  this.lifespan = 200;
  this.size = random(20, 200);
};

Particle.prototype.run = function() {
  this.update();
  this.display();
};

// Method to update position
Particle.prototype.update = function(){
  this.velocity.add(this.acceleration);
  this.position.add(this.velocity);
  this.lifespan -= 2;
};

// Method to display
Particle.prototype.display = function() {
  stroke(this.lifespan, 100);
  strokeWeight(10);
  fill(0, 20)
  ellipse(this.position.x, this.position.y, map(this.position.x, 0, width, 5, 1), map(this.position.y, 0, height, 5, 1));
  rotate(tan(.1), tan(20))
};

// Is the particle still useful?
Particle.prototype.isDead = function(){
  return this.lifespan < 0;
};

let ParticleSystem = function(position) {
  this.origin = position.copy();
  this.particles = [];
};

ParticleSystem.prototype.addParticle = function() {
  this.particles.push(new Particle(this.origin));
};

ParticleSystem.prototype.run = function() {
  for (let i = this.particles.length-1; i >= 0; i--) {
    let p = this.particles[i];
    p.run();
    if (p.isDead()) {
      this.particles.splice(i, 1);
    }
  }
};
