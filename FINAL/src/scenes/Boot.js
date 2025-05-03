export class Boot extends Phaser.Scene
{
    constructor ()
    {
        super('Boot');
    }

    preload ()
    {
        this.load.image('Start', 'assets/Start.png');
    }

    create ()
    {
        this.scene.start('Preloader');
    }
}
