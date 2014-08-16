var canvas = document.getElementById('canvas'),
    readout = document.getElementById('readout'),
    context = canvas.getContext('2d'),
    cannon = new Image(),
    slime = new Image();
    
// Functions..........................................................

function drawBackground() {
    context.clearRect(0, 0, canvas.width, canvas.height);
}

function drawCannon() {
    context.drawImage(cannon, 0, 450);
}

function drawSlime() {
    context.drawImage(slime, 850, 570);
}

function updateReadout(x, y) {
    readout.innerHTML = '(' + x.toFixed(0) + ', ' + y.toFixed(0) + ')';
}

function drawGuidelines(x, y) {
    context.strokeStyle = 'rgba(51, 51, 51, .6)';
    context.lineWidth = 0.5;
    drawHorizontalLine(y);
    drawVerticalLine(x);
}

function drawHorizontalLine(y) {
    context.beginPath();
    context.moveTo(0, y - 20);
    context.lineTo(context.canvas.width, y - 20);
    context.stroke();
}

function drawVerticalLine(x) {
    context.beginPath();
    context.moveTo(x - 20, 0);
    context.lineTo(x - 20, context.canvas.width);
    context.stroke();
}

function rotateCannon(x, y) {
    context.save();
    context.translate(147-20, 608-20);
    context.rotate(-Math.atan((canvas.height-y)/x) + Math.PI/7);
    context.drawImage(cannon, -147+20, -156+20);
    context.restore();
}

// Event handlers.....................................................

canvas.onmousemove = function(e) {
    var loc = { x: e.clientX,
                y: e.clientY }
    drawBackground();
    drawSlime();
    rotateCannon(loc.x, loc.y);
    drawGuidelines(loc.x, loc.y);
    updateReadout(loc.x, loc.y);
}

// Initialization.....................................................

cannon.src = 'img/cannon.png';
slime.src = 'img/slime.png'
cannon.onload = function(e) {
    drawCannon();
    drawSlime();
}
