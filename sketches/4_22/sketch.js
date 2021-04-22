//Inspo from okazz

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


  translate(width / 2, height / 2);
  scale(0.7);
  translate(-width / 2, -height / 2);

  // frameRate(10)

}

let noise1 = 0.0002; 
let noise2 = 40;

function draw(){
  background(0, 20)
    let num = 10;
  for (let i = 1; i < num; i++) {
    let y = map(i, 0, num, 0, height);
    let col = color((i%2)*100, i*21, (i%4)*100);
    stroke(col);
    // line(0, y, width, y);
    col.setAlpha(50);
    strokeWeight(2)
    stroke(col);
    for (let x = 0; x < width; x++) {
      noiseCurve(x, y);
    }
  }
  noise1 += 0.0002;
  noise2 += 0.0002;
}

function noiseCurve(x, y) {
  let c = 500;
  noFill();
  beginShape();
  for (let i = 0; i < c; i++) {
    let scl = 0.0023;
    let angle = noise(x * scl, y * scl, i * noise1) * noise2;
    vertex(x, y);
    x += cos(angle)*3;
    y += sin(angle)*3;
  }
  endShape();
}