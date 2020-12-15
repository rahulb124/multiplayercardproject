const server = require('express')();
const http = require('http').createServer(server);
const io = require("socket.io")(http, {
    cors: {
        origin: "http://localhost:8080",
        methods: ["GET", "POST"]
    }
});

let players= [];
let myPlayers = [];
const suits = ['S', 'D', 'C', 'H'];
const values = ['2', '3', '4', '5', '6', '7', '8', '9', '10', 'J', 'Q', 'K', 'A'];


let current_turn = 0;
let timeOut;
let _turn = 0;
const MAX_WAITING = 60000;



function getDeck() {
    var deck = [];
    for(var i = 0; i < suits.length; i++){
        for(var x = 0; x < values.length; x++){
            var card = {Value: values[x], Suit: suits[i]};
            deck.push(card);
        }
    }
    return deck;
}

function shuffle(deck){
    for (var i = 0; i < 1000; i++){
        var location1 = Math.floor((Math.random() * deck.length));
        var location2 = Math.floor((Math.random()* deck.length));
        var tmp = deck[location1];

        deck[location1] = deck[location2];
        deck[location2] = tmp;
    }
}

function next_turn(){
    _turn = current_turn++ % myPlayers.length;
    myPlayers[_turn].emit('your_turn');
    console.log("next turn triggered " , _turn);
    switch (_turn){
        case 0:
            io.emit('whose_turn', 'A');
            break;
        case 1:
            io.emit('whose_turn', 'B');
            break;
        case 2:
            io.emit('whose_turn', 'C');
            break;
        case 3:
            io.emit('whose_turn', 'D');
    }
    triggerTimeout();
}

function triggerTimeout(){
    timeOut = setTimeout(() => {
        next_turn();
    }, MAX_WAITING);
}

function resetTimeOut(){
    if(typeof  timeOut === 'object'){
        console.log("timeout reset");
        clearTimeout(timeOut);
    }
}




io.on('connection', function (socket) {
    console.log('A user connected: ' + socket.id);
    myPlayers.push(socket);
    players.push(socket.id);
    const sessionID = socket.id;

    if(players.length === 1){
        io.emit('isPlayerA', players[0]);
    } else if(players.length === 2){
        io.emit('isPlayerB', players[1]);
    } else if(players.length === 3){
        io.emit('isPlayerC', players[2]);
    } else if(players.length === 4){
        io.emit('isPlayerD', players[3]);
    }

    if(players.length === 4){
        io.emit('isPlayerA', players[0]);
        io.emit('isPlayerB', players[1]);
        io.emit('isPlayerC', players[2]);
        io.emit('isPlayerD', players[3]);
        var theDeck = getDeck();
        shuffle(theDeck);

        var playerAHand = [];
        var playerBHand = [];
        var playerCHand = [];
        var playerDHand = [];

        for(let j = 0; j < theDeck.length;){
            playerAHand.push(theDeck[j]);
            playerBHand.push(theDeck[j+1]);
            playerCHand.push(theDeck[j+2]);
            playerDHand.push(theDeck[j+3]);
            j+=4;
        }

        io.emit('sendCards', playerAHand, playerBHand, playerCHand, playerDHand);
        io.emit('startGame');
        console.log('start the game');
    }

    socket.on('dealCards', function () {
        io.emit('dealCards');
    });

    socket.on('cardPlayed', function (gameObject, isPlayerA) {
        io.emit('cardPlayed', gameObject, isPlayerA);
    });

    socket.on('pass_turn', function () {
        if(myPlayers[_turn] === socket){
            resetTimeOut();
            next_turn();
        }
    });

    socket.on('disconnect', function () {
        console.log('A user disconnected: ' + socket.id);
        myPlayers.splice(myPlayers.indexOf(socket), 1);
        _turn--;
        console.log("Numbers of players now", players.length);
        players = players.filter(player => player !== socket.id);
    });
});

http.listen(3000, function () {
    console.log('Server started!');
});