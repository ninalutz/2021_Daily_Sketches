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
}

var t = 0;

function draw() {
  background(0, 10);
  stroke(200);
  noFill();

  strokeWeight(1)

  k=map(sin(t+=.001),-10,1,99,500)

  for(y=-10; y<width; y+=50){
    for(x=-10; x<width+10; x+=50){
      rect(sin(d=noise(x/width,y/width-t)*k)*9+x,cos(d)*9+y, 50, 50);
    }
  }

  fill(255)
  noStroke();
  text("2.28.21", 30, height-30)
}


