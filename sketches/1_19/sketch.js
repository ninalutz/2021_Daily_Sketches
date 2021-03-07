var globe;
var offset =0;
var angle =0;

var m=0;
var mchange=0;

var a = 1.2;
var b = 1;

var total = 20;


function setup(){

  total = int(random(10, 40));
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
  globe = new Array((total+1)*(total+1));
}

function supershape(theta, m, n1, n2, n3){
  var t1=abs((1/a)*cos(m*theta/4));
  t1=pow(t1,n2);
  var t2=abs((1/b)*sin(m*theta/4));
  t2=pow(t2,n3);
  var t3 =t1+t2;
  var r=pow(t3,-1/n1);
  return r;
}

function draw(){
  background(0, 10);

  m=map(sin(mchange),-1,1,0,7);
  mchange+=0.02;

  var r=200;

  for(var i=0;i<total+1;i++){
    globe[i] =[];
    var lat =map(i,0,total,-HALF_PI,HALF_PI);
    var r2 = supershape(lat,m,0.2,1.7,1.7);

    for(var j=0;j<total+1;j++){
      var lon = map(j,0,total,-PI,PI);
      var r1=supershape(lon,m,0.2,1.7,1.7);

      var x = r*r1*cos(lon)*r2*cos(lat);
      var y = r*r1*sin(lon)*r2*cos(lat);

      var index=i+j*(total+1);
      globe[index] = createVector(x,y);
    }
  }

  offset+=5;
  // noStroke();

  for(var i=0;i<total;i+=2){
    for(var j=0;j<total+1;j+=2){
      var index1=i+j*(total+1);
      var v1 = globe[index1];
      var index2=(i+1)+j*(total+1);
      var v2 = globe[index2];
      stroke(0);
      fill(255, 10)
      rectMode(CENTER)
      ellipse(v1.x + width/2,v1.y + height/2,v2.x + width/2,v2.y + height/2);
      // rect(v1.y + width/2,v1.x + height/2,v2.y + width/2,v2.x + height/2);

    }
  }
  angle+=0.3;

  fill(255);
  noStroke();
 // text("1.19.20", 30, height-30);
}


// function keyPressed() {
//     save(cnv, 'myCanvas.png');
// }

