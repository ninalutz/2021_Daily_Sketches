//==========
// based off: https://www.openprocessing.org/sketch/883456

function setup() {
  w = 600;
    var canvas;
    if(windowWidth>=600 && windowHeight >=600){
      canvas = createCanvas(600, 600);
    }
    else{
      canvas = createCanvas(windowWidth, windowHeight - 100);
    }

  background(0);


  var x = (windowWidth - width) / 2;
  var y = (windowHeight - height) / 2;

  canvas.position(x, y);

  noLoop();
  angleMode(DEGREES);

  background(0);
  noStroke();
  fill(150, 120, 255, 20);
}

function draw(){

  blendMode(ADD);
  for(let i=0; i<3000; i++){
    let x = random(width*2);
    let y = random(height*2);
    let s = random(30, 60);
    push();
    translate(x, y);
    rotate(random(360));
    square(0, 0, s);
    pop();
  }

  blendMode(NORMAL);

  let pg = createGraphics(width, height);
   pg.background(150, 120, 255,150);
  pg.erase();
  pg.noStroke();
  for(let i=0; i<50; i++){
    pg.ellipse(random(width), random(height), random(40, 180), 3);
    pg.ellipse(random(width), random(height), random(50, 200), random(50, 200));
  }
  pg.noErase();
  image(pg, 0, 0);
}