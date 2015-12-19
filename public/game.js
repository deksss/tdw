      var socket = io(),
        data = {},
        gameField,
        p1,
        p2,
        curPlayer,
        renderHands,
        renderDeck,
        choisenPlayer,
        choisenClass,
        renderField,
        renderInfo,
        p1Score = 0,
        p2Score = 0,
        prevGameField = [
          ['empty', 'empty', 'empty'],
          ['empty', 'empty', 'empty'],
          ['empty', 'empty', 'empty']
        ],
        newGameFlag = true,
        fieldAmimate = [],
        cardSetLimit = 1,
        fiedlHPforRender = [],
        fiedlEmptyforRender = [],
        docHeight;

        function getDocHeight() {
        var D = document;
          return Math.max(
            Math.max(D.body.scrollHeight, D.documentElement.scrollHeight),
            Math.max(D.body.offsetHeight, D.documentElement.offsetHeight),
            Math.max(D.body.clientHeight, D.documentElement.clientHeight)
         );
      }

        $(window).resize(function(){
           docHeight = getDocHeight();
        });

      docHeight = getDocHeight();

      findArr = function(array, value) {
        for (var i = 0; i < array.length; i++) {
          if (array[i][0] === value[0] && array[i][1] === value[1]) {
            return i;
          }
        }
        return -1;
      };


      renderInfo = function() {
        var str = '',
          infoElem = document.getElementById('info');
        str = 'Ходит: ' + curPlayer.name + ', Вы: ' + choisenPlayer;
        str = str + '<br> ' + 'P1 Score: ' + p1Score + ', P2 score: ' + p2Score;
        infoElem.innerHTML = str;
      };

      renderWaysCSS = function(waysArr, cardId, playerName, ready) {
        var atkArr = waysArr,
          sprite = '',
          minSizePostfix = '80',
          midSizePostfix = '120';

        if (playerName === 'p1') {
          if (ready) {
            sprite = 'assets/' + 'arrows-green';
          } else {
            sprite = 'assets/' + 'arrows-green-inactive';
          }
        } else
        if (playerName === 'p2') {
          if (ready) {
            sprite = 'assets/' + 'arrows-blue';
          } else {
            sprite = 'assets/' + 'arrows-blue-inactive';
          }
        }
       if (docHeight < 699 ) { 
           sprite = sprite + minSizePostfix;
       } else if (docHeight < 999) {
          sprite = sprite +  midSizePostfix;
       }

        sprite = sprite + '.png';



        $('#' + cardId + ' .atk-arrows').css('background-image', 'url(' + sprite + ')');


        if (findArr(atkArr, [-1, -1]) !== -1) {
          $('#' + cardId + ' .unit-top-ul').fadeTo('fast', 1);
        } else {
          $('#' + cardId + ' .unit-top-ul').fadeTo('fast', 0);
        }

        if (findArr(atkArr, [-1, 0]) !== -1) {
          $('#' + cardId + ' .unit-top-u').fadeTo('fast', 1);
        } else {
          $('#' + cardId + ' .unit-top-u').fadeTo('fast', 0);
        }

        if (findArr(atkArr, [-1, 1]) !== -1) {
          $('#' + cardId + ' .unit-top-ur').fadeTo('fast', 1);
        } else {
          $('#' + cardId + ' .unit-top-ur').fadeTo('fast', 0);
        }

        if (findArr(atkArr, [0, -1]) !== -1) {
          $('#' + cardId + ' .unit-mid-l').fadeTo('fast', 1);
        } else {
          $('#' + cardId + ' .unit-mid-l').fadeTo('fast', 0);
        }

        if (findArr(atkArr, [0, 1]) !== -1) {
          $('#' + cardId + ' .unit-mid-r').fadeTo('fast', 1);
        } else {
          $('#' + cardId + ' .unit-mid-r').fadeTo('fast', 0);
        }

        if (findArr(atkArr, [1, -1]) !== -1) {
          $('#' + cardId + ' .unit-foot-dl').fadeTo('fast', 1);
        } else {
          $('#' + cardId + ' .unit-foot-dl').fadeTo('fast', 0);
        }

        if (findArr(atkArr, [1, 0]) !== -1) {
          $('#' + cardId + ' .unit-foot-d').fadeTo('fast', 1);
        } else {
          $('#' + cardId + ' .unit-foot-d').fadeTo('fast', 0);
        }

        if (findArr(atkArr, [1, 1]) !== -1) {
          $('#' + cardId + ' .unit-foot-dr').fadeTo('fast', 1);
        } else {
          $('#' + cardId + ' .unit-foot-dr').fadeTo('fast', 0);
        }
      };

      var atkStore = {
        store : 
        {'-1-1': '-u-l',
         '-10': '-u',
         '-11': '-u-r',
         '0-1': '-l',
         '01': '-r',
         '1-1': '-d-l',
         '10': '-d',
         '11': '-d-r'},
        getStr: function (animateDirect) {
          var x = String(animateDirect[1]) || '',
              y = String(animateDirect[0]) || '',
              key = y + x;
          return this.store[key];
        }       
      }

      //hack used, need refactor
      var animateAtk = function(atkObj) {
        var elem = atkObj.elem,
          way = atkObj.atkWaySelector;
        if (elem.hasClass(way)) {
          elem.removeClass(way);
        }
        setTimeout(function() {
          elem.addClass(way);
        }, 0);
      };

      // animateDirect[0] - y , animateDirect[1] - x
      renderAtkAnim = function(animateDirect, cardId) {
        var elem = $("#" + cardId),
          way = animateDirect,
          atkObj = {},
          cssStr = 'anim-atk';
        //prepare css class name     
        cssStr = cssStr + atkStore.getStr(animateDirect);
        //$('#' + cardId).css('z-index', '999');
        atkObj.elem = elem;
        atkObj.atkWaySelector = cssStr;
        animateAtk(atkObj);
        //  $('#' + cardId).css('z-index', '1');
      };

      var renderCardOnField = function(cardId, cardData, prevCardData, playerName, animate) {
        console.log('draw card:');
        console.log(cardId);
        var oldColor = document.getElementById(cardId).style.borderColor,
          assetsPatch = 'assets/' + cardData.sprite,
          atkArr = [],
          oldHP = $('#' + cardId + ' .unit-mid-c-hp').html();
        //$('#' + cardId + ' .unit-mid-c-hp').html(cardData.hp);
        if (oldHP !== '' && oldHP !== cardData.hp) {
          fiedlHPforRender.push({
            hp: cardData.hp,
            id: cardId
          });
        } else {
          $('#' + cardId + ' .unit-mid-c-hp').html(cardData.hp);
        }
        $('#' + cardId + ' .unit-mid-c-dpt').html(cardData.atk);
        $('#' + cardId).css('background-image', 'url(' + assetsPatch + ')');
        $('#' + cardId + ' .unit-info').html(cardData.name + '<br>' + '*' + cardData.info + '*');

        if (cardData.hasOwnProperty('atkZone')) {
          $('#' + cardId).fadeTo('fast', 1);
          atkArr = cardData.atkZone;
          renderWaysCSS(atkArr, cardId, playerName, cardData.ready);
          if (cardData.hasOwnProperty('animateDirect') && cardData.animateDirect !== [0, 0] &&
            animate === true) {
            renderAtkAnim(cardData.animateDirect, cardId);
          }
        } else {
          $('#' + cardId).fadeTo('fast', 0); // here must fire error when i use some card
        }

        if (prevCardData !== 'empty' && prevCardData.card.hasOwnProperty('hp') && prevCardData.card.hp === cardData.hp && prevCardData.card.atk === cardData.atk) {

        } else {
          $('#' + cardId).fadeTo('fast', 1);
        }
      };



      var renderCardInHands = function(cardId, cardData, playerName) {
        if (cardData !== undefined && cardData.hasOwnProperty('hp') && cardData.hp !== '-') {
          console.log(cardId);
          var result,
            atkArr = [],
            oldHTML = $('#' + cardId).html();
          assetsPatch = 'assets/' + cardData.sprite;
          $('#' + cardId + ' .unit-mid-c-hp').html(cardData.hp);
          $('#' + cardId + ' .unit-mid-c-dpt').html(cardData.atk);
          $('#' + cardId + ' .card-info').html(cardData.name + 
            '<br>' + 
             cardData.info + ' (price:' + cardData.cost + ')');
          $('#' + cardId + ' .unit').css('background-image', 'url(' + assetsPatch + ')');
          if (cardData.hasOwnProperty('atkZone')) {
            $('#' + cardId).fadeTo('fast', 1);
            atkArr = cardData.atkZone;
            renderWaysCSS(atkArr, cardId, playerName, cardData.read);
          }
          if (oldHTML !== $('#' + cardId).html()) {
            $('#' + cardId).fadeTo('fast', 1);
          }
        } else {
          $('#' + cardId).fadeTo('fast', 0);
        }
      };

      renderHandsColorDef = function() {
        if (choisenPlayer === 'p1') {
          document.getElementById('myCard1').style.borderColor = 'green';
          document.getElementById('myCard2').style.borderColor = 'green';
          document.getElementById('myCard3').style.borderColor = 'green';
          document.getElementById('myCard4').style.borderColor = 'green';
          document.getElementById('myCard5').style.borderColor = 'green';
        } else if (choisenPlayer === 'p2') {
          document.getElementById('myCard1').style.borderColor = 'blue';
          document.getElementById('myCard2').style.borderColor = 'blue';
          document.getElementById('myCard3').style.borderColor = 'blue';
          document.getElementById('myCard4').style.borderColor = 'blue';
          document.getElementById('myCard5').style.borderColor = 'blue';
        }
      };


      renderHands = function() {
        var myCard1 = 'myCard1',
          myCard2 = 'myCard2',
          myCard3 = 'myCard3',
          myCard4 = 'myCard4',
          myCard5 = 'myCard5',
          c0,
          c1,
          c2,
          c3,
          c4;

        if (choisenPlayer === 'p1') {
          c0 = p1.hand.c1;
          c1 = p1.hand.c2;
          c2 = p1.hand.c3;
          c3 = p1.hand.c4;
          c4 = p1.hand.c5;
        } else if (choisenPlayer === 'p2') {
          c0 = p2.hand.c1;
          c1 = p2.hand.c2;
          c2 = p2.hand.c3;
          c3 = p2.hand.c4;
          c4 = p2.hand.c5;
        }

        console.log(c0);
        console.log(c1);
        console.log(c2);
        console.log(c3);
        console.log(c4);

        renderCardInHands(myCard1, c0, choisenPlayer);
        renderCardInHands(myCard2, c1, choisenPlayer);
        renderCardInHands(myCard3, c2, choisenPlayer);
        renderCardInHands(myCard4, c3, choisenPlayer);
        renderCardInHands(myCard5, c4, choisenPlayer);
      };

      renderDeck = function() {
        var p1cards = p1.deck.length,
          p2cards = p2.deck.length,
          myDeckL,
          enemyDeckL,
          myEnergy,
          enemyEnergy,
          myDeckElem = document.getElementById('playerDeck'),
          enemyDeckElem = document.getElementById('enemyDeck'),
          enemyHandElemem = document.getElementById('hand-enemy'),
          myHandElemem = document.getElementById('player-hand');

        if (choisenPlayer === 'p1') {
          if (curPlayer.name === 'p1') {
            myHandElemem.classList.add('hand-active');
            enemyHandElemem.classList.remove('hand-active');
          } else {
            enemyHandElemem.classList.add('hand-active');
            myHandElemem.classList.remove('hand-active');
          }
          myDeckL = p1cards;
          enemyDeckL = p2cards;
          myEnergy = p1.energy;
          enemyEnergy = p2.energy;
        } else if (choisenPlayer === 'p2') {
          if (curPlayer.name === 'p2') {
            myHandElemem.classList.add('hand-active');
            enemyHandElemem.classList.remove('hand-active');
          } else {
            enemyHandElemem.classList.add('hand-active');
            myHandElemem.classList.remove('hand-active');
          }
          myDeckL = p2cards;
          enemyDeckL = p1cards;
          myEnergy = p2.energy;
          enemyEnergy = p1.energy;
        }

        myDeckElem.innerHTML = 'cards left in deck: ' + myDeckL +
          '<br>' + '<span style="color:pink"> energy: ' + myEnergy + '</span> ' +
          '<br>' + 'you can put cards: ' + cardSetLimit;

        enemyDeckElem.innerHTML = 'cards left in deck: ' +
          enemyDeckL + '<br>' + '<span style="color:pink"> energy: ' + enemyEnergy + '</span>';
      };

      var renderCorpsOnField = function(cardId, cardData) {
        console.log('draw corpse:');
        console.log(cardId);
        $('#' + cardId).addClass("unit-dead");
        $('#' + cardId + ' .unit-mid-c-hp').html('0');
        $('#' + cardId + ' .unit-mid-c-dpt').html('0');
      };

      renderField = function(animate) {
        var i = 0,
          j = 0,
          l = 2;
        fieldAmimate = []; //global
        fiedlHPforRender = []; //global
        fiedlEmptyforRender = []; //global
        console.log('start redner field, animate:' + animate + ', Field:');
        console.log(gameField);
        for (i; i <= l; i++) {
          for (j = 0; j <= l; j++) {
            if (gameField[i][j] !== 'empty' && gameField[i][j].card.died === false) {
              $('#' + i + '' + j).removeClass("unit-dead");
              if (animate === true && gameField[i][j].card.hasOwnProperty('animateDirect') &&
                gameField[i][j].card.animateDirect !== [0, 0]) {
                fieldAmimate.push({
                  elId: '' + i + '' + j,
                  card: gameField[i][j].card,
                  prevCard: prevGameField[i][j],
                  playerName: gameField[i][j].playerName
                });
              } else {
                if (prevGameField[i][j] !== 'empty') {
                  renderCardOnField('' + i + '' + j, gameField[i][j].card, prevGameField[i][j], gameField[i][j].playerName, animate);
                } else {
                  renderCardOnField('' + i + '' + j, gameField[i][j].card, 'empty', gameField[i][j].playerName, animate);
                }
              }
              if (gameField[i][j].playerName === 'p1') {
                document.getElementById('' + i + j).style.borderColor = "green";
              } else if (gameField[i][j].playerName === 'p2') {
                document.getElementById('' + i + j).style.borderColor = "blue";
              }
            } else if (gameField[i][j] !== 'empty' &&
              gameField[i][j].card.hasOwnProperty('corpse') &&
              gameField[i][j].card.corpse === true) {
              renderCorpsOnField('' + i + '' + j, gameField[i][j].card);

            } else {
              if (document.getElementById('' + i + '' + j).innerHTML !== '-') {
                $('#' + i + '' + j).removeClass("unit-dead");
                // document.getElementById('' + i + j).style.borderColor = "white";
                // $('#' + i + j).fadeTo('fast', 0);
                fiedlEmptyforRender.push('' + i + '' + j);
              }
            }
          }
        }
        if (animate) {
          renderFieldAnimate();
        } else {
          fiedlHPforRender.forEach(drawHP);
          fiedlEmptyforRender.forEach(drawEmpty);
        }
        prevGameField = gameField;
        newGameFlag = false;
        console.log('field rendered');
      };

      var drawEmpty = function(element, index, array) {
        var elem = element;
        document.getElementById(elem).style.borderColor = "white";
        setTimeout(function() {
          $('#' + elem).fadeTo('fast', 0);
        }, 200);
      };

      var drawHP = function(element, index, array) {
        var hp = element.hp,
          id = element.id,
          targ = $('#' + id + ' .unit-mid-c-hp');
        targ.html(hp);
        /*
            targ.animate({
          height: "+=20"
        }, 400, function() {
          targ.animate({
           height: "-=20"
          }, 400, function() {});
        });
      */
      };


      renderFieldAnimate = function() {
        var i = 0,
          count = fieldAmimate.length || 0;
        if (count > 0) {
          (function() {
            if (i < count && (fieldAmimate[i])) {
              renderCardOnField(fieldAmimate[i].elId, fieldAmimate[i].card, fieldAmimate[i].prevCard, fieldAmimate[i].playerName, true);
              i++;
              setTimeout(arguments.callee, 1000);
            } else {
              fiedlHPforRender.forEach(drawHP);

              fiedlEmptyforRender.forEach(drawEmpty);
            }
          })();
        }
      };



      renderFreeField = function() {
        var i = 0,
          j = 0,
          l = 2;
        for (i; i <= l; i++) {
          for (j = 0; j <= l; j++) {
            $('#' + '' + i + j).fadeTo('fast', 0);
          }
        }
        prevGameField = gameField;
        newGameFlag = false;
      };

      function send(dataClient) {
        socket.emit('setCell send', dataClient);
      }

      function cast(dataClient) {
        socket.emit('cast used', dataClient);
      }

      function endTurn() {
        data = {};
        curPlayer.selectedCard = '';
        data.gameField = gameField;


        if (cardSetLimit > 0) {
          if (choisenPlayer === 'p1') {
            p1.energy = p1.energy + 2;
          } else
          if (choisenPlayer === 'p2') {
            p2.energy = p2.energy + 2;
          }
        }

        data.p1 = p1;
        data.p2 = p2;

        data.curPlayer = curPlayer;
        console.log('on endTurn  p1 energy:' + p1.energy + ';p2 energy:' + p2.energy);
        socket.emit('end turn', data);

        cardSetLimit = 1;
        console.log('end turn sent');
      }

      socket.on('turn brodcast', function(data) {
        gameField = data.gameField;
        p1 = data.p1;
        p2 = data.p2;
        p1Score = data.p1Score;
        p2Score = data.p2Score;
        curPlayer = data.curPlayer;
        //renderHands();
        renderDeck();
        renderField(true);
        renderInfo();

        document.getElementById('yourTurn').innerHTML = 'Your Turn';
        if (choisenPlayer === curPlayer.name) {
          document.getElementById('yourTurn').classList.remove('hidden');
          setTimeout(function() {
            document.getElementById('yourTurn').classList.add('hidden');
          }, 1000);
          document.getElementById('endTurn').classList.remove('disabled');
        } else {
          document.getElementById('endTurn').classList.add('disabled');
        }
      });

      socket.on('setCell brodcast', function(data) {
        console.log('cell recived:');
        gameField = data.gameField;
        console.log(gameField);
        p1 = data.p1;
        p2 = data.p2;
        // p1Score = data.p1Score;
        //  p2Score = data.p2Score;
        //  curPlayer = data.curPlayer;

        renderField(false);
        renderHands();
        //  renderInfo();
        if (isThisClientTurn()) {
          document.getElementById('endTurn').classList.remove('disabled');
        }

      });

      socket.on('cast brodcast', function(data) {
        console.log('cast recived:');
        gameField = data.gameField;
        console.log(gameField);
        p1 = data.p1;
        p2 = data.p2;
        // p1Score = data.p1Score;
        //  p2Score = data.p2Score;
        //  curPlayer = data.curPlayer;

        renderField(false);
        renderHands();
        //  renderInfo();
        if (isThisClientTurn()) {
          document.getElementById('endTurn').classList.remove('disabled');
        }

      });


      socket.on('field brodcast', function(data) {
        gameField = data.gameField;
        renderField(false);
      });

      socket.on('hand brodcast', function(data) {
        p1 = data.p1;
        p2 = data.p2;
        renderHands();
      });

      socket.on('start', function(data) {
        // disablePlayerRadio(data);
        socket.emit('p1free');
      });


      socket.on('end game', function(who) {
        var text = '';
        if (info.who !== '') {
          text = 'win: ' + who;
        } else {
          text = 'draw';
        }
        document.getElementById('endGame').innerHTML = text;
        document.getElementById('endGame').classList.remove('hidden');
        setTimeout(function() {
          document.getElementById('endGame').classList.add('hidden');
        }, 1000);
        //  document.getElementById('endTurn').classList.remove('disabled');


        renderField(false);
        renderHands();
        renderInfo();
        renderDeck();
        renderHandsColorDef();
        newGameFlag = true;
      });


      socket.on('next round', function(who) {
        var text = '';
        if (who !== '') {
          text = 'round win: ' + who;
        } else {
          text = 'draw';
        }
        document.getElementById('endGame').innerHTML = text;
        document.getElementById('endGame').classList.remove('hidden');
        setTimeout(function() {
          document.getElementById('endGame').classList.add('hidden');
        }, 1500);
        //  document.getElementById('endTurn').classList.remove('disabled');

        gameField = [];
        $("#game-field").animate({
          left: "-=400"
        }, 1000, function() {
          renderField(false);
          $("#game-field").css("left", "-800px");
          $("#game-field").animate({
            left: "+=800"
          }, 1000, function() {});
        });

        renderInfo();
        newGameFlag = true;
      });

      socket.on('energy brodcast', function(serverData) {
        p1 = serverData.data.p1;
        p2 = serverData.data.p2;
        console.log('p1 e:' + p1.energy);
        console.log('p2 e:' + p2.energy);
        renderDeck();
        toLog(serverData.str);
      });

      socket.on('data brodcast', function(data) {
        gameField = [
          ['empty', 'empty', 'empty'],
          ['empty', 'empty', 'empty'],
          ['empty', 'empty', 'empty']
        ];
        gameField = data.gameField;
        console.log('game field on start raund:');
        console.log(data.gameField);
        p1 = data.p1;
        p2 = data.p2;
        curPlayer = data.curPlayer;
        renderHands();
        renderDeck();
        renderFreeField();
        renderInfo();
        renderHandsColorDef();

        if (choisenPlayer === curPlayer.name) {
          document.getElementById('yourTurn').classList.remove('hidden');
          setTimeout(function() {
            document.getElementById('yourTurn').classList.add('hidden');
          }, 1000);
          document.getElementById('endTurn').classList.remove('disabled');
        } else {
          document.getElementById('endTurn').classList.add('disabled');
        }
      });

      socket.on('log brodcast', function(str) {
        var elem = document.getElementById('log'),
          oldStr = elem.innerHTML;
        elem.innerHTML = oldStr + '</br> ' + str + '</br> ' + '********************';
        elem.scrollTop = elem.scrollHeight;
      });

      var toLog = function(str) {
        var elem = document.getElementById('log'),
          oldStr = elem.innerHTML;
        elem.innerHTML = oldStr + '</br> ' + str + '</br> ' + '********************';
        elem.scrollTop = elem.scrollHeight;
      };


      isThisClientTurn = function() {
        if (curPlayer.name === choisenPlayer) {
          return true;
        } else {
          return false;
        }
      };

      cellFree = function(row, col) {
        gameField = gameField || [
          ['empty', 'empty', 'empty'],
          ['empty', 'empty', 'empty'],
          ['empty', 'empty', 'empty']
        ];
        if (gameField[row][col] === 'empty' || gameField[row][col].card.hp === '') {
          return true;
        } else {
          return false;
        }
      };

      renderCardNotSelected = function(row, col) {
        var c1elem = document.getElementById('myCard1'),
          c2elem = document.getElementById('myCard2'),
          c3elem = document.getElementById('myCard3'),
          c4elem = document.getElementById('myCard4'),
          c5elem = document.getElementById('myCard5');
        c1elem.classList.remove('card-selected');
        c2elem.classList.remove('card-selected');
        c3elem.classList.remove('card-selected');
        c4elem.classList.remove('card-selected');
        c5elem.classList.remove('card-selected');
      };

      selectCard = function(ev) {
        if (isThisClientTurn()) {
          curPlayer.selectedCard = curPlayer.hand['c' + this.id.charAt(6)];
          curPlayer.selectedCardNumber = this.id.charAt(6);
          console.log('card selected: ');
          console.log(curPlayer.selectedCard);
          console.log('curr Player: ');
          console.log(curPlayer);
          renderCardNotSelected();
          document.getElementById(this.id).classList.add('card-selected');
          //document.getElementById(this.id).style.borderColor = red;
        }
      };

      setCell = function(ev) {
        console.log(' before set  p1 energy:' + p1.energy + ';p2 energy:' + p2.energy);
        var row = this.id.charAt(0),
          col = this.id.charAt(1),
          elem = curPlayer.selectedCard,
          energyHave;

        if (choisenPlayer === 'p1') {
          energyHave = p1.energy;
        } else
        if (choisenPlayer === 'p2') {
          energyHave = p2.energy;
        }

        if (isThisClientTurn() && elem.type === "unit" && cellFree(row, col) &&
          cardSetLimit > 0 && energyHave >= elem.cost) {
          cardSetLimit = 0;
          gameField[row][col] = {};
          gameField[row][col].playerName = curPlayer.name;
          gameField[row][col].color = curPlayer.color;
          gameField[row][col].card = elem;
          console.log('curPlayer: ');
          console.log(curPlayer.name);
          console.log('gameField:');
          console.log(gameField);
          if (curPlayer.name === 'p1') {
            p1.hand['c' + curPlayer.selectedCardNumber] = {
              hp: '-',
              atk: '-'
            };
            if (elem.hasOwnProperty('cost')) {
              p1.energy = p1.energy - elem.cost;
              socket.emit('energy spent', {
                playerName: 'p1',
                energy: elem.cost
              });
            }
          } else if (curPlayer.name === 'p2') {
            p2.hand['c' + curPlayer.selectedCardNumber] = {
              hp: '-',
              atk: '-'
            };
            if (elem.hasOwnProperty('cost')) {
              p2.energy = p2.energy - elem.cost;
              socket.emit('energy spent', {
                playerName: 'p2',
                energy: elem.cost
              });
            }
          }
          console.log('set  p1 energy:' + p1.energy + ';p2 energy:' + p2.energy);
          data = {};
          if (curPlayer.selectedCard.hasOwnProperty('buffOnSet')) {
            data.buffOnSet = curPlayer.selectedCard.buffOnSet;
          } else {
            data.buffOnSet = '';
          }
          curPlayer.selectedCard = '';
          data.gameField = gameField;
          data.p1 = p1;
          data.p2 = p2;
          data.curPlayer = curPlayer;

          send(data);
          renderCardNotSelected();

        } else

        if (isThisClientTurn() && (elem.type === "spell-direct" ||
            elem.type === "spell-aoe") &&
          energyHave >= elem.cost) {
          if (curPlayer.name === 'p1') {
            p1.hand['c' + curPlayer.selectedCardNumber] = {
              hp: '-',
              atk: '-'
            };
            if (elem.hasOwnProperty('cost')) {
              p1.energy = p1.energy - elem.cost;
              socket.emit('energy spent', {
                playerName: 'p1',
                energy: elem.cost
              });
            }
          } else if (curPlayer.name === 'p2') {
            p2.hand['c' + curPlayer.selectedCardNumber] = {
              hp: '-',
              atk: '-'
            };
            if (elem.hasOwnProperty('cost')) {
              p2.energy = p2.energy - elem.cost;
              socket.emit('energy spent', {
                playerName: 'p2',
                energy: elem.cost
              });
            }
          }

          console.log('set  p1 energy:' + p1.energy + ';p2 energy:' + p2.energy);
          data = {};
          curPlayer.selectedCard = '';
          // data.gameField = gameField;
          data.p1 = p1;
          data.p2 = p2;
          data.cell = [row, col];
          data.spell = elem;
          cast(data);
          renderCardNotSelected();
        } else

        if (isThisClientTurn() && (elem.type === "spell-buff-direct" ||
            elem.type === "spell-buff-aoe" || elem.type === "spell-debuff-direct" ||
            elem.type === "spell-debuff-aoe" ||
            elem.type === "spell-poison-direct" || elem.type === "spell-poison-all") &&
          energyHave >= elem.cost) {
          if (curPlayer.name === 'p1') {
            p1.hand['c' + curPlayer.selectedCardNumber] = {
              hp: '-',
              atk: '-'
            };
            if (elem.hasOwnProperty('cost')) {
              p1.energy = p1.energy - elem.cost;
              socket.emit('energy spent', {
                playerName: 'p1',
                energy: elem.cost
              });
            }
          } else if (curPlayer.name === 'p2') {
            p2.hand['c' + curPlayer.selectedCardNumber] = {
              hp: '-',
              atk: '-'
            };
            if (elem.hasOwnProperty('cost')) {
              p2.energy = p2.energy - elem.cost;
              socket.emit('energy spent', {
                playerName: 'p2',
                energy: elem.cost
              });
            }
          }

          console.log('set  p1 energy:' + p1.energy + ';p2 energy:' + p2.energy);
          data = {};
          curPlayer.selectedCard = '';
          // data.gameField = gameField;
          data.p1 = p1;
          data.p2 = p2;
          data.cell = [row, col];
          data.spell = elem;
          cast(data);
          renderCardNotSelected();
        }

      };

      setListerns = function() {
        document.getElementById('myCard1').
        addEventListener("click", selectCard, false);
        document.getElementById('myCard2').
        addEventListener("click", selectCard, false);
        document.getElementById('myCard3').
        addEventListener("click", selectCard, false);
        document.getElementById('myCard4').
        addEventListener("click", selectCard, false);
        document.getElementById('myCard5').
        addEventListener("click", selectCard, false);
      };


      document.getElementById('00').
      addEventListener("click", setCell, false);
      document.getElementById('01').
      addEventListener("click", setCell, false);
      document.getElementById('02').
      addEventListener("click", setCell, false);
      document.getElementById('10').
      addEventListener("click", setCell, false);
      document.getElementById('11').
      addEventListener("click", setCell, false);
      document.getElementById('12').
      addEventListener("click", setCell, false);
      document.getElementById('20').
      addEventListener("click", setCell, false);
      document.getElementById('21').
      addEventListener("click", setCell, false);
      document.getElementById('22').
      addEventListener("click", setCell, false);


      //эта дичь будет дико нагружать, нужно заменить
      $(".cell .unit").hover(function() {
        $("#" + this.id + ' .unit-info').css("opacity", "0.9");
      }, function() {
        $("#" + this.id + ' .unit-info').css("opacity", "0");
      });

      document.getElementById('endTurn').addEventListener("click", endTurn, false);


      socket.on('p1free brodcast', function(respond) {
        p1 = respond;
      });

      function startGame(event) {
        var severRespond;
        event.preventDefault();
        var gameEl = document.getElementById('game'),
          startForm = document.getElementById('start');

        //  start();

        if (p1.choised === false) {
          choisenPlayer = 'p1';
        } else {
          choisenPlayer = 'p2';
        }

        if (document.getElementById("commander").checked) {
          choisenClass = 'commander';
        }
        if (document.getElementById("mage").checked) {
          choisenClass = 'mage';
        }
        if (document.getElementById("madDoctor").checked) {
          choisenClass = 'madDoctor';
        }


        setListerns();
        socket.emit('conected', {
          choisenPlayer: choisenPlayer,
          choisenClass: choisenClass
        });
        startForm.classList.add('hidden');
        gameEl.classList.remove('hidden');
      }

      var startForm = document.getElementById('start');
      startForm.addEventListener("submit", startGame);