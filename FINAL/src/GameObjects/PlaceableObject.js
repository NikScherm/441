
import { InventoryStore } from '../GameObjects/InventoryStore.js';

export class PlaceableObject extends Phaser.Physics.Arcade.Sprite {
    constructor(scene, x, y, texture, inventoryKey, id) {
        super(scene, x, y, texture);
        this.id = id;

        this.scene = scene;
        //this.setPosition(x, y); //MAYBE ?
        this.setInteractive();
        this.scene.physics.world.enable(this);

        this.inventoryKey = inventoryKey;
        this.isPickedUp = false;
        this.isPlaced = false;
        this.body.gravity.y = 1000;
        this.body.setMass(3);
        this.scene.add.existing(this);

        this.body.setDrag(1000);
        this.body.setMaxVelocity(100);
        // this.body.setCollideWorldBounds(true);
        // this.body.setImmovable(false);
    }

    pickUp(player) {
        if (!this.isPickedUp) {
            console.log('pickedup', this.inventoryKey);
            this.isPickedUp = true;
            InventoryStore.add(this.inventoryKey);
            console.log('Inventory after pickup:', InventoryStore.listItems());
            this.destroy();
        }
    }


    placeDown(player) {
        if (this.isPickedUp) {
            this.isPickedUp = false;
            this.setAlpha(1);
            this.setPosition(player.x, player.y);
            this.isPlaced = true;
            this.body.setVelocity(0, 0);
        }
    }
    canBePickedUp(player) {
        const pickupRange = 150;
        const distance = Phaser.Math.Distance.Between(player.x, player.y, this.x, this.y);
        return distance <= pickupRange;
    }



    update() {

    }
}