var cards = 0;
var cardsArray = [];
var cardClick = "";
var cardClickedNum = 0;
var cardClicked = ["", ""];
var matched = [];
var start = new Date().getTime();
function initialVar() {
  cards = 0;
  cardsArray = [];
  cardClick = "";
  cardClickedNum = 0;
  cardClicked = ["", ""];
  matched = [];
}
function startGame(cards) {
  $("#gameFinish").hide();
  start = new Date().getTime();
  cardsArray = [...Array(cards/2).keys()].concat([...Array(cards/2).keys()]);
  cardsArray = cardsArray.sort(() => Math.random() - 0.5);
  var cardsHTML = "";
  var matric = Math.sqrt(cards);
  var cardIndex = 0
  for (row = 0; row < matric; row++) {
    cardsHTML += "<div class='row'>";
    for (col = 0; col < matric; col++) {
      cardsHTML += `<div id=card${cardIndex} class='cards m-1 bg-primary border col' style='display:none'></div>`;
      cardIndex++;
    }
    cardsHTML += "</div>"
  }
  return cardsHTML
}
function placeCardsAnimation(cardId) {
  $(`#card${cardId}`).fadeIn(500);
}
function placeCards(cardsHTML) {
  $("#cardsBoard").html(cardsHTML);
  $("#cardsGame").hide();
  cardShowSeq = [...Array(cards).keys()].sort(() => Math.random() - 0.5);
  for (i = 0; i < cards; i++) {
    $(`#card${cardShowSeq[i]}`).delay(20*i).fadeIn();
  }
}
$(document).ready(function(){
  $("#easy").click(function() {
    initialVar();
    cards = 16;
    cardsHTML = startGame(cards);
    placeCards(cardsHTML);
  })
  $("#medium").click(function() {
    initialVar();
    cards = 36;
    cardsHTML = startGame(cards);
    placeCards(cardsHTML);
  })
  $("#hard").click(function() {
    initialVar();
    cards = 64;
    cardsHTML = startGame(cards);
    placeCards(cardsHTML);
  })
  $(document).on('click', '.cards', function() {
    if (matched.length < cards) {
      if (cardClick != $(this).attr('id') && !matched.includes($(this).attr('id'))) {
        $(this).removeClass("bg-primary");
        $(this).addClass("bg-success");
        cardClicked[cardClickedNum] = $(this).attr('id');
        cardClickedNum += 1;
        var cardNum = cardsArray[parseInt($(this).attr('id').replace("card",""))];
        $(this).html(`${cardNum}`);
        cardClick = $(this).attr('id');
        if (cardClickedNum == 2) {
          if ($(`#${cardClicked[0]}`).html() == $(`#${cardClicked[1]}`).html()) {
            for(i=0; i<2; i++) {
              matched.push(cardClicked[i]);
              $(`#${cardClicked[i]}`).removeClass("bg-primary border");
              $(`#${cardClicked[i]}`).addClass("bg-dark");
            }
          }
          else {
            cardClick = "";
            for(i=0; i<2; i++) {
              $(`#${cardClicked[i]}`).removeClass("bg-success");
              $(`#${cardClicked[i]}`).addClass("bg-primary");
            }
          }
          setTimeout(function() {
            for(i=0; i<2; i++) {
              $(`#${cardClicked[i]}`).html("");
            }
          }, 250);
          cardClickedNum = 0;
          if (matched.length == cards) {
            var end = new Date().getTime();
            var time = (end - start) / 1000;
            var min = Math.floor(time / 60);
            var sec = (time - min) % 60;
            $("#cardsBoard").hide();
            $('#gameFinish').show();
            $("#gameText").html(`<h3>Congratulations!!!<br>You finished in ${min} minuites ${sec} seconds.</h3>`).show();
            
          }
        }
      }
    }

  });
});
