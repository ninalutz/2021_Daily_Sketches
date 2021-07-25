//forked from: ISM by garabatsopr
// color palette

var colors = ["#F5F7B2","#1CC5DC","#890596","#CF0000"];

// set weights for each color 

var weights = [1, 1, 1, 1];
// number of drawing agents 

var nAgents = 90;

let agent = [];

let border = 700;

// set spinning direction (plus or minus)

var direction = -1;

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
  colorMode(HSB, 360, 100, 100, 100);
  rectMode(CENTER)
  drawGrid()

}


function drawGrid()
{ 
  noFill();
  randomSeed(12345);
  for(let i=0; i < 10;i++)
  {
    beginShape();
      for(let i = 0; i < 10;i++)
      {
        let xx = random(border,width-border);
        let yy = random(border,height-border);
        curveVertex(xx,yy);
        agent.push(new Agent(xx,yy));
      }
    endShape(CLOSE);
  }
  
  
}

function draw() {
  background(0, 1)
  
  if(frameCount > 10000)
  {
      noLoop();   
  }

  push();
  
  translate(0,0);

  for (let i = 0; i < agent.length; i++) {
      agent[i].update();
  } 
  
  pop();
}

// paintining agent 


class Agent {
  constructor(x,y) {
  
    this.p = createVector(x,y);
    
    this.pOld = createVector(this.p.x, this.p.y);

    this.step = 0.5;
    
    this.scale = 3;
    
    this.color = color(random(200), random(200), random(200))
    
    this.direction = 1;
    
    //this.strokeWidth = random(1,2);
    this.strokeWidth = 0.1;
    
    this.rr = random(0,1);
    
    this.ang = random(0,PI);
  }
  
  getPartner() {
    return this.partner;
  }

  getP() {
    return this.p;
  }
  
  getColor(){
    return this.color;
  }


  update() {
    

    this.p.x += this.direction * vector_field(this.p.x, this.p.y,this.scale).x * this.step;
    this.p.y += this.direction * vector_field(this.p.x, this.p.y,this.scale).y * this.step;

    strokeWeight(5);
    stroke(this.color, 10);
    

    if (this.rr < 0.5)
    {
      arc(this.pOld.x, this.pOld.y, this.p.x, this.p.y,0,this.ang);
    }else
    {
      line(this.pOld.x, this.pOld.y, this.p.x, this.p.y);
    }
      
  
    this.pOld.set(this.p);
  }

}

// vector field function 
// the painting agents follow the flow defined 
// by this function 


function vector_field(x, y,myScale) {

  x = map(x, border, width-border, 0, myScale);
  y = map(y, border, height-border,0, myScale);

  let k1 = 5;
  let k2 = 3;

  //let u = sin(k1 * y) + cos(k2 * y) + map(noise(x,y),0,1,-5,5);
  //let v = sin(k2 * x) - cos(k1 * x) + map(noise(x,y),0,1,-5,5);

  let u = sin(k1 * y) + cos(k2 * y) + 0.01;
  let v = sin(k2 * x) - cos(k1 * x) + 0.01;
  
  return createVector(u,v);
}


