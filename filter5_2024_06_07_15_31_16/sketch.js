let img;

function setup() {
  createCanvas(500, 500);
  background(0);

  // Show drawings inside of text using clip and erase functions
  // First, what's behind the text:
  let cnv4 = createGraphics(width, height);
  let ctx2 = cnv4.canvas.getContext("2d");
  cnv4.fill(0, 200, 0);
  cnv4.circle(200, 230, 100);
  cnv4.rect(100, 200, 200);
  ctx2.clip();
  image(cnv4, 0, 0);

  // And now for the text:
  let cnv3 = createGraphics(width, height);
  cnv3.fill("#20201f");  
  cnv3.rect(100, 200, 200); 
  cnv3.erase();
  cnv3.textSize(200);
  cnv3.text('HI', 100, 350);
  cnv3.noErase();
  image(cnv3, 0, 0);
}

function draw() {
  // Nothing needed here for the initial setup
}
