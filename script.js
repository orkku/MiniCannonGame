var canvas = document.getElementById("myCanvas");
var ctx = canvas.getContext("2d");
var turn = "";
var projectileX = 0;
var projectileY = 0;
var dx = 2;
var dy = -2;
var playerCannonAngle = -45;
var computerCannonAngle = -135;

function startGame() {
    turn = "Player";
    drawGround();
    drawPlayer();
    drawComputer();
}

function drawGround() {
    // maan pinta
    ctx.beginPath();
    ctx.rect(0, 555, 1200, 45);
    ctx.fillStyle = "lightgreen";
    ctx.fill();
    ctx.closePath();
}

function drawPlayer() {
    // otsikko
    ctx.font = "16px Arial";
    ctx.fillStyle = "green";
    ctx.fillText("Player", 8, 20);
    // runko
    ctx.beginPath();
    ctx.rect(25, 550, 50, 25);
    ctx.fillStyle = "green";
    ctx.fill();
    ctx.closePath();
    // piippu
    ctx.save();
    ctx.beginPath();
    ctx.translate(50, 550);
    ctx.rotate(playerCannonAngle * Math.PI / 180);
    ctx.fillStyle = "red";
    ctx.fillRect(0, 0, 50, 5);
    ctx.closePath();
    ctx.restore();
}

function drawComputer() {
    // otsikko
    ctx.font = "16px Arial";
    ctx.fillStyle = "red";
    ctx.fillText("Computer", 1120, 20);
    // runko
    ctx.beginPath();
    ctx.rect(1125, 550, 50, 25);
    ctx.fillStyle = "red";
    ctx.fill();
    ctx.closePath();
    // piippu
    ctx.save();
    ctx.beginPath();
    ctx.translate(1150, 550);
    ctx.rotate(computerCannonAngle * Math.PI / 180);
    ctx.fillStyle = "green";
    ctx.fillRect(0, 0, 50, 5);
    ctx.closePath();
    ctx.restore();
}

function draw() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    drawProjectile(projectileX, projectileY);
    projectileX += dx;
    projectileY += dy;
}

function drawProjectile(x, y) {
    ctx.beginPath();
    ctx.arc(x, y, 3, 0, Math.PI * 2);
    ctx.fillStyle = "black";
    ctx.fill();
    ctx.closePath();
}

// setInterval(draw, 10);