const CYCLE = 300;


function setup() {

  w = 600;
    var canvas;
    if(windowWidth>=600 && windowHeight >=600){
      canvas = createCanvas(600, 600, WEBGL);
    }
    else{
      canvas = createCanvas(windowWidth, windowHeight - 100, WEBGL);
    }


  let dep = max(width,height);
  ortho(-width / 2, width / 2, -height / 2, height / 2,-dep*3 , dep*3);

    var x = (windowWidth - width) / 2;
    var y = (windowHeight - height) / 2;

  canvas.position(x, y);
  frameRate(30)

}
function draw() {
  randomSeed(0);
  background(20);
  const cycle = CYCLE;
  let fr = (frameCount % cycle)/cycle;
  let size =min(height,width)*0.8;
  let num = 20;
  let span = size/num;
  rotateX(-PI/5);
  //rotateY(fr*TAU);
  rotateY(-PI/6);
  let count = 0;
  for(let z = -size/2; z < size/2; z += span)
  {
    let radOffset = map(z, -size/2, size/2, 0, TAU);
    let waveRatio = map(abs(z), 0, size/2, 0.5, 0);
    push();
    translate(0,0,z);
    wavedLinePlane(size,size*0.5,sin(radOffset + fr * TAU)*0.5,10,int(count + frameCount*0) % 5);
    pop();
    count ++;
  }
  fill(255)
}

function wavedLinePlane(w,h,waveHeightRatio,sw,sc)
{
  strokeWeight(sw);
  noStroke();
  fill(random(200), random(80), random(50));
  wavedPlane(w,h,waveHeightRatio,false);
  stroke(sc);
  noFill();
  wavedPlane(w,h,waveHeightRatio,true);
}

function wavedPlane(w,h,waveHeightRatio, isStroke)
{
  const cycle = CYCLE/2;
  const vertNum = 50;
  let fr = (frameCount % cycle)/cycle;
  const span = w/vertNum;
  
  if(isStroke)beginShape();
  else beginShape(TRIANGLE_STRIP);
  for(let x = -w/2; x <= w/2; x += span)
  {
    let radOffset = map(x, -w/2, w/2, 0, TAU*2);
    let maxWaveH = h * 0.5 * waveHeightRatio;
    let waveH = sin(fr * TAU + radOffset) * maxWaveH;
    let y = waveH - maxWaveH;
    if(!isStroke)vertex(x,h,0);
    vertex(x,y,0);
  }
  
  if(!isStroke)vertex(w/2, h,0);
  endShape();
}