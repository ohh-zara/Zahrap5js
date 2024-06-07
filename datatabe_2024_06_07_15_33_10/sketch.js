let table;
let maxSales;

function preload() {
    table = loadTable("Sales_Data.csv", "csv", "header");
}

function setup() {
    createCanvas(600, 600);
    background(0);
    noStroke();
    maxSales = max(table.getRow(0).arr);
}

function draw() {
      fill(255);
    background(0);  // Clear the background each time draw() is called
    drawBars();
    drawAxisLabels();
}

function drawBars() {
    push();
    textSize(18);
    textStyle(BOLD);
    fill(255);
    text('Daily Sales', 50, 50);
    textSize(14);
    textStyle(NORMAL);
    translate(100, height - 50);  // Move the origin to the bottom-     of the drawing area
    let data = table.getRow(0).arr;
    let headers = table.columns;
    for (let i = 0; i < table.getColumnCount(); i++) {
        let rectHeight = map(data[i], 0, maxSales, 25, -height +             100);
        let barX = i * 60;
        let barY = 0;
        if (mouseX >= barX + 100 && mouseX <= barX + 140 && mouseY           <= barY && mouseY >= barY + rectHeight) {
            fill(255, 0, 0); // Change color when hovering over the             bar
            textSize(16);
            text(data[i], barX + 120, barY + rectHeight - 10);
        } else {
            fill(lerpColor(color(64, 126, 214), color(237, 40, 59),         map(data[i], 0, maxSales, 0, 1)));
        }
        rect(barX, barY, 40, rectHeight);
        fill(0);
        textAlign(CENTER);
        text(headers[i], barX + 20, 20);
    }
    pop();
}

function drawAxisLabels() {
    push();
    textSize(14);
    fill(0);
    textAlign(CENTER);
    // X-axis label
    fill(255);
    text('Days', width / 2, height - 10);
    // Y-axis label
    translate(50, height / 2);
    rotate(-HALF_PI);
    fill(255);
    text('Sales Amount', 0, 0);
    pop();
}
