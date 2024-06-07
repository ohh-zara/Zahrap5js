let font;
let fontSize = 150;
let waveAmplitude = 20;
let waveFrequency = 0.1;
let shapes = [];

function preload() {
  font = 'Poppins'; // Use the Google Font "Poppins"
}

function setup() {
  createCanvas(windowWidth, windowHeight);
  textFont(font);
  textSize(fontSize);
  noStroke();
  
  // Initialize shapes
  for (let i = 0; i < 100; i++) {
    shapes.push({
      x: random(width),
      y: random(height),
      size: random(20, 100),
      xSpeed: random(-1, 1),
      ySpeed: random(-1, 1),
      color: [random(100, 255), random(100, 255), random(100, 255), 100]
    });
  }
}

function draw() {
  // Draw background
  background(20, 30, 50);
  
  // Draw and move shapes
  for (let shape of shapes) {
    fill(shape.color);
    ellipse(shape.x, shape.y, shape.size, shape.size);
    shape.x += shape.xSpeed;
    shape.y += shape.ySpeed;

    // Wrap shapes around edges
    if (shape.x > width) shape.x = 0;
    if (shape.x < 0) shape.x = width;
    if (shape.y > height) shape.y = 0;
    if (shape.y < 0) shape.y = height;
  }

  // Draw wavy typography
  fill(200);
  let txt = 'Typography';
  let x = 50;
  let y = height / 2;

  for (let i = 0; i < txt.length; i++) {
    let letter = txt.charAt(i);
    let charWidth = textWidth(letter);
    let wave = sin((frameCount + i) * waveFrequency) * waveAmplitude;
    text(letter, x, y + wave);
    x += charWidth;
  }
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
}
