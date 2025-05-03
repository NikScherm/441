import { Boot } from './scenes/Boot.js';

import { Level2 } from './scenes/Level2.js';
import { Level3 } from './scenes/Level3.js';

import { Game } from './scenes/Game.js';
import { House } from './scenes/House.js';
import { Menu } from './scenes/Menu.js';


import { GameOver } from './scenes/GameOver.js';
import { Preloader } from './scenes/Preloader.js';

const config = {
    type: Phaser.AUTO,
    width: 1000,
    height: 600,
    parent: 'game-container',
    backgroundColor: '#028af8',
    physics: {
        default: 'arcade',
        arcade: {
            debug: false,
            gravity: { y: 500 }
        }
    },
    scale: {
        mode: Phaser.Scale.FIT,
        autoCenter: Phaser.Scale.CENTER_BOTH
    },
    scene: [
        Boot,
        Preloader,
        Menu,
        Game,
        Level2,
        Level3,
        House,

        GameOver
    ]
};

new Phaser.Game(config);
