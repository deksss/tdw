 var socket = io(), //component for communicate with server
 	allCards = []; //arr for cards data

 //request to the server
 socket.emit('getAllCard');
 //on server  respond
 socket.on('allCard brodcast', function(data) {
 	allCards = data.cards;
 	//method for render one card  from renderCard.js
 	//used here for example
 	cardRender.neutralRender('exampleElem', allCards[0]);
 });