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
  t+=1/500
  stroke(0)
  fill(255, 10)
  for(var x=0;x<width;x+=100){
    for(var y=-40;y<height+40;y++){
      var a=noise(x,y/width,t)*10
    　var b=noise(x,y/width-t)*300
       rect(x+sin(b)*(cos(a)-sin(x|y))*20,y+sin(a)*100, 60, 60)
     }
  }
}