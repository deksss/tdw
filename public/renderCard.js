var cardRender = (function() {

  var docHeight;

  function getDocHeight() {
    var D = document;
    return Math.max(
      Math.max(D.body.scrollHeight, D.documentElement.scrollHeight),
      Math.max(D.body.offsetHeight, D.documentElement.offsetHeight),
      Math.max(D.body.clientHeight, D.documentElement.clientHeight)
    );
  }

  $(window).resize(function() {
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



  renderWaysCSS = function(waysArr, cardId) {
    var atkArr = waysArr,
      sprite = '',
      minSizePostfix = '80',
      midSizePostfix = '120';

    sprite = 'assets/' + 'arrows-green-inactive';

    if (docHeight < 699) {
      sprite = sprite + minSizePostfix;
    } else if (docHeight < 999) {
      sprite = sprite + midSizePostfix;
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



  var renderCard = function(elemId, cardData) {
    if (cardData !== undefined && cardData.hasOwnProperty('hp') && cardData.hp !== '-') {
      var atkArr = [],
        assetsPatch = 'assets/' + cardData.sprite;
      $('#' + elemId + ' .unit-mid-c-hp').html(cardData.hp);
      $('#' + elemId + ' .unit-mid-c-dpt').html(cardData.atk);

      $('#' + elemId + ' .card-info').html(cardData.name +
        '<br>' +
        cardData.info + ' (price:' + cardData.cost + ')');

      $('#' + elemId + ' .unit').css('background-image', 'url(' + assetsPatch + ')');
      if (cardData.hasOwnProperty('atkZone')) {
        $('#' + elemId).fadeTo('fast', 1);
        atkArr = cardData.atkZone;
        renderWaysCSS(atkArr, elemId);
      }
    }
  };

  return {
    neutralRender: renderCard
  };
})();