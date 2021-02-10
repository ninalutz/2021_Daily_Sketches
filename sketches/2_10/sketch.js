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
  divide(-len / 2, len * sqrt(3) / 4, len, 1, floor(map(width/1.5, 0, height, 1, 10)));
}

function draw() {
  background(0, 5);
  fill(255, 20);
  text("2.10.21", 30, height-30);
  translate(width/2, height/2);
  // angleMode(DEGREES);
  noStroke();
  rotate(frameCount*.8/TWO_PI);

  for(let i=0; i<triangles.length; i++) {
    // let clr = lerpColor(color('#fff0ff'),color('#f1f00f'),(map(i,0,triangles.length,0,1)));
    // noFill();
    showTriangles(triangles[i][0],triangles[i][1],triangles[i][2]);
    triangles[i][0] += TWO_PI*cos(frameCount);
    triangles[i][1] -= TWO_PI*sin(frameCount);
    triangles[i][2] += PI*sin(frameCount);
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
  triangle(x, y, x + l / 2, y - l * sqrt(3) / 2, x + l, y);
}

function mouseClicked() {
  triangles = [];
  divide(-len / 2, len * sqrt(3) / 4, len, 1, floor(map(mouseY, 0, height, 1, 10)));
}