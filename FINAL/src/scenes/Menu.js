export class Menu extends Phaser.Scene {
    constructor() {
        super('Menu');
    }





    create() {
        this.menuImage = this.add.image(500, 300, 'Start').setScale(1.6);
        this.add.text(425, 400, 'Press Space\n   to ', {
            fontFamily: 'Arial Black', fontSize: 18, color: '#ffffff',
            stroke: '#000000', strokeThickness: 8,
            align: 'center'
        }).setOrigin(0, 0);
        this.spaceBar = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE);

    }
    update() {
        if (Phaser.Input.Keyboard.JustDown(this.spaceBar)) {
                    this.time.delayedCall(100, () => this.scene.start('Game'))
        }
    }
}

