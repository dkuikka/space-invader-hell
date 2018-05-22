import Phaser from "phaser";
import invader from "../assets/invader.png";
import invaderBig from "../assets/invader2.png";
import spaceship from "../assets/spaceship.png";
import rocket from "../assets/ball2.png";
import asteroid from "../assets/asteroid3.png";

export default class GameScene extends Phaser.Scene {
    constructor() {
        super({key: "GameScene"});
    }

    preload() {
        this.load.image("spaceship", spaceship);
        this.load.image("invader", invader);
        this.load.image("rocket", rocket);
        this.load.image("asteroid", asteroid);
        this.load.image("invaderBig", invaderBig);
    }

    create() {
        
    //    this.asteroidSprite = this.physics.add.image(550, 220, "asteroid");
        
        
        this.spaceshipSprite = this.physics.add.image(400, 300, "spaceship");
        this.invaderSprite = this.physics.add.image(400, 150, "invaderBig");
        this.invaderSprite.body.setVelocity(100, 0).setBounce(1, 1).setCollideWorldBounds(true);
        this.spaceshipSprite.setCollideWorldBounds(true);
        this.cursors = this.input.keyboard.createCursorKeys();
        this.fire = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE);
        this.scoreText = this.add.text(16, 16, 'score: 0', { fontSize: '32px', fill: '#fff' });
        this.healthpointsText = this.add.text(600, 16, 'hp: 1000', { fontSize: '32px', fill: '#fff' });
        this.waveText = this.add.text(600, 568, 'wave: 1', { fontSize: '32px', fill: '#fff' });
        this.physics.add.overlap(this.spaceshipSprite, this.invaderSprite, this.hitInvader, null, this);
        this.healthpoints = 1000;
        this.score = 0;
        this.wave = 1;
        this.gameOver = 0;
        this.speed = 200;
        this.rocketSprite = this.physics.add.image(this.spaceshipSprite.x, this.spaceshipSprite.y, "rocket")
        this.rocketSprite.setActive(false);
        this.rocketSprite.setVisible(false);
        this.physics.add.collider(this.rocketSprite, this.invaderSprite, this.shootInvader, null, this);
        this.rocketSprite2 = this.physics.add.image(this.spaceshipSprite.x, this.spaceshipSprite.y, "rocket");
        this.rocketSprite2.setActive(false);
        this.rocketSprite2.setVisible(false);
        this.physics.add.collider(this.rocketSprite2, this.invaderSprite, this.shootInvader, null, this);

        this.asteroids = this.physics.add.staticGroup();
        this.asteroids.create(220, 400, 'asteroid');
        this.asteroids.create(550, 220, 'asteroid');
        
        this.invaders = this.physics.add.group({
            key: 'invader',
            repeat: 5,
            setXY: { x: 12, y: 0, stepX: 70 }
        });
        this.invaders.children.iterate(function (child) {

            //  Give each star a slightly different bounce
            child.setVelocityX(200);
            child.setBounce(1, 1).setCollideWorldBounds(true);
            child.setVelocity(Phaser.Math.Between(-200, 200), Phaser.Math.Between(-200, 200));
        //    this.child.setVelocityX(100);
         //   child.setBounceY(Phaser.Math.FloatBetween(0.4, 0.8));
    
        });

        

        this.physics.add.overlap(this.rocketSprite, this.invaders, this.shootInvaderChild, null, this);
        this.physics.add.overlap(this.rocketSprite2, this.invaders, this.shootInvaderChild, null, this);
        this.physics.add.overlap(this.spaceshipSprite, this.invaders, this.hitInvaderChild, null, this);
        this.physics.add.overlap(this.spaceshipSprite, this.invaderSprite, this.hitInvader, null, this);
        //this.physics.add.overlap(this.spaceshipprite, this.invaders, this.HitInvaderChild, null, this);
       // this.physics.add.collider(this.invaders, WorldBounds, this.moveDown, null, this);
       //this.physics.add.collider(this.asteroidSprite, this.invaders);
       this.physics.add.collider(this.asteroids, this.invaders);
       this.physics.add.collider(this.asteroids, this.spaceshipSprite);
       this.physics.add.collider(this.asteroids, this.rocketSprite);
       this.physics.add.collider(this.asteroids, this.rocketSprite2);
       this.direction = "up";
    }

    update() {
        if (this.healthpoints < 1) {
            this.physics.pause();
            alert("Game over! Hit refresh to try again")
        }

        if (this.cursors.left.isDown)
        {
            this.spaceshipSprite.setVelocityX(0-this.speed);
            this.spaceshipSprite.setVelocityY(0);
            this.direction = "left";
        }
        else if (this.cursors.right.isDown)
        {
            this.spaceshipSprite.setVelocityX(this.speed);
            this.spaceshipSprite.setVelocityY(0);
            this.direction = "right";
        }

        if (this.cursors.up.isDown)
        {
            this.spaceshipSprite.setVelocityY(0-this.speed);
            this.spaceshipSprite.setVelocityX(0);
            this.direction = "up";
        }
        else if (this.cursors.down.isDown)
        {
            this.spaceshipSprite.setVelocityY(this.speed);
            this.spaceshipSprite.setVelocityX(0);
            this.direction = "down";
        }
        
        else if (this.spaceshipSprite.Y < 0 && this.fire.isDown)
        {
            this.spaceshipSprite.setVelocityY(150);
            this.spaceshipSprite.setVelocityX(0);
            this.rocketSprite.setVisible(true);
            this.rocketSprite.setActive(true);
            this.rocketSprite.setPosition(this.spaceshipSprite.x, this.spaceshipSprite.y);
            this.rocketSprite.setVelocityY(400);
        }

        
        
        if (this.fire.isDown){
            
            if (this.direction == "up") {
                this.rocketSprite.setVisible(true);
                this.rocketSprite.setActive(true);
                this.rocketSprite.setPosition(this.spaceshipSprite.x, this.spaceshipSprite.y);
                this.rocketSprite.setVelocityY(-400);
                this.rocketSprite.setVelocityX(0);
            }
            if (this.direction == "down") {
                this.rocketSprite.setVisible(true);
                this.rocketSprite.setActive(true);
                this.rocketSprite.setPosition(this.spaceshipSprite.x, this.spaceshipSprite.y);
                this.rocketSprite.setVelocityY(400);
                this.rocketSprite.setVelocityX(0);
            }
            if (this.direction == "left") {
                this.rocketSprite.setVisible(true);
                this.rocketSprite.setActive(true);
                this.rocketSprite.setPosition(this.spaceshipSprite.x, this.spaceshipSprite.y);
                this.rocketSprite.setVelocityX(-400);
                this.rocketSprite.setVelocityY(0);
            }
            if (this.direction == "right") {
                this.rocketSprite.setVisible(true);
                this.rocketSprite.setActive(true);
                this.rocketSprite.setPosition(this.spaceshipSprite.x, this.spaceshipSprite.y);
                this.rocketSprite.setVelocityX(400);
                this.rocketSprite.setVelocityY(0);
            }

        if (this.invaders.countActive(true) === 0){
            this.wave += 1;
            this.waveText.setText('wave: ' + this.wave);
            console.log("wave", this.wave);
            if(this.wave == 2) {
                this.invaderSprite = this.physics.add.image(400, 150, "invaderBig");
                this.invaderSprite.setVisible(true);
                this.invaderSprite.setActive(true);
                this.invaderSprite.body.setVelocity(100, 0).setBounce(1, 1).setCollideWorldBounds(true);
                this.physics.add.overlap(this.spaceshipSprite, this.invaderSprite, this.hitInvader, null, this);
                this.physics.add.collider(this.rocketSprite, this.invaderSprite, this.shootInvader, null, this);
                this.invaderSprite = this.physics.add.image(400, 150, "invaderBig");
                this.invaderSprite.body.setVelocity(100, 0).setBounce(1, 1).setCollideWorldBounds(true);
                this.invaderSprite.setVisible(true);
                this.invaderSprite.setActive(true);
                this.physics.add.overlap(this.spaceshipSprite, this.invaderSprite, this.hitInvader, null, this);
                this.physics.add.collider(this.rocketSprite, this.invaderSprite, this.shootInvader, null, this);
                this.invaders.create(100, 600, 'invader');
                this.invaders.create(100, 600, 'invader');
                this.invaders.create(100, 600, 'invader');
                this.invaders.create(100, 600, 'invader');
                this.invaders.create(100, 600, 'invader');
                this.invaders.create(100, 600, 'invader');
                this.invaders.create(100, 600, 'invader');
                this.invaders.create(100, 600, 'invader');
                this.invaders.create(100, 600, 'invader');
                this.invaders.create(100, 600, 'invader');
                this.invaders.create(100, 600, 'invader');
                this.invaders.create(100, 600, 'invader');
                this.invaderSprite.setVisible(true);
                this.invaderSprite.setActive(true);
                this.invaderSprite.setPosition(400, 300);
                this.invaderSprite.setVelocityX(300);
                this.invaderSprite.setVelocityY(300);
                this.invaderSprite.setCollideWorldBounds(true);
                this.invaderSprite.setBounce(1, 1);
                this.invaders.children.iterate(function (child) {

                    child.enableBody(true, child.x, 0, true, true);
                        
                    child.setVelocityX(200);
                    child.setBounce(1, 1).setCollideWorldBounds(true);
                    child.setVelocity(Phaser.Math.Between(-200, 200), Phaser.Math.Between(-200, 200));
                });
            }
            if(this.wave == 3) {
                this.waveText.setText('wave: ' + this.wave);
                this.invaderSprite = this.physics.add.image(400, 150, "invaderBig");
                this.invaders.create(100, 600, 'invader');
                this.invaders.create(100, 600, 'invader');
                this.invaders.create(100, 600, 'invader');
                this.invaders.create(100, 600, 'invader');
                this.invaders.create(100, 600, 'invader');
                this.invaders.create(100, 600, 'invader');
                this.invaders.create(100, 600, 'invader');
                this.invaders.create(100, 600, 'invader');
                this.invaders.create(100, 600, 'invader');
                this.invaders.create(100, 600, 'invader');
                this.invaders.create(100, 600, 'invader');
                this.invaders.create(100, 600, 'invader');
                this.invaderSprite.setVisible(true);
                this.invaderSprite.setActive(true);
                this.invaderSprite.setPosition(400, 300);
                this.invaderSprite.setVelocityX(300);
                this.invaderSprite.setVelocityY(300);
                this.invaderSprite.body.setCollideWorldBounds(true);
                this.invaderSprite.setBounce(1, 1);
                this.invaders.children.iterate(function (child) {

                    child.enableBody(true, child.x, 0, true, true);
                        
                    child.setVelocityX(200);
                    child.setBounce(1, 1).setCollideWorldBounds(true);
                    child.setVelocity(Phaser.Math.Between(-200, 200), Phaser.Math.Between(-200, 200));
                });
            }
            if(this.wave == 4) {
                this.waveText.setText('wave: ' + this.wave);
                this.invaders.create(100, 600, 'invader');
                this.invaders.create(100, 600, 'invader');
                this.invaders.create(100, 600, 'invader');
                this.invaders.create(100, 600, 'invader');
                this.invaders.create(100, 600, 'invader');
                this.invaders.create(100, 600, 'invader');
                this.invaders.create(100, 600, 'invader');
                this.invaders.create(100, 600, 'invader');
                this.invaders.create(100, 600, 'invader');
                this.invaders.create(100, 600, 'invader');
                this.invaders.create(100, 600, 'invader');
                this.invaders.create(100, 600, 'invader');
                this.invaderSprite.setVisible(true);
                this.invaderSprite.setActive(true);
                this.invaderSprite.setPosition(400, 300);
                this.invaderSprite.setVelocityX(300);
                this.invaderSprite.setVelocityY(300);
                this.invaderSprite.setCollideWorldBounds(true);
                this.invaderSprite.setBounce(1, 1);
                this.invaders.children.iterate(function (child) {

                    child.enableBody(true, child.x, 0, true, true);
                        
                    child.setVelocityX(200);
                    child.setBounce(1, 1).setCollideWorldBounds(true);
                    child.setVelocity(Phaser.Math.Between(-200, 200), Phaser.Math.Between(-200, 200));
                });
            }
            if(this.wave == 5) {
                alert("You win!")
            }
            this.invaders.children.iterate(function (child) {

                child.enableBody(true, child.x, 0, true, true);
                    
                child.setVelocityX(200);
                child.setBounce(1, 1).setCollideWorldBounds(true);
                child.setVelocity(Phaser.Math.Between(-200, 200), Phaser.Math.Between(-200, 200));
            });
        }
        }
        
    }

    hitInvader (spaceshipSprite, invaderSprite) {
        this.spaceshipSprite.setTint(0xff0000);
        this.healthpoints -= 10;
        this.healthpointsText.setText('hp: ' + this.healthpoints);
    }

    shootInvader(rocketSprite, invaderSprite) {
        this.score += 10;
        this.scoreText.setText('score: ' + this.score);
        //this.invaderSprite.setVisible(false);
        //this.invaderSprite.setActive(false);
        this.rocketSprite.setActive(false);
        this.rocketSprite.setVisible(false);
        this.invaderSprite.body.setVelocity(0, -500).setBounce(0, 0).setCollideWorldBounds(false);
    }

    shootInvaderChild(rocketSprite, invader) {
        this.score += 10;
        this.scoreText.setText('score: ' + this.score);
        invader.body.setVelocityY(-300);
        invader.disableBody(true, true);
        //this.rocketSprite.setActive(false);
        //this.rocketSprite.setVisible(false);
        //this.roccketSprite.disableBody(true, true);
        this.rocketSprite.setVisible(false);
        this.rocketSprite.setActive(false);
        this.rocketSprite.setVelocity(0, 0);
        this.rocketSprite.setPosition(0, 0);
        
    }

    hitInvaderChild (spaceshipSprite, invader) {
        this.spaceshipSprite.setTint(0xff0000);
        this.healthpoints -= 10;
        this.healthpointsText.setText('hp: ' + this.healthpoints);
    }


}