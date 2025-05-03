import { Player } from '../GameObjects/Player.js';
import { BoundingBox } from '../GameObjects/BoundingBox.js';
import { PlaceableObject } from '../GameObjects/PlaceableObject.js';
import { GameState } from '../GameObjects/GameState.js';
import { generateObjectId } from '../GameObjects/IdGenerator.js';
import { InventoryStore } from '../GameObjects/InventoryStore.js';

import { OneWayPlatform } from '../GameObjects/OneWayPlatform.js';








const AssetKeys = {
    HOUSE: 'HOUSE',
    BACKGROUND: 'BACKGROUND',
    BACKGROUNDCOLOR: 'BACKGROUNDCOLOR',
    LARGE_SPIKE: 'large_spike',
    MEDIUM_SPIKE: 'medium_spike',
    SMALL_SPIKE: 'small_spike',
    PLATFORM1: 'platform1',
    PLATFORM2: 'platform2',
    BUCKET: 'BUCKET',
    BARREL: 'BARREL',
    WOOD_PLAT1: 'wood_plat1',
    KEY: 'key'
}

export class Level3 extends Phaser.Scene {

    constructor() {
        super('Level3');
    }

    create() {



        this.physics.world.createDebugGraphic();
        this.physics.world.drawDebug = true;

        this.pumpkinGroup = this.add.group();
        console.log('Level3 objects in GameState:', GameState.levels.Level3.placeableObjects);


        const { width, height } = this.scale;
        this.bg = this.add.tileSprite(0, -225, 2000, height, AssetKeys.BACKGROUND).setOrigin(0, 0).setScale(2);

        //this.bg = this.add.tileSprite(500, 335, width, height, AssetKeys.BACKGROUND).setScale(1.6);

        this.platforms = this.physics.add.staticGroup();
        /*this one is for 1 way collision later ( can pass through but not from above)*/
        this.platforms2 = this.physics.add.staticGroup();
        this.walls = this.physics.add.staticGroup();




        /*PLAYER */
        this.player = new Player(this, 1000, 225);
        this.player.setScale(0.7).setDepth(1);
        /*SPIKES  */
        this.spikes = this.physics.add.group();
        this.createSpikes();

        /*OBJECTS */
        this.barrels = this.physics.add.group();

        const barrelData = [
            { x: 1200, y: 515 },
            { x: 1252, y: 515 },
            { x: 1226, y: 450 },



            { x: 743, y: 148 },
            { x: 743, y: 248 },
            { x: 55, y: 500 }





        ];

        barrelData.forEach(data => {
            const barrel = this.barrels.create(data.x, data.y, AssetKeys.BARREL)
                .setScale(1.0)
                .setBounce(0.1)
                .setGravityY(1000)
                .setDrag(1000)
                .setMaxVelocity(100, 100)
                .setMass(3);

            const originalWidth = barrel.displayWidth;
            const originalHeight = barrel.displayHeight;
            barrel.setDisplaySize(originalWidth, originalHeight - 7);
        });;

        this.placeableObject = [];

        if (!GameState.initializedLevels.has('Level3')) {
            const pumpkinData = [
                { x: 50, y: 290, key: 'pumpkin' },
                { x: 300, y: 450, key: 'pumpkin' },
                { x: 330, y: 20, key: 'pumpkin' },
                { x: 475, y: 20, key: 'pumpkin' },
                { x: 743, y: 348, key: 'pumpkin' },
                { x: 25, y: 125, key: 'pumpkin' },



                { x: 1475, y: 500, key: 'pumpkin' },
                { x: 1527, y: 500, key: 'pumpkin' },

                { x: 1501, y: 430, key: 'pumpkin' }


            ];

            pumpkinData.forEach(data => {
                const id = generateObjectId('pumpkin');
                const pumpkin = new PlaceableObject(this, data.x, data.y, data.key, data.key, id);
                pumpkin.setScale(1);
                this.placeableObject.push(pumpkin);
                this.pumpkinGroup.add(pumpkin);

                GameState.levels.Level3.placeableObjects.push({ id, x: data.x, y: data.y, key: data.key });

            });

            GameState.initializedLevels.add('Level3');
        } else {
            /*pumpkins create only if haven't been picked up; */
            GameState.levels.Level3.placeableObjects.forEach(data => {
                if (!GameState.inventory.has('pumpkin')) {
                    const obj = new PlaceableObject(this, data.x, data.y, data.key, data.key, data.id);
                    obj.setScale(1);
                    this.placeableObject.push(obj);
                }
            });
        }





        /*Platform level creation */

        /*platforms2 */

        // for (let x = 0; x <= 600; x += 200) {
        //     OneWayPlatform.create(this, this.platforms2, x, 200, AssetKeys.PLATFORM2);
        // }
        OneWayPlatform.create(this, this.platforms2, 1000, 300, AssetKeys.PLATFORM2);

        OneWayPlatform.create(this, this.platforms2, 875, 300, AssetKeys.WOOD_PLAT1);
        OneWayPlatform.create(this, this.platforms2, 1125, 300, AssetKeys.WOOD_PLAT1).setFlipX(true);
        OneWayPlatform.create(this, this.platforms2, 700, 200, AssetKeys.WOOD_PLAT1).setFlipX(true);
        OneWayPlatform.create(this, this.platforms2, 700, 300, AssetKeys.WOOD_PLAT1).setFlipX(true);
        OneWayPlatform.create(this, this.platforms2, 700, 400, AssetKeys.WOOD_PLAT1).setFlipX(true);

        OneWayPlatform.create(this, this.platforms2, 1800, 230, AssetKeys.WOOD_PLAT1).setFlipX(true);
        OneWayPlatform.create(this, this.platforms2, 1800, 330, AssetKeys.WOOD_PLAT1).setFlipX(true);
        OneWayPlatform.create(this, this.platforms2, 1800, 430, AssetKeys.WOOD_PLAT1).setFlipX(true);
                OneWayPlatform.create(this, this.platforms2, 1800, 530, AssetKeys.WOOD_PLAT1).setFlipX(true);

                OneWayPlatform.create(this, this.platforms2, 1600, 280, AssetKeys.WOOD_PLAT1);


        OneWayPlatform.create(this, this.platforms2, 275, 180, AssetKeys.WOOD_PLAT1);
        OneWayPlatform.create(this, this.platforms2, 275, 280, AssetKeys.WOOD_PLAT1);
        OneWayPlatform.create(this, this.platforms2, 25, 350, AssetKeys.WOOD_PLAT1).setFlipX(true);
        OneWayPlatform.create(this, this.platforms2, 25, 180, AssetKeys.WOOD_PLAT1).setFlipX(true);










        /*platforms1 */
        //this.platforms.create(793, 540, AssetKeys.PLATFORM1);aaaa
        this.platforms.create(400, 100, AssetKeys.PLATFORM1)
            .setDisplaySize(50, 250)
            .setOrigin(0.5, 0.5)
            .refreshBody();
        // this.platforms.create(1000, 500, AssetKeys.PLATFORM1);
        // this.platforms.create(1700, 500, AssetKeys.PLATFORM1);
        this.platforms.create(420, 250, AssetKeys.PLATFORM1);

        this.platforms.create(620, 275, AssetKeys.PLATFORM1)
            .setDisplaySize(50, 200)
            .setOrigin(0.5, 0.5)
            .refreshBody();






        this.platforms.create(1700, 500, AssetKeys.PLATFORM1)
            .setDisplaySize(100, 600)
            .setOrigin(0.5, 0.5)
            .refreshBody();



        // this.platforms.create(1700, 500, AssetKeys.PLATFORM1)
        //     .setDisplaySize(100, 550)
        //     .setOrigin(0.5, 0.5)
        //     .refreshBody();s
        for (let x = 600; x <= 2000; x += 200) {
            this.platforms.create(x, 650, AssetKeys.PLATFORM1).setAlpha(1).refreshBody();
        }
        for (let x = 0; x <= 200; x += 200) {
            this.platforms.create(x, 650, AssetKeys.PLATFORM1).setAlpha(1).refreshBody();
        }
        /*COLLISIONS */
        this.physics.add.collider(this.player, this.barrels, () => {
            this.player.isPushing = true;
        });


        this.physics.add.collider(this.barrels, this.platforms);
        this.physics.add.collider(this.barrels, this.platforms2);
        this.physics.add.collider(this.barrels, this.barrels);


        this.physics.add.collider(this.barrels, this.spikes);
        this.physics.add.collider(this.barrels, this.walls);
        this.physics.add.collider(this.barrels, this.placeableObject);

        this.placeableObject.forEach(obj => {
            this.physics.add.collider(obj, this.platforms);
            this.physics.add.collider(obj, this.platforms2);
            this.physics.add.collider(obj, this.walls);

            this.physics.add.collider(this.player, obj);
            this.physics.add.collider(obj, this.spikes);

        });

        this.physics.add.collider(this.pumpkinGroup, this.pumpkinGroup);
        this.physics.add.collider(this.spikes, this.player, this.handleSpikeCollision, null, this);
        this.physics.add.collider(this.placeableObject, this.spikes);
        this.physics.add.collider(this.placeableObject, this.walls);
        this.physics.add.collider(this.placeableObject, this.platforms);


        /*platforms collisions */
        this.physics.add.collider(this.placeableObject, this.platforms);
        this.physics.add.collider(this.player, this.platforms);
        /*platforms 2 collisions */
        this.physics.add.collider(this.placeableObject, this.platforms2);
        this.physics.add.collider(this.player, this.platforms2);


        /* WALLS 
            I couldn't figure out how to have the worldborder follow the camera, so I am using walls in the bigger scenes...
        */

        const leftWall = this.walls.create(0, 300, 'invisible').setDisplaySize(10, 600).setOrigin(0, 0.5).setVisible(false).refreshBody();;
        const rightWall = this.walls.create(2000, 300, 'invisible').setDisplaySize(10, 600).setOrigin(0, 0.5).setVisible(false).refreshBody();;
        const topWall = this.walls.create(1000, 0, 'invisible').setDisplaySize(2000, 10).setOrigin(0.5, 0).setVisible(false).refreshBody();;

        this.physics.add.collider(this.player, this.walls);
        this.placeableObject.forEach(obj => this.physics.add.collider(obj, this.walls));
        this.physics.add.collider(this.pumpkinGroup, this.walls);

        /*IMAGES */
        this.theKey = this.add.image(1900, 520, AssetKeys.KEY).setScale(1.0);

        /*CAMERA */
        this.cameras.main.startFollow(this.player, true);
        this.cameras.main.setBounds(0, 0, 2000, 600);
        /*CONTROLS +wasd, S yet to have a use. might make it so player can go through platform1 types with it*/
        this.cursors = this.input.keyboard.createCursorKeys();
        this.spaceBar = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE);
        this.keyW = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.W);
        this.keyA = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.A);
        this.keyS = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.S);
        this.keyD = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.D);
        this.keyX = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.X);
        this.keyC = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.C);


        /*TEXT */
        this.add.text(200, height / 2, 'Deeper and deeper', {
            fontSize: '32px',
            color: '#ffffff'
        }).setOrigin(0.5);
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
        this.add.text(1900, 475, '  press W \nto pick up\n the key', {
            fontSize: '16px',
            color: '#ffffff'
        }).setOrigin(0.5);


        /*I'll use this for interactions...
            Interacting with doors, ropes, ect...
         */
        // this.add.image(50, 50, AssetKeys.BUCKET).setScale(1.8);

        // this.boundingBox = new BoundingBox(this, 50, 50, 100, 100);
        // this.boundingBox2 = new BoundingBox(this, 1780, 500, 100, 100);

        /*I'll use this for interactions...
            Interacting with doors, ropes, ect...
         */

        this.boundingBox = new BoundingBox(this, 1000, 225, 100, 100);
        this.boundingBoxKey = new BoundingBox(this, 1900, 520, 75, 75);

        // this.boundingBox2 = new BoundingBox(this, 1780, 500, 100, 100);


    }


    /*INTERACT */
    interactWithBoundingBox() {
        console.log('Player interacted with the green box');
        this.time.delayedCall(100, () => this.scene.start('Level2'))
    }
    // interactWithBoundingBox2() {
    //     console.log('Player interacted with the green box');
    //     this.scene.start('Level3');
    // }
    createSpikes() {
        const spikeData = [
            { x: 375, y: 325, key: AssetKeys.MEDIUM_SPIKE },
            { x: 425, y: 325, key: AssetKeys.MEDIUM_SPIKE },


            { x: 1000, y: 550, key: AssetKeys.SMALL_SPIKE, flipY: true },

            { x: 920, y: -530, key: AssetKeys.SMALL_SPIKE, flipY: true },

            { x: 325, y: 600, key: AssetKeys.SMALL_SPIKE, flipY: true },

            { x: 350, y: 600, key: AssetKeys.SMALL_SPIKE, flipY: true },
            { x: 375, y: 600, key: AssetKeys.SMALL_SPIKE, flipY: true },
            { x: 400, y: 600, key: AssetKeys.SMALL_SPIKE, flipY: true },
            { x: 425, y: 600, key: AssetKeys.SMALL_SPIKE, flipY: true },
            { x: 450, y: 600, key: AssetKeys.SMALL_SPIKE, flipY: true },
            { x: 475, y: 600, key: AssetKeys.SMALL_SPIKE, flipY: true },



        ];

        spikeData.forEach(data => {
            const spike = this.spikes.create(data.x, data.y, data.key).setOrigin(0.5, 0.5);
            if (data.flipY) {
                spike.setFlipY(true);
            }
            this.physics.world.enable(spike);
            spike.body.setImmovable(true);
            spike.body.setAllowGravity(false);
            this.physics.add.collider(this.spikes, this.platforms);


        });
    }

    handleSpikeCollision(player, spike) {
        this.scene.start('GameOver');
    }




    update() {

        this.player.move();

        if (this.player.isPushing) {
            this.player.play('push', true);
        }
        this.player.isPushing = false;
        this.bg.tilePositionX = this.cameras.main.scrollX * 0.1;
        /*UPDATE FOR PLACING AND RETRIEVING 
        picks up and adds to invent and to inventorystore
        opposite logic for C key press : it will remove it from inventory and inventoryStore and CREATE a new pumpkin at player pos
        it also removes or saves to gamestate to track if it should or shouldn't be in the game scene when loaded.*/


        if (Phaser.Input.Keyboard.JustDown(this.keyX)) {
            this.placeableObject.forEach((obj, index) => {
                if (Phaser.Geom.Intersects.RectangleToRectangle(this.player.getBounds(), obj.getBounds())) {

                    if (!obj.isPickedUp) {
                        obj.pickUp(this.player);


                        this.placeableObject.splice(index, 1);

                        const matchIndex = GameState.levels.Level3.placeableObjects.findIndex(data => data.id === obj.id);
                        if (matchIndex !== -1) {
                            GameState.levels.Level3.placeableObjects.splice(matchIndex, 1);
                            console.log(`Removed ${obj.id} from GameState`);

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
            this.physics.add.collider(this.player, pumpkin, () => {
                console.log('Collision detected');
            }, null, this);
            /*Adds collision because it adds the new pumpkin to the group which has collision 
            will come back later to simplify it.*/
            this.pumpkinGroup.add(pumpkin);

            GameState.levels.Level3.placeableObjects.push({
                id,
                x: this.player.x,
                y: this.player.y,
                key: 'pumpkin'
            });



            this.player.inventory.remove('pumpkin');
            console.log('Placed down a pumpkin');
        }
        if (this.keyS.isDown) {
            this.physics.world.colliders.getActive().forEach(collider => {
                if (collider.object1 === this.player && collider.object2 === this.platforms2) {
                    collider.active = false;
                }
            });
        } else {
            this.physics.world.colliders.getActive().forEach(collider => {
                if (collider.object1 === this.player && collider.object2 === this.platforms2) {
                    collider.active = true;
                }
            });
        }



        /*UPDATE FOR INTERACTING WITH BOX */
        if (this.boundingBox.isPlayerOverlapping(this.player) && Phaser.Input.Keyboard.JustDown(this.keyW)) {
            this.interactWithBoundingBox();
        }
        if (this.boundingBoxKey.isPlayerOverlapping(this.player) && Phaser.Input.Keyboard.JustDown(this.keyW)) {
            if (this.theKey) {
                this.theKey.destroy();
                this.theKey = null;
                InventoryStore.add('key');

            }
        }
        // if (this.boundingBox2.isPlayerOverlapping(this.player) && Phaser.Input.Keyboard.JustDown(this.keyW)) {
        //     this.interactWithBoundingBox2();
        // }keyCountText
        const pumpkinCount = InventoryStore.getQuantity('pumpkin');
        this.pumpkinCountText.setText('Pumpkin count: ' + pumpkinCount);

        const keyCount = InventoryStore.getQuantity('key');
        this.keyCountText.setText('key count: ' + keyCount);



    }

}