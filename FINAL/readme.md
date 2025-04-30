https://nikscherm.github.io/441/FINAL

#Platformer puzzle game
I have decided to do a platformer
I will be building upon the work I did for HW13 where we used phaser.io lib

I cleaned it up by organizing it into scenes and creating objects to use within them
For this first push I have made 2 levels where the player can get to and from by interacting with it with the W or up arrow key


I will be using the assets I made previously
I plan on making it into a puzzle game where the player must push specific objects into certain locations.
I will also incorporate simple minigames within that the player must complete to unlock chests ect..

keybinds are AD or arrow keys for left and right, W for interacting with box space for jump, will make a control page thing in a title screen later on

#What has been done so far 
Objects now persist through levels and inventory with thanks to the inventoryStore,js, and GameState.js (pumpkins)
Basically, a pumpkin is given an id, and key, stored in Gamestate, when not in inventory, and Gamestate also tracks if the player has visited the scenes
for the first time, through the use of "initializedLevels: new Set()" -> "GameState.initializedLevels.add('levels');" Which should now allow me to add
puzzle elements that I can scatter through the scenes and the player can collect.

#to do 
- add spikes that player must patch with pumpkins death = gameover 
- create level layout
- add a see-saw
-
