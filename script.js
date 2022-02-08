var canvas = document.getElementById("myCanvas");
var ctx = canvas.getContext("2d");
var turn = "";
var projectileX = 100;
var projectileY = 500;
var dx = 2;
var dy = -2;
var playerCannonAngle = -45;
var playerCannonPower = 0;
var computerCannonAngle = -135;
var computerCannonPower = 0;

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
    var current_angle = playerCannonAngle * -1;
    ctx.font = "16px Arial";
    ctx.fillStyle = "green";
    ctx.fillText("Player", 8, 20);
    ctx.fillText("Angle: " + current_angle, 8, 40);
    ctx.fillText("Power: 0%", 8, 60);
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
    ctx.fillStyle = "green";
    ctx.fillRect(0, 0, 50, 5);
    ctx.closePath();
    ctx.restore();
}

function drawComputer() {
    // otsikko
    var current_angle = computerCannonAngle + 180;
    ctx.font = "16px Arial";
    ctx.fillStyle = "red";
    ctx.fillText("Computer", 1110, 20);
    ctx.fillText("Angle: " + current_angle, 1110, 40);
    ctx.fillText("Power: 0%", 1110, 60);
    // runko
    ctx.beginPath();
    ctx.rect(1125, 550, 50, 25);
    ctx.fillStyle = "red";
    ctx.fill();
    ctx.closePath();
    // piippu
    ctx.save();
    ctx.beginPath();
    ctx.translate(1150, 555);
    ctx.rotate(computerCannonAngle * Math.PI / 180);
    ctx.fillStyle = "red";
    ctx.fillRect(0, 0, 50, 5);
    ctx.closePath();
    ctx.restore();
}

function draw() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    drawGround();
    drawPlayer();
    drawComputer();
    if (projectileX < 500) {
        drawPlayerProjectile(projectileX, projectileY);
        projectileX += dx;
        projectileY += dy;
    }
    else {
        clearInterval();
        projectileX = 100;
        projectileY = 500;
    }
    
    
}

function drawPlayerProjectile(x, y) {
    ctx.beginPath();
    ctx.strokeStyle = "black";
    ctx.lineWidth = 3;
    ctx.arc(x, y, 5, 0, Math.PI * 2, true);
    ctx.stroke();
    ctx.closePath();
}
function shootProjectile() {
    setInterval(draw, 10);
}