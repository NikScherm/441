


var storyPage = 0; //for now I will use var
function rollDice(modifier) {
    let roll = Math.floor(Math.random() * 20) + 1;
    return roll + modifier;


}
//function updateDiceOnPage(){}

function option(optionNumber) {
    let textDiv = document.getElementById('text'); //gets the text div
    let buttonsDiv = document.getElementById('buttons'); //gets the story div
    let rollResult = 10;//declared variable for roll result



    //let storyDiv = document.querySelector('.story'); //querySelector for the CSS
    //I should make a success threshold variable and use that instead of pasting roll over and over.
    if (storyPage === 0) {
        textDiv.innerHTML = "";
        //storyDiv.innerHTML = "<p id='text'> </p>";

        if (optionNumber === 'one') {
        

            rollResult = rollDice(2);
            console.log(rollResult);
            if(rollResult>=10){
                textDiv.innerHTML = "The guard pockets it. He walks away.";
                buttonsDiv.innerHTML =
                    `
            <button class="buttons" onclick="option ('one:one')" > <b>[LOCKPICK]</b> <em> with sleight of hand you pick the lock with the scraps you find around you along the way </em></button>
            <button class="buttons" onclick="option ('one:two')" > <b>[STRENGTH]</b><em>You wait for the guard to be out of hearing range and try to bust down that door.</em></button>
            `;


            }else{textDiv.innerHTML = "The guard doesn't seem pleased. With no hesitation, he attempts to apprehend you.";
                buttonsDiv.innerHTML =
                    `
                        <button class="buttons" onclick="option ('one:onef')" > <b>[STRENGTH]</b><em>You prepare yourself to fight.</em></button>
                        <button class="buttons" onclick="option ('one:twof')" > <b>[STRENGTH]</b><em>You try your luck, you jump off of the rampart.</em></button>
            `;

            }
        } else if (optionNumber === 'two') {
            rollResult = rollDice(5);
            console.log(rollResult);

            if (rollResult >= 10) {
                textDiv.innerHTML = "The guard bought it. He begins jogging down the rampart.";
                buttonsDiv.innerHTML =
                    `
            <button class="buttons" onclick="option ('two:one')" > <b>[LOCKPICK]</b> <em> with sleight of hand you pick the lock with the scraps you find around you along the way </em></button>
            <button class="buttons" onclick="option ('two:two')" > <b>[PERSUASION]</b>You address the guard :"Hey air-head ! I didn't have time to equip myself, hand me the keys !"</button>
            <button class="buttons" onclick="option ('two:three')" > <b>[STRENGTH]</b><em>You wait for the guard to be out of hearing range and try to bust down that door.</em></button>
            `;

            }else{
                textDiv.innerHTML = "The guard may be sleepy but he's not stupid. He immediately sounds the alarm, you have no time to think, you have to get out of there";
                buttonsDiv.innerHTML =`<button class="buttons" onclick="option ('two:onef')" > <b>[STRENGTH]</b><em>Jump off of the rampart, hoping that you don't break anything.</em></button>`;
                
            }



        } else if (optionNumber === 'three') {
             rollResult = rollDice(-2);
            console.log(rollResult);

            if (rollResult >= 15) {
                textDiv.innerHTML = "A fight insues, you grapple his spear between your palms, and twist it out of his hands. You send the guard to bed once again with big knock on his helmet.";
                buttonsDiv.innerHTML =
                    `
            <button class="buttons" onclick="option ('three:one')" > <b>[LOCKPICK]</b> <em> with sleight of hand you pick the lock with the scraps you find around you along the way </em>.</button>
            <button class="buttons" onclick="option ('three:two')" > <b>[INVESTIGATE]</b><em> You search the guard, and find the corresponding key.</em></button>
            <button class="buttons" onclick="option ('three:three')" > <b>[STRENGTH]</b><em>You try to bust down that door.</em></button>
            `;

            } else {
                textDiv.innerHTML = "The guard knocks you unconcious, unlucky. You awake in your cell, the morning of your excecution.[refresh page for other options, or try your luck again.]";
                buttonsDiv.innerHTML = "";
            }



        }

        document.getElementById('diceResult').innerText = rollResult; // Update the text content to show the result

        storyPage++;

// ----------------------------------------------------
    } else if (storyPage === 1) {
        if (optionNumber === /*lockpick*/'one:one'||optionNumber === 'two:one'||optionNumber === 'three:one' ) {
             rollResult = rollDice(0);
            console.log(rollResult);
            if(rollResult>=10){
                textDiv.innerHTML = "You succesfully pick the lock: in the room you see your weapons, some rope, and you sense that your personal belongings may be inside that padlocked chest.";
                buttonsDiv.innerHTML =
                    `
            <button class="buttons" onclick="option ('one')" > <b>[LOCKPICK]</b> <em> with sleight of hand you pick the padlock with the scraps you find around you along the way </em></button>
            <button class="buttons" onclick="option ('two')" > <b>[STRENGTH]</b><em>You bust the lock with a helmet that is lying around.</em></button>
            `;


            }else{
                textDiv.innerHTML = "You were unsuccesful, you sense that there isn't much time left before they come looking.";
                buttonsDiv.innerHTML =
                    `
                        <button class="buttons" onclick="option ('three')" > <b>[STRENGTH]</b><em>Carefully climb down the wall</em></button>
                        <button class="buttons" onclick="option ('four')" > <b>[STRENGTH]</b><em>Bust the door down, make as much noise as possible.</em></button>
            `;

            
            }
            
        }else if(optionNumber ===/*strength*/ 'one:two' ||optionNumber === 'two:three'||optionNumber === 'three:three' ){
             rollResult = rollDice(-2);
            console.log(rollResult);
            if(rollResult>=10){
                textDiv.innerHTML = "You succesfully bust the door down: in the room you see your weapons, some rope, and you sense that your personal belongings may be inside that padlocked chest.";
                buttonsDiv.innerHTML =
                    `
            <button class="buttons" onclick="option ('one')" > <b>[LOCKPICK]</b> <em> with sleight of hand you pick the padlock with the scraps you find around you along the way </em></button>
            <button class="buttons" onclick="option ('two')" > <b>[STRENGTH]</b><em>You bust the lock with a helmet that is lying around.</em></button>
            `;

            }else {
                textDiv.innerHTML = "You were unsuccesful, you sense that there isn't much time left before they come looking";
                buttonsDiv.innerHTML =
                    `
                        <button class="buttons" onclick="option ('three')" > <b>[STRENGTH]</b><em>Carefully climb down the wall and flee.</em></button>
                        <button class="buttons" onclick="option ('four')" > <b>[STRENGTH]</b><em>Bust the door down, make as much noise as possible.</em></button>
            `;


            }
        }else if(optionNumber === 'two:onef'|| optionNumber === 'one:twof'/*jumpoff*/ ){
             rollResult = rollDice(-8);
            console.log(rollResult);
            if(rollResult>=10){
                textDiv.innerHTML = "By some miracle you do not break a bone in your body, you manage to run to the nearest treeline undetected, your belongings gone for good, you will have to start over...";
                buttonsDiv.innerHTML ="";

            }else {
                textDiv.innerHTML = "Your bones are broken, you awake in your cell in pain, on the morning of your execution.";
                buttonsDiv.innerHTML ="";}

                /*fight*/
            }else if(optionNumber === 'one:onef' ){
             rollResult = rollDice(-3);
            console.log(rollResult);
            if(rollResult>=10){
                textDiv.innerHTML = "You grapple the spear, and shove the guard off of the rampart. That was loud.";
                buttonsDiv.innerHTML =                       
                ` 
                <button class="buttons" onclick="option ('three')" > <b>[STRENGTH]</b><em>Carefully climb down the wall and flee.</em></button>
                <button class="buttons" onclick="option ('four')" > <b>[STRENGTH]</b><em>Bust the door down, make as much noise as possible.</em></button>
                
                `
                ;

            }else {
                textDiv.innerHTML = "The guard knocks you unconcious and you awake in your cell the next day, on the morning of your execution.";
                buttonsDiv.innerHTML ="";}


        }else if (optionNumber === /*situational. guaranteeed success*/'two:two' || optionNumber === 'three:two'){
            
            textDiv.innerHTML = "You succesfully enter the room: in the room you see your weapons, some rope, and you sense that your personal belongings may be inside that padlocked chest.";
                buttonsDiv.innerHTML =
                    `
                        <button class="buttons" onclick="option ('one')" > <b>[LOCKPICK]</b> <em> with sleight of hand you pick the padlock with the scraps you find around you along the way </em></button>
            <button class="buttons" onclick="option ('two')" > <b>[STRENGTH]</b><em>You bust the lock with a helmet that is lying around.</em></button>
            `;
        }
        document.getElementById('diceResult').innerText = rollResult; // Update the text content to show the result

        storyPage++;
    }


    // -----------------------------------------------------------
    else if (storyPage === 2) {


        if (optionNumber === 'one' || optionNumber === 'two'/*opens chest with belongins*/ ) {
             rollResult = rollDice(0);
            console.log(rollResult);
            if(rollResult>=10){
                textDiv.innerHTML = "You succesfully open the chest. You find all of your belongings, you grab the rope and climb down the wall. You have managed to escape and retrieve all of your belongings.";
                buttonsDiv.innerHTML =`
                <button class="buttons" onclick="option ('one')" ><b>Congratulations</b></button>`;
            }else {
                textDiv.innerHTML = "You couldn't open the chest. You feel as if there isn't much time, you still have your sword and your larger belongings, you grab the rope and you repel down the wall to freedom.";
                buttonsDiv.innerHTML ="";
            }
        }

        if (optionNumber === 'three' /*flee*/ ) {
             rollResult = rollDice(0);
            console.log(rollResult);
            if(rollResult>=10){
                textDiv.innerHTML = "You have managed to escape, albeit without all of your belongings...";
                buttonsDiv.innerHTML ="";
            }else {
                textDiv.innerHTML = "You were caught, it's the gallows for you.";
            }
        }
        if (optionNumber === 'four' /*hasty entry*/ ) {
             rollResult = rollDice(0);
            console.log(rollResult);
            if(rollResult>=10){
                textDiv.innerHTML = "You enter the room in a hurry, you only have a few moments before they come running...";
                buttonsDiv.innerHTML =`
                <button class="buttons" onclick="option ('two')" ><em>Pick up the rope and repel down the wall, to freedom.</em></button>
                <button class="buttons" onclick="option ('three')" ><em>Grab your sword and fight to the end... </em></button>


                `;
            }else {
                textDiv.innerHTML = "You couldn't open the door";

                buttonsDiv.innerHTML =`<button class="buttons" onclick="option ('two')" ><em>Pick up the rope and repel down the wall, to freedom.</em></button>`;

            }


        }
        document.getElementById('diceResult').innerText = rollResult; // Update the text content to show the result

        storyPage++;


    }
    else if (storyPage === 3) {
        if (optionNumber === 'one'){
            textDiv.innerHTML = "You have won.";
            buttonsDiv.innerHTML ="";
        }
        if (optionNumber === 'two'){
            textDiv.innerHTML = "You have your freedom atleast. But you did not leave with all of your belongings...";
            buttonsDiv.innerHTML ="";

            
        }
        if (optionNumber === 'three'){
             rollResult = rollDice(0);
            console.log(rollResult);
            if(rollResult==20){
                textDiv.innerHTML = "Despite all odds, you manage to power through all of the incoming guards, and after a long drawn out fight you have enough time to gather your things and escape.";
            }else{
                textDiv.innerHTML = "What did you expect ? At least they didn't take you alive..."
            }
            buttonsDiv.innerHTML ="";

            
        }


        document.getElementById('diceResult').innerText = rollResult; // Update the text content to show the result



    }

}

