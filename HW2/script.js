

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

console.log("1. artist 1");
console.log("2. artist 2");
console.log("3. artist 3");

// Prints the answer to the question that pops up in console by using favoriteColor variable to store user input then uses that input to display in console log.
//note to self ` instead of ",'
const favoriteColor = prompt("What is your favorite color?");
console.log(`Your favorite color is ${favoriteColor}`)
document.body.style.backgroundColor = favoriteColor;
console.log(`background should now be : ${favoriteColor}`);
console.log("if no color was answered then the default color of background will be : rgb(128, 187, 184)")