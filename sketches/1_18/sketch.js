  var rotation = 0;

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

  noStroke();
  angleMode(DEGREES);
  background(0)
  frameRate(30)
}

function draw() {
  background(255, 5);

  push();
  translate(width / 2, height / 2);
  let steps = 230;
  let angleSteps = 360 / steps;
  

  rotation += 0.1;
  rotate(rotation);
  

  let innerradius = 200;
  let outerradius = 40 + mouseY;
  let skew = mouseX;


  for (let angle = 0; angle < 360; angle += angleSteps) {
    let xpos = cos(angle * skew) * innerradius;
    let ypos = sin(angle * skew) * innerradius;
    let xpos2 = cos(angle) * outerradius;
    let ypos2 = sin(angle) * outerradius;

    stroke(150);
    strokeWeight(2);
    line(xpos, ypos, xpos2, ypos2);
  }
  
  pop();

  fill(0);
  text("1.18.21", 30, height-30)
}