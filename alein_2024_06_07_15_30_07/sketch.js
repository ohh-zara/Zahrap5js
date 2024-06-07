function setup() {
  createCanvas(400, 400);
}

function draw() {
  background("#000000");
  translate(150,100)
  noStroke();
  fill("#3EC171")
  beginShape();
  vertex(0,100);
  bezierVertex(40,0,120,0,100,100);
  endShape();
  ellipse(50,110,100,100);
  rect(21,150,60,100);
  fill("#000000");
  ellipse(12,200,100,100)
  fill("#3EC171")
  ellipse(31,160,100,50)
  ellipse(65,160,100,50)
  ellipse(50,290,100,100)
  fill("#000000")
  ellipse(120,120,85,60)
  ellipse(1,120,35,40)
  
  //mouth
  fill("#2F9255")
  rect(5,150,50,20)
  ellipse(9,160,20,20)
  ellipse(50,160,20,20)
  
  //anteena
  fill("#2F9255");
  ellipse(42,32,30,30)
  ellipse(92,32,30,30)
  fill("#E8EB14");
  ellipse(40,30,30,30)
  ellipse(90,30,30,30)
  
  //eyeshadow
  fill ("#2F9255");
  ellipse(34,99,65,65);
  
  //eyesbase
  fill("#E5E5E6");
  ellipse(33,98,65,65)
  
  
  //eyeball
  fill(0);
  ellipse(30,100,10,10)
  
  //eyeshade
  fill("#2F9255");
  beginShape();
  vertex(0,100);
  bezierVertex(-1,40,70,50,65,100)
  endShape();

  
}