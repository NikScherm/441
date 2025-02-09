var storyPage = 0; //for now I will use var
function rollDice(modifier) {
    let roll = Math.floor(Math.random() * 20) + 1;
    return roll + modifier;
}

//---=== start of stat allocation ===---
var totalPoints = 9;
var strength = 0;
var dexterity = 0;
var charisma = 0;
var currentStat = 'strength'

function updatePrompt() {
    let promptText = document.getElementById('prompt-text');
    let statInput = document.getElementById('stat-input');
    
    switch (currentStat) {
        case 'strength':
            promptText.innerText = `You have ${totalPoints} points to allocate however you wish in strength, dexterity, and charisma: \nPlease start by allocating your desired points to strength:`;
            statInput.max = totalPoints;
            break;
        case 'dexterity':
            promptText.innerText = `You have ${totalPoints} remaining points, please allocate points to dexterity:`;
            statInput.max = totalPoints;
            break;
        case 'charisma':
            promptText.innerText = `The remaining ${totalPoints} points will be allocated to charisma.`;
            statInput.value = totalPoints;
            statInput.disabled = true;
            break;
    }
}
function submitStat() {
    let statInput = parseInt(document.getElementById('stat-input').value);
    
    if (statInput <= totalPoints && statInput >= 0) {
        totalPoints -= statInput;
        
        switch (currentStat) {
            case 'strength':
                strength = statInput;
                currentStat = 'dexterity';
                break;
            case 'dexterity':
                dexterity = statInput;
                currentStat = 'charisma';
                break;
            case 'charisma':
                charisma = totalPoints;
                document.getElementById('stat-prompt').style.display = 'none';
                startStory();
                break;
        }
        
        updatePrompt();
    } else {
        alert("Invalid input. Please enter a valid number of points.");
    }
}
function startStory() {
    console.log(`Strength: ${strength}, Dexterity: ${dexterity}, Charisma: ${charisma}`); //interesting that it logs char as 0... will need to check that later.
    document.getElementById('totalPoints').innerText = 0; // Updates points...
    document.getElementById('story').classList.remove('hidden'); //unhides the initial html bdoy story
    
}
//=== end of stat allocation ===

//options
function option(optionNumber) {
    let textDiv = document.getElementById('text'); //gets the text div
    let buttonsDiv = document.getElementById('buttons'); //gets the story div
    let rollResult = 10;//declared variable for roll result

    //let storyDiv = document.querySelector('.story'); //querySelector for the CSS
    //I should make a success threshold variable and use that instead of pasting roll over and over.

    //replaced outer if statement with switch rather than elifs all over the place
    switch(storyPage){
        case 0 :
            textDiv.innerHTML = "";
        switch (optionNumber) {
            case 'one':
                rollResult = rollDice(2);
                console.log(rollResult);
                if (rollResult >= 10) {

                    textDiv.innerHTML = "The guard pockets it. He walks away.";
                    buttonsDiv.innerHTML =
                        `
            <button class="buttons" onclick="option ('one')" > <b>[LOCKPICK]</b> <em> with sleight of hand you pick the lock with the scraps you find around you along the way </em></button>
            <button class="buttons" onclick="option ('two')" > <b>[STRENGTH]</b><em>You wait for the guard to be out of hearing range and try to bust down that door.</em></button>
            `;


                } else {
                    textDiv.innerHTML = "The guard doesn't seem pleased. With no hesitation, he attempts to apprehend you.";
                    buttonsDiv.innerHTML =
                        `
                        <button class="buttons" onclick="option ('three')" > <b>[STRENGTH]</b><em>You prepare yourself to fight.</em></button>
                        <button class="buttons" onclick="option ('four')" > <b>[STRENGTH]</b><em>You try your luck, you jump off of the rampart.</em></button>
            `;

                }
                break;

            case 'two':
                rollResult = rollDice(5);
                console.log(rollResult);

                if (rollResult >= 10) {
                    textDiv.innerHTML = "The guard bought it. He begins jogging down the rampart.";
                    buttonsDiv.innerHTML =
                        `
            <button class="buttons" onclick="option ('five')" > <b>[LOCKPICK]</b> <em> with sleight of hand you pick the lock with the scraps you find around you along the way </em></button>
            <button class="buttons" onclick="option ('six')" > <b>[PERSUASION]</b>You address the guard :"Hey air-head ! I didn't have time to equip myself, hand me the keys !"</button>
            <button class="buttons" onclick="option ('seven')" > <b>[STRENGTH]</b><em>You wait for the guard to be out of hearing range and try to bust down that door.</em></button>
            `;

                } else {
                    textDiv.innerHTML = "The guard may be sleepy but he's not stupid. He immediately sounds the alarm, you have no time to think, you have to get out of there";
                    buttonsDiv.innerHTML = `<button class="buttons" onclick="option ('eight')" > <b>[STRENGTH]</b><em>Jump off of the rampart, hoping that you don't break anything.</em></button>`;

                }
                break;

            case 'three':
                rollResult = rollDice(-2);
                console.log(rollResult);

                if (rollResult >= 15) {
                    textDiv.innerHTML = "A fight insues, you grapple his spear between your palms, and twist it out of his hands. You send the guard to bed once again with big knock on his helmet.";
                    buttonsDiv.innerHTML =
                        `
            <button class="buttons" onclick="option ('nine')" > <b>[LOCKPICK]</b> <em> with sleight of hand you pick the lock with the scraps you find around you along the way </em>.</button>
            <button class="buttons" onclick="option ('ten')" > <b>[INVESTIGATE]</b><em> You search the guard, and find the corresponding key.</em></button>
            <button class="buttons" onclick="option ('eleven')" > <b>[STRENGTH]</b><em>You try to bust down that door.</em></button>
            `;

                } else {
                    textDiv.innerHTML = "The guard knocks you unconcious, unlucky. You awake in your cell, the morning of your excecution.[refresh page for other options, or try your luck again.]";
                    buttonsDiv.innerHTML = "";
                }
                break;

        }

        document.getElementById('diceResult').innerText = rollResult; // Update the text content to show the result
        storyPage++;
        break;
        //---===End of case 0 storyPage===---

        case 1 :
            switch (optionNumber) {
                case 'one':
                case 'five':
                case 'nine': // Lockpick options
                    rollResult = rollDice(0);
                    console.log(rollResult);
                    if (rollResult >= 10) {
                        textDiv.innerHTML = "You successfully pick the lock: in the room you see your weapons, some rope, and you sense that your personal belongings may be inside that padlocked chest.";
                        buttonsDiv.innerHTML = `
                            <button class="buttons" onclick="option ('one')"> <b>[LOCKPICK]</b> <em> with sleight of hand you pick the padlock with the scraps you find around you along the way </em></button>
                            <button class="buttons" onclick="option ('two')"> <b>[STRENGTH]</b><em>You bust the lock with a helmet that is lying around.</em></button>
                        `;
                    } else {
                        textDiv.innerHTML = "You were unsuccessful, you sense that there isn't much time left before they come looking.";
                        buttonsDiv.innerHTML = `
                            <button class="buttons" onclick="option ('three')"> <b>[STRENGTH]</b><em>Carefully climb down the wall</em></button>
                            <button class="buttons" onclick="option ('four')"> <b>[STRENGTH]</b><em>Bust the door down, make as much noise as possible.</em></button>
                        `;
                    }
                    break;
            
                case 'two':
                case 'seven':
                case 'eleven': // Strength options
                    rollResult = rollDice(-2);
                    console.log(rollResult);
                    if (rollResult >= 10) {
                        textDiv.innerHTML = "You successfully bust the door down: in the room you see your weapons, some rope, and you sense that your personal belongings may be inside that padlocked chest.";
                        buttonsDiv.innerHTML = `
                            <button class="buttons" onclick="option ('one')"> <b>[LOCKPICK]</b> <em> with sleight of hand you pick the padlock with the scraps you find around you along the way </em></button>
                            <button class="buttons" onclick="option ('two')"> <b>[STRENGTH]</b><em>You bust the lock with a helmet that is lying around.</em></button>
                        `;
                    } else {
                        textDiv.innerHTML = "You were unsuccessful, you sense that there isn't much time left before they come looking.";
                        buttonsDiv.innerHTML = `
                            <button class="buttons" onclick="option ('three')"> <b>[STRENGTH]</b><em>Carefully climb down the wall and flee.</em></button>
                            <button class="buttons" onclick="option ('four')"> <b>[STRENGTH]</b><em>Bust the door down, make as much noise as possible.</em></button>
                        `;
                    }
                    break;
            
                case 'eight':
                case 'four': // Jump off options
                    rollResult = rollDice(-8);
                    console.log(rollResult);
                    if (rollResult >= 10) {
                        textDiv.innerHTML = "By some miracle you do not break a bone in your body, you manage to run to the nearest treeline undetected, your belongings gone for good, you will have to start over...";
                        buttonsDiv.innerHTML = "";
                    } else {
                        textDiv.innerHTML = "Your bones are broken, you awake in your cell in pain, on the morning of your execution.";
                        buttonsDiv.innerHTML = "";
                    }
                    break;
            
                case 'three': // Fight option
                    rollResult = rollDice(-3);
                    console.log(rollResult);
                    if (rollResult >= 10) {
                        textDiv.innerHTML = "You grapple the spear, and shove the guard off of the rampart. That was loud.";
                        buttonsDiv.innerHTML = `
                            <button class="buttons" onclick="option ('three')"> <b>[STRENGTH]</b><em>Carefully climb down the wall and flee.</em></button>
                            <button class="buttons" onclick="option ('four')"> <b>[STRENGTH]</b><em>Bust the door down, make as much noise as possible.</em></button>
                        `;
                    } else {
                        textDiv.innerHTML = "The guard knocks you unconscious and you awake in your cell the next day, on the morning of your execution.";
                        buttonsDiv.innerHTML = "";
                    }
                    break;
            
                case 'six':
                case 'ten': // Situational guaranteed success
                    textDiv.innerHTML = "You successfully enter the room: in the room you see your weapons, some rope, and you sense that your personal belongings may be inside that padlocked chest.";
                    buttonsDiv.innerHTML = `
                        <button class="buttons" onclick="option ('one')"> <b>[LOCKPICK]</b> <em> with sleight of hand you pick the padlock with the scraps you find around you along the way </em></button>
                        <button class="buttons" onclick="option ('two')"> <b>[STRENGTH]</b><em>You bust the lock with a helmet that is lying around.</em></button>
                    `;
                    break;
            }
            
            document.getElementById('diceResult').innerText = rollResult; // Update the text content to show the result
            
            storyPage++;
            break;
        case 2 :
            switch (optionNumber) {
                case 'one':
                case 'two': // Opens chest with belongings
                    rollResult = rollDice(0);
                    console.log(rollResult);
                    if (rollResult >= 10) {
                        textDiv.innerHTML = "You successfully open the chest. You find all of your belongings, you grab the rope and climb down the wall. You have managed to escape and retrieve all of your belongings.";
                        buttonsDiv.innerHTML = `<button class="buttons" onclick="option ('one')" ><b>Congratulations</b></button>`;
                    } else {
                        textDiv.innerHTML = "You couldn't open the chest. You feel as if there isn't much time, you still have your sword and your larger belongings, you grab the rope and you repel down the wall to freedom.";
                        buttonsDiv.innerHTML = "";
                    }
                    break;
                
                case 'three': // Flee
                    rollResult = rollDice(0);
                    console.log(rollResult);
                    if (rollResult >= 10) {
                        textDiv.innerHTML = "You have managed to escape, albeit without all of your belongings...";
                        buttonsDiv.innerHTML = "";
                    } else {
                        textDiv.innerHTML = "You were caught, it's the gallows for you.";
                    }
                    break;
                
                case 'four': // Hasty entry
                    rollResult = rollDice(0);
                    console.log(rollResult);
                    if (rollResult >= 10) {
                        textDiv.innerHTML = "You enter the room in a hurry, you only have a few moments before they come running...";
                        buttonsDiv.innerHTML = `
                            <button class="buttons" onclick="option ('two')" ><em>Pick up the rope and repel down the wall, to freedom.</em></button>
                            <button class="buttons" onclick="option ('three')" ><em>Grab your sword and fight to the end... </em></button>
                        `;
                    } else {
                        textDiv.innerHTML = "You couldn't open the door";
                        buttonsDiv.innerHTML = `<button class="buttons" onclick="option ('two')" ><em>Pick up the rope and repel down the wall, to freedom.</em></button>`;
                    }
                    break;
            }
            
            document.getElementById('diceResult').innerText = rollResult; // Update the text content to show the result
            
            storyPage++;
            break;
        case 3 :
            switch (optionNumber) {
    case 'one':
        textDiv.innerHTML = "You have won.";
        buttonsDiv.innerHTML = "";
        break;
    
    case 'two':
        textDiv.innerHTML = "You have your freedom at least. But you did not leave with all of your belongings...";
        buttonsDiv.innerHTML = "";
        break;
    
    case 'three':
        rollResult = rollDice(0);
        console.log(rollResult);
        if (rollResult == 20) {
            textDiv.innerHTML = "Despite all odds, you manage to power through all of the incoming guards, and after a long drawn out fight you have enough time to gather your things and escape.";
        } else {
            textDiv.innerHTML = "What did you expect? At least they didn't take you alive...";
        }
        buttonsDiv.innerHTML = "";
        break;
}

document.getElementById('diceResult').innerText = rollResult; // Update the text content to show the result

        break;
        }
       
    }


