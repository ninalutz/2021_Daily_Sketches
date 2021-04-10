//Inspo from

var y = 0;
var h, q;

var shift, shift2, shift3;

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
  shift2 = random(1, 5);
  shift3 = random(0, 5);
}

function draw(){
  if(y<w)for(x=w;x--;line(x,y,x,y+l))

  stroke(l=f((x-h)/q,(y-h)/q), x-50, map(y, 0, 600, 0, 255))
  y++
}

f=(x,y,n=4)=>n?f(cos(shift2*x)-cos(shift*y),x*x-y*y-shift3*x*y,n-1):(x-y)**2*10