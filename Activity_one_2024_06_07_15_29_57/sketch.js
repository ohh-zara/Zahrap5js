let angle = 0;

function setup() {
  createCanvas(400, 400);
}

function draw() {
  background(0);
  
  // Increase angle for rotation
  angle += 0.05;
  
  // for rectangle (x= horizontal, y= vertical , width , height)
  noStroke();
  fill('#3D0613');
  rect(50, 200 , 300, 50);

  rect(100 , 150,200, 50);
  
  // wheels
  // ellipse (x, y, width, height)
  fill('#450200');
  push(); // Save the current transformation matrix
  translate(100, 250); // Move the origin to the center of the first wheel
  rotate(angle); // Rotate the wheel
  ellipse(0 , 0 , 55 , 55);
  fill('#120000');
  ellipse(0, 0 , 50 , 50);
  pop(); // Restore the transformation matrix
  
  push(); // Save the current transformation matrix
  translate(300, 250); // Move the origin to the center of the second wheel
  rotate(angle); // Rotate the wheel
  fill('#450200');
  ellipse(0 , 0 , 55 , 55);
  fill('#120000');
  ellipse(0, 0 , 50 , 50);
  pop(); // Restore the transformation matrix
  
  //window
  fill('#571223');
  rect(110 , 155 , 40 , 40);
  rect(160 , 155 , 120 , 40);
  
  //window shadow
  fill('#35030F');
  rect(110 , 155 , 40 , 2);
  rect(160 , 155 , 120 , 2);
  
  //headlights
  fill('#F3E30C')
  rect(43 , 207 , 15, 15);
  
  //headlights shadow
  fill('#3D0311')
  rect (50 , 222 , 8 , 4)
  
  //person head
  fill('#F4C6A9')
  ellipse(135 , 170 , 20 , 20);
  
  //person hand
  fill('#F4C6A9')
  rect(120 , 182 , 9 , 1);
  
  //person body
  fill('#3D0311')
  rect(130 , 180 , 8 , 15);
  
  //brombrom
  fill('#6E051F');
  rect(350 , 230 , 19 , 10);
  fill('#3D0311');
  rect(350 , 230 , 4 , 10);
  
  //wheel
  fill('#460314');
  ellipse( 119 , 180 , 5 ,20);
  rect(111 , 175, 10 ,10);
  
  
  //seats
  fill('#460314')
  rect( 190 , 170 , 20 , 25)
  rect(  250 , 170 , 20 , 25)
  rect( 180 , 190 , 10 , 5)
  rect( 240 , 190 , 10, 5)
  
  
}
