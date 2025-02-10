/*n2s = note to self, usually something I'll change or remove in the future... sometimes a new function or syntax I learn about.*/

var storyPage = 0; //


//---=== start of stat allocation ===---
var totalPoints = 9;
var stats ={
 strength : 0,
 dexterity : 0,
 charisma : 0
}
var currentStat = 'strength'
//multiple actions have attributed to 3 main stats
const actionToStat = {
    'INVESTIGATE' :'dexterity',
    'LOCKPICK': 'dexterity', 
    'STRENGTH': 'strength', 
    'CHARISMA': 'charisma', 
    'INTIMIDATION': 'charisma', 
    'PERSUASION': 'charisma',
    'BRIBE':'charisma',
    

    // n2s : I'll add more stats to attribute to actions later
};

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
            promptText.innerText = `You have ${totalPoints} remaining points, please allocate points to charisma.`;
            statInput.value = totalPoints;
            break;
    }
}
function startStory() {
    console.log(`Strength: ${stats.strength}, Dexterity: ${stats.dexterity}, Charisma: ${stats.charisma}`);
    document.getElementById('totalPoints').innerText = 0; // Update points...
    document.getElementById('story').classList.remove('hidden'); // Show the initial HTML body story
    }
console.log("testing");
function submitStat() {
    let statInput = parseInt(document.getElementById('stat-input').value);

    if (statInput <= totalPoints && statInput >= 0) {
        totalPoints -= statInput;

        switch (currentStat) {
            case 'strength':
                stats.strength = statInput;
                currentStat = 'dexterity';
                break;
            case 'dexterity':
                stats.dexterity = statInput;
                currentStat = 'charisma';
                break;
            case 'charisma':
                stats.charisma = statInput;
                document.getElementById('stat-prompt').style.display = 'none';
                startStory();
                break;
        }

        updatePrompt();
    } else {
        alert("Invalid input. Please enter a valid number of points.");
    }
}


function rollDice(modifier) {
    let roll = Math.floor(Math.random() * 20) + 1;
    console.log(`Roll number without a modifier : ${roll}`);
    return roll + modifier;
}

function getButtons(...options) {//n2s : '...' in here allows the function to accept an indefinite number of arguments as an array.
    let buttonHTML = '';
    for (let i = 0; i < options.length; i += 3) {// n2s : keeps track of options parametres, loop counts 3 parametres at a time for each button essentially
        const buttonName = options[i];
        const action = options[i + 1];
        const description = options[i + 2];

        console.log(`Button Name: ${buttonName}, Action: ${action}, Description: ${description}`);
        buttonHTML += `
            <button class="buttons" onclick="option('${buttonName}', '${action}')">
            <b>[${action}]
            </b> ${description}
            </button>
        `;//n2s <em></em> tag will need to added manually after...
    }
    return buttonHTML;
    

}



//option to story function.
function option(optionNumber, action) {
    
    let textDiv = document.getElementById('text'); //gets the text div
    let buttonsDiv = document.getElementById('buttons'); //gets the story div
    let rollResult = 10;//declared intial variable for roll result 


// Log action and its corresponding stat
console.log(`Option selected: ${optionNumber}, Action: ${action}`);
    let statModifier = 0;
    //for reading action lbl.
    if (actionToStat[action]) {
        statModifier = stats[actionToStat[action]];  // Accesses stats user inputed earlier.
    } else {// n2s : for troubleshooting only, assigns value if no stat is defined for an action
        console.log(`No stat defined for action: ${action}. Defaulting to 0.`);
        statModifier = 0; 
    }
    rollResult = rollDice(statModifier);
    console.log(`Roll result with stat modifier (${action}): ${rollResult}`);
    console.log(action, statModifier);
    document.getElementById('story').classList.remove('hidden'); // Show the initial HTML body story

    switch (storyPage) {
        //---===Start of case 0 storyPage===---
        case 0:

            textDiv.innerHTML = `You've made it over the wall undetected, your belongings are just ahead. You rush toward the
            door to the lookout tower, only to be met by a lone guard leaving his post late.<br><em>*this was not the plan*</em> <br>
            "HALT! This area is restricted. State your business"<br><br><em>*You catch a drowsy undertone in his voice, slightly groggy. 
            He recently woke up.*</em>`;
            buttonsDiv.innerHTML = getButtons(
                'one', 'BRIBE', 'With sleight of hand, you make a coin appear out of nowhere and flick it in his direction.',
                'two', 'INTIMIDATION', 'The captain of the guard will have your head for sleeping on the job. The prisoner escaped to the north of this tower, I had to leave my barrack for this.',
                'three', 'STRENGTH', 'You raise your fists, trying your luck against the fully armored guard.'
            );

            document.getElementById('diceResult').innerText = rollResult; // Update the text content to show the result
            storyPage++;
            break;
        //---===End of case 0 storyPage===---

        case 1:
            textDiv.innerHTML = "";
            switch (optionNumber) {
                case 'one':
                    // potential redundant  // rollResult = rollDice(statModifier);
                    console.log(`Roll result with stat modifier (${action}): ${rollResult}`);

                    if (rollResult >= 10) {
                        textDiv.innerHTML = "The guard pockets it. He walks away.";
                        // Parse buttons using the new structure
                        buttonsDiv.innerHTML = getButtons(
                            'one', 'LOCKPICK', 'With sleight of hand, you pick the lock with the scraps you find around you along the way.',
                            'two', 'STRENGTH', 'You wait for the guard to be out of hearing range and try to bust down that door.'
                        );
                    } else {
                        textDiv.innerHTML = "The guard doesn't seem pleased. With no hesitation, he attempts to apprehend you.";
                        buttonsDiv.innerHTML = getButtons(
                            'three', 'STRENGTH', 'You prepare yourself to fight.',
                            'four', 'STRENGTH', 'You try your luck, you jump off of the rampart.'
                        );
                    }
                    break;

                case 'two':
                    // potential redundant  //rollResult = rollDice(5);
                    console.log(rollResult);

                    if (rollResult >= 10) {
                        textDiv.innerHTML = "The guard bought it. He begins jogging down the rampart.";
                        buttonsDiv.innerHTML = getButtons(
                            'five', 'LOCKPICK', 'With sleight of hand, you pick the lock with the scraps you find around you along the way.',
                            'six', 'PERSUASION', 'You address the guard: "Hey air-head! I didn’t have time to equip myself, hand me the keys!"',
                            'seven', 'STRENGTH', 'You wait for the guard to be out of hearing range and try to bust down that door.'
                        );
                    } else {
                        textDiv.innerHTML = "The guard may be sleepy but he's not stupid. He immediately sounds the alarm, you have no time to think, you have to get out of there.";
                        buttonsDiv.innerHTML = getButtons(
                            'eight', 'STRENGTH', 'Jump off of the rampart, hoping that you don\'t break anything.'
                        );
                    }
                    break;

                case 'three':
                    // potential redundant  //rollResult = rollDice(-2);
                    console.log(rollResult);

                    if (rollResult >= 15) {
                        textDiv.innerHTML = "A fight ensues, you grapple his spear between your palms, and twist it out of his hands. You send the guard to bed once again with a big knock on his helmet.";
                        buttonsDiv.innerHTML = getButtons(
                            'nine', 'LOCKPICK', 'With sleight of hand, you pick the lock with the scraps you find around you along the way.',
                            'ten', 'INVESTIGATE', 'You search the guard, and find the corresponding key.',
                            'eleven', 'STRENGTH', 'You try to bust down that door.'
                        );
                    } else {
                        textDiv.innerHTML = "The guard knocks you unconscious, unlucky. You awake in your cell, the morning of your execution. [Refresh page for other options, or try your luck again.]";
                        buttonsDiv.innerHTML = "";
                    }
                    break;
            }

            document.getElementById('diceResult').innerText = rollResult; // Update the text content to show the result
            storyPage++;
            break;

        //---===End of case 1 storyPage===---
        //---===Start of case 2 storyPage===---
        case 2:
            switch (optionNumber) {
                case 'one':
                case 'five':
                case 'nine': // Lockpick options
                    rollResult = rollDice(0);
                    console.log(rollResult);
                    if (rollResult >= 10) {
                        textDiv.innerHTML = "You successfully pick the lock: in the room you see your weapons, some rope, and you sense that your personal belongings may be inside that padlocked chest.";
                        buttonsDiv.innerHTML = getButtons(
                            'one', 'LOCKPICK', 'With sleight of hand, you pick the padlock with the scraps you find around you along the way.',
                            'two', 'STRENGTH', 'You bust the lock with a helmet that is lying around.'
                        );
                    } else {
                        textDiv.innerHTML = "You were unsuccessful, you sense that there isn't much time left before they come looking.";
                        buttonsDiv.innerHTML = getButtons(
                            'three', 'STRENGTH', 'Carefully climb down the wall.',
                            'four', 'STRENGTH', 'Bust the door down, make as much noise as possible.'
                        );
                    }
                    break;

                case 'two':
                case 'seven':
                case 'eleven': // Strength options
                    rollResult = rollDice(-2);
                    console.log(rollResult);
                    if (rollResult >= 10) {
                        textDiv.innerHTML = "You successfully bust the door down: in the room you see your weapons, some rope, and you sense that your personal belongings may be inside that padlocked chest.";
                        buttonsDiv.innerHTML = getButtons(
                            'one', 'LOCKPICK', 'With sleight of hand, you pick the padlock with the scraps you find around you along the way.',
                            'two', 'STRENGTH', 'You bust the lock with a helmet that is lying around.'
                        );
                    } else {
                        textDiv.innerHTML = "You were unsuccessful, you sense that there isn't much time left before they come looking.";
                        buttonsDiv.innerHTML = getButtons(
                            'three', 'STRENGTH', 'Carefully climb down the wall and flee.',
                            'four', 'STRENGTH', 'Bust the door down, make as much noise as possible.'
                        );
                    }
                    break;

                case 'eight':
                case 'four': // Jump off options
                    rollResult = rollDice(-8);
                    console.log(rollResult);
                    if (rollResult >= 10) {
                        textDiv.innerHTML = "By some miracle, you do not break a bone in your body, you manage to run to the nearest treeline undetected, your belongings gone for good, you will have to start over...";
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
                        buttonsDiv.innerHTML = getButtons(
                            'three', 'STRENGTH', 'Carefully climb down the wall and flee.',
                            'four', 'STRENGTH', 'Bust the door down, make as much noise as possible.'
                        );
                    } else {
                        textDiv.innerHTML = "The guard knocks you unconscious and you awake in your cell the next day, on the morning of your execution.";
                        buttonsDiv.innerHTML = "";
                    }
                    break;

                case 'six':
                case 'ten': // Situational guaranteed success
                    textDiv.innerHTML = "You successfully enter the room: in the room you see your weapons, some rope, and you sense that your personal belongings may be inside that padlocked chest.";
                    buttonsDiv.innerHTML = getButtons(
                        'one', 'LOCKPICK', 'With sleight of hand, you pick the padlock with the scraps you find around you along the way.',
                        'two', 'STRENGTH', 'You bust the lock with a helmet that is lying around.'
                    );
                    break;
            }

            document.getElementById('diceResult').innerText = rollResult; // Update the text content to show the result

            storyPage++;
            break;
        //---===End of case 2 storyPage===---
        //---===Start of case 3 storyPage===---
        case 3:
            switch (optionNumber) {
                case 'one':
                case 'two': // Opens chest with belongings
                    rollResult = rollDice(0);
                    console.log(rollResult);
                    if (rollResult >= 10) {
                        textDiv.innerHTML = "You successfully open the chest. You find all of your belongings, you grab the rope and climb down the wall. You have managed to escape and retrieve all of your belongings.";
                        buttonsDiv.innerHTML = getButtons(
                            'one', 'Congratulations', ''
                        );
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
                        buttonsDiv.innerHTML = "";
                    }
                    break;

                case 'four': // Hasty entry
                    rollResult = rollDice(0);
                    console.log(rollResult);
                    if (rollResult >= 10) {
                        textDiv.innerHTML = "You enter the room in a hurry, you only have a few moments before they come running...";
                        buttonsDiv.innerHTML = getButtons(
                            'two', 'Pick up the rope and repel down the wall, to freedom.', '',
                            'three', 'Grab your sword and fight to the end...', ''
                        );
                    } else {
                        textDiv.innerHTML = "You couldn't open the door.";
                        buttonsDiv.innerHTML = getButtons(
                            'two', 'Pick up the rope and repel down the wall, to freedom.', ''
                        );
                    }
                    break;
            }

            document.getElementById('diceResult').innerText = rollResult; // Update the text content to show the result

            storyPage++;
            break;
        //---===End of case 3 storyPage===---
        //---===Start of case 4 storyPage===---

        case 4:

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
    //---===End of case 4 storyPage===---


}


