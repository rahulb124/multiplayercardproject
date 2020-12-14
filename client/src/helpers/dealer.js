import Card from './card'

export default class Dealer {
    constructor(scene) {
        this.dealCards = () => {
            let playerSprite;
            let opponentSprite;
            let myPlayer;
            console.log(scene.myPlayer);

            if(scene.myPlayer === 'A'){
                playerSprite = 'AH';
                opponentSprite = 'back';
                myPlayer = 'A';
            } else if(scene.myPlayer === 'B'){
                playerSprite = 'AH';
                opponentSprite = 'back';
                myPlayer = 'B';
            } else if(scene.myPlayer === 'C'){
                playerSprite = 'AH';
                opponentSprite = 'back';
                myPlayer = 'C';
            } else {
                playerSprite = 'AH';
                opponentSprite = 'back';
                myPlayer = 'D';
            }
            
            console.log(myPlayer);
            console.log(scene.playerAHand);
            console.log(scene.playerBHand);
            console.log(scene.playerCHand);
            console.log(scene.playerDHand);

            for(let i = 0; i < 13; i++){
                let playerCard = new Card(scene);
                if (myPlayer === 'A'){
                    playerCard.setValue(scene.playerAHand[i].Value);
                    playerCard.setSuit(scene.playerAHand[i].Suit);
                    scene.playerACards.push(playerCard);
                    playerCard.render(475 + (i*30), 650, playerSprite);

                    let opponentCCard = new Card(scene);
                    opponentCCard.setValue(scene.playerCHand[i].Value);
                    opponentCCard.setSuit(scene.playerCHand[i].Suit);
                    scene.playerCCards.push(opponentCCard.render(475+(i*30),145, opponentSprite).disableInteractive());

                    let opponentBCard = new Card(scene);
                    opponentBCard.setValue(scene.playerBHand[i].Value);
                    opponentBCard.setSuit(scene.playerBHand[i].Suit);
                    scene.playerBCards.push(opponentBCard.render(125,200+(i * 30), opponentSprite).disableInteractive());

                    let opponentDCard = new Card(scene);
                    opponentDCard.setValue(scene.playerDHand[i].Value);
                    opponentDCard.setSuit(scene.playerDHand[i].Suit);
                    scene.playerDCards.push(opponentDCard.render(1300,200+(i * 30), opponentSprite).disableInteractive());
                } else if (myPlayer === 'B'){
                    playerCard.setValue(scene.playerBHand[i].Value);
                    playerCard.setSuit(scene.playerBHand[i].Suit);
                    scene.playerBCards.push(playerCard);
                    playerCard.render(475 + (i*30), 650, playerSprite);

                    let opponentDCard = new Card(scene);
                    opponentDCard.setValue(scene.playerDHand[i].Value);
                    opponentDCard.setSuit(scene.playerDHand[i].Suit);
                    scene.playerDCards.push(opponentDCard.render(475+(i*30),145, opponentSprite).disableInteractive());

                    let opponentCCard = new Card(scene);
                    opponentCCard.setValue(scene.playerCHand[i].Value);
                    opponentCCard.setSuit(scene.playerCHand[i].Suit);
                    scene.playerCCards.push(opponentCCard.render(125,200+(i * 30), opponentSprite).disableInteractive());

                    let opponentACard = new Card(scene);
                    opponentACard.setValue(scene.playerAHand[i].Value);
                    opponentACard.setSuit(scene.playerAHand[i].Suit);
                    scene.playerACards.push(opponentACard.render(1300,200+(i * 30), opponentSprite).disableInteractive());
                } if (myPlayer === 'C'){
                    playerCard.setValue(scene.playerCHand[i].Value);
                    playerCard.setSuit(scene.playerCHand[i].Suit);
                    scene.playerCCards.push(playerCard);
                    playerCard.render(475 + (i*30), 650, playerSprite);

                    let opponentACard = new Card(scene);
                    opponentACard.setValue(scene.playerAHand[i].Value);
                    opponentACard.setSuit(scene.playerAHand[i].Suit);
                    scene.playerACards.push(opponentACard.render(475+(i*30),145, opponentSprite).disableInteractive());

                    let opponentDCard = new Card(scene);
                    opponentDCard.setValue(scene.playerDHand[i].Value);
                    opponentDCard.setSuit(scene.playerDHand[i].Suit);
                    scene.playerCCards.push(opponentDCard.render(125,200+(i * 30), opponentSprite).disableInteractive());

                    let opponentBCard = new Card(scene);
                    opponentBCard.setValue(scene.playerBHand[i].Value);
                    opponentBCard.setSuit(scene.playerBHand[i].Suit);
                    scene.playerBCards.push(opponentBCard.render(1300,200+(i * 30), opponentSprite).disableInteractive());
                } if (myPlayer === 'D'){
                    playerCard.setValue(scene.playerDHand[i].Value);
                    playerCard.setSuit(scene.playerDHand[i].Suit);
                    scene.playerDCards.push(playerCard);
                    playerCard.render(475 + (i*30), 650, playerSprite);

                    let opponentBCard = new Card(scene);
                    opponentBCard.setValue(scene.playerBHand[i].Value);
                    opponentBCard.setSuit(scene.playerBHand[i].Suit);
                    scene.playerBCards.push(opponentBCard.render(475+(i*30),145, opponentSprite).disableInteractive());

                    let opponentACard = new Card(scene);
                    opponentACard.setValue(scene.playerAHand[i].Value);
                    opponentACard.setSuit(scene.playerAHand[i].Suit);
                    scene.playerACards.push(opponentACard.render(125,200+(i * 30), opponentSprite).disableInteractive());

                    let opponentCCard = new Card(scene);
                    opponentCCard.setValue(scene.playerCHand[i].Value);
                    opponentCCard.setSuit(scene.playerCHand[i].Suit);
                    scene.playerCCards.push(opponentCCard.render(1300,200+(i * 30), opponentSprite).disableInteractive());
                }
            }




        }
    }
}