//Inspo from

var y = 0;
var h, q;

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
}

function draw(){
  if(y<w)for(x=w;x--;line(x,y,x,y+l))

  stroke(l=f((x-h)/q,(y-h)/q), x+20, y+20)
  y++
}

f=(x,y,n=6)=>n?f(cos(9*x)-tan(4*y),x*x-y*y-2*x*y,n-1):(x-y)**2*10