let gameState = "title";  // Tracks the current state of the game (title, difficulty, duration, playing, gameOver, won)
let player;  // The player spaceship
let asteroids = [];  // Array to store asteroids
let stars = [];  // Array to store stars
let projectiles = [];  // Array to store projectiles
let particles = [];  // Array to store particles for explosion effects
let score = 0;  // Player's score
let asteroidSpeedMultiplier = 1;  // Multiplier to increase asteroid speed over time
let asteroidFrequency = 60;  // Frequency of asteroid appearance
let gameDuration = 120;  // Game duration in seconds
let startTime;  // The start time of the game

function setup() {
  createCanvas(windowWidth, windowHeight);
  player = new Player();
  for (let i = 0; i < 200; i++) {  // Create 200 stars
    stars.push(new Star());
  }
}

function draw() {
  background(0);
  displayStars();

  // Display the current game state
  if (gameState === "title") {
    displayTitleScreen();
  } else if (gameState === "difficulty") {
    displayDifficultyScreen();
  } else if (gameState === "duration") {
    displayDurationScreen();
  } else if (gameState === "playing") {
    playGame();
  } else if (gameState === "gameOver") {
    displayGameOverScreen();
  } else if (gameState === "won") {
    displayWonScreen();
  }
}

// Display the title screen
function displayTitleScreen() {
  fill(255);
  textSize(48);
  textAlign(CENTER, CENTER);
  text("Space Adventure", width / 2, height / 2 - 50);
  textSize(24);
  text("Press ENTER to Start", width / 2, height / 2 + 50);
}

// Display the difficulty selection screen
function displayDifficultyScreen() {
  fill(255);
  textSize(48);
  textAlign(CENTER, CENTER);
  text("Select Difficulty", width / 2, height / 2 - 100);
  textSize(24);
  text("1. Easy", width / 2, height / 2 - 20);
  text("2. Medium", width / 2, height / 2 + 20);
  text("3. Hard", width / 2, height / 2 + 60);
}

// Display the duration selection screen
function displayDurationScreen() {
  fill(255);
  textSize(48);
  textAlign(CENTER, CENTER);
  text("Select Duration", width / 2, height / 2 - 100);
  textSize(24);
  text("1. 1 Minute", width / 2, height / 2 - 20);
  text("2. 2 Minutes", width / 2, height / 2 + 20);
  text("3. 3 Minutes", width / 2, height / 2 + 60);
}

// Display the game over screen
function displayGameOverScreen() {
  fill(255);
  textSize(48);
  textAlign(CENTER, CENTER);
  text("Game Over", width / 2, height / 2 - 50);
  textSize(24);
  text("Score: " + score, width / 2, height / 2);
  text("Press ENTER to Restart", width / 2, height / 2 + 50);
}

// Display the win screen
function displayWonScreen() {
  fill(255);
  textSize(48);
  textAlign(CENTER, CENTER);
  text("YOU WON", width / 2, height / 2 - 50);
  textSize(24);
  text("Score: " + score, width / 2, height / 2);
  text("Press ENTER to Restart", width / 2, height / 2 + 50);
}

// Main gameplay function
function playGame() {
  let elapsedTime = (millis() - startTime) / 1000;  // Calculate elapsed time in seconds

  // Display and update the player
  player.display();
  player.move();

  // Display and update projectiles
  for (let i = projectiles.length - 1; i >= 0; i--) {
    projectiles[i].display();
    projectiles[i].move();

    // Remove projectiles that have gone off the screen
    if (projectiles[i].isOffScreen()) {
      projectiles.splice(i, 1);
    }
  }

  // Display and update asteroids
  for (let i = asteroids.length - 1; i >= 0; i--) {
    asteroids[i].display();
    asteroids[i].move();

    // Check for collision between player and asteroids
    if (player.collidesWith(asteroids[i])) {
      gameState = "gameOver";
    }

    // Check for collision between projectiles and asteroids
    for (let j = projectiles.length - 1; j >= 0; j--) {
      if (projectiles[j].collidesWith(asteroids[i])) {
        createExplosion(asteroids[i].x, asteroids[i].y);  // Create explosion effect
        asteroids.splice(i, 1);
        projectiles.splice(j, 1);
        score += 50;  // Increase score for hitting an asteroid
        break;
      }
    }

    // Remove asteroids that have gone off the screen
    if (asteroids[i] && asteroids[i].isOffScreen()) {
      asteroids.splice(i, 1);
      score += 10;  // Increase score when an asteroid goes off screen
    }
  }

  // Display and update particles
  for (let i = particles.length - 1; i >= 0; i--) {
    particles[i].display();
    particles[i].move();

    // Remove particles that have faded away
    if (particles[i].isOffScreen()) {
      particles.splice(i, 1);
    }
  }

  // Randomly create new asteroids
  if (frameCount % asteroidFrequency === 0) {
    asteroids.push(new Asteroid());
  }

  // Increase difficulty over time
  if (frameCount % 1200 === 0 && asteroidFrequency > 20) {  // Increase frequency every 20 seconds
    asteroidFrequency -= 5;
  }
  if (frameCount % 2400 === 0) {  // Increase speed every 40 seconds
    asteroidSpeedMultiplier += 0.5;
  }

  // Check if the game duration has elapsed
  if (elapsedTime >= gameDuration) {
    gameState = "won";
  }

  // Display the score and remaining time
  displayHUD(elapsedTime);
}

// Display the score and remaining time
function displayHUD(elapsedTime) {
  fill(255);
  textSize(24);
  text("Score: " + score, 20, 30);

  let remainingTime = gameDuration - elapsedTime;
  text("Time: " + nfc(remainingTime, 1) + "s", 20, 80);
}

// Player spaceship class
class Player {
  constructor() {
    this.x = width / 2;
    this.y = height - 50;
    this.size = 50;
  }

  display() {
    fill(0, 255, 0);
    beginShape();
    vertex(this.x, this.y - this.size / 2);
    vertex(this.x - this.size / 2, this.y + this.size / 2);
    vertex(this.x, this.y);
    vertex(this.x + this.size / 2, this.y + this.size / 2);
    endShape(CLOSE);
  }

  move() {
    if (keyIsDown(LEFT_ARROW) && this.x > 0) {
      this.x -= 5;
    }
    if (keyIsDown(RIGHT_ARROW) && this.x < width) {
      this.x += 5;
    }
    if (keyIsDown(UP_ARROW) && this.y > 0) {
      this.y -= 5;
    }
    if (keyIsDown(DOWN_ARROW) && this.y < height) {
      this.y += 5;
    }
  }

  collidesWith(asteroid) {
    let distance = dist(this.x, this.y, asteroid.x, asteroid.y);
    return distance < this.size / 2 + asteroid.size / 2;
  }

  shoot() {
    projectiles.push(new Projectile(this.x, this.y - this.size / 2));
  }
}

// Asteroid class
class Asteroid {
  constructor() {
    this.x = random(width);
    this.y = 0;
    this.size = random(30, 60);
    this.speed = random(2, 5) * asteroidSpeedMultiplier;
  }

  display() {
    fill(150);
    stroke(100);
    strokeWeight(2);
    ellipse(this.x, this.y, this.size, this.size);
  }

  move() {
    this.y += this.speed;
  }

  isOffScreen() {
    return this.y > height;
  }
}

// Projectile class
class Projectile {
  constructor(x, y) {
    this.x = x;
    this.y = y;
    this.size = 10;
    this.speed = 10;
  }

  display() {
    fill(255, 0, 0);
    noStroke();
    ellipse(this.x, this.y, this.size, this.size);
  }

  move() {
    this.y -= this.speed;
  }

  isOffScreen() {
    return this.y < 0;
  }

  collidesWith(asteroid) {
    let distance = dist(this.x, this.y, asteroid.x, asteroid.y);
    return distance < this.size / 2 + asteroid.size / 2;
  }
}

// Star class
class Star {
  constructor() {
    this.x = random(width);
    this.y = random(height);
    this.size = random(1, 3);
    this.speed = random(0.5, 2);  // Add speed for stars
  }

  display() {
    fill(255);
    noStroke();
    ellipse(this.x, this.y, this.size, this.size);
  }

  move() {
    this.y += this.speed;
    if (this.y > height) {
      this.y = 0;
      this.x = random(width);
    }
  }
}

// Display stars in the background
function displayStars() {
  for (let star of stars) {
    star.move();
    star.display();
  }
}

// Create an explosion effect
function createExplosion(x, y) {
  for (let i = 0; i < 20; i++) {
    let p = new Particle(x, y);
    particles.push(p);
  }
}

// Particle class for explosion effect
class Particle {
  constructor(x, y) {
    this.x = x;
    this.y = y;
    this.size = random(5, 10);
    this.speed = random(2, 5);
    this.angle = random(TWO_PI);
    this.life = 255;
  }

  display() {
    fill(255, this.life);
    noStroke();
    ellipse(this.x, this.y, this.size, this.size);
  }

  move() {
    this.x += cos(this.angle) * this.speed;
    this.y += sin(this.angle) * this.speed;
    this.life -= 5;
  }

  isOffScreen() {
    return this.life <= 0;
  }
}

// Handle key pressed events
function keyPressed() {
  if (keyCode === ENTER) {
    if (gameState === "title") {
      gameState = "difficulty";
    } else if (gameState === "gameOver" || gameState === "won") {
      gameState = "title";
    }
  } else if (gameState === "difficulty") {
    if (key === '1') {
      setDifficulty('easy');
    } else if (key === '2') {
      setDifficulty('medium');
    } else if (key === '3') {
      setDifficulty('hard');
    }
  } else if (gameState === "duration") {
    if (key === '1') {
      setDuration(60);  // 1 Minute
    } else if (key === '2') {
      setDuration(120);  // 2 Minutes
    } else if (key === '3') {
      setDuration(180);  // 3 Minutes
    }
  }
}

function keyReleased() {
  if (key === ' ') {
    player.shoot();
  }
}

// Set game difficulty
function setDifficulty(difficulty) {
  if (difficulty === 'easy') {
    asteroidSpeedMultiplier = 1;
    asteroidFrequency = 60;
  } else if (difficulty === 'medium') {
    asteroidSpeedMultiplier = 1.5;
    asteroidFrequency = 45;
  } else if (difficulty === 'hard') {
    asteroidSpeedMultiplier = 2;
    asteroidFrequency = 30;
  }
  gameState = "duration";
}

// Set game duration
function setDuration(duration) {
  gameDuration = duration;
  score = 0;
  asteroids = [];
  projectiles = [];
  particles = [];
  player = new Player();
  startTime = millis();  // Record the start time of the game
  gameState = "playing";
}
