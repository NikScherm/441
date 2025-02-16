var backOfCard = "imgs/back.png";
var imageTags = [];
var actualImages = [];
var actualImagePath = ["imgs/blue.png", "imgs/darkBlue.png", "imgs/darkPurple.png", "imgs/green.png", "imgs/orange.png", "imgs/pink.png"];



/* For loop that will allow me to easily change the rest if I chose to increase the amount of cards. */
for (var i = 1; i <= 12; i++) {
    imageTags.push("image" + i);
}
console.log(imageTags); 

/*Each image will be face down and assigned by i */
for (var i = 0; i < imageTags.length; i++) {
    document.getElementById(imageTags[i]).src = backOfCard;
}




// Function to create the count array
function countArrayCreate(totalImages) {
    var matchSample = [];
    for (var i = 0; i < totalImages; i++) {
        matchSample.push(0);
    }
    return matchSample;
}

function flipImage(number) {
    document.getElementById(imageTags[number]).src = actualImages[number];
}

/* call the function on load */
randomizeImages();




/*---------------------------------------------------- */
function randomizeImages() {
    var totalImages = 6;
    var matchSample = countArrayCreate(totalImages);
    console.log(matchSample);

    for (var i = 0; i < 12; i++) {
        var randomNumber = Math.floor(Math.random() * actualImagePath.length);

        if (matchSample[randomNumber] < 2) {/*Should allow for images */
            actualImages.push(actualImagePath[randomNumber]);
            matchSample[randomNumber]++;
        } else {
            i--;
        }
    }
}


