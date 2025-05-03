import { InventoryStore } from '../GameObjects/InventoryStore.js';

export class House extends Phaser.Scene {

    constructor() {
        super('House');
    }

    create(){
        this.bg = this.add.image(500, 375, 'Start')
        .setOrigin(0.5, 0.5)
        .setScale(2.0);


         this.pumpkinCountText = this.add.text(300, 50, 'test ', {
            fontFamily: 'Arial Black', fontSize: 18, color: '#ffffff',
            stroke: '#000000', strokeThickness: 8,
            align: 'center'
        }).setOrigin(0, 0);
        const pumpkinCount = InventoryStore.getQuantity('pumpkin');
        this.pumpkinCountText.setText('Thank you for playing !\n'+ 'You finished with '+pumpkinCount+' Pumpkins !\n Congrats !');
    }
}