

/*
Mod from
kusakari
*/

let aryObjects_ = [];
let aryXY_ = [];
let aryNoiseXY_ = [];
let xyStep_;
let noiseStep_;
let noiseXStart_;
let noiseX_;
let noiseYStart_;
let noiseY_;
let noiseT_;
let deg_;
let divideNum_;
let scale_;


function setup () {
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
    fill(255);
    // frameRate(30);
    rectMode(CENTER);
    divideNum_ = 80;
    xyStep_ = width/divideNum_;
    noiseStep_ = 0.04*1;
    noiseXStart_ = random(40);
    noiseX_ = noiseXStart_;
    noiseYStart_ = random(10);
    noiseY_ = noiseYStart_;
    noiseT_ = random(10);
    deg_ = 2;
    scale_ = width/691*30;
    aryNoiseXY_ = set_noise(aryNoiseXY_);
    aryXY_ = set_xy(aryXY_);
}

function draw() {
  noiseT_ += noiseStep_ * 0.2;
  aryNoiseXY_ = update_noise(aryNoiseXY_);
  aryXY_ = set_xy(aryXY_);
  background(0, 10);
  for (let iY = 1; iY < aryXY_.length; iY++) {
    for (let iX = 1; iX < aryXY_[iY].length; iX++) {
      let wx = aryXY_[iY][iX][0]-aryXY_[iY-1][iX-1][0];
      let wy = aryXY_[iY][iX][1]-aryXY_[iY-1][iX-1][1];
      ellipse(aryXY_[iY-1][iX-1][0] + wx/2, aryXY_[iY-1][iX-1][1] + wy/2,
              wx*0.3 + wy*0.3)
    }
  }
  fill(255)
  text("2.17.21", 30, height-30)
}
function set_noise(aryNoiseXY) {
  aryNoiseXY = []
  let iY = 0;
  let iX;
  for (let y = 0; y < height; y+=xyStep_) {
    aryNoiseXY[iY] = [];
    noiseX_ = noiseXStart_;
    iX = 0;
    for (let x = 0; x < height; x+=xyStep_) {
      aryNoiseXY[iY][iX] = []
      aryNoiseXY[iY][iX].push(noiseX_, noiseY_, noiseT_);
      noiseX_ += noiseStep_*2;
      iX++;
    }
    noiseY_ += noiseStep_*2;
    iY++;
  }
  return aryNoiseXY;
}

function update_noise(aryNoiseXY) {
  for (let iY = 0; iY < aryNoiseXY.length; iY++) {
    for (let iX = 0; iX < aryNoiseXY[iY].length; iX++) {
      aryNoiseXY[iY][iX][2] = noiseT_;
    }
  }
  return aryNoiseXY;
}

function calc_sumNoiseX(ary, selectY) {
  let sum = 0;
  for (let i = 0; i < ary[selectY].length; i++) {
    sum += pow(noise(ary[selectY][i][0], ary[selectY][i][1], ary[selectY][i][2]), deg_);
  }
  return sum;
}

function calc_sumNoiseY(ary, selectX) {
  let sum = 0;
  for (let i = 0; i < ary.length; i++) {
    sum += pow(noise(ary[i][selectX][0], ary[i][selectX][1], ary[i][selectX][2]), deg_);
  }
  return sum;
}

function set_xy(aryXY) {
  aryXY = [];
  let noiseVal;
  for (let i = 0; i < aryNoiseXY_.length; i++) {
    aryXY[i] = [];
    let sumNoiseX = calc_sumNoiseX(aryNoiseXY_, i);
    let currentSumNoiseX = 0;
    for (let j = 0; j < aryNoiseXY_[i].length; j++) {
      noiseVal = pow(noise(aryNoiseXY_[i][j][0], aryNoiseXY_[i][j][1], aryNoiseXY_[i][j][2]), deg_);
      aryXY[i][j] = [];
      currentSumNoiseX += noiseVal*scale_;
      aryXY[i][j][0] = width/2 - sumNoiseX/2*scale_ + currentSumNoiseX;
    }
  }
  for (let j = 0; j < aryNoiseXY_[0].length; j++) {
    let sumNoiseY = calc_sumNoiseY(aryNoiseXY_, j);
    let currentSumNoiseY = 0;
    for (let i = 0; i < aryNoiseXY_.length; i++) {
      noiseVal = pow(noise(aryNoiseXY_[i][j][0], aryNoiseXY_[i][j][1], aryNoiseXY_[i][j][2]), deg_);
      currentSumNoiseY += noiseVal*scale_;
      aryXY[i][j][1] = height/2 - sumNoiseY/2*scale_ + currentSumNoiseY;
    }
  }
  return aryXY;
}