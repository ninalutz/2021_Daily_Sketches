//forked from: https://tylerxhobbs.com/essays/2017/aesthetically-pleasing-triangle-subdivision

let _aryObject = [];
let _tileNumT;
let _tileNumR;
let _ellipseRatio;
let _count;
let _stepR;
let _stepT;
function setup() {
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
  noStroke();
  
  _freqCount = 40;

  _count = 0;
  _ellipseRatio = 2;
  _tileNumT = 5;
  _tileNumR = 7;
  
  let shapeMode = 1;
  let layerNum = 20;
  let initT = int(random(_tileNumT));
  for (k = 1; k <= layerNum; k++) {
    let baseColor = 360 + random(720);
    _aryObject.push(new f(
      1, initT,
      color((baseColor + 180) % 360, 200, 50, 100),
      shapeMode,
      width/2/_tileNumR/layerNum*k
    ));
  }

    background(0);


}




function draw() {
  // clear();
  // blendMode(EXCLUSION);
  background(0, 50);
  
  for (let i = 0; i < _aryObject.length; i++) {
    _aryObject[i].update();
    _aryObject[i].drawMe();
  }

  _count ++;
  noStroke()
  fill(255,69,0);
}

class f {
  constructor(iR, iT, myColor, shapeMode, sw) {
    this.target_iR = iR;
    this.target_iT = iT;
    this.myColor = myColor;
    this.shapeMode = shapeMode; //0 rect, 1 ellipse
    this.sw = sw *_ellipseRatio; 
    this.aryPoint = [];
  }

  setTarget() {
    _stepR = 1;
    _stepT = 1;
    this.iR = this.target_iR;
    this.iT = this.target_iT % _tileNumT;
    
    this.aryPoint.unshift([this.iR, this.iT]);

    let dir;
    if (this.iR <= _stepR) {
      dir = random(["down", "left", "right"]);
    } else if (this.iR >= _tileNumR-_stepR) {
      dir = random(["up", "left", "right"]);
    } else {
      dir = random(["up", "down", "left", "right"]);
    }

    if (dir == "up") { 
      this.target_iR = this.iR - _stepR; 
    }
    else if (dir == "down") { 
      this.target_iR = this.iR + _stepR; }
    else if (dir == "left") { 
      this.target_iT = this.iT - _stepT; 
    }
    else if (dir == "right") {
       this.target_iT = this.iT + _stepT; 
     }

    this.dR = (this.target_iR - this.iR) / (_freqCount+1);
    this.dT = (this.target_iT - this.iT) / (_freqCount+1);
  }
  
  update() {
    if (_count % _freqCount == 0) {
      this.setTarget();
    }

    if (this.target_iR == this.iR) { //dir = right or left
      this.aryPoint.unshift([this.iR, this.aryPoint[0][1] + this.dT]);
    } else if (this.target_iT == this.iT) {
      this.aryPoint.unshift([this.aryPoint[0][0] + this.dR, this.iT]);
    }

    while (this.aryPoint.length >= 40) {
      this.aryPoint.pop();
    }
  }

  drawMe() {
    stroke(255,70,10);
    strokeWeight(0.5)
    fill(0, 130)    
    push();
    translate(width/2, height/2);
    // beginShape();
    for (let i = 0; i < this.aryPoint.length; i++) {
      ellipse(
        width / 2 / _tileNumR * this.aryPoint[i][0] * cos(2*PI / _tileNumT * this.aryPoint[i][1]),
        width / 2 / _tileNumR * this.aryPoint[i][0] * tan(2*PI / _tileNumT * this.aryPoint[i][1]), 100, 100);
      ellipse(
        width / 2 / _tileNumR * this.aryPoint[i][0] * tan(2*PI / _tileNumT * this.aryPoint[i][1]),
        width / 2 / _tileNumR * this.aryPoint[i][0] * sin(2*PI / _tileNumT * this.aryPoint[i][1]), 300, 100);

        rect(
        width / 2 / _tileNumR * this.aryPoint[i][0] * sin(2*PI / _tileNumT * this.aryPoint[i][1]),
        width / 2 / _tileNumR * this.aryPoint[i][0] * cos(2*PI / _tileNumT * this.aryPoint[i][1]), 290, 20);

        rect(
        width / 2 / _tileNumR * this.aryPoint[i][0] * cos(2*PI / _tileNumT * this.aryPoint[i][1]),
        width / 2 / _tileNumR * this.aryPoint[i][0] * sin(2*PI / _tileNumT * this.aryPoint[i][1]), 150, 150);
    }
    // endShape();
    pop();
  }
}
