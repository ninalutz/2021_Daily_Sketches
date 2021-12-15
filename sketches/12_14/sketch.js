
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

  let sides = floor(random(5, 10));
  let stemLength = height / 3;
  let branchNum = 7;
  let spaceNum = branchNum + 1;
  let spaceHeight = stemLength / spaceNum;
  let theta = 10;
  
  translate(width / 2, height / 2);
  background(155);
  stroke(255);

  for (let i = 0; i < sides; i++) {
    push();
    rotate(TAU * i / sides);
    line(0, 0, 0, -stemLength);
    pop();
  }

  for (let b = 1; b < branchNum + 1; b++) {
    let branchLength = random(spaceHeight/2);
    for (let i = 0; i < sides; i++) {
      push();
      rotate(TAU * i / sides);

      strokeWeight(5);
      stroke(255)
      line(0, -spaceHeight * b, -branchLength, -spaceHeight * b + -branchLength*tan(theta*1.5));
      line(0, -spaceHeight * b, branchLength, -spaceHeight * b + -branchLength*tan(theta*3));
      
      strokeWeight(10);
      line(0, -spaceHeight * b, -branchLength, -spaceHeight * b + -branchLength*tan(theta));
      line(0, -spaceHeight * b, branchLength, -spaceHeight * b + -branchLength*tan(theta));
      
      strokeWeight(10);
      stroke(120)
      line(0, -spaceHeight * b, -branchLength, -spaceHeight * b + -branchLength*tan(theta/2));
      line(0, -spaceHeight * b, branchLength, -spaceHeight * b + -branchLength*tan(theta/8));

      strokeWeight(2);
      stroke(0)
      line(0, -spaceHeight * b, -branchLength, -spaceHeight * b + -branchLength*tan(theta*2));
      line(0, -spaceHeight * b, branchLength, -spaceHeight * b + -branchLength*tan(theta*2));
      pop();
    }
  }
}