//Based off the particle system example on p5.js

let system;

function setup() {
  createCanvas(600, 600);
  system = new ParticleSystem(createVector(width/2, height/2));
}

function draw() {
  background(0);
  system.addParticle();
  system.run();
  fill(255);
  text("1.1.2020", 10, height - 20);
}

// A simple Particle class
let Particle = function(position) {
  this.acceleration = createVector(-0.05, 0.05);
  this.velocity = createVector(random(-1, 1), random(-1, 1));
  this.position = position.copy();
  this.lifespan = 200;
  this.size = random(5, 25);
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
  stroke(200, 200, 0, this.lifespan);
  strokeWeight(2);
  fill(127, 50, 0, this.lifespan);
  ellipse(this.position.x, this.position.y, this.size, this.size);
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
