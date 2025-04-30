import { Player } from '../GameObjects/Player.js';
import { BoundingBox } from '../GameObjects/BoundingBox.js';
import { PlaceableObject } from '../GameObjects/PlaceableObject.js';
import { GameState } from '../GameObjects/GameState.js';
import { generateObjectId } from '../GameObjects/IdGenerator.js';






const AssetKeys = {
    HOUSE: 'HOUSE',
    BACKGROUND: 'BACKGROUND',
    BACKGROUNDCOLOR: 'BACKGROUNDCOLOR',
    LARGE_SPIKE: 'large_spike',
    MEDIUM_SPIKE: 'medium_spike',
    SMALL_SPIKE: 'small_spike',


}
export class Level2 extends Phaser.Scene {

    constructor() {
        super('Level2');
    }

    create() {
        this.pumpkinGroup = this.add.group();

        /*Small cooldown to avoid rapid keypresses */

        console.log('Level2 objects in GameState:', GameState.levels.Level2.placeableObjects);


        const { width, height } = this.scale;
        this.bg = this.add.tileSprite(0, -225, 2000, height, AssetKeys.BACKGROUND).setOrigin(0, 0).setScale(2);

        //this.bg = this.add.tileSprite(500, 335, width, height, AssetKeys.BACKGROUND).setScale(1.6);

        this.platforms = this.physics.add.staticGroup();


        /*PLAYER */
        this.player = new Player(this, 50, 450);
        this.player.setScale(0.7);
        this.physics.add.collider(this.player, this.platforms);
        /*SPIKES  */
        this.spikes = this.physics.add.group();
        this.createSpikes();

        /*OBJECTS */

        this.placeableObject = [];

        if (!GameState.initializedLevels.has('Level2')) {
            const pumpkinData = [
                { x: 150, y: 450, key: 'pumpkin' },
                { x: 300, y: 450, key: 'pumpkin' },
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
            // Recreate pumpkins only if they haven't been picked up
            GameState.levels.Level2.placeableObjects.forEach(data => {
                if (!GameState.inventory.has('pumpkin')) {
                    const obj = new PlaceableObject(this, data.x, data.y, data.key, data.key, data.id);
                    obj.setScale(1);
                    this.placeableObject.push(obj);
                }
            });
        }

        /*COLLISIONS */

        this.placeableObject.forEach(obj => {
            this.physics.add.collider(obj, this.platforms);
            this.physics.add.collider(this.player, obj);
            /*pumpkins should collide with another when they are placed */
            this.physics.add.collider(obj, this.spikes);

        });
        this.physics.add.collider(this.pumpkinGroup, this.pumpkinGroup);
        this.physics.add.collider(this.spikes, this.player, this.handleSpikeCollision, null, this);
        this.physics.add.collider(this.placeableObject, this.spikes);


        /*TEXT */
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

        this.boundingBox = new BoundingBox(this, 225, 550, 100, 100);


    }
    /*INTERACT */
    interactWithBoundingBox() {
        console.log('Player interacted with the green box');
        this.scene.start('Game');
    }
    createSpikes() {
        const spikeData = [
            { x: 600, y: 375, key: AssetKeys.LARGE_SPIKE },
            { x: 800, y: 375, key: AssetKeys.MEDIUM_SPIKE },
            { x: 1000, y: 520, key: AssetKeys.SMALL_SPIKE, flipY: true },
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
                        //this.player.inventory.add('pumpkin');

                        this.placeableObject.splice(index, 1); // remove from scene list

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



        if (this.player.inventory.has('pumpkin') && Phaser.Input.Keyboard.JustDown(this.keyC)) {
            const id = generateObjectId('pumpkin');
            const pumpkin = new PlaceableObject(this, this.player.x, this.player.y, 'pumpkin', 'pumpkin', id);
            pumpkin.setScale(1);
            this.placeableObject.push(pumpkin);
            /*Adds collision because it adds the new pumpkin to the group which has collision 
            will come back later to simplify it.*/
            this.pumpkinGroup.add(pumpkin);

            GameState.levels.Level2.placeableObjects.push({
                id,
                x: this.player.x,
                y: this.player.y,
                key: 'pumpkin'
            });

            this.physics.add.collider(pumpkin, this.platforms);
            this.physics.add.collider(this.player, pumpkin);

            this.player.inventory.remove('pumpkin');
            console.log('Placed down a pumpkin');
        }


        /*UPDATE FOR INTERACTING WITH BOX */
        if (this.boundingBox.isPlayerOverlapping(this.player) && Phaser.Input.Keyboard.JustDown(this.keyW)) {
            this.interactWithBoundingBox();
        }



    }

}
