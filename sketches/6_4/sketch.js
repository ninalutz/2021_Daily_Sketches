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
  fill(255, 10)
  for(var x=100;x<width;x+=100){
    beginShape()
    for(var y=-40;y<height+40;y++){
      var a=noise(x,y/width,t)*100
    　var b=noise(x,y/width-t)*3
       vertex(x+sin(b)*(cos(a)-sin(x|y))*200,y+sin(a)*50)
     }endShape()
  }
}