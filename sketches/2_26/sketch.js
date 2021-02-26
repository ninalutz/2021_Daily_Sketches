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
  stroke(200, 10)
  fill(50)

  strokeWeight(30)

  k=map(sin(t+=.001),-10,1,99,500)

  for(y=-10; y<width; y+=60,endShape()){
    for(beginShape(),x=-10; x<width+10; x+=8){
      vertex(sin(d=noise(x/width,y/width-t)*k)*9+x,cos(d)*9+y);
    }
  }

  fill(255)
  noStroke();
  text("2.26.21", 30, height-30)
}


