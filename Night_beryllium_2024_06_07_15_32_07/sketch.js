let trail = [];
let maxTrailLength = 100;

function setup() {
  createCanvas(800, 600);
  noStroke();
}

function draw() {
  background(0);
  
  // Add the current mouse position to the trail
  trail.push({
    x: mouseX,
    y: mouseY,
    size: random(10, 30), // Random size for more dynamic trails
    color: color(random(100, 255), random(100, 255), random(100, 255), 200) // Random color with transparency
  });
  
  // Limit the length of the trail
  if (trail.length > maxTrailLength) {
    trail.shift();
  }

  // Draw the trail with more dynamic effects
  for (let i = 0; i < trail.length; i++) {
    let pos = trail[i];
    let age = map(i, 0, trail.length, 0, 1); // Normalized age of the trail element
    let alpha = lerp(0, 255, age); // Interpolate alpha for fading effect
    let size = lerp(0, pos.size, age); // Interpolate size for shrinking effect
    
    fill(red(pos.color), green(pos.color), blue(pos.color), alpha);
    ellipse(pos.x, pos.y, size, size);
  }
}

