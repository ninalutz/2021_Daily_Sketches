/*
ref.
A trick to get looping curves with lerp and delay
https://necessarydisorder.wordpress.com/2018/03/31/a-trick-to-get-looping-curves-with-lerp-and-delay/
*/


const CYCLE = 480;
const VERT_NUM = 3000;
let DELAY_FACTOR = 1.3;


function setup() {

    const s = min(windowWidth , windowHeight);
  createCanvas(s,s); 
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

function x1(t){
  return  (cos(TAU * t) - 1) * height * 0.0;
}
function y1(t){
  return 0.5 * width + width * (noise(sin(TAU * t) * 2) - 0.5);
}
 
function x2(t){
  return (cos(TAU * t) + 1) * width * 0.1 + width;
}
function y2(t){
  return 0.5 * width - 0.4 * width * cos(TAU * t);
  
}
 

function draw(){
  
  const frameRatio = frameCount % CYCLE / CYCLE;
  
  const w = 3;
  strokeWeight(w);
  strokeJoin(ROUND);
  noFill();
  background(0, 5);

  stroke(200);
  beginShape();
  
  for(let i=0;i< VERT_NUM; i++){
    const vertRatio = (i / VERT_NUM) % 1;
    let x = lerp(x1(frameRatio - DELAY_FACTOR * vertRatio * 0.1), x2(frameRatio - DELAY_FACTOR * (1 - vertRatio)), vertRatio);
    let y = lerp(y1(frameRatio - DELAY_FACTOR * vertRatio * 4), y2(frameRatio - DELAY_FACTOR * (1 - vertRatio)), vertRatio);
    vertex(x, y);
  }
  endShape();
}


function createCols(_url) {
  let slash_index = _url.lastIndexOf('/');
  let pallate_str = _url.slice(slash_index + 1);
  let arr = pallate_str.split('-');
  for (let i = 0; i < arr.length; i++) {
    arr[i] = '#' + arr[i];
  }
  return arr;
}