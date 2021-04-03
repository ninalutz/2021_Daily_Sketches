//Inspo from
/*
200504 Spiral Storm
by CHE YU WU 
*/
let colors = "fdc5f5-f7aef8-b388eb-8093f1-72ddf7-fff".split("-").map(a=>"#"+a);
let overAllTexture;

function setup() {

  fill('black')
  
  overAllTexture=createGraphics(width,height)
  
  overAllTexture.loadPixels()
  for(var i=0;i<width;i++){
    for(var o=0;o<height;o++){
      overAllTexture.set(i,o,color(100,noise(i/3,o/3,i*o/50)*random([0,50,100])))
    }
  }
  overAllTexture.updatePixels()

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


function draw() {
  background(0, 20)
  fill(0,0,20)
  noStroke()
  push()
    rotate(PI/4)
    stroke(255)
    strokeWeight(3)

    for(var i=0;i<1000;i+=0.5){
      strokeWeight(cos(i/(40+300/50)+frameCount/50)*100 +5)
      let clr = color(colors[ int(i/(300/50+10))%colors.length])
      if (i%50<10){
        clr.setAlpha(100)
        strokeWeight(1)
      }
      stroke(clr)
      let freq = 4+sin(frameCount/1000)/10+ 500/100+0.2+ noise(i/500,frameCount/200)*2
      let rr =  + sin(i/250+frameCount/500)*450 


      let sang = i/freq+frameCount/20
      let eang = sang + 1/freq
      let sx = i-1+cos(sang)*rr/10
      let sy = sin(sang)*rr
      let ex = i+cos(eang)*rr/20
      let ey = sin(eang)*rr

     line(sx,sy,ex,ey)
     // fill(clr)
    // rect(sx, sy, 1, 1)
    }
  
  pop()

  }