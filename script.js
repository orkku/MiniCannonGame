var canvas = document.getElementById("myCanvas");
var ctx = canvas.getContext("2d");
var turn = "";
var projectileX = 50;
var projectileY = 550;
var playerCannonAngle = -45;
var playerCannonPower = 100;
var computerCannonAngle = -135;
var computerCannonPower = 100;
var myInterval;
var powerX = 90;
var powerY = 0;
var time = 0;

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
    ctx.fillText("Power: " + playerCannonPower, 8, 60);
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
    ctx.fillText("Power: " + computerCannonPower, 1110, 60);
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
    if (turn == "Player") {
        time += 0.001;
        projectileX = 50 + (powerX + playerCannonAngle) * playerCannonPower * time * Math.cosh(playerCannonAngle * Math.PI / 180);
        projectileY = 550 - (powerY + playerCannonAngle * -1) * playerCannonPower * time * Math.cosh(playerCannonAngle * Math.PI / 180);
        if (projectileX < 1190) {
            drawPlayerProjectile(projectileX, projectileY);
            powerX += 0.1;
            powerY += -0.1;
        }
        else {
            clearInterval(myInterval);
            projectileX = 50;
            projectileY = 550;
            time = 0;
        }
    }
    else if (turn == "Computer") {
        if (projectileX > 500) {
            drawPlayerProjectile(projectileX, projectileY);
            projectileX += computerX;
            projectileY += computerY;
        }
        else {
            clearInterval(myInterval);
            projectileX = 1100;
            projectileY = 500;
        }
    }
}

function drawPlayerProjectile(x, y) {
    ctx.beginPath();
    ctx.strokeStyle = "black";
    ctx.lineWidth = 3;
    ctx.arc(x, y, 2, 0, Math.PI * 2, true);
    ctx.stroke();
    ctx.closePath();
}

function drawComputerProjectile(x, y) {
    ctx.beginPath();
    ctx.strokeStyle = "black";
    ctx.lineWidth = 3;
    ctx.arc(x, y, 3, 0, Math.PI * 2, true);
    ctx.stroke();
    ctx.closePath();
}

function shootProjectile() {
    myInterval = setInterval(draw, 10);
    if (turn == "Player") {
        document.getElementById("angle_button1").disabled = true;
        document.getElementById("angle_button2").disabled = true;
        document.getElementById("power_button1").disabled = true;
        document.getElementById("power_button2").disabled = true;
        document.getElementById("shoot_button1").disabled = true;
    }
    else if (turn == "Computer") {
        document.getElementById("angle_button1").disabled = false;
        document.getElementById("angle_button2").disabled = false;
        document.getElementById("power_button1").disabled = false;
        document.getElementById("power_button2").disabled = false;
        document.getElementById("shoot_button1").disabled = false;
    }
}

function playerAngle(a) {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    playerCannonAngle += a;
    if (playerCannonAngle < -90) {
        playerCannonAngle = -90;
    }
    else if (playerCannonAngle > 0) {
        playerCannonAngle = 0;
    }
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    drawGround();
    drawPlayer();
    drawComputer();
}

function computerAngle() {
    var a = Math.floor(Math.random() * 91);
    computerCannonAngle = 180 - a;
}

function playerPower(p) {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    playerCannonPower += p;
    if (playerCannonPower > 100) {
        playerCannonPower = 100;
    }
    else if (playerCannonPower < 1) {
        playerCannonPower = 1;
    }
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    drawGround();
    drawPlayer();
    drawComputer();
}