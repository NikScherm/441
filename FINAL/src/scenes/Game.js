import { Player } from '../GameObjects/Player.js';
import { BoundingBox } from '../GameObjects/BoundingBox.js';
import { PlaceableObject } from '../GameObjects/PlaceableObject.js';
import { GameState } from '../GameObjects/GameState.js';
import { generateObjectId } from '../GameObjects/IdGenerator.js';
import { InventoryStore } from '../GameObjects/InventoryStore.js';

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
        this.walls = this.physics.add.staticGroup();

        this.physics.world.createDebugGraphic();
        this.physics.world.drawDebug = true;

        /*Dev mode that will allow me to quickly get to a scene without having to test interactions do levels ect ect...
            When I add other levels i'll just add more letters.
         */

        this.input.keyboard.on('keydown-L', () => {
            console.log("going to lvl3");

            this.scene.start('Level3');

        });
        this.input.keyboard.on('keydown-P', () => {
            console.log("going to lvl3");

            this.scene.start('House');

        });
        /*ADDED PUMPKINS TO A GROUP SO THAT IT CAN LATER BE USED TO COLLIDE WITH SUBSEQUENT ADDED PUMPKINS
        WHILE KEEPING THE PROPERTIES OF "PLACEABLEOBJECT" */
        this.pumpkinGroup = this.add.group();


        const { width, height } = this.scale;
        this.bg = this.add.tileSprite(500, 335, width, height, AssetKeys.HOUSE).setScale(1.12);


        this.boundingBox = new BoundingBox(this, 225, 550, 100, 100);
        this.boundingBoxHouse = new BoundingBox(this, 550, 550, 100, 100);


        this.platforms = this.physics.add.staticGroup();
        this.platforms.create(200, 600, 'ground').setAlpha(0).refreshBody();
        this.platforms.create(600, 600, 'ground').setAlpha(0).refreshBody();
        this.platforms.create(800, 600, 'ground').setAlpha(0).refreshBody();

        //==========================================

        /*PLAYER */
        this.player = new Player(this, 50, 450);
        this.player.setScale(0.7);
        this.physics.add.collider(this.player, this.platforms);
        /*OBJECTS */
        this.placeableObject = [];

        if (!GameState.initializedLevels.has('Game')) {
            const pumpkinData = [
                { x: 400, y: 450, key: 'pumpkin' },

            ];

            pumpkinData.forEach(data => {
                const id = generateObjectId('pumpkin');
                const pumpkin = new PlaceableObject(this, data.x, data.y, data.key, data.key, id);
                pumpkin.setScale(1);
                this.placeableObject.push(pumpkin);
                GameState.levels.Game.placeableObjects.push({ id, x: data.x, y: data.y, key: data.key });
            });

            GameState.initializedLevels.add('Game');
        } else {
            GameState.levels.Game.placeableObjects.forEach(data => {
                if (!GameState.inventory.has('pumpkin')) {
                    const obj = new PlaceableObject(this, data.x, data.y, data.key, data.key, data.id);
                    obj.setScale(1);
                    this.placeableObject.push(obj);
                }
            });
        }
        const leftWall = this.walls.create(0, 300, 'invisible').setDisplaySize(10, 600).setOrigin(0, 0.5).setVisible(false).refreshBody();;
        const rightWall = this.walls.create(1000, 300, 'invisible').setDisplaySize(10, 600).setOrigin(0, 0.5).setVisible(false).refreshBody();;
        const topWall = this.walls.create(1000, 0, 'invisible').setDisplaySize(2000, 10).setOrigin(0.5, 0).setVisible(false).refreshBody();;
        this.physics.add.collider(this.player, this.walls);

        this.placeableObject.forEach(obj => {
            this.physics.add.collider(obj, this.platforms);
            this.physics.add.collider(this.player, obj);
            this.physics.add.collider(obj, this.walls);

        });


        // this.physics.add.collider(this.player, this.placeableObject);
        /*CONTROLS */
        this.cursors = this.input.keyboard.createCursorKeys();
        this.spaceBar = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE);
        /* WASD*/
        this.keyW = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.W);
        this.keyA = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.A);
        this.keyS = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.S);
        this.keyD = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.D);
        this.keyX = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.X);
        this.keyC = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.C);

        this.add.text(width / 50, height / 6, 'A, D for left/right.\nW for interact.\nX & C for pickup/drop.\n\n "Oh no, I have dropped\nmey key in the well !"', {
            fontFamily: 'Arial Black', fontSize: 18, color: '#ffffff',
            stroke: '#000000', strokeThickness: 8,
            align: 'center'
        }).setOrigin(0);
        this.pumpkinCountText = this.add.text(20, 20, 'Pumpkin count: 0', {
            fontSize: '32px',
            color: '#ffffff'
        }).setOrigin(0, 0);
        this.pumpkinCountText.setScrollFactor(0);
        this.keyCountText = this.add.text(20, 50, 'Key count: 0', {
            fontSize: '32px',
            color: '#ffffff'
        }).setOrigin(0, 0);
        this.keyCountText.setScrollFactor(0);

    }
    shutdownScene() {
        this.physics.world.colliders.destroy();
    }

    interactWithBoundingBox() {
        this.time.delayedCall(100, () => this.scene.start('Level2'))
        this.shutdownScene();
    }
    interactWithBoundingBoxHouse() {
        console.log('Player interacted house box');

        this.time.delayedCall(100, () => this.scene.start('House'))
        this.shutdownScene();
    }


    update(time) {
        console.log('Starting new scene:', this.scene.key);

        this.player.move();


        /*UPDATE FOR PLACING AND RETRIEVING 
        picks up and adds to invent and to inventorystore
        opposite logic for C key press : it will remove it from inventory and inventoryStore and CREATE a new pumpkin at player pos
        it also removes or saves to gamestate to track if it should or shouldn't be in the game scene when loaded.*/

        if (Phaser.Input.Keyboard.JustDown(this.keyX)) {
            this.placeableObject.forEach((obj, index) => {
                if (Phaser.Geom.Intersects.RectangleToRectangle(this.player.getBounds(), obj.getBounds())) {

                    if (!obj.isPickedUp) {
                        obj.pickUp(this.player);
                        //this.player.inventory.add('pumpkin');

                        this.placeableObject.splice(index, 1);

                        const matchIndex = GameState.levels.Game.placeableObjects.findIndex(data => data.id === obj.id);
                        if (matchIndex !== -1) {
                            GameState.levels.Game.placeableObjects.splice(matchIndex, 1);
                        }

                        console.log('Picked up a pumpkin');
                    }
                }
            });
        }



        if (this.player.inventory.has('pumpkin') && Phaser.Input.Keyboard.JustDown(this.keyC)) {
            const id = generateObjectId('pumpkin');
            const pumpkin = new PlaceableObject(this, this.player.x, this.player.y, 'pumpkin', 'pumpkin', id);
            pumpkin.setScale(1);
            this.placeableObject.push(pumpkin);

            GameState.levels.Game.placeableObjects.push({
                id,
                x: this.player.x,
                y: this.player.y,
                key: 'pumpkin'
            });

            this.physics.add.collider(pumpkin, this.platforms);
                        this.physics.add.collider(pumpkin, this.walls);

            this.physics.add.collider(this.player, pumpkin);
            

            this.player.inventory.remove('pumpkin');
            console.log('Placed down a pumpkin');
        }


        /*UPDATE FOR INTERACTING WITH BOX */
        if (this.boundingBox.isPlayerOverlapping(this.player) && Phaser.Input.Keyboard.JustDown(this.keyW)) {
            this.interactWithBoundingBox();
        }
        if (
            this.boundingBoxHouse.isPlayerOverlapping(this.player) &&
            Phaser.Input.Keyboard.JustDown(this.keyW)
        ) {
            const keyCount = InventoryStore.getQuantity('key');

            if (keyCount === 1) {
                this.interactWithBoundingBoxHouse();
            } else {
                console.log('You need a key to enter');
            }
        }
        const pumpkinCount = InventoryStore.getQuantity('pumpkin');
        this.pumpkinCountText.setText('Pumpkin count: ' + pumpkinCount);

        const keyCount = InventoryStore.getQuantity('key');
        this.keyCountText.setText('key count: ' + keyCount);


    }


}
