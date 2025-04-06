var bonkSound = new Audio("sound/bonk.mp3");

var canvas = document.getElementById("main");
var ctx = canvas.getContext("2d");
var x = 50;
var y = 50;
var square1;
var greenSquares = []; // Array for moving green squares
var extraSquares = []; // Additional squares appearing over time
var obstacles = []; /*added into a json, less clutter */
var collectibles = []; /*Addded collectibles, they give more points than green and aren't randomly generated, they come from json */

var score = 0;
var timeLeft = 60;
var timerInterval;
var gameOver = false;


createSquares();
drawSquare();

function startTimer() {
    timerInterval = setInterval(function () {
        timeLeft--;
        document.getElementById("timer").innerText = timeLeft;

        if (timeLeft <= 0) {
            clearInterval(timerInterval);
            endGame();
        }
    }, 1000);
}

function endGame() {
    gameOver = true;
    alert("Game Over! Your final score: " + score);
    location.reload();
}

/*-=starts game with timer =-*/
document.getElementById("playMusic").addEventListener("click", function () {
    var bgm = document.getElementById("bgm");
    var gameContainer = document.getElementById("gameContainer");

    bgm.play().catch(error => console.log("Playback failed:", error));
    gameContainer.style.display = "block";
    this.style.display = "none";
    startTimer();
});

setInterval(moveGreenSquares, 5000);


function createSquares() {
    square1 = new Square(x, y, 20, 20, "blue");

    for (let i = 0; i < 2; i++) {
        greenSquares.push(new Square(
            Math.random() * (canvas.width - 50),
            Math.random() * (canvas.height - 50),
            50,
            50,
            "green"
        ));
    }

    setInterval(spawnExtraSquare, 7000);
}
/*-= Obstacles =- */
$.getJSON("data/obstacles.json", function (data) {
    data.obstacles.forEach(obj => {
        let obstacle = new Square(obj.x, obj.y, obj.width, obj.height, obj.color);
        obstacles.push(obstacle);
    });
    drawSquare();
});
/*-= Special collectibles =- */
$.getJSON("data/collectibles.json", function (data) {
    data.collectibles.forEach(obj => {
        let item = new Square(obj.x, obj.y, obj.width, obj.height, obj.color);
        collectibles.push(item);
    });
    drawSquare();
});



/*-= teleports greensquares randomly=-*/

function moveGreenSquares() {
    greenSquares.forEach(square => {
        square.setX(Math.floor(Math.random() * (canvas.width - square.theWidth)));
        square.setY(Math.floor(Math.random() * (canvas.height - square.theHeight)));
    });
    drawSquare();
}

/* =-Spawns extra red squares at intervals=-*/
function spawnExtraSquare() {
    if (extraSquares.length < 5) { // max of 5 squares
        let redSquare = new Square(
            Math.random() * (canvas.width - 40),
            Math.random() * (canvas.height - 40),
            40,
            40,
            "red"
        );
        redSquare.originalX = redSquare.theX;
        redSquare.originalY = redSquare.theY;
        extraSquares.push(redSquare);
        moveRedSquareAtRandomInterval(redSquare);
    }
}

/*Randomly moves red squares at timed interval in random increments*/
function moveRedSquareAtRandomInterval(square) {
    setInterval(function () {
        let randomDirection = Math.floor(Math.random() * 4); // Random direction (0-3)
        let distance = Math.floor(Math.random() * 20) - 10; // Random distance (-10 to 10)

        /*movement of red squares in random directions*/

        switch (randomDirection) {
            case 0: // Move right
                square.setX(square.theX + distance);
                break;
            case 1: // Move left
                square.setX(square.theX - distance);
                break;
            case 2: // Move down
                square.setY(square.theY + distance);
                break;
            case 3: // Move up
                square.setY(square.theY - distance);
                break;
        }

        /*spawned square stay in box*/

        if (square.theX < 0) square.setX(0);
        if (square.theX + square.theWidth > canvas.width) square.setX(canvas.width - square.theWidth);
        if (square.theY < 0) square.setY(0);
        if (square.theY + square.theHeight > canvas.height) square.setY(canvas.height - square.theHeight);
        drawSquare();
    }, Math.floor(Math.random() * 4000) + 1000);
}

/* -=Respawns squares =-*/
function drawSquare() {
    ctx.clearRect(0, 0, 800, 600);

    ctx.fillStyle = square1.theColor;
    ctx.fillRect(square1.theX, square1.theY, square1.theWidth, square1.theHeight);

    greenSquares.forEach(square => {
        ctx.fillStyle = square.theColor;
        ctx.fillRect(square.theX, square.theY, square.theWidth, square.theHeight);
    });

    extraSquares.forEach(square => {
        ctx.fillStyle = square.theColor;
        ctx.fillRect(square.theX, square.theY, square.theWidth, square.theHeight);
    });
    
    /*added obstacles to draw square */
    obstacles.forEach(square => {
        ctx.fillStyle = square.theColor;
        ctx.fillRect(square.theX, square.theY, square.theWidth, square.theHeight);
    });
    collectibles.forEach(square => {
        ctx.fillStyle = square.theColor;
        ctx.fillRect(square.theX, square.theY, square.theWidth, square.theHeight);
    });
}
/*================= MOVEMENT & COLLISION ================== */
$(document).ready(function () {
    $(this).keypress(function (event) {
        if (!gameOver) getKey(event); // Only allow input if the game is not over
    });


}); function getKey(event) {
    var char = event.which || event.keyCode;

    /*
    Handle Movement in char (WASD + Arrow Keys)
    */
    if (char === 87 || char === 38) { // W or Up Arrow
        moveUp();
    }
    else if (char === 83 || char === 40) { // S or Down Arrow
        moveDown();
    }
    else if (char === 68 || char === 39) { // D or Right Arrow
        moveRight();
    }
    else if (char === 65 || char === 37) { // A or Left Arrow
        moveLeft();
    }

    /*gren square collisions */
    greenSquares.forEach(square => {
        if (hasCollided(square1, square)) {
            bonkSound.play();
            score++;
            document.getElementById("score").innerText = score;
            moveGreenSquares();
        }
    });


    extraSquares.forEach(square => {
        if (hasCollided(square1, square)) {
            endGame();
        }
    });

    obstacles.forEach(square => {
        if (hasCollided(square1, square)) {
            bonkSound.play();
            if (char === 87 || char === 38) moveDown(); // W or Up Arrow
            if (char === 83 || char === 40) moveUp(); // S or Down Arrow
            if (char === 65 || char === 37) moveRight(); // A or Left Arrow
            if (char === 68 || char === 39) moveLeft(); // D or Right Arrow
        }
    });

    for (let i = collectibles.length - 1; i >= 0; i--) {
        if (hasCollided(square1, collectibles[i])) {
            bonkSound.play();
            score += 5; // Adds extra points for yellow collectibles
            document.getElementById("score").innerText = score;
            collectibles.splice(i, 1);
        }
    }

    // Redraw the updated game state
    drawSquare();
}

$(document).ready(function () {
    $(document).keydown(function (event) {
        if (!gameOver) getKey(event); 
    });
});

/*Movement functions ensuring the player doesn't leave the box*/
function moveUp() {
    if (square1.theY > 0) square1.setY(square1.theY - 10);
}
function moveDown() {
    if (square1.theY + square1.theHeight < canvas.height) square1.setY(square1.theY + 10);
}
function moveLeft() {
    if (square1.theX > 0) square1.setX(square1.theX - 10);
}
function moveRight() {
    if (square1.theX + square1.theWidth < canvas.width) square1.setX(square1.theX + 10);
}

// Collision detection function
function hasCollided(object1, object2) {
    return !(object1.theY + object1.theHeight < object2.theY ||
        object1.theY > object2.theY + object2.theHeight ||
        object1.theX + object1.theWidth < object2.theX ||
        object1.theX > object2.theX + object2.theWidth);
}

