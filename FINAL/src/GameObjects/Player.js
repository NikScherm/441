import { InventoryStore } from './InventoryStore.js';

export class Player extends Phaser.Physics.Arcade.Sprite {

    constructor(scene, x, y) {
        super(scene, x, y, 'player');
        scene.add.existing(this);
        scene.physics.add.existing(this);

        this.setBounce(0.2);
        //this.setCollideWorldBounds(true); will have to use a bunch of walls...
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
        this.inventory = InventoryStore;
        this.isPushing = false;


    }


    addToInventory(placeableObject) {
        this.inventory.add(placeableObject.inventoryKey);
    }

    removeFromInventory(itemKey) {
        this.inventory.delete(itemKey);
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
        if (!this.scene.anims.exists('push')) {
            scene.anims.create({
                key: 'push',
                frames: scene.anims.generateFrameNumbers('push', { start: 0, end: 15 }),
                frameRate: 40,
                repeat: -1
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

    let moving = false;

    if (this.cursors.left.isDown || this.keyA.isDown) {
        this.setVelocityX(-190);
        this.setFlipX(false);
        moving = true;
    } else if (this.cursors.right.isDown || this.keyD.isDown) {
        this.setVelocityX(190);
        this.setFlipX(true);
        moving = true;
    } else {
        this.setVelocityX(0);
    }

    if (this.isPushing) {
        if (!this.anims.isPlaying || this.anims.currentAnim.key !== 'push') {
            this.anims.play('push', true);
        }
    } else if (!this.body.touching.down) {
        if (!this.anims.isPlaying || this.anims.currentAnim.key !== 'jump') {
            this.anims.play('jump', true);
        }
    } else if (moving) {
        if (!this.anims.isPlaying || this.anims.currentAnim.key !== 'runRight') {
            this.anims.play('runRight', true); 
        }
    } else {
        if (!this.anims.isPlaying || this.anims.currentAnim.key !== 'idle') {
            this.anims.play('idle', true);
        }
    }

    this.isPushing = false;

    }
    interactWithBoundingBox(boundingBox) {
        /* Checks if the player is near the bounding box and W key is pressed (or Up arrow)*/
        if ((this.keyW.isDown || this.scene.cursors.up.isDown) && this.scene.isPlayerNearBoundingBox(this)) {
            console.log("Player entered");
            /*might add animation player sprite sheet for entering if I have time to make one */
        }

    }



}