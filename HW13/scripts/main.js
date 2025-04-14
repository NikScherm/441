// var sunsetProgress = 0; // goes from 0 to 1
// var startColor = Phaser.Display.Color.HexStringToColor('#ffffff'); /*no tint for first level, basically sky is blue */
// var endColor = Phaser.Display.Color.HexStringToColor('#1a0033'); /*the idea is to make the sky turn dark as if it's gradually becoming night after each level*/
// var skyImage; 
// const maxLevel = 5; // this ins't max level it is only max level for the color shift

const config = {
  type: Phaser.AUTO,
  width: 800,
  height: 600,
  backgroundColor: '#1d1d1d',
  physics: {
    default: 'arcade',
    arcade: {
      gravity: { y: 600 },
      debug: false
    }
  },
  scene: {
    preload: preload,
    create: create,
    update: update
  }
};
var level = 1;
var levelText;


var player;
var spaceBar;

var bombs;
var platforms;
var cursors;
var stars;
var game = new Phaser.Game(config);
var score = 0;
var scoreText;
var gameOver = false;
function preload() {
  this.load.image('spike', 'assets/spike.png');/*spikes to be added later */
  this.load.image('coin', 'assets/coin.png');/*different sprites to gather different values */


  this.load.image('sky', 'assets/sky.png');
  this.load.image('ground', 'assets/platform.png');
  this.load.image('star', 'assets/star.png');
  this.load.image('bomb', 'assets/bomb.png');
  /*this.load.spritesheet('dude', 'assets/dude.png', { frameWidth: 32, frameHeight: 48 });*/ //replaced the sprite
  this.load.spritesheet('dude', 'assets/player.png', { frameWidth: 76, frameHeight: 127 }); /*replaced sprite with one I had made for another class artstation.com/emerald_potion */
}
const collectibleTypes = {
  star: { key: 'star', value: 10 },
  coin: { key: 'coin', value: 5 }
};

function create() {

  /*timer at start */
  this.timeElapsed = 0;
this.timerText = this.add.text(16, 16, 'Time: 0', {
  fontSize: '32px',
  fill: '#fff'
});

  //skyImage = this.add.image(400, 300, 'sky'); /* now using a var instead of just a static image */
  this.add.image(400, 300, 'sky');
  platforms = this.physics.add.staticGroup();
  platforms.create(400, 568, 'ground').setScale(2).refreshBody();

  platforms.create(600, 400, 'ground');
  platforms.create(50, 250, 'ground');
  platforms.create(750, 220, 'ground');
  /*More platforms... */
  platforms.create(-150, 400, 'ground');
  platforms.create(-120, 100, 'ground');



  /*added spikes and scale */
  spikes = this.physics.add.staticGroup();
  let spikeScale = 48 / 300;

  spikes.create(300, 532, 'spike').setScale(spikeScale).refreshBody();
  spikes.create(500, 532, 'spike').setScale(spikeScale).refreshBody();

  coins = this.physics.add.group();
  // coin scale
  let coinScale = 48 / 400;
  //coins.create(200, 150, 'coin').setScale(coinScale);
  coins.create(600, 200, 'coin').setScale(coinScale);
  // coins.create(200, 150, 'coin').setScale(coinScale).refreshBody();
  // coins.create(600, 200, 'coin').setScale(coinScale).refreshBody();

  /************* ADDING PLAYER sprite*****************************/
  player = this.physics.add.sprite(100, 450, 'player');
  player.setScale(48 / 127);

  player.body.setSize(
    player.width, 127 * (48 / 127), true
  );


  player.body.setOffset(0, 127 - 48); //otherwise body clips through platforms and objects
  /*----------------------------------------------*/
  //player = this.physics.add.sprite(100, 450, 'dude');
  player.setBounce(0.2);
  player.setCollideWorldBounds(true);

  this.anims.create({
    key: 'left',
    frames: this.anims.generateFrameNumbers('dude', { start: 0, end: 3 }),
    frameRate: 10,
    repeat: -1
  });
  this.anims.create({
    key: 'turn',
    frames: [{ key: 'dude', frame: 4 }],
    frameRate: 20,

  });
  this.anims.create({
    key: 'right',
    frames: this.anims.generateFrameNumbers('dude', { start: 5, end: 8 }),
    frameRate: 10,
    repeat: -1
  });
  cursors = this.input.keyboard.createCursorKeys();

  spaceBar = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE);/*spacebar instead of up */

  // stars = this.physics.add.group({
  //   key: 'star',
  //   repeat: 11,
  //   setXY: { x: 12, y: 0, stepX: 70 }
  // });
  stars = this.physics.add.group();

  for (let i = 0; i < 12; i++) {
    const types = Object.keys(collectibleTypes);
    const randomType = types[Phaser.Math.Between(0, types.length - 1)];
    const x = 12 + i * 70;
    const collectible = stars.create(x, 0, collectibleTypes[randomType].key);
    collectible.type = randomType;
    collectible.setBounceY(Phaser.Math.FloatBetween(0.4, 0.8));
    
    if (collectible.type === 'coin') {
      collectible.setScale(coinScale).refreshBody(); // Ensure coins are scaled
    }
  }


  stars.children.iterate(function (child) {
   
    child.setBounceY(Phaser.Math.FloatBetween(0.4, 0.8));
    child.setCollideWorldBounds(true);
    child.body.setAllowGravity(true);/*enabled grav for stars, each created will have */
    const types = Object.keys(collectibleTypes);
    const randomType = types[Phaser.Math.Between(0, types.length - 1)];
    child.setTexture(collectibleTypes[randomType].key);
    child.type = randomType;
    if (child.type === 'coin') {
      child.setScale(coinScale).refreshBody();
    } else {
      child.setScale(1).refreshBody(); // default scale for star
    }
    child.enableBody(true, child.x, 0, true, true);


  });
  bombs = this.physics.add.group();

  scoreText = this.add.text(16, 16, 'score : 0', {
    fontSize: '32px', fill: '#000'
  });
  levelText = this.add.text(16, 50, 'Level: 1', {
    fontSize: '28px', fill: '#fff'
  });

  this.physics.add.collider(bombs, platforms);
  this.physics.add.collider(stars, platforms);
  this.physics.add.collider(player, platforms);

  this.physics.add.collider(player, stars, collectStar, null, this);
  this.physics.add.collider(player, bombs, hitBomb, null, this);
  /*spike collider */
  this.physics.add.collider(player, spikes, hitSpike, null, this);
  this.physics.add.collider(stars, spikes, starHitsSpike, null, this);/*is for later to allow stars not to "hide" inside the spikes */




}
function update() {
  if (gameOver) { }
  if (cursors.left.isDown) {
    player.setVelocityX(-160);
    player.anims.play('left', true);
  } else if (cursors.right.isDown) {
    player.setVelocityX(+160);
    player.anims.play('right', true);
  } else {
    player.setVelocityX(0);
    player.anims.play('turn', true);
  }

  if (spaceBar.isDown && player.body.touching.down) {
    player.setVelocityY(-500)
  }

}
// function collectStar(player, star) {
//   star.disableBody(true, true);
//   score += 10;
//   scoreText.setText('Score: ' + score);
function collectStar(player, star) {
  star.disableBody(true, true);
  const value = collectibleTypes[star.type]?.value || 0;
  score += value;
  scoreText.setText('Score: ' + score);


  if (stars.countActive(true) === 0) {
    /*levels indicated by how many times a player succesfully collects all stars before refreshing. */
    level += 1;
    levelText.setText('Level: ' + level);

    stars.children.iterate(function (child) {
      child.enableBody(true, child.x, 0, true, true); // Re-enable the star
      child.setVelocityY(Phaser.Math.Between(100, 200)); // Add some falling velocity
    
      const types = Object.keys(collectibleTypes);
      const randomType = types[Phaser.Math.Between(0, types.length - 1)];
      child.setTexture(collectibleTypes[randomType].key);
      child.type = randomType;
    
/*rescaling the coins */
      if (child.type === 'coin') {
        child.setScale(48 / 400).refreshBody();
        child.body.setSize(child.width, child.height); 
  child.body.setOffset(0, 0); 
  child.refreshBody();
      } else {
        child.setScale(1).refreshBody(); //defaults the star size which was fine
      }
    });

    var x = (player.x < 400) ? Phaser.Math.Between(400, 800) : Phaser.Math.Between(0, 400);

    var bomb = bombs.create(x, 16, 'bomb');
    bomb.setBounce(1);
    bomb.setCollideWorldBounds(true);
    bomb.setVelocity(Phaser.Math.Between(-200, 200), 20);
    bomb.allowGravity = false;

  }




}


function hitBomb(player, bomb) {
  this.physics.pause();
  player.setTint(0xff0000);
  player.anims.play('turn');
  gameOver = true;
}
function hitSpike(player, spike) {
  this.physics.pause();
  player.setTint(0xff0000);
  player.anims.play('turn');
  gameOver = true;
}

/*This function is to make sure that player can always access stars even when they drop into spike hitbox*/

function starHitsSpike(star, spike) {
  const direction = Phaser.Math.Between(0, 1) === 0 ? -1 : 1;
  star.setVelocityX(100 * direction);
}

// let levelForTint = Phaser.Math.Clamp(level, 0, maxLevel);
//     let tintColor = Phaser.Display.Color.Interpolate.ColorWithColor(
//       startColor,
//       endColor,
//       maxLevel,
//       levelForTint
//     );
//     skyImage.setTint(Phaser.Display.Color.GetColor(tintColor.r, tintColor.g, tintColor.b));