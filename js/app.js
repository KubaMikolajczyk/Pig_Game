/*
GAME RULES:

- The game has 2 players, playing in rounds
- In each turn, a player rolls a dice as many times as he whishes. Each result get added to his ROUND score
- BUT, if the player rolls a 1, all his ROUND score gets lost. After that, it's the next player's turn
- The player can choose to 'Hold', which means that his ROUND score gets added to his GLBAL score. After that, it's the next player's turn
- The first player to reach 100 points on GLOBAL score wins the game

*/

var scores, roundScore, activePlayer, gamePlaying, winningScore;

init();

document.querySelector('.input-score').addEventListener('change', function(e){
  winningScore = e.target.value;
})


document.querySelector('.btn-hold').addEventListener('click', function(){
  if(gamePlaying){
    //add current score to user total score
    scores[activePlayer] += roundScore;

    //update the UI
    document.querySelector('#score-' + activePlayer).textContent = scores[activePlayer];

    //check if player won the Game
    if(scores[activePlayer] >= winningScore){
      document.querySelector('.player-' + activePlayer + '-panel').classList.add('winner');
      document.querySelector('.player-' + activePlayer + '-panel').classList.remove('active');
      document.getElementById('name-' + activePlayer).textContent = 'WINNER!';
      gamePlaying = false;
    } else{
      //Next player
      nextPlayer();
    }
  }
})


document.querySelector('.btn-roll').addEventListener('click', function() {
  if(gamePlaying){
    //Generate random number
    dice1 = Math.floor((Math.random()*6) + 1);
    dice2 = Math.floor((Math.random()*6) + 1);

    //Display the result
    document.getElementById('dice-1').style.display = "block";
    document.getElementById('dice-2').style.display = "block";
    document.getElementById('dice-1').src = '../jpg/dice-' + dice1 + '.png';
    document.getElementById('dice-2').src = '../jpg/dice-' + dice2 + '.png';

    //Check if player didnt roll double 6
    checkForDoubleSix();

    //Update the round score but only if rolled number is not 1
    if(dice1 !== 1 && dice2 !== 1){
      //Add score
      roundScore += dice1 + dice2;
      document.querySelector('#current-' + activePlayer).textContent = roundScore;
    } else {
      nextPlayer();
    }
  }
  });

document.querySelector('.btn-new').addEventListener('click', init);

function nextPlayer(){
  //Next player
  roundScore = 0;
  activePlayer === 0 ? activePlayer = 1 : activePlayer = 0;


  document.getElementById('current-0').textContent = '0';
  document.getElementById('current-1').textContent = '0';

  document.querySelector('.player-0-panel').classList.toggle('active');
  document.querySelector('.player-1-panel').classList.toggle('active');
}

function init(){
  scores = [0,0];
  activePlayer = 0;
  roundScore = 0;
  gamePlaying = true;

  document.getElementById('dice-1').style.display = "none";
  document.getElementById('dice-2').style.display = "none";
  document.getElementById('score-0').textContent = '0';
  document.getElementById('score-1').textContent = '0';
  document.getElementById('current-0').textContent = '0';
  document.getElementById('current-1').textContent = '0';
  document.getElementById('name-0').textContent = 'Player 1';
  document.getElementById('name-1').textContent = 'Player 1';
  document.querySelector('.player-0-panel').classList.remove('active');
  document.querySelector('.player-1-panel').classList.remove('active');
  document.querySelector('.player-0-panel').classList.remove('winner');
  document.querySelector('.player-1-panel').classList.remove('winner');
  document.querySelector('.player-0-panel').classList.add('active');
}

function checkForDoubleSix(){

  //check if rolled double six
  if(dice1 === dice2 && dice1 === 6){

    //if both are six - wipe the scores
    scores[activePlayer] = 0;
    roundScore = 0
    //update UI
    document.querySelector('#score-' + activePlayer).textContent = scores[activePlayer];
    //change player
    nextPlayer();
  }}
