var express = require('express');
var app = express();
var http = require('http').Server(app);
var io = require('socket.io')(http);
var path = require('path');

var Unit1,
    Unit2,
    Unit3,
    p1,
    p2,
    curPlayer,
    turn,
    chekRowCol,
    chekDiag,
    chekWin,
    calcDmg,
    endGame,
    selectCard,
    setCell,
    genDeck,
    getCard,
    genId,
    genid,
    wipeDied,
    data,
    gameField,
    turnCount,
    p1Score = 0,
    p2Score = 0,
    round = 0;

var Units = require('./units');
var units = new Units();
//app.get('/', function(req, res){
// res.sendFile(__dirname + '/index.html');
//});

http.listen(3001, function() {
    console.log('listening on *:3001');
});


app.use(express.static(path.join(__dirname, 'public')));


function shuffle(array) {
    var currentIndex = array.length,
        temporaryValue,
        randomIndex;
    // While there remain elements to shuffle...
    while (0 !== currentIndex) {
        // Pick a remaining element...
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex -= 1;
        // And swap it with the current element.
        temporaryValue = array[currentIndex];
        array[currentIndex] = array[randomIndex];
        array[randomIndex] = temporaryValue;
    }
    return array;
}



genId = function() {
    var id = 0;
    return function() {
        id = id + 1;
        return id;
    };
};






mageDeck = function() {
    var resultArr = [];

    resultArr = [new units.soldier(), new units.soldier(), new units.knight(), new units.knight(), 
    new units.crusaider(), new units.crusaider(), new units.ltSpearmaster(), new units.ltSpearmaster(),
    new units.swordsman(), new units.swordsman(), new units.wolf(), new units.wolf(),
        new units.badger(), new units.badger(), 
    new units.dualist(), new units.dualist(),  new units.frosbolt(), new units.frosbolt(),
     new units.fireball(), new units.hMan,
        new units.lava(), 
    ];
    resultArr = shuffle(resultArr);
    console.log('>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>');
    console.log('deck generated:');
    console.log(resultArr);
    return resultArr;
};

commanderDeck = function() {
    var resultArr = [];
    resultArr = [new units.soldier(), new units.soldier(), new units.knight(), new units.knight(),
        new units.crusaider(), new units.crusaider(), new units.ltSpearmaster(), new units.ltSpearmaster(),
        new units.swordsman(), new units.swordsman(), new units.dog(), new units.dog(),
        new units.boar(), new units.boar(),
        new units.taran(), new units.taran(),  new units.bless(), new units.bless(),
        new units.exprdKnight(),  new units.sergant(), 
        new units.catapult()
    ];
    resultArr = shuffle(resultArr);
    console.log('>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>');
    console.log('deck generated:');
    console.log(resultArr);
    return resultArr;
};

madDoctorDeck = function() {
    var resultArr = [];
    resultArr = [new units.dualist(), new units.dualist(), new units.knight(), new units.knight(),
        new units.crusaider(), new units.crusaider(), new units.ltSpearmaster(), new units.ltSpearmaster(),
        new units.swordsman(), new units.swordsman(), new units.assasin(), new units.assasin(),
        new units.exprdKnight(), new units.exprdKnight(), new units.hMan(), new units.hMan(),
        new units.loh(), new units.loh(), new units.plagueToAll(), new units.plagueToAll(),
        new units.bigPlague(), new units.paralize(), new units.paralize()
    ];
    resultArr = shuffle(resultArr);
    console.log('>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>');
    console.log('deck generated:');
    console.log(resultArr);
    return resultArr;
};


    mage = function() {
      return {
        name: 'mage',
        sprite: 'mage.png',
        info: '...',
        deck: mageDeck()
      };
    };

    commander = function() {
      return {
        name: 'commander',
        sprite: 'commander.png',
        info: '...',
        deck: commanderDeck()
      };
    };

    madDoctor = function() {
      return {
        name: 'mad doctor',
        sprite: 'commander.png',
        info: '...',
        deck: madDoctorDeck()
      };
    };

genDeck = function(arr) {
    var resultArr = arr || []; 
    resultArr = shuffle(resultArr);
    console.log('>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>');
    console.log('deck generated:');
    console.log(resultArr);
    return resultArr;
};

getCard = function(limit) {
    var getLimit = limit || 1;
    if (this.hand.c1.hp === '-' && getLimit > 0 && this.deck.length > 0) {
        this.hand.c1 = this.deck[0];
        this.deck.splice(0, 1);
        getLimit = getLimit - 1;
    }
    if (this.hand.c2.hp === '-' && getLimit > 0 && this.deck.length > 0) {
        this.hand.c2 = this.deck[0];
        this.deck.splice(0, 1);
        getLimit = getLimit - 1;
    }
    if (this.hand.c3.hp === '-' && getLimit > 0 && this.deck.length > 0) {
        this.hand.c3 = this.deck[0];
        this.deck.splice(0, 1);
        getLimit = getLimit - 1;
    }
    if (this.hand.c4.hp === '-' && getLimit > 0 && this.deck.length > 0) {
        this.hand.c4 = this.deck[0];
        this.deck.splice(0, 1);
        getLimit = getLimit - 1;
    }
    if (this.hand.c5.hp === '-' && getLimit > 0 && this.deck.length > 0) {
        this.hand.c5 = this.deck[0];
        this.deck.splice(0, 1);
        getLimit = getLimit - 1;
    }
    console.log('>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>');
    console.log('hand get card:');
    console.log(this.hand);
};



chekRowCol = function() {
    var i = 0,
        j = 0,
        l = 2,
        result = false,
        countCol = 0,
        countRow = 0;
    for (i; i <= l; i++) {
        j = 0;
        countCol = 0;
        countRow = 0;
        for (j; j <= l; j++) {
            if (gameField[i][j].hasOwnProperty('card') && gameField[i][j].card.hasOwnProperty('died') && gameField[i][j].card.died === false && gameField[i][j].playerName === curPlayer.name) {
                countRow = countRow + 1;
            }
            if (gameField[j][i].hasOwnProperty('card') && gameField[j][i].card.hasOwnProperty('died') && gameField[j][i].card.died === false && gameField[j][i].playerName === curPlayer.name) {
                countCol = countCol + 1;
            }
        }
        if (countRow === 3 || countCol === 3) {
            result = true;
            break;
        }
    }
    return result;
};

chekDiag = function() {
    if (gameField[0][0].hasOwnProperty('card') && gameField[0][0].card.hasOwnProperty('died') && gameField[0][0].card.died === false && gameField[0][0].playerName === curPlayer.name && gameField[1][1].hasOwnProperty('card') && gameField[1][1].card.hasOwnProperty('died') && gameField[1][1].card.died === false && gameField[1][1].playerName === curPlayer.name && gameField[2][2].hasOwnProperty('card') && gameField[2][2].card.hasOwnProperty('died') && gameField[2][2].card.died === false && gameField[2][2].playerName === curPlayer.name) {
        return true;
    } else if (gameField[2][0].hasOwnProperty('card') && gameField[2][0].card.hasOwnProperty('died') && gameField[2][0].card.died === false && gameField[2][0].playerName === curPlayer.name && gameField[1][1].hasOwnProperty('card') && gameField[1][1].card.hasOwnProperty('died') && gameField[1][1].card.died === false && gameField[1][1].playerName === curPlayer.name && gameField[0][2].hasOwnProperty('card') && gameField[0][2].card.hasOwnProperty('died') && gameField[0][2].card.died === false && gameField[0][2].playerName === curPlayer.name) {
        return true;
    } else {
        return false;
    }
};

chekWin = function() {
    if (chekRowCol()) {
        return true;
    } else if (chekDiag()) {
        return true;
    } else return false;
};

//роутер кастов, сам наносит урон, для остальных запускает нужные методы
var cast = function(castObj) {
    var cell = castObj.cell || '', //[row,col]
        spell = castObj.spell || '',
        dmg = spell.atk || '',
        heal = spell.heal || '',
        buff = spell.buff || '',
        debuff = spell.debuff || '',
        poison = spell.poison || '',
        type = spell.type;

    if (dmg !== '' && dmg !== '~' && cell !== '' && gameField[cell[0]][cell[1]].hasOwnProperty('card') &&
        gameField[cell[0]][cell[1]].card.hasOwnProperty('hp')) {
        gameField[cell[0]][cell[1]].card.hp = gameField[cell[0]][cell[1]].card.hp - dmg;
        console.log(spell.name + ' dmgd: ' + gameField[cell[0]][cell[1]].card.name + ' on:' + dmg);
        if (gameField[cell[0]][cell[1]].card.hp < 1) {
            gameField[cell[0]][cell[1]].card.died = true;
            gameField[cell[0]][cell[1]].card.corpse = false;
            wipeDied();
        }
        data.gameField = gameField;
        p1 = castObj.p1;
        p2 = castObj.p2;
        data.p1 = p1;
        data.p2 = p2;
        io.emit('cast brodcast', data);
    }

    if (type === "spell-buff-direct") {
        castBuff(castObj);
    }

    if (type === "spell-debuff-direct") {
        castDebuff(castObj);
    }

    if (type === "spell-poison-direct") {
        castPoison(castObj);
    }

    if (type === "spell-aoe") {
        castAoe(castObj);
    }

    if (type === "spell-debuff-aoe") {
        castAoeDebuff(castObj);
    }

    if (type === "spell-poison-all") {
        castAoePoison(castObj);
    }

};

var castDebuff = function(castObj) {
    var cell = castObj.cell || '', //[row,col]
        spell = castObj.spell || '',
        debuff = spell.debuff || '';

    if (debuff !== '' && cell !== '') {
        gameField[cell[0]][cell[1]].card.debuff = debuff;
        //console.log(spell.name + ' dmgd: ' + gameField[cell[0]][cell[1]].card.name +' on:' + dmg);     
    }
    data.gameField = gameField;
    p1 = castObj.p1;
    p2 = castObj.p2;
    data.p1 = p1;
    data.p2 = p2;
    io.emit('cast brodcast', data);
};

var castPoison = function(castObj) {
    var cell = castObj.cell || '', //[row,col]
        spell = castObj.spell || '',
        poison = spell.poison || '';

    if (poison !== '' && cell !== '') {
        gameField[cell[0]][cell[1]].card.poison = poison;
        //console.log(spell.name + ' dmgd: ' + gameField[cell[0]][cell[1]].card.name +' on:' + dmg);     
    }
    data.gameField = gameField;
    p1 = castObj.p1;
    p2 = castObj.p2;
    data.p1 = p1;
    data.p2 = p2;
    io.emit('cast brodcast', data);
};
var castBuff = function(castObj) {
    var cell = castObj.cell || '', //[row,col]
        spell = castObj.spell || '',
        buff = spell.buff || '',
        hp = buff.hp || '',
        atk = buff.atk || '',
        atkZone = buff.atkZone || '';
    console.log('buff started');
    console.log('buff: ' + buff);
    console.log('target: ' + cell);
    if (buff !== '' && cell !== '') {

        if (hp !== '') {
            gameField[cell[0]][cell[1]].card.hp = gameField[cell[0]][cell[1]].card.hp + hp;
        }
        if (atk !== '') {
            gameField[cell[0]][cell[1]].card.atk = gameField[cell[0]][cell[1]].card.atk + atk;
        }
        if (atkZone !== '') {
            gameField[cell[0]][cell[1]].card.atkZone = atkZone;
        }

    }
    data.gameField = gameField;
    p1 = castObj.p1;
    p2 = castObj.p2;
    data.p1 = p1;
    data.p2 = p2;
    console.log('buff casted');
    io.emit('cast brodcast', data);
};

var castAoe = function(castObj) {
    var spell = castObj.spell || '',
        dmg = spell.atk || '',
        heal = spell.heal || '',
        i = 0,
        j = 0,
        max = 2;
    for (i; i <= max; i++) {
        j = 0;
        for (j; j <= max; j++) {
            if (gameField[i][j].hasOwnProperty('card') && gameField[i][j].card.died === false &&
                dmg !== '') {
                gameField[i][j].card.hp = gameField[i][j].card.hp - dmg;
                console.log(spell.name + ' dmgd: ' + gameField[i][j].card.name + ' on:' + dmg);
                if (gameField[i][j].card.hp < 1) {
                    gameField[i][j].card.died = true;
                    gameField[i][j].card.corpse = false;
                    wipeDied();
                }
            }
        }
    }
    data.gameField = gameField;
    p1 = castObj.p1;
    p2 = castObj.p2;
    data.p1 = p1;
    data.p2 = p2;
    io.emit('cast brodcast', data);
};

var castAoePoison = function(castObj) {
    var spell = castObj.spell || '',
        poison = spell.poison || '',
        i = 0,
        j = 0,
        max = 2;
    for (i; i <= max; i++) {
        j = 0;
        for (j; j <= max; j++) {
            if (gameField[i][j].hasOwnProperty('card') &&
                gameField[i][j].card.died === false && poison.dmg !== '') {
                gameField[i][j].card.poisoned = poison;
                gameField[i][j].card.info = gameField[i][j].card.info + ',poisoned on:' + gameField[i][j].card.poisoned.dmg;
                //console.log(spell.name + ' dmgd: ' + gameField[i][j].card.name +' on:' + dmg);
            }
        }
    }
    data.gameField = gameField;
    p1 = castObj.p1;
    p2 = castObj.p2;
    data.p1 = p1;
    data.p2 = p2;
    io.emit('cast brodcast', data);
};

var castAoeDebuff = function(castObj) {
    var spell = castObj.spell || '',
        debuff = spell.debuff || '',
        i = 0,
        j = 0,
        max = 2;
    for (i; i <= max; i++) {
        j = 0;
        for (j; j <= max; j++) {
            if (gameField[i][j].hasOwnProperty('card') &&
                gameField[i][j].card.died === false && dmg !== '' &&
                gameField[i][j].playerName !== curPlayer.name) {
                gameField[i][j].card.debuff = debuff;
                //console.log(spell.name + ' dmgd: ' + gameField[i][j].card.name +' on:' + dmg);
            }
        }
    }
    data.gameField = gameField;
    p1 = castObj.p1;
    p2 = castObj.p2;
    data.p1 = p1;
    data.p2 = p2;
    io.emit('cast brodcast', data);
};

wipeDied = function() {
    var i = 0,
        j = 0,
        max = 2;
    for (i; i <= max; i++) {
        j = 0;
        for (j; j <= max; j++) {
            if (gameField[i][j].hasOwnProperty('card') && gameField[i][j].card.died === true) {
                if (gameField[i][j].card.corpse === true) {
                    gameField[i][j].card.hp = '';
                    gameField[i][j].card.atk = '';
                    gameField[i][j].card.atkZone = [];
                    gameField[i][j].playerName = '';
                    gameField[i][j].card.animateDirect = [0, 0];
                    gameField[i][j].card.corpse = false;
                } else {
                    gameField[i][j].card.atk = '';
                    gameField[i][j].card.corpse = true;
                }

            }
        }
    }
};

calcEnergy = function() {
    console.log(' old p1 energy:' + p1.energy + ';p2 energy:' + p2.energy);
    var i = 0,
        j = 0,
        max = 2;
    for (i; i <= max; i++) {
        j = 0;
        for (j; j <= max; j++) {
            if (gameField[i][j].hasOwnProperty('card') && gameField[i][j].card.died === false) {
                if (gameField[i][j].playerName === 'p1' && p1.energy < 10) {
                    p1.energy = p1.energy + gameField[i][j].card.engGiv;
                } else if (gameField[i][j].playerName === 'p2' && p2.energy < 10) {
                    p2.energy = p2.energy + 1;
                }
            }
        }
    }
    if (p1.energy < 0) {
        p1.energy = 0;
    }
    if (p2.energy < 0) {
        p2.energy = 0;
    }
    console.log(' new p1 energy:' + p1.energy + ';p2 energy:' + p2.energy);
};



calcDmg = function() {
    var i = 0,
        j = 0,
        max = 2,
        logStr = '';
    for (i; i <= max; i++) {
        j = 0;
        for (j; j <= max; j++) {
            if (gameField[i][j].hasOwnProperty('card')) {
                //наносим урон, вешаем дебафы, поизоны
                if (gameField[i][j].card.ready === true) {
                    var elem = gameField[i][j].card,
                        dmg = elem.atk,
                        pName = gameField[i][j].playerName,
                        n = 0,
                        atkedUnits = elem.atkZone,
                        l = atkedUnits.length,
                        atkDone = false,
                        atkCount = elem.atkCount;
                    atkedUnits = shuffle(atkedUnits);
                    for (n; n < l; n++) {
                        var way = atkedUnits[n],
                            row = i + way[0],
                            col = j + way[1];
                        if (row < 3 && col < 3 && row > -1 && col > -1 && (atkDone === false || atkCount > 1)) {
                            if (gameField[row][col].hasOwnProperty('playerName') && gameField[row][col].playerName !== pName && gameField[row][col].playerName !== '' && gameField[row][col].card.died !== true) {
                                if (gameField[i][j].card.hasOwnProperty('hit') && gameField[i][j].card.hit === 0.5) {
                                    dmg = Math.round(Math.random()) * dmg;
                                }
                                gameField[row][col].card.hp = gameField[row][col].card.hp - dmg;
                                atkDone = true;
                                atkCount = atkCount - 1;
                                gameField[i][j].card.animateDirect = way;
                                console.log('<_____________________________________________________________>');

                                logStr = '<span style="color:' + gameField[i][j].color + ';">' + gameField[i][j].playerName + 'Card: ' + gameField[i][j].card.name + ' ' + i + ',' + j +
                                    '</span>' +
                                    ' dmgd --> ' +
                                    '<span style="color:' + gameField[row][col].color + ';">' + gameField[row][col].playerName + 'Card: ' + gameField[row][col].card.name + ' ' + row + ',' + col + ' (' + dmg + ' dmg)' +
                                    '</span>';
                                io.emit('log brodcast', logStr);
                                console.log(logStr);

                                if (gameField[i][j].card.hasOwnProperty('poisonOnHit')) {
                                    gameField[row][col].card.poisoned = gameField[i][j].card.poisonOnHit;
                                }

                                if (gameField[row][col].card.hp < 1 || !(gameField[row][col].card.hp)) {
                                    gameField[row][col].card.died = true;
                                    gameField[row][col].card.corpse = false;
                                }
                            }
                        }
                    }
                    if (atkDone === false) {
                        gameField[i][j].card.animateDirect = [0, 0];
                    }
                } else {
                    gameField[i][j].card.ready = true;
                }
                //получаем урон, тикаем поизоны, статусы, вешаем бафы 
                if (gameField[i][j].card.hasOwnProperty('debuff') &&
                    gameField[i][j].card.hasOwnProperty('debuff') !== '') {
                    gameField[i][j].card.ready = gameField[i][j].card.debuff.ready;
                    gameField[i][j].card.hp = gameField[i][j].card.hp - gameField[i][j].card.debuff.hp;
                    gameField[i][j].card.debuff.time = gameField[i][j].card.debuff.time - 1;
                    if (gameField[i][j].card.debuff.time === 0) {
                        gameField[i][j].card.debuff = '';
                        gameField[i][j].card.ready = true;
                    }
                    if (gameField[i][j].card.hp < 1) {
                        gameField[i][j].card.died = true;
                        gameField[i][j].card.corpse = false;
                    }
                }
                if (gameField[i][j].card.hasOwnProperty('poisoned') &&
                    gameField[i][j].card.hasOwnProperty('poisoned') !== '') {
                    gameField[i][j].card.hp = gameField[i][j].card.hp - gameField[i][j].card.poisoned.dmg;
                    gameField[i][j].card.poisoned.time = gameField[i][j].card.poisoned.time - 1;
                    if (gameField[i][j].card.poisoned.time === 0) {
                        gameField[i][j].card.poisoned = '';
                    }
                    if (gameField[i][j].card.hp < 1) {
                        gameField[i][j].card.died = true;
                        gameField[i][j].card.corpse = false;
                    }
                }
            }
        }
    }

    wipeDied();
    data.gameField = gameField;
    // data.p1 = p1;
    // data.p2 = p2;
    //data.curPlayer = curPlayer;
};



endGame = function(who) {
    data.gameField = gameField;
    data.p1 = p1;
    data.p2 = p2;
    data.curPlayer = curPlayer;
    gameEnded = false;


    if (who !== '') {
        if (curPlayer.name === 'p1') {
            p1Score = p1Score + 1;
            if (p1Score > 1) {
                gameEnded = true;
            }
        }

        if (curPlayer.name === 'p2') {
            p2Score = p2Score + 1;
            if (p2Score > 1) {
                gameEnded = true;
            }
        }
    } else if (round > 2) {
        gameEnded = true;
    }

    data.p1Score = p1Score;
    data.p2Score = p2Score;

    io.emit('turn brodcast', data);
    console.log('>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>');
    if (who !== '') {
        console.log('win: ' + who);
    } else {
        console.log('draw: ');
    }

    if (gameEnded) {
        io.emit('end game', who);
        restart();
    } else {
        nextRound(who);
    }
};


chekWin = function() {
    if (chekRowCol()) {
        return true;
    } else if (chekDiag()) {
        return true;
    } else return false;
};

turn = function() {
    console.log(' before turn p1 energy:' + p1.energy + ';p2 energy:' + p2.energy);
    turnCount = turnCount + 1;

    p1.getCard = getCard;
    p2.getCard = getCard;

    data.p1 = p1;
    data.p2 = p2;

    if (curPlayer.name === 'p1') {
        p1.getCard(1);
    } else
    if (curPlayer.name === 'p2') {
        p2.getCard(1);
    }

    io.emit('hand brodcast', data);

    if (chekWin()) {
        endGame(curPlayer.name);
    } else if (turnCount === 18) {
        endGame('');
    } else {
        calcDmg();
        calcEnergy();
        if (curPlayer.name === 'p1') {
            curPlayer = p2;
        } else {
            curPlayer = p1;
        }
        console.log('>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>');
        console.log('feild: ');
        console.log(gameField);
        data.gameField = gameField;
        data.p1 = p1;
        data.p2 = p2;
        data.curPlayer = curPlayer;
        data.p1Score = p1Score;
        data.p2Score = p2Score;
        io.emit('turn brodcast', data);
    }
};



function start() {
    round = 0;

    p1 = {
        name: 'p1',
        color: 'green',
        hand: {
            c1: {
                hp: '-'
            },
            c2: {
                hp: '-'
            },
            c3: {
                hp: '-'
            },
            c4: {
                hp: '-'
            },
            c5: {
                hp: '-'
            }
        },
        deck: [],
        choised: false,
        energy: 1
    };

    p2 = {
        name: 'p2',
        color: 'blue',
        hand: {
            c1: {
                hp: '-'
            },
            c2: {
                hp: '-'
            },
            c3: {
                hp: '-'
            },
            c4: {
                hp: '-'
            },
            c5: {
                hp: '-'
            }
        },
        deck: [],
        choised: false,
        energy: 1
    };



    gameField = [
        ['empty', 'empty', 'empty'],
        ['empty', 'empty', 'empty'],
        ['empty', 'empty', 'empty']
    ];

    turnCount = 0;

    genid = genId();
    //  p1.deck = genDeck();
    //  p2.deck = genDeck(); 
    console.log(p1.choisenClass);
    console.log(p2.choisenClass);


    if (Math.random() > 0.50001) {
        curPlayer = p1;
        p2.energy = 2;
    } else {
        curPlayer = p2;
        p1.energy = 2;
    }

    data = {};

    data.gameField = gameField;
    data.p1 = p1;
    data.p2 = p2;
    data.curPlayer = curPlayer;

}

start();

nextRound = function(who) {
    calcDmg();
    //calcEnergy();
    round = round + 1;
    console.log(' next round');
    io.emit('next round', who);

    /*
    p1.getCard = getCard;
    p2.getCard = getCard;

        if ( curPlayer.name === 'p1') {
            p1.getCard(1);   
            curPlayer = p2;         
        } else 
        if ( curPlayer.name === 'p2') {
            p2.getCard(1);
            curPlayer = p1;
        }
        */

    data.p1 = p1;
    data.p2 = p2;

    gameField = [
        ['empty', 'empty', 'empty'],
        ['empty', 'empty', 'empty'],
        ['empty', 'empty', 'empty']
    ];
    data.gameField = gameField;
    turnCount = 0;
    //data
    io.emit('data brodcast', data);
};

restart = function() {
    round = 0;
    console.log('restart');
    var oldPlayerName = '';
    oldPlayerName = data.curPlayer.name;
    p1.score = 0;
    p2.score = 0;
    p1.energy = 0;
    p2.energy = 0;

    p1.hand = {
        c1: {
            hp: '-'
        },
        c2: {
            hp: '-'
        },
        c3: {
            hp: '-'
        },
        c4: {
            hp: '-'
        },
        c5: {
            hp: '-'
        }
    };

    p1.deck = [];

    p2.hand = {
        c1: {
            hp: '-'
        },
        c2: {
            hp: '-'
        },
        c3: {
            hp: '-'
        },
        c4: {
            hp: '-'
        },
        c5: {
            hp: '-'
        }
    };

    p2.deck = [];

    gameField = [
        ['empty', 'empty', 'empty'],
        ['empty', 'empty', 'empty'],
        ['empty', 'empty', 'empty']
    ];

    turnCount = 0;

   if (p1.choisenClass === 'mage') {
                p1.deck = new mage().deck;
            }

            if (p1.choisenClass === 'commander') {
                p1.deck = new commander().deck;
            }

            if (p1.choisenClass === 'madDoctor') {
                p1.deck = new madDoctor().deck;
            }


              if (p2.choisenClass === 'mage') {
                p2.deck = new mage().deck;
            }

            if (p2.choisenClass === 'commander') {
                p2.deck = new commander().deck;
            }

            if (p2.choisenClass === 'madDoctor') {
                p2.deck = new madDoctor().deck;
            }


    p1.getCard = getCard;
    p1.getCard(3);
    p2.getCard = getCard;
    p2.getCard(3);

    data = {};

    if (oldPlayerName === 'p1') {
        curPlayer = p2;
    } else {
        curPlayer = p1;
    }

    data.curPlayer = curPlayer;
    data.gameField = gameField;
    data.p1 = p1;
    data.p2 = p2;
    data.curPlayer = curPlayer;

    io.emit('data brodcast', data);
};

io.on('connection', function(socket) {
    io.emit('start', data);

    socket.on('end turn', function(dataClient) {
        console.log('turn polu4en');
        gameField = dataClient.gameField;
        p1 = dataClient.p1;
        p2 = dataClient.p2;
        curPlayer = dataClient.curPlayer;

        data = dataClient;
        data.gameField = gameField;
        // io.emit('field brodcast', data);

        setTimeout(function() {
            turn();
        }, 10);
    });



    socket.on('setCell send', function(dataClient) {
        console.log('setCell polu4en');
        gameField = dataClient.gameField;
        console.log(dataClient.buffOnSet);
        if (dataClient.buffOnSet !== '') {
            console.log('find target for buff');
            console.log('cur p name: ' + curPlayer.name);
            var i = 0,
                j = 0,
                max = 2,
                bfCount = dataClient.buffOnSet.count || 1;
            for (i; i <= max; i++) {
                j = 0;
                for (j; j <= max; j++) {
                    if (gameField[i][j].hasOwnProperty('card') && gameField[i][j].card.died === false) {
                        if (gameField[i][j].playerName === curPlayer.name && bfCount > 0) {
                            console.log('target for buff found');
                            bfCount = bfCount - 1;
                            castBuff({
                                spell: {
                                    buff: dataClient.buffOnSet
                                },
                                cell: [i, j]
                            });
                        }
                    }
                }
            }

        }
        p1 = dataClient.p1;
        p2 = dataClient.p2;
        curPlayer = dataClient.curPlayer;
        data = dataClient;
        data.gameField = gameField;
        console.log('on setCell  p1 energy:' + p1.energy + ';p2 energy:' + p2.energy);
        io.emit('setCell brodcast', data);
    });

    socket.on('energy spent', function(clienInfo) {
        var str = '';
        if (clienInfo.playerName === 'p1') {
            p1.energy = p1.energy - clienInfo.energy;
            str = 'p1 spent:' + clienInfo.energy;
        } else if (clienInfo.playerName === 'p2') {
            p2.energy = p2.energy - clienInfo.energy;
            str = 'p2 spent:' + clienInfo.energy;
        }
        console.log('energy spent');
        data.p1 = p1;
        data.p2 = p2;
        console.log('p1 energy:' + p1.energy + ';p2 energy:' + p2.energy);
        io.emit('energy brodcast', {
            data: data,
            str: str
        });
    });

    socket.on('cast used', function(clienInfo) {
        cast(clienInfo);
    });
 
    socket.on('getAllCard', function() {
         var allCard = units.getAll();
       //  console.log(allCard); 
          io.emit('allCard brodcast', {cards: allCard});
    });

    socket.on('conected', function(args) {
        console.log(args.choisenClass);
        
        if (args.choisenPlayer === 'p1') {
            p1.choised = true;
            p1.choisenClass = args.choisenClass;
            
            if (p1.choisenClass === 'mage') {
                p1.deck = new mage().deck;
            }

            if (p1.choisenClass === 'commander') {
                p1.deck = new commander().deck;
            }

            if (p1.choisenClass === 'madDoctor') {
                p1.deck = new madDoctor().deck;
            }
            p1.getCard = getCard;
            p1.getCard(3);
        }
        if (args.choisenPlayer === 'p2') {
            p2.choised = true;
            p2.choisenClass = args.choisenClass;
            if (p2.choisenClass === 'mage') {
                p2.deck = new mage().deck;
            }

            if (p2.choisenClass === 'commander') {
                p2.deck = new commander().deck;
            }

            if (p2.choisenClass === 'madDoctor') {
                p2.deck = new madDoctor().deck;
            }
            p2.getCard = getCard;
            p2.getCard(3);
        }

        data.p1 = p1;
        data.p2 = p2;
        io.emit('data brodcast', data);
    });

    socket.on('p1free', function() {
        io.emit('p1free brodcast', p1);
    });
});