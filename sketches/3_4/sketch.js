var blobs, nBlobs = 12, theta = 0, autoPlay = true;

function Blob(radius, nSegments, magnitude, color) {
  this.radius = radius;
  this.magnitude = magnitude;
  this.color = color;
  this.center = {
    x: width / 2,
    y: height / 2
  };
  
  this.segments = new Array(nSegments);
  for (var i = nSegments; i--; ) {
    this.segments[i] = random(PI * 2);
  }
  
  this.innerSegments = new Array(nSegments);
  for (var i = nSegments; i--; ) {
    this.innerSegments[i] = random(PI * 2);
  }
}

Blob.prototype.render = function(offset) {
  stroke(0)
  strokeWeight(3)

  noFill();

  var n = this.segments.length;
  beginShape();
  for (var i = n; i--; ) {
    var r = this.radius + sin(offset + this.segments[i]) * this.magnitude,
        pr = this.radius + sin(offset + this.segments[(i+1)%n]) * this.magnitude,
        c = (4/5) * tan(PI/(2*n)) * r,
        pc = (8/3) * tan(PI/(2*n)) * pr,
        t = PI * 2 / n * i,
        pt = PI * 2 / n * (i + 1),
        x = cos(t) * r,
        y = -sin(t) * r,
        px = cos(pt) * pr,
        py = -sin(pt) * pr,
        cx1 = px + cos(pt - PI/2) * pc,
        cy1 = py - sin(pt - PI/2) * pc,
        cx2 = x + cos(t + PI/2) * c,
        cy2 = y - sin(t + PI/2) * c;

    if (i === n - 1) vertex(px, py);
    bezierVertex(cx1, cy1, cx2, cy2, x, y);
  }
  endShape();
  
  fill(200, 1);
  beginShape();
  var innerRadius = this.radius - this.magnitude * 0.75;
  for (var i = 0; i < n; i++) {
    var pi = i == 0 ? n - 1 : i - 1,
      r = innerRadius + sin(offset + this.innerSegments[i]) * this.magnitude,
        pr = innerRadius + sin(offset + this.innerSegments[pi]) * this.magnitude,
        c = (4/3) * tan(PI/(2*n)) * r,
        pc = (4/3) * tan(PI/(2*n)) * pr,
      t = PI * 2 / n * i,
        pt = PI * 2 / n * (pi),
        x = cos(t) * r,
        y = -sin(t) * r,
        px = cos(pt) * pr,
        py = -sin(pt) * pr,
        cx1 = px + cos(pt + PI/2) * pc,
        cy1 = py - sin(pt + PI/2) * pc,
        cx2 = x + cos(t - PI/2) * c,
        cy2 = y - sin(t - PI/2) * c;

    if (i === 0) vertex(px, py);
    bezierVertex(cx1, cy1, cx2, cy2, x, y);
  }
  endShape();
}

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
  blobs = new Array(nBlobs);

  var maxR = max(width, height) / 2;
  for (var i = blobs.length; i--; ) {
    var r = map(i, 0, blobs.length, 16, maxR),
        m = map(i, 0, blobs.length, 2, maxR / (2*nBlobs));
    blobs[i] = new Blob(r, 16, m, color[i%(10)]);
  }
}

function draw() {
  background(0, 20);
  fill(255)
  text("3.4.21", 30, height-30)
  translate(width / 2, height / 2);
  
  if (autoPlay) {
    theta += PI * 2 / 120;
  }
  
  for (var i = blobs.length; i--; ) {
    blobs[i].render(theta);
  }
}
