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
  strokeWeight(2)
  h=width/2;q=width/10
  shift = 2;
  shift2 = 20;
    colorMode(HSB, 200)

}

function draw(){
  noFill()
  background(0, 2)
  if(y<w)for(x=w;x-=4;rect(y, x,x,y+l))

  stroke(l=f((x-h)/q,(y-h)/q), x, map(y, 0, 600, 0, 360), 360)
  y++
}

f=(x,y,n=4)=>n?f(sin(shift2/x)-sin(shift/y),x*x-y*y-2*x*y,n-1):(x-y)**2