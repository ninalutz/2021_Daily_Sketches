//Set up 2 global vars
var r=200; //radius
var s=0.002; //speed 

function setup() { 
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

   background(255)
} 
function draw() { 
   background(255, 150); 
   translate(width/2, height/2); 
   let n=360;
   for (let i=0; i<n; i++) {
      let t1= i*2*PI/n;
      let t2= s*t1*(mouseY/1000);
      let x1= r*cos(t1);
      let y1= r*sin(t1 + mouseX);
      let x2= r*cos(t2);
      let y2= r*sin(t2);
      stroke(i%255, 50)
      strokeWeight(2)
      noFill();
      line(x1, y1, x2,y2);
   }
   s+=0.002;
   fill(0);
}


function touchMoved() {
  r+= 5;
  if (r > 255) {
    r = 50;
  }
}