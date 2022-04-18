class Menu extends Phaser.Scene {
    constructor() {
        super("menuScene");
    }
    preload() {
        // load audio
        //this.load.audio('sfx_select', './assets/assets_blip_select12.wav');
        this.load.audio('sfx_select', './assets/bubble.wav');
        this.load.image('sand', './assets/sand.jpg');
        //this.load.audio('sfx_explosion', './assets/assets_explosion38.wav');
        this.load.audio('sfx_explosion', './assets/sub_explosion.wav');
        //this.load.audio('sfx_rocket', './assets/assets_rocket_shot.wav');
        this.load.audio('sfx_rocket', './assets/torpedo_whoosh.wav');
        this.load.image('blue_background', './assets/blue_background.jpg');
        this.load.image('submarine_patrol_title', './assets/submarine_patrol_title.png');
    }

    create() {
        let menuConfig = {
            fontFamily: 'Courier',
            fontSize: '28px',
            backgroundColor: '#FFC0CB',
            color: '#843605',
            align: 'right',
            padding: {
                top: 5,
                bottom: 5,
            },
            fixedWidth: 0
        }
        //background
        this.background = this.add.tileSprite(0, 500, 1280, 1280, 'blue_background');
        //submarine border
        this.add.tileSprite(0, 0, game.config.width, borderUISize, 'sand').setOrigin(0, 0);
        this.add.tileSprite(0, game.config.height - borderUISize, game.config.width, borderUISize, 'sand').setOrigin(0,0);
        this.add.tileSprite(0, 0, borderUISize, game.config.height, 'sand').setOrigin(0, 0);
        this.add.tileSprite(game.config.width - borderUISize, 0, borderUISize, game.config.height, 'sand').setOrigin(0, 0);
        // show menu text
        this.logo = this.add.sprite(318,160,"submarine_patrol_title");
        //this.add.text(game.config.width/2, game.config.height/2 - borderUISize - borderPadding, 'ROCKET PATROL', {fontFamily: 'ssrfont'}, menuConfig).setOrigin(0.5);
        this.add.text(game.config.width/2, game.config.height/2, 'P1: Use <--> to move & (^) to fire', menuConfig).setOrigin(0.5);
        this.add.text(game.config.width/2, game.config.height/2 + borderUISize + borderPadding, 'P2: Use A--D to move & (W) to fire', menuConfig).setOrigin(0.5);
        menuConfig.backgroundColor = '#A9A9A9';
        menuConfig.color = '#000';
        this.add.text(game.config.width/2, game.config.height/2 + borderUISize*2 + borderPadding*2, 'Press <- for Novice, -> for Expert', menuConfig).setOrigin(0.5);
        // define keys
        keyLEFT = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.LEFT);
        keyRIGHT = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.RIGHT);
    }
    update() {
        if (Phaser.Input.Keyboard.JustDown(keyLEFT)) {
            // easy mode
            game.settings = {
                spaceshipSpeed: 3,
                gameTimer: 60000
            }
            this.sound.play('sfx_select');
            this.scene.start('playScene')
        }
        if (Phaser.Input.Keyboard.JustDown(keyRIGHT)) {
            // hard mode
            game.settings = {
                spaceshipSpeed: 4,
                gameTimer: 45000
            }
            this.sound.play('sfx_select');
            this.scene.start('playScene');
        }
    }
}