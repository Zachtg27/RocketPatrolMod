let config = {
    type: Phaser.AUTO,
    width: 640,
    height: 480,
    scene: [ Menu, Play ]
}
let game = new Phaser.Game(config);
// reserve keyboard vars
let keyUP, keyR, keyLEFT, keyRIGHT;
let keyW, keyA, keyD;
//set UI sizes
let borderUISize = game.config.height / 15;
let borderPadding = borderUISize / 3;

//Zachary Thompson, Rocket Patrol Mod, 4/18/22, 9-10 hours
//Redesign the game's artwork, UI, and sound to change its theme/aesthetic (to something other than sci-fi) (60)
            // changed game to an underwater 'submarine patrol' theme
//Implement a simultaneous two-player mode (30)
            // added another rocket and another player score so two people can play together
//Replace the UI borders with new artwork (10)
            //changed the borders of the UI to a sand texture (I removed the borders in my original redesign)

//citations
//OpenGameArt.Org artists for tilesprites
        //Keith333
        //Proxy Games
//Submarines were designed by me in Illustrator
//Sound effects from soundeffects+
//Torpedos from flaticon.com
