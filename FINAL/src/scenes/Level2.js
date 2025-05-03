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
    WOOD_PLAT1: 'wood_plat1'

}

export class Level2 extends Phaser.Scene {

    constructor() {
        super('Level2');
    }

    create() {
        /*used to see box around physics objects */
        // this.physics.world.createDebugGraphic();
        // this.physics.world.drawDebug = true;

        this.pumpkinGroup = this.add.group();
        console.log('Level2 objects in GameState:', GameState.levels.Level2.placeableObjects);


        const { width, height } = this.scale;
        this.bg = this.add.tileSprite(0, -225, 2000, height, AssetKeys.BACKGROUND).setOrigin(0, 0).setScale(2);




        //this.bg = this.add.tileSprite(500, 335, width, height, AssetKeys.BACKGROUND).setScale(1.6);

        this.platforms = this.physics.add.staticGroup();
        /*this one is for 1 way collision later ( can pass through but not from above)*/
        this.platforms2 = this.physics.add.staticGroup();

        this.walls = this.physics.add.staticGroup();




        /*PLAYER */
        this.player = new Player(this, 50, 50);

        this.player.setScale(0.7).setDepth(1);
        /*SPIKES  */
        this.spikes = this.physics.add.group();
        this.createSpikes();

        /*OBJECTS */
        this.barrels = this.physics.add.group();

        const barrelData = [
            { x: 750, y: 350 }


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

        if (!GameState.initializedLevels.has('Level2')) {
            const pumpkinData = [
                { x: 50, y: 290, key: 'pumpkin' },
                { x: 300, y: 450, key: 'pumpkin' },
                { x: 1475, y: 500, key: 'pumpkin' }
            ];

            pumpkinData.forEach(data => {
                const id = generateObjectId('pumpkin');
                const pumpkin = new PlaceableObject(this, data.x, data.y, data.key, data.key, id);
                pumpkin.setScale(1);
                this.placeableObject.push(pumpkin);
                this.pumpkinGroup.add(pumpkin);

                GameState.levels.Level2.placeableObjects.push({ id, x: data.x, y: data.y, key: data.key });

            });

            GameState.initializedLevels.add('Level2');
        } else {
            /*pumpkins create only if haven't been picked up; */
            GameState.levels.Level2.placeableObjects.forEach(data => {
                if (!GameState.inventory.has('pumpkin')) {
                    const obj = new PlaceableObject(this, data.x, data.y, data.key, data.key, data.id);
                    obj.setScale(1);
                    this.placeableObject.push(obj);
                }
            });
        }

        /*COLLISIONS */
        OneWayPlatform.create(this, this.platforms2, 300, 450, AssetKeys.PLATFORM2);




        /*Platform level creation */

        /*platforms2 */

        for (let x = 0; x <= 600; x += 200) {
            OneWayPlatform.create(this, this.platforms2, x, 200, AssetKeys.PLATFORM2);
        }

        OneWayPlatform.create(this, this.platforms2, 100, 340, AssetKeys.PLATFORM2);
        OneWayPlatform.create(this, this.platforms2, 586, 460, AssetKeys.PLATFORM2);
        OneWayPlatform.create(this, this.platforms2, 1407, 460, AssetKeys.PLATFORM2);
        OneWayPlatform.create(this, this.platforms2, 1407, 340, AssetKeys.PLATFORM2);
        OneWayPlatform.create(this, this.platforms2, 1821, 340, AssetKeys.PLATFORM2);
        OneWayPlatform.create(this, this.platforms2, 1921, 475, AssetKeys.PLATFORM2);





        /*platforms1 */
        this.platforms.create(793, 540, AssetKeys.PLATFORM1);
        this.platforms.create(1200, 540, AssetKeys.PLATFORM1);
        this.platforms.create(1614, 540, AssetKeys.PLATFORM1);
        this.platforms.create(1614, 333, AssetKeys.PLATFORM1);




        this.platforms.create(965, 0, AssetKeys.PLATFORM1)
            .setDisplaySize(200, 300)
            .setOrigin(0.5, 0.5)
            .refreshBody();
        for (let x = 0; x <= 2000; x += 200) {
            this.platforms.create(x, 650, AssetKeys.PLATFORM1).setAlpha(1).refreshBody();
        }

        /*COLLIDER */



        this.physics.add.collider(this.barrels, this.platforms);
        this.physics.add.collider(this.barrels, this.platforms2);

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
        /*platforms 2 collisions */
        this.physics.add.collider(this.placeableObject, this.platforms2);


        /* WALLS 
            I couldn't figure out how to have the worldborder follow the camera, so I am using walls in the bigger scenes...
        */

        const leftWall = this.walls.create(0, 300, 'invisible').setDisplaySize(10, 600).setOrigin(0, 0.5).setVisible(false).refreshBody();;
        const rightWall = this.walls.create(2000, 300, 'invisible').setDisplaySize(10, 600).setOrigin(0, 0.5).setVisible(false).refreshBody();;
        const topWall = this.walls.create(1000, 0, 'invisible').setDisplaySize(2000, 10).setOrigin(0.5, 0).setVisible(false).refreshBody();;

        this.placeableObject.forEach(obj => this.physics.add.collider(obj, this.walls));
        this.physics.add.collider(this.pumpkinGroup, this.walls);

        /*pushing animation */
        this.physics.add.collider(this.player, this.barrels, () => {
            this.player.isPushing = true;
        });

        this.physics.add.collider(this.player, this.platforms);
        this.physics.add.collider(this.player, this.platforms2);
        this.physics.add.collider(this.player, this.walls);


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
        this.keyE = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.E);
        this.keyQ = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.Q);


        /*TEXT */
        /*level name */
        this.add.text(200, height / 2, 'The Underground', {
            stroke: '#000000', strokeThickness: 2,

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

        /*I'll use this for interactions...
            Interacting with doors, ropes, ect...
         */
        this.add.image(50, 50, AssetKeys.BUCKET).setScale(1.8);

        this.boundingBox = new BoundingBox(this, 50, 50, 100, 100);
        this.boundingBox2 = new BoundingBox(this, 1780, 500, 100, 100);

        /*decorations that add no function */
        this.add.image(450, 165, 'flowers_var1');
        this.add.image(100, 165, 'flowers_var1');
        this.add.image(425, 165, 'flowers_var1');

        this.add.image(800, 430, 'flowers_var1');
        this.add.image(550, 430, 'flowers_var2');
        this.add.image(570, 430, 'flowers_var2');
        this.add.image(580, 430, 'flowers_var2');
        this.add.image(650, 430, 'flowers_var2');


        // this.add.image(110, 300, 'flowers_var1');

        this.add.image(320, 170, 'flowers_var2');
        this.add.image(1580, 220, 'flowers_var2');
        this.add.image(1580, 220, 'flowers_var1');
        this.add.image(1200, 425, 'flowers_var1');
        this.add.image(1200, 50, 'lantern');
        this.add.image(680, 275, 'lantern');
        this.add.image(1780, 400, 'banner');





        this.add.image(300, 335, 'tree');
        this.add.image(120, 500, 'tree').setScale(0.5).setFlipX(true);
        this.add.image(1600, 140, 'tree');

        this.add.image(1750, 510, 'cave').setScale(1.5);

        this.add.text(1750, 510, 'Press W', {
            stroke: '#000000', strokeThickness: 2,

            fontSize: '16px',
            color: '#ffffff'
        }).setOrigin(0.5);

    }

    /*INTERACT */
    interactWithBoundingBox() {
        console.log('Player interacted with the green box');

        this.time.delayedCall(100, () => this.scene.start('Game'));
    }
    interactWithBoundingBox2() {
        console.log('Player interacted with the green box');
        this.time.delayedCall(100, () => this.scene.start('Level3'))
    }
    createSpikes() {
        const spikeData = [
            { x: 600, y: -100, key: AssetKeys.LARGE_SPIKE },
            { x: 800, y: -100, key: AssetKeys.MEDIUM_SPIKE },
            { x: 900, y: 220, key: AssetKeys.MEDIUM_SPIKE },
            { x: 935, y: 220, key: AssetKeys.MEDIUM_SPIKE },
            { x: 970, y: 220, key: AssetKeys.MEDIUM_SPIKE },
            { x: 995, y: 220, key: AssetKeys.MEDIUM_SPIKE },
            { x: 1030, y: 220, key: AssetKeys.MEDIUM_SPIKE },
            { x: 920, y: 530, key: AssetKeys.SMALL_SPIKE, flipY: true },
            { x: 960, y: 530, key: AssetKeys.SMALL_SPIKE, flipY: true },
            { x: 1000, y: 530, key: AssetKeys.SMALL_SPIKE, flipY: true },
            { x: 1040, y: 530, key: AssetKeys.SMALL_SPIKE, flipY: true },
            { x: 1080, y: 530, key: AssetKeys.SMALL_SPIKE, flipY: true },
        ];

        spikeData.forEach(data => {
            const spike = this.spikes.create(data.x, data.y, data.key).setOrigin(0.5, 0.5);
            if (data.flipY) {
                spike.setFlipY(true);
            }
            this.physics.world.enable(spike);
            spike.body.setImmovable(true);
            spike.body.setAllowGravity(false);
        });

        // if (this.platforms && this.spikes) {
        //     this.physics.add.collider(this.spikes, this.platforms);
        // }
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


        if (Phaser.Input.Keyboard.JustDown(this.keyE)) {
            this.placeableObject.forEach((obj, index) => {
                if (Phaser.Geom.Intersects.RectangleToRectangle(this.player.getBounds(), obj.getBounds())) {

                    if (!obj.isPickedUp) {
                        obj.pickUp(this.player);


                        this.placeableObject.splice(index, 1);

                        const matchIndex = GameState.levels.Level2.placeableObjects.findIndex(data => data.id === obj.id);
                        if (matchIndex !== -1) {
                            GameState.levels.Level2.placeableObjects.splice(matchIndex, 1);
                            console.log(`Removed ${obj.id} from GameState`);

                        }

                        console.log('Picked up a pumpkin');
                    }
                }
            });
        }



        if (this.player.inventory.has('pumpkin') && Phaser.Input.Keyboard.JustDown(this.keyQ)) {
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

            GameState.levels.Level2.placeableObjects.push({
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
        if (this.boundingBox2.isPlayerOverlapping(this.player) && Phaser.Input.Keyboard.JustDown(this.keyW)) {
            this.interactWithBoundingBox2();
        }

        const pumpkinCount = InventoryStore.getQuantity('pumpkin');
        this.pumpkinCountText.setText('Pumpkin count: ' + pumpkinCount);

        const keyCount = InventoryStore.getQuantity('key');
        this.keyCountText.setText('key count: ' + keyCount);


    }

}
