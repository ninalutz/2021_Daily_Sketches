//forked from: https://tylerxhobbs.com/essays/2017/aesthetically-pleasing-triangle-subdivision




var size;
var cavasSize;
var iterations;
var buffer;
var canvasSize;
var buffOffset;
var squareSize;
var maxDepth;
var rG;
var staticRand;

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

 let seed = floor(random(100000000));
  //console.log(seed);
  createP(`Seed: ${seed}`);
  randomSeed(seed);
  angleMode(RADIANS);
  canvasSize = 600;
  buffer = .1;
  buffOffset = canvasSize * buffer;
  squareSize = canvasSize * (1 - buffer);
  background(0);
  //set drawing params
  strokeWeight(.5);
  fill(255);
  rG = [];
  staticRand = [];
  
  depthTable = [];
  
  

  size = 10;
  iterations = 0;
  maxDepth = 12;
  
  for (var l = 0; l < maxDepth * 2; l++){
    staticRand[l] = random();
  }
  
  //precalculate the random values for gaussian displacement and the depths
  for (var l = 0; l < maxDepth*2; l++){
    rG[l] = [randomGaussian(),randomGaussian(),randomGaussian()];
  }
  
  for (var l = 0 ; l < maxDepth+1; l++){
   staticRand[l] = random(0.001,1.000);
  }
  
  push();
  fill(190,190,190,230);
  //for some reason using square size is too big????
  rect(buffOffset + 10,buffOffset+10, 490);
  filter(BLUR,10);
  pop();
  
  var tl = createVector(buffOffset, buffOffset);
  var tr = createVector(squareSize, buffOffset);
  var br = createVector(squareSize, squareSize);
  var bl = createVector(buffOffset, squareSize);

  TriangleRecurse(tl, tr, br, iterations,maxDepth);
  TriangleRecurse(br, bl, tl, iterations,maxDepth);
  
  filter(BLUR,.5);
  noLoop();

}



function TriangleRecurse(p1, p2, p3, i,maxD) {
  
  //
  if (i == 3){//set a new maxdepth after set amount of rounds
    maxD = i+3 + floor(random()*(maxD-i));
  }
  
  
  if (i == maxD) {
    return null;
  }
  var time = frameCount;
  var basicColor = [random(), random(), random()];
  var r = 255 * (basicColor[0] + random() * ( cos ( PI* i*23.234 + time) ) );
  var g = 255 * (basicColor[1] + random() * ( sin ( PI* i*12 + time) ) );
  var b = 255 * (basicColor[2] + random() * ( sin ( PI* i*1.87 + time) ) );
  fill(r,g,b,20);
  beginShape();
  vertex(p1.x, p1.y);
  vertex(p2.x, p2.y);
  vertex(p3.x, p3.y);
  endShape(CLOSE);


  //create array of side lengths
  var lengths = [];

  lengths.push(distance(p1, p2));
  lengths.push(distance(p2, p3));
  lengths.push(distance(p1, p3));

  var longestIndex = 0;
  var longestSide = lengths[0];
  for (var j = 0; j < lengths.length; j++) {
    if (lengths[j] > longestSide) {
      longestIndex = j;
    }
  }

  //Lerped midpoint positions modulated by gaussian
  //var rG = randomGaussian();
  var sd = .5;
  var t1 = (rG[i][0] * sd % .3) + .5;//this uses my precalculated randoms
  var t2 = (rG[i][1] * sd % .3) + .5;
  var t3 = (rG[i][2] * sd % .3) + .5;
  var p4 = Lerp2D(p1, p2, t1);
  var p5 = Lerp2D(p2, p3, t2);
  var p6 = Lerp2D(p1, p3, t3);
  var points = [p4, p5, p6];

  //pick 4,5,6 depending on which is longest.
  //4 is top, 5 is right and 6 is center
  //use the longestIndex to get the value;
  
  //INCREASE DEPTH VALUE
  i++;
  
  
  //Depending on these recursions you get diff patterns
  //try p6,p1,p2 and p6,p2,p3 for a fun pattern
  //two triangles split on p6
  
  //change triangle depending on the option
  if (longestIndex == 2) {
    TriangleRecurse(p2, points[longestIndex], p1, i, maxD);

    TriangleRecurse(p2, points[longestIndex], p3, i, maxD);
  }
  if (longestIndex == 1) {
    TriangleRecurse(p1, p2, points[longestIndex], i, maxD);

    TriangleRecurse(points[longestIndex], p3, p1, i, maxD);
  }
  if (longestIndex == 0) {

    TriangleRecurse(p1, points[longestIndex], p3, i, maxD);

    TriangleRecurse(p3, points[longestIndex], p2, i, maxD);
  }




}

function draw() {

  if (false) {
  
  background(255, 240, 240);
    
  }
}


//function takes two points, I guess it could be vectors
function MiddlePoint(p1, p2) {
  var x = (p1.x + p2.x) * .5;
  var y = (p1.y + p2.y) * .5;
  result = createVector(x, y);
  return result;
} //return the midpoint

function Triangle(p1, p2, p3) {
  beginShape();
  vertex(p1.x, p1.y);
  vertex(p2.x, p2.x);
  vertex(p3.x, p3.y);
  endShape(CLOSE);
}

//takes the two points
function Lerp2D(a, b, t) {
  var x = lerp(a.x, b.x, t);
  var y = lerp(a.y, b.y, t);
  var result = createVector(x, y);

  return result;

}

function distance(a, b) {
  return sqrt(pow(b.x - a.x, 2) + pow(b.y - a.y, 2));

}


//naive triangle draw
//Draw triangles
function DrawNaive() {
  for (var i = 0; i < canvasSize / size; i++) {
    //-1
    var x1 = i * size;
    var x2 = x1 + size * random();
    for (var j = 0; j < canvasSize / size; j++) {


      var y1 = j * size;
      var y2 = y1 + size * random();

      beginShape();
      vertex(x1, y1);
      vertex(x2, y1);
      vertex(x2, y2);
      endShape(CLOSE);

      beginShape();
      vertex(x2, y2);
      vertex(x1, y2);
      vertex(x1, y1);
      endShape(CLOSE);

    }
  }
}