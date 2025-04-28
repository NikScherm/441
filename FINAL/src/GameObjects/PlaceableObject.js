

export class PlaceableObject extends Phaser.Physics.Arcade.Sprite {
    constructor(scene, x, y, texture, inventoryKey) {
        super(scene, x, y, texture);

        this.scene = scene;
        this.setPosition(x, y);
        this.setInteractive();
        this.scene.physics.world.enable(this);

        this.inventoryKey = inventoryKey; 
        this.isPickedUp = false;
        this.isPlaced = false;
        this.body.gravity.y = 1000;
        this.body.setMass(2);
        this.scene.add.existing(this);

        this.body.setDrag(1000);
        this.body.setMaxVelocity(300);

    }

    pickUp(player) {
        if (!this.isPickedUp) {
            this.isPickedUp = true;
            this.setAlpha(0); 
            player.addToInventory(this); 
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
        const pickupRange = 150; // or whatever feels right
        const distance = Phaser.Math.Distance.Between(player.x, player.y, this.x, this.y);
        return distance <= pickupRange;
    }

    clone(newX, newY) {
        const clone = new PlaceableObject(this.scene, newX, newY, this.texture.key, this.inventoryKey);
        clone.setScale(this.scaleX);

        clone.body.gravity.y = this.body.gravity.y;
        clone.body.setMass(this.body.mass);
        clone.body.setDrag(this.body.drag.x, this.body.drag.y);
        clone.body.setMaxVelocity(this.body.maxVelocity.x, this.body.maxVelocity.y);

        this.scene.physics.add.collider(clone, this.scene.platforms);

        return clone;
    }
    
    update() {
        
    }
}