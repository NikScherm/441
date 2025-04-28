import { Inventory } from './Inventory.js';
//import {PlaceableObject} from './PlaceableObject.js';
export class Player extends Phaser.Physics.Arcade.Sprite {

    constructor(scene, x, y) {
        super(scene, x, y, 'player');
        scene.add.existing(this);
        scene.physics.add.existing(this);

        this.setBounce(0.2);
        //this.setCollideWorldBounds(true);
        this.setScale(0.5);
        this.cursors = scene.input.keyboard.createCursorKeys();
        this.spaceBar = scene.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE);
        this.keyA = scene.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.A);
        this.keyD = scene.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.D);
        this.keyW = scene.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.W);
        this.keyX = scene.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.X);

        this.initAnimations(scene);
        this.scene = scene;
        /*player now has inventory yay */
        this.inventory = new Inventory(scene);

    }


    addToInventory(placeableObject) {
        this.inventory.add(placeableObject.inventoryKey);
    }

    removeFromInventory(itemKey) {
        this.inventory.remove(itemKey);
    }

    hasItem(itemKey) {
        return this.inventory.has(itemKey);
    }


    initAnimations(scene) {
        if (!this.scene.anims.exists('jump')) {

            scene.anims.create({
                key: 'runLeft',
                frames: scene.anims.generateFrameNumbers('player', { start: 0, end: 19 }),
                frameRate: 20,
                repeat: -1
            });
        }
        if (!this.scene.anims.exists('jump')) {

            scene.anims.create({
                key: 'runRight',
                frames: scene.anims.generateFrameNumbers('player', { start: 0, end: 19 }),
                frameRate: 20,
                repeat: -1
            });
        }
        if (!this.scene.anims.exists('jump')) {

            scene.anims.create({
                key: 'idle',
                frames: scene.anims.generateFrameNumbers('idle', { start: 0, end: 16 }),
                frameRate: 10,
                repeat: -1
            });
        }
        if (!this.scene.anims.exists('jump')) {
            this.scene.anims.create({
                key: 'jump',
                frames: this.scene.anims.generateFrameNumbers('player', { start: 2, end: 3 }),
                frameRate: 10
            });
        }
    }

    move() {

        if (this.spaceBar.isDown && this.body.touching.down) {
            this.setVelocityY(-350);


            if (!this.anims.isPlaying || this.anims.currentAnim.key !== 'jump') {
                this.anims.play('jump', true);
            }
            return;

        }


        if (!this.anims.isPlaying || this.anims.currentAnim.key !== 'jump') {
            if (this.cursors.left.isDown || this.keyA.isDown) {
                this.setVelocityX(-160);
                this.setFlipX(false);


                if (!this.anims.isPlaying || this.anims.currentAnim.key !== 'runLeft') {
                    this.anims.play('runLeft', true);
                }
            }
            else if (this.cursors.right.isDown || this.keyD.isDown) {
                this.setVelocityX(160);
                this.setFlipX(true);


                if (!this.anims.isPlaying || this.anims.currentAnim.key !== 'runRight') {
                    this.anims.play('runRight', true);
                }
            }
            else {

                this.setVelocityX(0);
                if (this.body.touching.down) {
                    if (!this.anims.isPlaying || this.anims.currentAnim.key !== 'idle') {
                        this.anims.play('idle', true);
                    }
                }
            }
        }


    }
    interactWithBoundingBox(boundingBox) {
        /* Checks if the player is near the bounding box and W key is pressed (or Up arrow)*/
        if ((this.keyW.isDown || this.scene.cursors.up.isDown) && this.scene.isPlayerNearBoundingBox(this)) {
            console.log("Player entered");// used for debugging, will remove later
        }

    }



}