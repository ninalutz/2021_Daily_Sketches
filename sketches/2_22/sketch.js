


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

    background(0);

  stroke(255)
  fill(255)

  k=map(sin(t+=.005),-1,1,99,50)

  for(y=0; y<width; y+=8,endShape()){
    for(beginShape(),x=0; x<width; x+=8){
      vertex(cos(d=noise(x/width,y/width-t)*k)*9+x,sin(d)*9+y);
    }
  }

  fill(0)
  text("2.22.21", 30, height-30)
}


