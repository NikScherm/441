import { Player } from '../GameObjects/Player.js';
import { BoundingBox } from '../GameObjects/BoundingBox.js';

const AssetKeys = {
    HOUSE: 'HOUSE',
    BACKGROUND: 'BACKGROUND',
    BACKGROUNDCOLOR: 'BACKGROUNDCOLOR'


}
export class Level2 extends Phaser.Scene {

    constructor() {
        super('Level2');
    }

    create() {
        const { width, height } = this.scale;

        this.add.text(width / 2, height / 2, 'The Underground', {
            fontSize: '32px',
            color: '#ffffff'
        }).setOrigin(0.5);



        this.bg = this.add.tileSprite(500, 335, width, height, AssetKeys.BACKGROUND).setScale(1.6);

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
        

        this.boundingBox = new BoundingBox(this, 225, 550, 100, 100);


    }

    interactWithBoundingBox() {
        console.log('Player interacted with the bounding box!');
        this.scene.start('Game');
    }

    update() {
        this.player.move();


        if (this.boundingBox.isPlayerOverlapping(this.player)&& Phaser.Input.Keyboard.JustDown(this.keyW)) {
        this.interactWithBoundingBox();
    }
    }
}
