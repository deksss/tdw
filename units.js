
var Units = function() {
  return {
    knight : function() {
      return {
        name: 'knight',
        atk: 1,
        hp: 5,
        atkZone: [
          [-1, 0],
          [1, 0],
          [0, -1],
          [0, 1]
        ],
        died: false,
        ready: false,
        sprite: 'knight.png',
        info: '',
        cost: 1,
        engGiv: 1,
        type: 'unit',
        atkCount: 1,
        frndlyFire: false
      };
    },

    swordsman : function() {
      return {
        name: 'swordsman',
        atk: 2,
        hp: 4,
        atkZone: [
          [-1, 0],
          [1, 0],
          [0, -1],
          [0, 1]
        ],
        died: false,
        ready: false,
        sprite: 'swordman.png',
        info: '',
        cost: 1,
        engGiv: 1,
        type: 'unit',
        atkCount: 1,
        frndlyFire: false
      };
    },

      dog : function() {
      return {
        name: 'dog',
        atk: 2,
        hp: 5,
        atkZone: [
          [-1, 0],
          [1, 0],
          [0, -1]
        ],
        died: false,
        ready: false,
        sprite: 'dog.png',
        info: '',
        cost: 1,
        engGiv: 1,
        type: 'unit',
        atkCount: 1,
        frndlyFire: false
      };
    },


      wolf : function() {
      return {
        name: 'wolf',
        atk: 2,
        hp: 5,
        atkZone: [
          [-1, 0],
          [-1, 1],
          [0, 1]
        ],
        died: false,
        ready: false,
        sprite: 'wolf.png',
        info: '',
        cost: 1,
        engGiv: 1,
        type: 'unit',
        atkCount: 1,
        frndlyFire: false
      };
    },

        boar : function() {
      return {
        name: 'boar',
        atk: 2,
        hp: 5,
        atkZone: [
          [0, -1],
          [1, -1],
          [1, 0]
        ],
        died: false,
        ready: false,
        sprite: 'boar.png',
        info: '',
        cost: 1,
        engGiv: 1,
        type: 'unit',
        atkCount: 1,
        frndlyFire: false
      };
    },

            badger : function() {
      return {
        name: 'badger',
        atk: 2,
        hp: 5,
        atkZone: [
          [0, 1],
          [1, 1],
          [1, 0]
        ],
        died: false,
        ready: false,
        sprite: 'badger.png',
        info: '',
        cost: 1,
        engGiv: 1,
        type: 'unit',
        atkCount: 1,
        frndlyFire: false
      };
    },



    crusaider : function() {
      return {
        name: 'spearmaster',
        atk: 1,
        hp: 5,
        atkZone: [
          [-1, -1],
          [-1, 1],
          [1, -1],
          [1, 1]
        ],
        died: false,
        ready: false,
        sprite: 'spearmaster.png',
        info: '',
        cost: 1,
        engGiv: 1,
        type: 'unit',
        atkCount: 1,
        frndlyFire: false
      };
    },

    assasin : function() {
      return {
        name: 'assassin',
        atk: 3,
        hp: 2,
        atkZone: [
          [-1, 0],
          [1, 0],
          [0, -1],
          [0, 1],
          [-1, -1],
          [-1, 1],
          [1, -1],
          [1, 1]
        ],
        died: false,
        ready: true,
        sprite: 'assassin.png',
        info: 'charge',
        cost: 2,
        engGiv: 1,
        type: 'unit',
        atkCount: 1,
        frndlyFire: false
      };
    },

    taran : function() {
      return {
        name: 'ram',
        atk: 1,
        hp: 10,
        atkZone: [
          [-1, 0],
          [1, 0]
        ],
        died: false,
        ready: false,
        sprite: 'ram.png',
        info: '',
        cost: 2,
        engGiv: 1,
        type: 'unit',
        atkCount: 1,
        frndlyFire: false
      };
    },

    dualist : function() {
      return {
        name: 'dualist',
        atk: 5,
        hp: 4,
        atkZone: [
          [0, -1],
          [0, 1]
        ],
        died: false,
        ready: false,
        sprite: 'dualist.png',
        info: '',
        cost: 2,
        engGiv: 1,
        type: 'unit',
        atkCount: 1,
        frndlyFire: false
      };
    },

    exprdKnight : function() {
      return {
        name: 'Skilled knight',
        atk: 2,
        hp: 5,
        atkZone: [
          [-1, 0],
          [1, 0],
          [0, -1],
          [0, 1],
          [-1, -1],
          [-1, 1],
          [1, -1],
          [1, 1]
        ],
        died: false,
        ready: false,
        sprite: 'exprdKnight.png',
        info: '',
        cost: 6,
        engGiv: 1,
        type: 'unit',
        atkCount: 1,
        frndlyFire: false
      };
    },

    hMan : function() {
      return {
        name: 'Highlander',
        atk: 3,
        hp: 5,
        atkZone: [
          [-1, 0],
          [1, 0],
          [0, -1],
          [0, 1]
        ],
        died: false,
        ready: true,
        sprite: 'hMan.png',
        info: 'charge',
        cost: 6,
        engGiv: 1,
        type: 'unit',
        atkCount: 1,
        frndlyFire: false
      };
    },

    ltSpearmaster : function() {
      return {
        name: 'agile spearmaster',
        atk: 2,
        hp: 4,
        atkZone: [
          [-1, -1],
          [-1, 1],
          [1, -1],
          [1, 1]
        ],
        died: false,
        ready: false,
        sprite: 'ag-spearmaster.png',
        info: '',
        cost: 1,
        engGiv: 1,
        type: 'unit',
        atkCount: 1,
        frndlyFire: false
      };
    },

    soldier : function() {
      return {
        name: 'sldr',
        atk: 1,
        hp: 4,
        atkZone: [
          [-1, 0],
          [1, 0],
          [0, -1],
          [0, 1],
          [-1, -1],
          [-1, 1],
          [1, -1],
          [1, 1]
        ],
        died: false,
        ready: false,
        sprite: 'sldr.png',
        info: '50% miss chs',
        cost: 1,
        hit: 0.5,
        engGiv: 1,
        type: 'unit',
        atkCount: 1,
        frndlyFire: false
      };
    },

    thief : function() {
      return {
        name: 'thief',
        atk: 1,
        hp: 5,
        atkZone: [
          [-1, 0],
          [1, 0],
          [0, -1],
          [0, 1],
          [-1, -1],
          [-1, 1],
          [1, -1],
          [1, 1]
        ],
        died: false,
        ready: false,
        sprite: 'thief.png',
        info: 'stole 1 energy every turn',
        cost: 1,
        engGiv: -1,
        type: 'unit',
        atkCount: 1,
        frndlyFire: false
      };
    },

    fireball : function() {
      return {
        name: 'fireball',
        atk: 4,
        hp: '~',
        atkZone: [
          [0, 0]
        ], //one cell
        died: false,
        ready: true,
        sprite: 'fireball.png',
        info: '4 dmg to unit',
        cost: 6,
        engGiv: 0,
        type: 'spell-direct',
        atkCount: 1
      };
    },

    frosbolt : function() {
      return {
        name: 'frosbolt',
        atk: 2,
        hp: '~',
        atkZone: [
          [0, 0]
        ], //one cell
        died: false,
        ready: true,
        sprite: 'frostblot.gif',
        info: '2 dmg to unit',
        cost: 2,
        engGiv: 0,
        type: 'spell-direct',
        atkCount: 1
      };
    },

    blizzard : function() {
      return {
        name: 'blizzard',
        atk: 4,
        hp: '~',
        atkZone: [
          [0, 0]
        ], //one cell
        died: false,
        ready: true,
        sprite: 'blizzard.png',
        info: '4 dmg to all unit',
        cost: 10,
        engGiv: 0,
        type: 'spell-aoe',
        atkCount: 1
      };
    },

    plagueToAll : function() {
      return {
        name: 'mass pizdec',
        atk: '~',
        hp: '~',
        atkZone: [
          [0, 0]
        ], //one cell
        died: false,
        ready: true,
        sprite: 'massPizdec.png',
        info: 'dot 2 dmg 10 turn',
        cost: 10,
        engGiv: 0,
        type: 'spell-poison-all',
        atkCount: 0,
        poison: {
          dmg: 2,
          time: 10
        },
      };
    },

    paralize : function() {
      return {
        name: 'paralize',
        atk: '~',
        hp: '~',
        atkZone: [
          [0, 0]
        ], //one cell
        died: false,
        ready: true,
        sprite: 'paralize.png',
        info: 'unit cant atak 1 turn and gives 1 dmg',
        cost: 2,
        engGiv: 0,
        type: 'spell-debuff-direct',
        atkCount: 1,
        debuff: {
          ready: false,
          time: 1,
          hp: 1
        }
      };
    },

    bless : function() {
      return {
        name: 'bless',
        atk: '~',
        hp: '~',
        atkZone: [
          [0, 0]
        ], //one cell
        died: false,
        ready: true,
        sprite: 'bless.png',
        info: 'unit can atk in all way & +1 to atk',
        cost: 2,
        engGiv: 0,
        type: 'spell-buff-direct',
        atkCount: 1,
        buff: {
          atk: 1,
          atkZone: [
            [-1, 0],
            [1, 0],
            [0, -1],
            [0, 1],
            [-1, -1],
            [-1, 1],
            [1, -1],
            [1, 1]
          ]
        }
      };
    },


    loh : function() {
      return {
        name: 'loh chumnoy',
        atk: 1,
        hp: 4,
        atkZone: [
          [-1, 0],
          [1, 0],
          [0, -1],
          [0, 1]
        ],
        died: false,
        ready: false,
        sprite: 'loh.jpg',
        info: 'poisoned 1 dmg on 3 turn',
        cost: 2,
        type: 'unit',
        poisonOnHit: {
          dmg: 1,
          time: 3
        },
        engGiv: 1,
        atkCount: 1,
        frndlyFire: false
      };
    },

    bigPlague : function() {
      return {
        name: 'Plague Gigant',
        atk: 4,
        hp: 10,
        atkZone: [
          [-1, 0],
          [1, 0],
          [0, -1],
          [0, 1],
          [-1, -1],
          [-1, 1],
          [1, -1],
          [1, 1]
        ],
        died: false,
        ready: false,
        sprite: 'bigPlague.jpg',
        info: '',
        cost: 10,
        engGiv: 1,
        type: 'unit',
        atkCount: 1,
        frndlyFire: false
      };
    },

    catapult : function() {
      return {
        name: 'catapult',
        atk: 4,
        hp: 6,
        atkZone: [
          [-1, 0],
          [1, 0],
          [0, -1],
          [0, 1],
          [-1, -1],
          [-1, 1],
          [1, -1],
          [1, 1],
          [-2, -2],
          [-2, -1],
          [-2, 0],
          [-2, 1],
          [-2, 2],
          [-1, -2],
          [-1, 2],
          [0, -2],
          [0, 2],
          [1, -2],
          [1, 2],
          [2, -2],
          [2, -1],
          [2, 0],
          [2, 1],
          [2, 2],
        ],
        died: false,
        ready: false,
        sprite: 'catapult.png',
        info: 'can atk enemy on any cell',
        cost: 10,
        engGiv: 1,
        type: 'unit',
        atkCount: 1,
        frndlyFire: false
      };
    },

    sergant : function() {
      return {
        name: 'sergant',
        atk: 1,
        hp: 5,
        atkZone: [
          [-1, 0],
          [1, 0],
          [0, -1],
          [0, 1]
        ],
        died: false,
        ready: false,
        sprite: 'sergant.png',
        info: 'add +2|+2 to random frndly unit on board',
        cost: 6,
        type: 'unit',
        buffOnSet: {
          atk: 2,
          hp: 2,
          target: 'random',
          count: 1
        },
        engGiv: 1,
        atkCount: 1,
        frndlyFire: false
      };
    },

    lava : function() {
      return {
        name: 'lava',
        atk: 5,
        hp: 5,
        atkZone: [
          [-1, 0],
          [1, 0],
          [0, -1],
          [0, 1],
          [-1, -1],
          [-1, 1],
          [1, -1],
          [1, 1]
        ],
        died: false,
        ready: false,
        sprite: 'lava.png',
        info: 'atk all around',
        cost: 10,
        engGiv: -1,
        type: 'unit',
        atkCount: 8,
        frndlyFire: true
      };
    },

    getAll : function () {
      var allProp = Object.getOwnPropertyNames( this ),
      allUnits = [],
      that = this,
      card;
      allProp.forEach(function(element) { 
        if ( typeof that[element] === "function" && 
          element !== "getAll" && 
          that[element]().hasOwnProperty("info") ) {
          card = that[element];
          card = card();
          allUnits.push( card );
        }
      });
      return allUnits;
    }
  }
};



module.exports = Units;