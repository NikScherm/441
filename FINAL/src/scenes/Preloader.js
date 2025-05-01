const AssetKeys = {
    HOUSE: 'HOUSE',
    BACKGROUND: 'BACKGROUND',
    BACKGROUNDCOLOR: 'BACKGROUNDCOLOR',
    LARGE_SPIKE: 'large_spike',
    MEDIUM_SPIKE: 'medium_spike',
    SMALL_SPIKE: 'small_spike',
    PLATFORM1: 'platform1',
    PLATFORM2: 'platform2',
    BUCKET: 'BUCKET',
    BARREL: 'BARREL',
    WOOD_PLAT1: 'wood_plat1'

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
        /*
        most assets are my own from my artstation project Hallow
        https://www.artstation.com/artwork/5W5zzz
        
        And the other assets are from the default tutorial phaser assets
        */
        this.load.image('invisible', 'assets/white_pixel.png');

        this.load.image('pumpkin', 'assets/pumpkin.png');

        this.load.image(AssetKeys.HOUSE, 'assets/house.png');

        this.load.image(AssetKeys.BACKGROUND, 'assets/paralax.png');
        this.load.image(AssetKeys.BACKGROUNDCOLOR, 'assets/backgroundcolor.png');

        this.load.image(AssetKeys.LARGE_SPIKE, 'assets/large_spike.png');
        this.load.image(AssetKeys.MEDIUM_SPIKE, 'assets/medium_spike.png');
        this.load.image(AssetKeys.SMALL_SPIKE, 'assets/small_spike.png');

        this.load.image(AssetKeys.PLATFORM1, 'assets/platform1.png');
        this.load.image(AssetKeys.PLATFORM2, 'assets/platform2.png');
        this.load.image(AssetKeys.WOOD_PLAT1, 'assets/wood_platform_rota.png');


        this.load.image(AssetKeys.BUCKET, 'assets/bucket.png');
        this.load.image(AssetKeys.BARREL, 'assets/barrel.png');



        this.load.image('flowers_var1', 'assets/flowers_var1.png');
        this.load.image('flowers_var2', 'assets/flower_var2.png');



        this.load.image('lantern', 'assets/lantern.png');

        this.load.image('house', 'assets/house.png');

        this.load.image('coin', 'assets/coin.png');


        this.load.image('ground', 'assets/platform.png');



        this.load.image('star', 'assets/star.png');

        this.load.spritesheet('player', 'assets/walkst.png', { frameWidth: 94, frameHeight: 145 });
        this.load.spritesheet('idle', 'assets/idlest.png', { frameWidth: 94, frameHeight: 140 });
        this.load.spritesheet('jump', 'assets/jumpst.png', { frameWidth: 94, frameHeight: 144 });
        this.load.spritesheet('push', 'assets/push.png', { frameWidth: 94, frameHeight: 145 });

        this.load.once('complete', () => {
            console.log('Assets Loaded');
        });
    }

    create() {


        this.scene.start('Game');
    }
}
