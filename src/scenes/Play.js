class Play extends Phaser.Scene {
    constructor() {
        super("playScene");
    }
    preload() {
        //load images/tile sprites
        //this.load.image('rocket', './assets/rocket.png');
        this.load.image('torpedo', './assets/torpedo.png');
        this.load.image('submarine', './assets/submarine.png');
        this.load.image('sand','./assets/sand.jpg');
        //this.load.image('spaceship', './assets/spaceship.png');
        this.load.image('starfield', './assets/starfield.png');
        this.load.image('ocean_background', './assets/ocean_background.jpg');
        //load spritesheet
        this.load.spritesheet('explosion', './assets/explosion.png', {frameWidth: 64, frameHeight: 32, startFrame: 0, endFrame: 9});
    }
    create() {
         // place tilesprite
         this.starfield = this.add.tileSprite(0, 0, 640, 480, 'ocean_background').setOrigin(0, 0);
         // add spaceships (x3)
         this.ship01 = new Spaceship(this, game.config.width + borderUISize * 6, borderUISize*4, 'submarine', 0, 30).setOrigin(0, 0);
         this.ship02 = new Spaceship(this, game.config.width + borderUISize * 3, borderUISize * 5 + borderPadding * 2, 'submarine', 0, 20).setOrigin(0, 0);
         this.ship03 = new Spaceship(this, game.config.width, borderUISize * 6 + borderPadding*4, 'submarine', 0, 10).setOrigin(0, 0);
        // green UI background
        this.add.rectangle(0, borderUISize + borderPadding, game.config.width, borderUISize * 2, 0xFFC0CB).setOrigin(0, 0);
        // submarine borders
        this.add.tileSprite(0, 0, game.config.width, borderUISize, 'sand').setOrigin(0, 0);
        this.add.tileSprite(0, game.config.height - borderUISize, game.config.width, borderUISize, 'sand').setOrigin(0,0);
        this.add.tileSprite(0, 0, borderUISize, game.config.height, 'sand').setOrigin(0, 0);
        this.add.tileSprite(game.config.width - borderUISize, 0, borderUISize, game.config.height, 'sand').setOrigin(0, 0);
        // add rocket (p1)
        this.p1Rocket = new Rocket(this, game.config.width/2, game.config.height - borderUISize - borderPadding, 'torpedo').setOrigin(0.5, 0);
        this.p2Rocket = new Torpedo(this, game.config.width/2, game.config.height - borderUISize - borderPadding, 'torpedo').setOrigin(0.5, 0);
        // add spaceships (x3)
        // define keys
        keyUP = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.UP);
        keyR = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.R);
        keyLEFT = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.LEFT);
        keyRIGHT = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.RIGHT);
        keyW = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.W);
        //keyR = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.R);
        keyA = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.A);
        keyD = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.D);
        // animation config
        this.anims.create({
            key: 'explode',
            frames: this.anims.generateFrameNumbers('explosion', { start: 0, end: 9, first: 0}),
            frameRate: 30
        });
        // initialize score
        this.p1Score = 0;
        this.p2Score = 0;
        // display score
        let scoreConfig = {
            fontFamily: 'Courier',
            fontSize: '28px',
            backgroundColor: '#A9A9A9',
            color: '#843605',
            align: 'right',
            padding: {
                top: 5,
                bottom: 5,
            },
            fixedWidth: 100
        }
        this.scoreLeft = this.add.text(borderUISize + borderPadding, borderUISize + borderPadding*2, this.p1Score, scoreConfig);
        this.scoreRight = this.add.text(borderUISize * borderPadding+ 155, borderUISize + borderPadding*2, this.p2Score, scoreConfig);
        // GAME OVER flag
        this.gameOver = false;
        // 60-second play clock
        scoreConfig.fixedWidth = 0;
        //display clock
        let clockConfig = {
            fontFamily: 'Courier',
            fontSize: '28px',
            backgroundColor: '#A9A9A9',
            color: '#843605',
            align: 'right',
            padding: {
                top: 5,
                bottom: 5,
            },
            fixedWidth: 100
        }
        this.clock = this.time.delayedCall(game.settings.gameTimer, () => {
            this.add.text(game.config.width/2, game.config.height/2, 'GAME OVER', scoreConfig).setOrigin(0.5);
            this.add.text(game.config.width/2, game.config.height/2 + 64, 'Press (R) to Restart or <- for Menu', scoreConfig).setOrigin(0.5);
            this.gameOver = true;
        }, null, this);
    }
    update() { 
        // check key input for restart
        if (this.gameOver && Phaser.Input.Keyboard.JustDown(keyR)) {
            this.scene.restart();
        }
        if (this.gameOver && Phaser.Input.Keyboard.JustDown(keyLEFT)) {
            this.scene.start("menuScene");
        }
        this.starfield.tilePositionX -= 4;
        if (!this.gameOver) {
            this.p1Rocket.update();
            this.p2Rocket.update();
            this.ship01.update();
            this.ship02.update();
            this.ship03.update();
        }
        // check collisions
        if(this.checkCollision(this.p1Rocket, this.ship03)){
            this.p1Rocket.reset();
            this.shipExplode(this.ship03);
        }
        if(this.checkCollision(this.p1Rocket, this.ship02)){
            this.p1Rocket.reset();
            this.shipExplode(this.ship02);
        }
        if(this.checkCollision(this.p1Rocket, this.ship01)){
            this.p1Rocket.reset();
            this.shipExplode(this.ship01);
        }
        if(this.checkCollision(this.p2Rocket, this.ship03)){
            this.p2Rocket.reset();
            this.shipExplode2(this.ship03);
        }
        if(this.checkCollision(this.p2Rocket, this.ship02)){
            this.p2Rocket.reset();
            this.shipExplode2(this.ship02);
        }
        if(this.checkCollision(this.p2Rocket, this.ship01)){
            this.p2Rocket.reset();
            this.shipExplode2(this.ship01);
        }
    }
    checkCollision(rocket, ship) {
        // simple AABB checking
        if (rocket.x < ship.x + ship.width && rocket.x + rocket.width > ship.x && rocket.y < ship.y + ship.height && rocket.height + rocket.y > ship.y) {
            return true;
        } else {
            return false;
        }
    }
    shipExplode(ship) {
        // temporarily hide ship
        ship.alpha = 0;
        // create explosion sprite at ship's position
        let boom = this.add.sprite(ship.x, ship.y, 'explosion').setOrigin(0, 0);
        // play explode animation
        boom.anims.play('explode');
        // callack after anim completes
        boom.on('animationcomplete', () => {
            // reset ship position
            ship.reset();
            // make ship visible again
            ship.alpha = 1;
            // remove explosion sprite
            boom.destroy();
        });
        // score add and repaint
        this.p1Score += ship.points;
        this.scoreLeft.text = this.p1Score;
        this.sound.play('sfx_explosion');
    }
    shipExplode2(ship) {
        // temporarily hide ship
        ship.alpha = 0;
        // create explosion sprite at ship's position
        let boom = this.add.sprite(ship.x, ship.y, 'explosion').setOrigin(0, 0);
        // play explode animation
        boom.anims.play('explode');
        // callack after anim completes
        boom.on('animationcomplete', () => {
            // reset ship position
            ship.reset();
            // make ship visible again
            ship.alpha = 1;
            // remove explosion sprite
            boom.destroy();
        });
        // score add and repaint
        this.p2Score += ship.points;
        this.scoreRight.text = this.p2Score;
        this.sound.play('sfx_explosion');
    }
    
}