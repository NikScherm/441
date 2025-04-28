import { Player } from '../GameObjects/Player.js';
import { BoundingBox } from '../GameObjects/BoundingBox.js';
//import { level2 } from '../scenes/level2.js';
const AssetKeys = {
    HOUSE: 'HOUSE',
    BACKGROUND: 'BACKGROUND',
    BACKGROUNDCOLOR: 'BACKGROUNDCOLOR'


}

export class Game extends Phaser.Scene {

    constructor() {
        super('Game');


    }

    create() {
        
        /*Dev mode that will allow me to quickly get to a scene without having to test interactions do levels ect ect...
        
         */

        this.input.keyboard.on('keydown-L', () => {
            console.log("going to lvl2");

            this.scene.start('Level2');
            
        });



        const { width, height } = this.scale;
        this.bg = this.add.tileSprite(500, 335, width, height, AssetKeys.HOUSE).setScale(1.12);
        //this.bg=this.add.tileSprite(0, 350,width,height, AssetKeys.BACKGROUNDCOLOR).setScale(2);


        //this.bg=this.add.tileSprite(0, 350,width,height, AssetKeys.BACKGROUND).setScale(2);

        //this.add.image(400, 270, 'house');


        this.boundingBox = new BoundingBox(this, 225, 550, 100, 100);

        this.platforms = this.physics.add.staticGroup();
        this.platforms.create(200, 600, 'ground').setAlpha(0).refreshBody();
        this.platforms.create(600, 600, 'ground').setAlpha(0).refreshBody();
        this.platforms.create(800, 600, 'ground').setAlpha(0).refreshBody();

        //==========================================






        this.player = new Player(this, 50, 450);
        this.player.setScale(0.7);
        this.physics.add.collider(this.player, this.platforms);
        this.cursors = this.input.keyboard.createCursorKeys();
        this.spaceBar = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE);
        /* WASD*/
        this.keyW = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.W);
        this.keyA = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.A);
        this.keyS = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.S);
        this.keyD = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.D);

this.add.text(width / 50, height / 6,  'A, D for left/right.\nW for interact.\nX & C for pickup/drop.', {
            fontSize: '32px',
            color: 'white'
        }).setOrigin(0);
    }

    interactWithBoundingBox() {
        console.log('Player interacted with the bounding box!');
        this.scene.start('Level2');
    }


    update(time) {
        this.player.move();

        if (this.boundingBox.isPlayerOverlapping(this.player) && Phaser.Input.Keyboard.JustDown(this.keyW)) {
            this.interactWithBoundingBox();
        }
    }


}
