//Based off the particle system example on p5.js
//https://p5js.org/examples/simulate-particle-system.html 

//Nina Lutz, Jan 1 2021
let system;

function setup() {
  if(windowWidth>=600 && windowHeight >=600){
  createCanvas(600, 600);
  }
  else{
    createCanvas(windowWidth, windowHeight);
  }
  system = new ParticleSystem(createVector(width/2 - 100, height/2 - 100));
}



function draw() {
  background(0, 20);
  system.addParticle();
  system.run();
  fill(255);
  text("1.3.2021", 10, height - 20);
}

// A simple Particle class
let Particle = function(position) {
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
  this.acceleration = createVector(random(-0.05, 0.05), random(-0.05, 0.05));

  this.velocity.add(this.acceleration);
  this.position.add(this.velocity);

  this.lifespan -= 2;
};

// Method to display
Particle.prototype.display = function() {
  stroke(this.position.x, this.position.y, 0, this.lifespan);
  strokeWeight(2);
  fill(255, 10);
  let circlesize = map(this.position.x, 0, width/2, 1, 20);
  ellipse(this.position.x + this.size, this.position.y, circlesize, circlesize);
  ellipse(this.position.x, this.position.y, circlesize, circlesize);
  ellipse(this.position.x, this.position.y + this.size, circlesize, circlesize);

  ellipse(this.position.x + this.size, this.position.y + this.size, circlesize, circlesize);
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
