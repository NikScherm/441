var backOfCard = "imgs/back.png";
var imageTags = [];
var actualImages = [];
var actualImagePath = ["imgs/blue.png", "imgs/darkBlue.png", "imgs/darkPurple.png", "imgs/green.png", "imgs/orange.png", "imgs/pink.png"];



/* For loop that will allow me to easily change the rest if I chose to increase the amount of cards. */
for (var i = 1; i <= 12; i++) {
    imageTags.push("image" + i);
}
console.log(imageTags); 

window.onload = function () {
    for (var i = 0; i < imageTags.length; i++) {
        document.getElementById(imageTags[i]).src = backOfCard;
    }
    randomizeImages(); // Ensures images are randomized after the page loads
};
/* Corrected by GenAI, but I would like to also point out that the code runs fine without .onload*/
// /*Each image will be face down and assigned by i */
// for (var i = 0; i < imageTags.length; i++) {
//     document.getElementById(imageTags[i]).src = backOfCard;
// }




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

/* calls the function on load */
randomizeImages();




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

    //randomizes/shuffles the array
    for (let i = actualImages.length - 1; i > 0; i--) {
        //n2s : it shuffles from the end of the array, and switches it with the element of index j
        //for example, j=2, then it'll switch last number currently in the loop (i) and then decrement i, and then repeat.
        //I learned that this function is the fischer-yates shuffling algorithm.
        let j = Math.floor(Math.random() * (i + 1));
        [actualImages[i], actualImages[j]] = [actualImages[j], actualImages[i]];
 
    }
    console.log(actualImages);
}
/* Function doesn't fully randomize images, or at least it doesn't feel fully random because of how often I see adjacent mathching cards. 
*/
// function randomizeImages() { 
//     var totalImages = 6;
//     var matchSample = countArrayCreate(totalImages);
//     console.log(matchSample);

//     for (var i = 0; i < 12; i++) {
//         var randomNumber = Math.floor(Math.random() * actualImagePath.length);

//         if (matchSample[randomNumber] < 2) {/*Should allow for images */
//             actualImages.push(actualImagePath[randomNumber]);
//             matchSample[randomNumber]++;
//         } else {
//             i--;
//         }
//     }
// }


