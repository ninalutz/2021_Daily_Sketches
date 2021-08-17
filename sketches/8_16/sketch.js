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
  strokeWeight(20)
  h=width/2;q=width/10
  shift = 2;
  shift2 = 20;

}

function draw(){
  noFill()
  
  if(y<w)for(x=w;x-=10;rect(y, x,1, 1))

  fill(l=f((x-h)/q,(y-h)/q*2), x/2, map(y, 0, 600, 0, 360), 360, 10)
  y++
}

f=(x,y,n=4)=>n?f(cos(shift2/x)-cos(shift/y),x*x-y*y-6*x*y,n-2):(x-y)**2