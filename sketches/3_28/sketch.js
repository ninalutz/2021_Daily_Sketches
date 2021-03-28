
var t = 0;
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
  rectMode(CENTER)

}
function draw() {
  for(i=10;i>0;i--){
    fill(i%2?240:20);
    for(j=0;j<10;j++){
      rect(2*w*noise(j,t,0)-w/2,2*w*noise(j,t,1)-w/2,w*i/20, w*i/20);
    }
  }
  t+=.001;
}