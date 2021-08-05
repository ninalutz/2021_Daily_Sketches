//Inspo from

var y = 0;
var h, q;

var shift, shift2;

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
  strokeWeight(5)
  h=width/2;q=width/4
  shift = random(1, 14);
  shift2 = random(20);
}

function draw(){
  noFill()
  if(y<w)for(x=w;x--;ellipse(x,y,x,y+l))

  stroke(l=f((x-h)/q,(y-h)/q), x-50, map(y, 0, 1000, 0, 20), 20)
  y++
}

f=(x,y,n=4)=>n?f(cos(shift2*x)-cos(shift*y),x*x-y*y-2*x*y,n-1):(x-y)**2*10