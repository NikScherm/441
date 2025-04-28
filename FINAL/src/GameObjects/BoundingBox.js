export class BoundingBox extends Phaser.GameObjects.Rectangle {
    constructor(scene, x, y, width, height, color = 0x00ff00, outlineColor = 0xff0000) {
        super(scene, x, y, width, height, color);

        
        /*physics might need to be manually appled to it later on when used 
        
        And for now, I gave the box a color for clarity when placing these objects in game
        I will later come back to this and delete the color so that it isn't visible and the image behind can be used.

        I will be using this for things like doors, trapdoors, or anything in background or foreground that can be interacted w/
        */
        this.rectangle = scene.add.rectangle(x, y, width, height, 0x00ff00);

        
 /* I will turn this on when I no longer need the visual */
        //this.rectangle.setAlpha(0);
        
        scene.physics.world.enable(this.rectangle);
        this.rectangle.body.setAllowGravity(false);
    }

    isPlayerOverlapping(player) {
        return this.scene.physics.overlap(player, this.rectangle);
    }
}
