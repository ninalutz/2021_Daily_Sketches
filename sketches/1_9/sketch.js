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
  text("1.9.21", 30, height - 30)
  blendMode(EXCLUSION);
  noFill();
  strokeWeight(2);

  for(var i = 0; i < 3; i++) {
    for(var j = 0; j < 10; j++) {
    beginShape();
    fill(0)
    stroke(i*j, j*3, j*200 + i*30, 20*j);
    for(var w = -20; w < width + 20; w += 6) {
      var h = 250;
      h += 100 * sin(w * 0.03 + frameCount * .007 + i * TWO_PI / 3) * pow(abs(sin(w * 0.001 + frameCount * 0.02)), 5);
      ellipse(h + j*10, w, 50, 50);
    }    
    endShape();
  }
  }
  
}