//inspo from Fiona 

let moverSystems = [];
let num = 10;
let cells, cols, rows;
let offset, margin;
let cellW, cellH;
let bg;
let graphics;



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

}
var t = 0;

function draw(){
  background(0, 20)
  t+=1/600
          stroke(200)
          fill(0, 100)
  strokeWeight(2)
  for(var x=0;x<width+30;x+=150){
    for(var y=-40;y<height+40;y+=2){
      var a=noise(x,y/width,t)*20
    　var b=noise(x,y/width-t)*50
      rect(x+cos(b)*(sin(a)-sin(x|y))*20,y+sin(a)*20, 100, 100)
     }
  }
}