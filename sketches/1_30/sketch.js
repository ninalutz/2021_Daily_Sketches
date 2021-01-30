/*
forked from SeeJay ThruLife 
*/

let orbiters, w;

function setup () {
  w = 600;
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


  
  orbiters = [];
  for (var i = 0; i < 100; i++) {
    orbiters.push (new Orbiter ());
  }
} 

function draw () {
  background (0, 10);
  fill(255);
  noStroke();
  text("1.30.21", 30, height-30)
  translate (width/2, width/2);
  orbiters.forEach (o => o.orbit ());
    translate (-width/2, -width/2);
}

let maxR = 0.4 * w;
let maxSize = 80;

function Orbiter () {
  this.th = random(TAU);
  this.size = map(random(1) * random(1), 0, 1, 10, maxSize);
  this.r = map(random(1), 0, 1, 0.45, 1) * w/2 - this.size/2;
  this.v = sqrt (0.001/this.r);
}


Orbiter.prototype.orbit = function () {
  let x = sin(this.th) * this.r;
  let y = cos(this.th) * this.r;

  // noStroke();
  // fill(255, 40);



  stroke(255, 20);
  noFill();
  strokeWeight(2);
    rect(x, y, this.size, this.size);
  line(0, 0, x, y);

  this.th += this.v;
}