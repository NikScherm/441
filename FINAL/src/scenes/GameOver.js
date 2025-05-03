export class GameOver extends Phaser.Scene {
    constructor() {
        super('GameOver');
    }

    create() {

        //this.cameras.main.setBackgroundColor(0xff0000);

        this.bg = this.add.image(500, 375, 'Start')
        .setOrigin(0.5, 0.5)
            .setScale(2.0);
        this.add.text(512, 384, 'Game Over', {
            fontFamily: 'Arial Black', fontSize: 64, color: '#ffffff',
            stroke: '#000000', strokeThickness: 8,
            align: 'center'
        }).setOrigin(0.5);

    }
}
