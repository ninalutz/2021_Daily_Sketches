/*
Fork from kusakari 
*/

let _nsRate;
let _maxPoint;
let _aryObject = [];
let _objectNum;

function setup() {
  background(0)
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

  frameRate(30);
  colorMode(HSB, 360, 100, 100, 255);

  noFill();

  _objectNum = 16;
  _nsRate = 0.001;
  _maxPoint = 50;

  for (let i = 0; i < _objectNum; i++) {
    _aryObject.push(new line());
  }
}

function draw() {
  // clear();
 blendMode(OVERLAY);
  background(0, 10);

  for (let i = 0; i < _objectNum; i++) {
    _aryObject[i].update();
    _aryObject[i].draw();
  }
  fill(255);
  noStroke();
  text("1.11.2021", 30, height-30)
}

class line {
  constructor() {
    this.nsX = random(100);
    this.nsY = random(100);
    this.color = color(random(360), 100, 100, 10);
    this.sw = random(width/20, width/3);
    this.aryPoints = [];
  }
  update() {
    this.nsX += _nsRate;
    this.nsY += _nsRate;
    this.aryPoints.unshift([
      width/3 * cos(8*PI*noise(this.nsX)),
      height/3 * sin(8*PI*noise(this.nsY))
    ]);

    while (this.aryPoints.length > _maxPoint) {
      this.aryPoints.pop();
    }
  }
  draw() {
    fill(this.color);
    noStroke();
    push();
    translate(width/2, height/2);
    beginShape();
    // noFill();
    // fill(0, 10)
    for (let i = 0; i < this.aryPoints.length; i++) {
      rect(this.aryPoints[i][0] - 50, this.aryPoints[i][1] - 50, 100, 100);
    }
    endShape();
    pop();
  }
}

function mouseReleased() {
  _aryObject = [];
  for (let i = 0; i < _objectNum; i++) {
    _aryObject.push(new line());
  }
}