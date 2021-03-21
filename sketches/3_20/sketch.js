/*
Inspired by 
Roni Kaufman

*/

function setup() {
  w = 600;
    var canvas;
    if(windowWidth>=600 && windowHeight >=600){
      canvas = createCanvas(600, 600, WEBGL);
    }
    else{
      canvas = createCanvas(windowWidth, windowHeight - 100, WEBGL);
    }

  background(0);

  blendMode(ADD)

  var x = (windowWidth - width) / 2;
  var y = (windowHeight - height) / 2;

  canvas.position(x, y);



  noLoop();

  let colors = [[255, 0, 0], [0, 255, 0], [0, 0, 255]];
  
  let layer1 = createGraphics(width*2, height*2);
  layer1.noFill();
  layer1.stroke(colors[0]);
  layer1.strokeWeight(1);
  layer1.drawingContext.shadowBlur = 10;
  layer1.drawingContext.shadowColor = color(colors[0]);
  drawComposition(layer1);
  image(layer1, -width/2, -height/2);
  
  let layer2 = createGraphics(width*2, height*2);
  layer2.noFill();
  layer2.stroke(colors[1]);
  layer2.strokeWeight(1);
  layer2.drawingContext.shadowBlur = 10;
  layer2.drawingContext.shadowColor = color(colors[1]);
  drawComposition(layer2);
  image(layer2, -width/2, -height/2);
  
  let layer3 = createGraphics(width*2, height*2);
  layer3.noFill();
  layer3.stroke(colors[2]);
  layer3.strokeWeight(1);
  layer3.drawingContext.shadowBlur = 10;
  layer3.drawingContext.shadowColor = color(colors[2]);
  drawComposition(layer3);
  image(layer3, -width/2 + 1, -height/2);
}

function drawComposition(layer) {
  let r = 280;
  
  // layer.push();
  // layer.translate(width/2, width/2);
  // for (let i = 0; i < 5000; i++) {
  //   let theta = random(TWO_PI);
  //   let v1 = p5.Vector.fromAngle(theta, r*pow(random(), 1/4));
  //   layer.point(v1.x, v1.y);
  // }
  // layer.pop();



  layer.push();
  layer.translate(width/2, width/2);
  for (let i = 0; i < 50; i++) {
    layer.stroke(255)
    let theta1 = random(TWO_PI);
    let theta2 = theta1 + random(PI/2);
    let mag = r*pow(random(), 1/3)*2;
    layer.arc(0, 0, mag, mag, theta1, theta2, PIE);
  }
  layer.pop();


  
  // middle right
  layer.push();
  layer.translate(width/2, width/2);
  layer.rotate(random(TWO_PI))
  for (let i = 0; i < 75; i++) {
    let theta = random(TWO_PI);
    let v1 = p5.Vector.fromAngle(theta, r*pow(random(), 1/3));
    let v2 = p5.Vector.fromAngle(theta, r*pow(random(), 1/3));
    layer.line(0, v1.y, v1.x, v1.y);
    layer.line(v2.x, 0, v2.x, v2.y);
    layer.line(v1.x, v1.y, 0, v1.y);
    layer.line(v2.x, v2.y, v2.x, 0);
  }
  layer.pop();
  

}