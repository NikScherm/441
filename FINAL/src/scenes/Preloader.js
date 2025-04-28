const AssetKeys = {
    HOUSE: 'HOUSE',
    BACKGROUND: 'BACKGROUND',
    BACKGROUNDCOLOR: 'BACKGROUNDCOLOR'
    // BACKGROUND:'BACKGROUND',
    // BACKGROUND:'BACKGROUND'
}
export class Preloader extends Phaser.Scene {
    constructor() {
        super('Preloader');
    }

    init() {
        this.add.image(512, 384, 'bg');

        this.add.rectangle(512, 384, 468, 32).setStrokeStyle(1, 0xffffff);

        const bar = this.add.rectangle(512 - 230, 384, 4, 28, 0xffffff);

        this.load.on('progress', (progress) => {

            
            bar.width = 4 + (460 * progress);

        });
    }

    preload() {

        this.load.image(AssetKeys.HOUSE, 'assets/house.png');

        this.load.image(AssetKeys.BACKGROUND, 'assets/paralax.png');
        this.load.image(AssetKeys.BACKGROUNDCOLOR, 'assets/backgroundcolor.png');

        this.load.image('house', 'assets/house.png');

        this.load.image('spike', 'assets/spike.png');
        this.load.image('coin', 'assets/coin.png');


        this.load.image('sky', 'assets/sky.png');
        this.load.image('ground', 'assets/platform.png');
        this.load.image('platform1', 'assets/platform1.png');
        this.load.image('platform2', 'assets/platform2.png');


        this.load.image('star', 'assets/star.png');
        this.load.image('bomb', 'assets/bomb.png');

        this.load.spritesheet('player', 'assets/walkst.png', { frameWidth: 94, frameHeight: 145 });
        this.load.spritesheet('idle', 'assets/idlest.png', { frameWidth: 94, frameHeight: 140 });
        this.load.spritesheet('jump', 'assets/jumpst.png', { frameWidth: 94, frameHeight: 144 });

        this.load.once('complete', () => {
            console.log('Assets Loaded');
        });
    }

    create() {
        

        this.scene.start('Game');
    }
}
