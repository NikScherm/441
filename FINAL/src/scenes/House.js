export class House extends Phaser.Scene {

    constructor() {
        super('House');
    }

    create(){
        this.bg = this.add.image(50, 50, 'Start').setScale(1.8);
    }
}