export default class Deck{
    constructor(scene) {
        const suits = ['S', 'D', 'C', 'H'];
        const values = ['2', '3', '4', '5', '6', '7', '8', '9', '10', 'J', 'Q', 'K', 'A'];

        this.getDeck = () => {
            var deck = new Array();
            for(var i = 0; i < suits.length; i++){
                for(var x = 0; x < values.length; x++){
                    var card = {Value: values[x], Suit: suits[i]};
                    deck.push(card);
                }
            }
            return deck;

        };

        this.shuffle = (deck) => {
            for (var i = 0; i < 1000; i++){
                var location1 = Math.floor((Math.random() * deck.length));
                var location2 = Math.floor((Math.random()* deck.length));
                var tmp = deck[location1];

                deck[location1] = deck[location2];
                deck[location2] = tmp;
            }
        }

    }
}