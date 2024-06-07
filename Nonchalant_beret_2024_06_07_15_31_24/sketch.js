function setup() {
  createCanvas(600, 600);
  noLoop(); // Prevent draw from looping
}

function draw() {
  background(0);

  let gridSize = 10; // Number of cells in the grid
  let cellSize = width / gridSize;

  for (let x = 0; x < width; x += cellSize) {
    for (let y = 0; y < height; y += cellSize) {
      let diameter = random(cellSize * 0.5, cellSize * 0.9);
      let r = random(250);
      let g = random(250);
      let b = random(250);

      fill(r, g, b);
      noStroke();
      ellipse(x + cellSize / 2, y + cellSize / 2, diameter, diameter);
    }
  }
}
