export default class Card{
    constructor(scene) {
        this.suit = null;
        this.value = null;
        this.dropped = false;

        this.setSuit = (suit) => {
            this.suit = suit;
        };

        this.setValue = (value) => {
            this.value = value;
        };

        this.setSprite = (sprite) => {
            this.sprite = sprite;
        };

        this.render = (x,y,sprite) => {
            let temp = this.value + this.suit;
            if(sprite !== 'back'){
                let card = scene.add.image(x,y,temp).setScale(.19,.19).setInteractive();
                scene.input.setDraggable(card);
                return card;
            } else {
                if(this.dropped === false) {
                    let card = scene.add.image(x, y, sprite).setScale(.19, .19).setInteractive();
                    scene.input.setDraggable(card);
                    return card;
                } else {
                    let card = scene.add.image(x,y,temp).setScale(.19,.19).setInteractive();
                    scene.input.setDraggable(card);
                    return card;
                }

            }
        }
    }
}