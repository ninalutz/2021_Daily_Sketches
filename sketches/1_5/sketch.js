/*

FORKED FROM 
 * twisted lines
 *
 * @author aadebdeb
 * @date 2017/02/04

 Fork and modifications by Nina Lutz 2020 and 2021
 */

var colors;
var type;

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
}

function draw() {

  blendMode(BLEND);
  background(0, 50)
  fill(255);
  noStroke()
  text("1.5.21", 30, height - 30)
  blendMode(EXCLUSION);
  noFill();
  strokeWeight(15);

  for(var i = 0; i < 3; i++) {
    for(var j = 0; j < 40; j++) {
    beginShape();
    stroke(i*j*10, j*3, j*20 + i*30, 20);
    for(var w = -20; w < width + 20; w += 6) {
      var h = 100;
      h += 100 * sin(w * 0.03 + frameCount * 0.07 + i * TWO_PI / 3) * pow(abs(sin(w * 0.001 + frameCount * 0.02)), 5);
      curveVertex(h + j*10, w);
    }    
    endShape();
  }
  }
  
}