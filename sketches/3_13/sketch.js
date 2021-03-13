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
  frameRate(30)

}
function draw() {
  blendMode(BLEND);
  background(0, 50);
  blendMode(ADD);
  
  let s = 100;
  for (let x = s/2; x < width; x += s) {
    for (let y = s/2; y < height; y += s) {
      let d = dist(x, y, width/2, height/2)/16;
      let theta = atan2(y-height/2, x-width/2);
      let v = (sin(sin(d - frameCount/5)+theta*3+PI/2)+1)/2;
      fill(0, 0, 255, 15);
      ellipse(x, y, s*2.5*(v-0.5), s*2.5*(v-0.5));
      fill(255,0,0, 10);
      circle((x-width/2)*1.2+width/2, (y-height/2)*1.1+height/2, s*2.5*(v-0.5));
      fill(200,0,200, 20);
      rect((x-width/2)*1.1+width/2, (y-height/2)*1.2+height/2, s*2.5*(v-0.5), s*2.5*(v-0.5));
    }
  }
}