var yoff = 0;
var xPos = -200;
var _hue = 100;
var yPos = 300;

/*
Inspo from larry larryson's color smoke sketch

Mods + code Nina Lutz 2021
*/

function setup () {
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

  noFill();

  translate(windowWidth/2, windowHeight/2);
}

function draw() {
  background(0, 20)
  if(xPos<800)
  {
    bomb(300,xPos + 50*sin(frameCount*0.004), 250 + 50*cos(frameCount*0.004));
    bomb(300, 300 + 50*cos(frameCount*0.0002), xPos + 50*sin(frameCount*0.004));
    xPos+=0.3;    
  }
      fill(255);
      noStroke();
    text("2.9.21", 30, height-30)

}

function bomb(r,x,y)  {
    stroke(255);
  strokeWeight(1)
  fill(0, 15)
  push();
  translate(x,y);
  // beginShape();
  var xoff = 0;
  var xIN = 0;
  var yIN = 0;
  for(var a = 0; a<TWO_PI; a+=0.1) {
    var offset = map(noise(xoff,yoff),0,1,0,100);
    var _r = r + offset;
    var _x = _r * cos(a);
    var _y = _r * sin(a);
    
    if(a==0){
      xIN = _x;
      yIN = _y;
    }
    else if(a>TWO_PI-0.1)
    {
      _x = xIN;
      _y = yIN;
    }
    // vertex(_x,_y);
    
    rect(_x, _y, 500, 500);
        ellipse(_x, _y, 500, 500);
    xoff += 0.1;
  }
  yoff += 0.01;
  // endShape();
  pop();
}
