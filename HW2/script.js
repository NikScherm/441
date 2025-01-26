

console.log("test");


// Prints to console : 3 of my favorite websites
console.log("Here are 3 of my favorite websites:");
console.log("1. X.com");
console.log("2. Youtube.com");
console.log("3. Pinterest.com");

// Prints to console : 3 of my favorite games
console.log("Here are 3 of my favorite games:");
console.log("1. OverWatch");
console.log("2. Minecraft");
console.log("3. The finals");

//prints to console : 3 of my favorite artists and their cultural importance.
console.log("Here are 3 of my favorite artists and their cultural importance:");

console.log("1. Craig Mullins, is known as the father of Digital Art. This has become industry standard and this method of artwork has added to many cultures including our own.");
console.log("2. abbott thayer, is known as the father of camouflage. Which is now used within warfare, hunting, and documenting animals.");
console.log("3. leonardo da vinci, who is known for mona lisa,  his actual discoveries for medical science has helped us understand human body and in turn saving many people by his discoveries");

// Prints the answer to the question that pops up in console by using favoriteColor variable to store user input then uses that input to display in console log.
//note to self ` instead of ",'
const favoriteColor = prompt("What is your favorite color?");
console.log(`Your favorite color is ${favoriteColor}`)
document.body.style.backgroundColor = favoriteColor;
console.log(`background should now be : ${favoriteColor}`);
console.log("if no color was answered then the default color of background will be : rgb(128, 187, 184)")