var imageTags = [];
var actualImages = [];
var actualImagePath = ["imgs/blue.png", "imgs/darkBlue.png", "imgs/darkPurple.png", "imgs/green.png", "imgs/orange.png", "imgs/pink.png"];
///
var score = 0;
var f_attempts = 0;
var attempt = 0;
var allFound = 0;
///
var firstNumber = -1;
var secondNumber = -1;
///
var player = { "firstname": "", "lastname": "", "age": 0, "score": 0, "f_attempts": 0, "attempt": 0 }; //player stats
var backOfCard = "imgs/back.png";






/* For loop that will allow me to easily change the rest if I chose to increase the amount of cards. */
for (var i = 1; i <= 12; i++) {
    imageTags.push("image" + i);
}
console.log(imageTags);

function countArrayCreate(totalImages) {
    var matchSample = [];
    for (var i = 0; i < totalImages; i++) {
        matchSample.push(0);
    }
    return matchSample;
}

/*=== --- --- === */
// adds to the JSON
function addToPlayer() {
    var firstName = document.getElementById("txtFirstName").value;
    var lastName = document.getElementById("txtLastName").value;
    var age = document.getElementById("txtAge").value;

    console.log("First Name:", firstName);
    console.log("Last Name:", lastName);
    console.log("Age:", age);



    if (firstName && lastName && age) {
        var player = {
            firstname: firstName,
            lastname: lastName,
            age: age,
            score: 0,
            f_attempts: 0,
            attempt: 0
        };
        // player.firstname = firstName;
        // player.lastname = lastName;
        // player.age = age;
        localStorage.setItem("playerInfo", JSON.stringify(player));
        console.log("Saved to storage:", localStorage.getItem("playerInfo"));
        console.log(firstName, lastName, age);
        
        // window.location = "game.html";
        setTimeout(() => {
            window.location = "game.html";
        }, 2000);
    } else {
        alert("Fields not filled."); 
    }
}

// gets from JSON
function playerInfo() {
    var playerInformation = localStorage.getItem("playerInfo");
    player = JSON.parse(playerInformation);
    var str = "Name: " + player.firstname + " " + player.lastname + "<br>" +
        "Age: " + player.age + "<br>" +
        "Score: " + player.score + "<br>" +
        "Failed Attempts: " + player.f_attempts + "<br>" +
        "Total Attempts: " + player.attempt;
    console.log(" attemps print the number of atempts, it does not take into account the succesful attempts. Score counts everything and turns it into a score up to a max of 1000 if no failed attempts.")
    console.log("Player Data Loaded:", player);  // Add this log

    if (document.getElementById("endScore") != null) {

        document.getElementById("endScore").innerHTML = str;
    }
    console.log(player);

}


/*==================================================================== */
function flipImage(number) {


    // make the second image appear
    if (firstNumber >= 0) {
        secondNumber = number;
        document.getElementById(imageTags[number]).src = actualImages[secondNumber];

    }
    else if (firstNumber < 0) // make the first image appear
    {
        firstNumber = number;
        document.getElementById(imageTags[firstNumber]).src = actualImages[firstNumber];

    }

    // checks to see if images don't match
    if (actualImages[secondNumber] != actualImages[firstNumber] && firstNumber >= 0 && secondNumber >= 0) {
        f_attempts++;
        attempt++;
        score++;
        setTimeout(imagesDisappear, 500);
    }
    // checks to see if images match
    else if (actualImages[secondNumber] == actualImages[firstNumber] && firstNumber >= 0 && secondNumber >= 0) {
        score++;
        allFound++;
        attempt++;

        firstNumber = -1;
        secondNumber = -1;
        if (allFound == actualImages.length / 2) {
            var playerData = JSON.parse(localStorage.getItem("playerInfo")) || {};

            playerData.score = Math.floor((6 / score) * 1000); //n2s make variable for 6 based on nbr of cards. nbrcards/2
            playerData.f_attempts = f_attempts;
            playerData.attempt = attempt;

            localStorage.setItem("playerInfo", JSON.stringify(playerData));
            window.location = "scorepage.html";
        }
    }
}
window.onload = function () {
    for (var i = 0; i < imageTags.length; i++) {
        document.getElementById(imageTags[i]).src = backOfCard;
    }
    randomizeImages();
};

function imagesDisappear() {
    console.log(firstNumber);
    document.getElementById(imageTags[firstNumber]).src = backOfCard;
    document.getElementById(imageTags[secondNumber]).src = backOfCard;
    firstNumber = -1;
    secondNumber = -1;
}







//*************************************************** */






/*---=== Randomizing the images ===--- */
function randomizeImages() {
    var totalImages = 6;
    var matchSample = countArrayCreate(totalImages);
    actualImages = [];

    while (actualImages.length < 12) {
        var randomNumber = Math.floor(Math.random() * actualImagePath.length);
        if (matchSample[randomNumber] < 2) {
            actualImages.push(actualImagePath[randomNumber]);
            matchSample[randomNumber]++;
        }
    }
    //n2s randomize array.
    for (let i = actualImages.length - 1; i > 0; i--) {
        let j = Math.floor(Math.random() * (i + 1));
        [actualImages[i], actualImages[j]] = [actualImages[j], actualImages[i]];

    }
    console.log(actualImages);
}

