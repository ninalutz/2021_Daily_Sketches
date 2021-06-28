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
  background(0, 5)
  t+=1/600
  for(var x=0;x<width+30;x+=100){
    for(var y=-40;y<height+40;y+=2){

      var a=noise(x,y/width,t)*50
    　 var b=noise(x,y/width+t)*5
    if(y % 7== 0){
            stroke(10, 10)
      strokeWeight(4)
        fill(200, 100)

      ellipse(x+cos(b)*(sin(a)-sin(x|y))*50,y+sin(a)*10, 70, 70);
    }
    else{
      noFill()
      rect(x+cos(b)*(sin(a)-sin(x|y))*50,y+sin(a)*10, 100, 100);

    }
    }
  }
}