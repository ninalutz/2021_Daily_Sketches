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

}

let noise1 = 0.0002; 

function draw(){
  background(0)
    let num = 11;
  for (let i = 1; i < num; i++) {
    let y = map(i, 0, num, 0, height);
    let col = color(i*20, (i%2)*100, i*10);
    stroke(col);
    line(0, y, width, y);
    col.setAlpha(50);
    stroke(col);
    for (let x = 0; x < width; x++) {
      noiseCurve(x, y);
    }
  }
  noise1 += 0.00002;
}

function noiseCurve(x, y) {
  let c = 150;
  noFill();
  beginShape();
  for (let i = 0; i < c; i++) {
    let scl = 0.0003;
    let angle = noise(x * scl, y * scl, i * noise1) * 160;
    vertex(x, y);
    x += cos(angle)*3;
    y += sin(angle)*3;
  }
  endShape();
}