import { Player } from '../GameObjects/Player.js';
import { BoundingBox } from '../GameObjects/BoundingBox.js';
import { PlaceableObject } from '../GameObjects/PlaceableObject.js';

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
        this.bg = this.add.tileSprite(0, -225, 2000, height, AssetKeys.BACKGROUND).setOrigin(0, 0).setScale(2);

        //this.bg = this.add.tileSprite(500, 335, width, height, AssetKeys.BACKGROUND).setScale(1.6);

        this.platforms = this.physics.add.staticGroup();




/*OBJECTS */
        this.placeableObject = [];
        const pumpkin = new PlaceableObject(this, 150, 450, 'pumpkin', 'pumpkin');
        pumpkin.setScale(1);
        this.placeableObject.push(pumpkin);
        this.physics.add.collider(pumpkin, this.platforms);

        this.physics.add.collider(this.placeableObject, this.platforms);
/*PLAYER */
        this.player = new Player(this, 50, 450);
        this.player.setScale(0.7);
        this.physics.add.collider(this.player, this.platforms);

        this.physics.add.collider(this.player, this.placeableObject);





        this.add.text(200, height / 2, 'The Underground', {
            fontSize: '32px',
            color: '#ffffff'
        }).setOrigin(0.5);

        for (let x = 0; x <= 2000; x += 200) {
    this.platforms.create(x, 600, 'ground').setAlpha(1).refreshBody();
}
/*CAMERA */
        this.cameras.main.startFollow(this.player, true);  
        this.cameras.main.setBounds(0, 0, 2000, 600); 


        this.cursors = this.input.keyboard.createCursorKeys();
        this.spaceBar = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE);
        /* WASD*/
        this.keyW = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.W);
        this.keyA = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.A);
        this.keyS = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.S);
        this.keyD = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.D);
        this.keyX = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.X);
        this.keyC = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.C);

        this.boundingBox = new BoundingBox(this, 225, 550, 100, 100);


    }

    interactWithBoundingBox() {
        console.log('Player interacted with the green box');
        this.scene.start('Game');
    }

    update() {
        this.player.move();
        this.bg.tilePositionX = this.cameras.main.scrollX * 0.1;


        if (Phaser.Input.Keyboard.JustDown(this.keyX)) {
            this.placeableObject.forEach((obj) => {
                if (Phaser.Geom.Intersects.RectangleToRectangle(this.player.getBounds(), obj.getBounds())) {
                    if (!obj.isPickedUp) {
                        obj.pickUp(this.player); 
                    } else {
                        obj.placeDown(this.player.x, this.player.y); 
                    }
                }
            });
        }

        if (this.boundingBox.isPlayerOverlapping(this.player) && Phaser.Input.Keyboard.JustDown(this.keyW)) {
            this.interactWithBoundingBox();
        }

        if (Phaser.Input.Keyboard.JustDown(this.keyC)) {
            if (this.player.inventory.has('pumpkin')) {
                const clone = this.placeableObject[0].clone(this.player.x, this.player.y);
                this.placeableObject.push(clone); 
                this.player.inventory.remove('pumpkin');

                console.log('Placed down a pumpkin ');
            } else {
                console.log('None in inventory');
            }
        }

    }

}
