let mic, fft;

function setup() {
  createCanvas(windowWidth, windowHeight);
  
  // Create an audio input
  mic = new p5.AudioIn();
  mic.start();
  
  // Create an FFT object for frequency analysis
  fft = new p5.FFT();
  fft.setInput(mic);
}

function draw() {
  background(0);
  
  // Get the waveform data
  let waveform = fft.waveform();
  
  // Draw the waveform
  noFill();
  beginShape();
  stroke(255);
  strokeWeight(2);
  for (let i = 0; i < waveform.length; i++) {
    let x = map(i, 0, waveform.length, 0, width);
    let y = map(waveform[i], -1, 1, 0, height);
    vertex(x, y);
  }
  endShape();
  
  // Get the overall volume (amplitude)
  let volume = mic.getLevel();
  
  // Map the volume to circle size
  let diameter = map(volume, 0, 1, 10, 400);
  
  // Draw a circle based on volume
  fill(255, 0, 0, 150);
  noStroke();
  ellipse(width / 2, height / 2, diameter, diameter);
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
}
