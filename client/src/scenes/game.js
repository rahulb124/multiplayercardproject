import Card from '../helpers/card';
import Zone from '../helpers/zone';
import Dealer from '../helpers/dealer'
import io from 'socket.io-client';


export default class Game extends Phaser .Scene {
    constructor() {
        super({
            key: 'Game'
        });
    }

    preload() {
        this.load.image('cyanCardFront', 'src/assets/CyanCardFront.png');
        this.load.image('cyanCardBack', 'src/assets/CyanCardBack.png');
        this.load.image('magentaCardFront', 'src/assets/MagentaCardFront.png');
        this.load.image('magentaCardBack', 'src/assets/MagentaCardBack.png');

        this.load.image('2C', 'src/png/2C.png');
        this.load.image('2D', 'src/png/2D.png');
        this.load.image('2H', 'src/png/2H.png');
        this.load.image('2S', 'src/png/2S.png');

        this.load.image('3C', 'src/png/3C.png');
        this.load.image('3D', 'src/png/3D.png');
        this.load.image('3H', 'src/png/3H.png');
        this.load.image('3S', 'src/png/3S.png');

        this.load.image('4C', 'src/png/4C.png');
        this.load.image('4D', 'src/png/4D.png');
        this.load.image('4H', 'src/png/4H.png');
        this.load.image('4S', 'src/png/4S.png');


        this.load.image('5C', 'src/png/5C.png');
        this.load.image('5D', 'src/png/5D.png');
        this.load.image('5H', 'src/png/5H.png');
        this.load.image('5S', 'src/png/5S.png');
        
        this.load.image('6C', 'src/png/6C.png');
        this.load.image('6D', 'src/png/6D.png');
        this.load.image('6H', 'src/png/6H.png');
        this.load.image('6S', 'src/png/6S.png');


        this.load.image('7C', 'src/png/7C.png');
        this.load.image('7D', 'src/png/7D.png');
        this.load.image('7H', 'src/png/7H.png');
        this.load.image('7S', 'src/png/7S.png');

        this.load.image('8C', 'src/png/8C.png');
        this.load.image('8D', 'src/png/8D.png');
        this.load.image('8H', 'src/png/8H.png');
        this.load.image('8S', 'src/png/8S.png');

        this.load.image('9C', 'src/png/9C.png');
        this.load.image('9D', 'src/png/9D.png');
        this.load.image('9H', 'src/png/9H.png');
        this.load.image('9S', 'src/png/9S.png');

        this.load.image('10C', 'src/png/10C.png');
        this.load.image('10D', 'src/png/10D.png');
        this.load.image('10H', 'src/png/10H.png');
        this.load.image('10S', 'src/png/10S.png');

        this.load.image('AC', 'src/png/AC.png');
        this.load.image('AD', 'src/png/AD.png');
        this.load.image('AH', 'src/png/AH.png');
        this.load.image('AS', 'src/png/AS.png');


        this.load.image('JC', 'src/png/JC.png');
        this.load.image('JD', 'src/png/JD.png');
        this.load.image('JH', 'src/png/JH.png');
        this.load.image('JS', 'src/png/JS.png');


        this.load.image('KC', 'src/png/KC.png');
        this.load.image('KD', 'src/png/KD.png');
        this.load.image('KH', 'src/png/KH.png');
        this.load.image('KS', 'src/png/KS.png');

        this.load.image('QC', 'src/png/QC.png');
        this.load.image('QD', 'src/png/QD.png');
        this.load.image('QH', 'src/png/QH.png');
        this.load.image('QS', 'src/png/QS.png');

        this.load.image('back', 'src/png/blue_back.png');
    }

    create() {
        let self = this;
        this.cameras.main.setBackgroundColor('#145A32');
        this.myPlayerID = '';
        this.isPlayerA = '';
        this.isPlayerB = '';
        this.isPlayerC = '';
        this.isPlayerD = '';
        this.myPlayer = '';

        this.playerACards = [];
        this.playerBCards = [];
        this.playerCCards = [];
        this.playerDCards = [];
        this.playerACards = [];
        this.playerBCards = [];
        this.playerCCards = [];
        this.playerDCards = [];


        var leftPlayer = null;
        var rightPlayer = null;
        var bottomPlayer = null;
        var topPlayer = null;

        this.zoneCards = [];

        this.opponentCards = [];
        this.zone = new Zone(this);
        this.dropZone = this.zone.renderZone();
        this.outline = this.zone.renderOutline(this.dropZone);

        this.dealer = new Dealer(this);


        this.socket = io('http://localhost:3000');


        this.socket.on('startGame', function () {
            self.socket.emit('pass_turn');
            if(self.myPlayerID === self.isPlayerA){
                self.myPlayer = 'A';
                leftPlayer = "Player B";
                rightPlayer = "Player D";
                bottomPlayer = "Player A";
                topPlayer = "Player C";
            } else if (self.myPlayerID === self.isPlayerB) {
                self.myPlayer = 'B';
                leftPlayer = "Player C";
                rightPlayer = "Player A";
                bottomPlayer = "Player B";
                topPlayer = "Player D";
            } else if (self.myPlayerID === self.isPlayerC) {
                self.myPlayer = 'C';
                leftPlayer = "Player D";
                rightPlayer = "PlayerB";
                bottomPlayer = "Player C";
                topPlayer = "Player A";
            } else if (self.myPlayerID === self.isPlayerD) {
                self.myPlayer = 'D';
                leftPlayer = "Player A";
                rightPlayer = "Player C";
                bottomPlayer = "Player D";
                topPlayer = "Player B";
            }
            console.log(self.myPlayer);

            self.dealer.dealCards();
            //self.dealer.reRenderMyCards();
            self.add.text(75, 75, leftPlayer).setFontSize(20).setFontFamily('Trebuchet MS').setColor('#d5d8dc');
            self.add.text(1250, 75, rightPlayer).setFontSize(20).setFontFamily('Trebuchet MS').setColor('#d5d8dc');
            self.add.text(625, 765, bottomPlayer).setFontSize(20).setFontFamily('Trebuchet MS').setColor('#d5d8dc');
            self.add.text(625, 10, topPlayer).setFontSize(20).setFontFamily('Trebuchet MS').setColor('#d5d8dc');
        });

        this.socket.on('sendCards', function (handA, handB, handC, handD) {
            self.playerAHand = handA;
            self.playerBHand = handB;
            self.playerCHand = handC;
            self.playerDHand = handD;

        });

        this.socket.on('connect', function () {
            console.log('Connected!');
            self.myPlayerID = self.socket.id;
        });

        this.socket.on('isPlayerA', function (socketId) {
            self.isPlayerA = socketId;
        });

        this.socket.on('isPlayerB', function (socketId) {
            self.isPlayerB = socketId;
        });

        this.socket.on('isPlayerC', function (socketId) {
            self.isPlayerC = socketId;
        });

        this.socket.on('isPlayerD', function (socketId) {
            self.isPlayerD = socketId;
        });

        this.socket.on('dealCards', function () {
            self.dealer.dealCards();
            self.dealText.disableInteractive();
        });

       this.socket.on('cardPlayed', function (gameObject, myPlayer) {
           if(myPlayer  !== self.myPlayer){
               let sprite = gameObject.textureKey;

               let split = sprite.toString().split("");
               if(myPlayer === 'A'){
                   const found = self.playerACards.find(element => element.suit === split[1] && element.value === split[0]);
                   self.playerACards.sort(function (x,y) { return x === found ? -1 : y === found ? 1 : 0;});
                   self.playerACards.shift().destroy();
               } else if(myPlayer === 'B'){
                   const found = self.playerBCards.find(element => element.suit === split[1] && element.value === split[0]);
                   self.playerBCards.sort(function (x,y) { return x === found ? -1 : y === found ? 1 : 0;});
                   self.playerBCards.shift().destroy();
               } else if(myPlayer === 'C'){
                   const found = self.playerCCards.find(element => element.suit === split[1] && element.value === split[0]);
                   self.playerCCards.sort(function (x,y) { return x === found ? -1 : y === found ? 1 : 0;});
                   self.playerCCards.shift().destroy();
               } else{
                   const found = self.playerDCards.find(element => element.suit === split[1] && element.value === split[0]);
                   self.playerDCards.sort(function (x,y) { return x === found ? -1 : y === found ? 1 : 0;});
                   self.playerDCards.shift().destroy();
               }
               self.dropZone.data.values.cards++;
               let card = new Card(self);
               card.setValue(split[0]);
               card.setSuit(split[1]);
               self.zoneCards.push(card);
               card.render(((self.dropZone.x - 250) + (self.dropZone.data.values.cards * 50)), (self.dropZone.y), 'sprite').disableInteractive();
               console.log(card);
               //card.render(((self.dropZone.x - 350) + (self.dropZone.data.values.cards * 50)), (self.dropZone.y), sprite).disableInteractive();
           }
       });


        this.socket.on('your_turn', function () {
            console.log("My turn");
        });


        function hideEndTurn() {
            self.endTurn.disableInteractive();
            self.endTurn.visible = false;
        }

        function showEndTurn() {
            self.endTurn.setInteractive();
            self.endTurn.visible = true;
        }



        this.whoseTurn = this.add.text(1000, 300, ['']).setFontSize(18).setFontFamily('Helvetica').setColor('#170202a').disableInteractive();

        this.socket.on('whose_turn', function (player) {
            self.whoseTurn.setText("Player "+player+ "'s Turn");
            self.whoseTurn.updateText();
            if (player === self.myPlayer){
                showEndTurn();
            } else {
                hideEndTurn();
            }
        });


        this.endTurn = this.add.text(1000, 360, ['End Turn']).setFontSize(18).setFontFamily('Helvetica').setColor('#170202a').setInteractive();

        this.endTurn.on('pointerover', function () {
            self.endTurn.setColor('#d5d8dc');
        });

        this.endTurn.on('pointerout', function () {
            self.endTurn.setColor('#170202a');
        });

        this.endTurn.on('pointerdown', function () {
            console.log(self.zoneCards);
            self.socket.emit('pass_turn');
       });

       this.input.on('drag', function (pointer, gameObject, dragX, dragY) {
            gameObject.x = dragX;
            gameObject.y = dragY;
       });

       this.input.on('dragstart', function (pointer, gameObject) {
            gameObject.setTint(0xff69b4);
            self.children.bringToTop(gameObject);
       });

       this.input.on('dragend', function (pointer, gameObject, dropped) {
            gameObject.setTint();
            if (!dropped) {
                gameObject.x = gameObject.input.dragStartX;
                gameObject.y = gameObject.input.dragStartY;
            }
       });

       this.input.on('drop', function (pointer, gameObject, dropZone) {
            dropZone.data.values.cards++;
            gameObject.x = (dropZone.x - 250) + (dropZone.data.values.cards * 50);
            gameObject.y = dropZone.y;
            gameObject.disableInteractive();
            self.socket.emit('cardPlayed', gameObject, self.myPlayer);
       });
    }


    update() {

    }
}