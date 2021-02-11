var len = 500;
var triangles = [];

/*
Mod from
Dancing Sierpinski
by Prasanta Kr Dutta 
*/
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
  fill(200)
  background(21);
  divide(-len, len * sqrt(5) / 4, len, 1, floor(map(width/1.5, 0, height, 1, 10)));
}

function draw() {
  background(0, 10);
  fill(255, 40);
  text("2.11.21", 30, height-30);
  translate(width/2, height/2);
  noStroke();
  rotate(frameCount*.8/TWO_PI);

  for(let i=0; i<triangles.length; i++) {
    showTriangles(triangles[i][0],triangles[i][1],triangles[i][2], triangles[i][3]);
    triangles[i][0] += PI/2*cos(frameCount);
    triangles[i][1] -= PI/2*sin(frameCount);
    triangles[i][2] += PI*sin(frameCount);
    triangles[i][3] -= PI*cos(frameCount);
  }
}

function divide(x, y, l, lvl, max) {
  if (lvl == max) {
    triangles.push([x, y, l]);
  } else {
    divide(x, y, l / 2, lvl + 1, max);
    divide(x + l / 2, y, l / 2, lvl + 1, max);
    divide(x + l / 4, y - l * sqrt(3) / 4, l / 2, lvl + 1, max);
  }
}

function showTriangles(x, y, l, lvl) {
  ellipse(x, y, 3, 3);
}

