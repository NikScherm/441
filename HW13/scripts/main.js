const config = {
    type: Phaser.AUTO,
    width: 800,
    height: 600,
    backgroundColor: '#1d1d1d',
    scene: {
      preload: preload,
      create: create,
      update: update
    }
  };

  const game = new Phaser.Game(config);
  function preload(){

  }
  function create () {
    this.add.text(300, 250, 'helloworld', {
      font: '32px Arial',
      fill: '#ffffff'
    });
  }
  function update(){
    
  }