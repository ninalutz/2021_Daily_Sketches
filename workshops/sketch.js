let noise1 = 0.0009; 
let noise2 = 100;
let numPlanes = 10;
let numCurves = 500;    
let noiseScale = 0.0023;
let increment = 0.0002;
let spacing = 75;
let lineThick = 4;
let angleMult = 3;

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
}


function draw(){
  background(0)
  for (let i = 1; i < numPlanes; i++) {
    let y = height - i*spacing;
    let alpha = 40;
    let red = (i%2)*10;
    let green = i*25;
    let blue = (i%2)*100;
    let col = color(red, green, blue, alpha);
    strokeWeight(lineThick)
    stroke(col);
    for (let x = 0; x < width; x++) {
      makeNoise(x, y);
    }
  }
  noise1 += increment;
  noise2 += increment;
}

function makeNoise(x, y) {
  beginShape();
  noFill();
  for (let i = 0; i < numCurves; i++) {
    let angle = noise(x * noiseScale, y * noiseScale, i * noise1) * noise2;
    vertex(x, y);
    x += cos(angle)*angleMult
    y += sin(angle)*angleMult;
  }
  endShape();
}