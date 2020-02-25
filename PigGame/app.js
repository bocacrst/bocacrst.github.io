/*
GAME RULES:

- The game has 2 players, playing in rounds
- In each turn, a player rolls a dice as many times as he whishes. Each result get added to his ROUND score
- BUT, if the player rolls a 1, all his ROUND score gets lost. After that, it's the next player's turn
- The player can choose to 'Hold', which means that his ROUND score gets added to his GLBAL score. After that, it's the next player's turn
- The first player to reach 100 points on GLOBAL score wins the game

*/


var scores, roundScore,activePlayer, gamePlaying,lastRoll ;

init();


document.querySelector('.btn-roll').addEventListener('click' , function(){
    if(gamePlaying){
        var dice = Math.floor(Math.random()*6 +1);
      //  var dice2 = Math.floor(Math.random()*6 +1);
        
        var diceDOM = document.querySelector('.dice');
        
        diceDOM.style.display = "block";
       // document.getElementById('dice-2').style.display = "block";
        
        document.getElementById('dice-1').src = "dice-" + dice + ".png";
      //  document.getElementById('dice-2').src = "dice-" + dice2 + ".png";
        
        if (dice === 6 && lastRoll === 6){
                scores[activePlayer] = 0;
                document.getElementById('score-' + activePlayer ).textContent = 0;
                nextPlayer();    
        }else if(dice !==1 /*&& dice2 !== 1*/){
            
            roundScore += dice;
            document.querySelector('#current-' + activePlayer).textContent = roundScore;  
        } else
            nextPlayer();
        
       
         lastRoll = dice;
        
    }
    
})

document.querySelector('.btn-hold').addEventListener('click',function(){
    if(gamePlaying){
        scores[activePlayer] += roundScore;

        document.getElementById('score-' + activePlayer ).textContent = scores[activePlayer];
        
     /*   var input = document.querySelector('.finale-score').value;
        var gameCap;
        
        if(input)
             gameCap = input;
        else
            gameCap =100;*/

        if(scores[activePlayer]>= 100){
            document.getElementById('name-' + activePlayer).textContent = 'Winner!';
            document.querySelector('.player-' + activePlayer + '-panel').classList.add('winner');
            document.querySelector('.player-' + activePlayer + '-panel').classList.remove('active');
            gamePlaying = false;
        }
        else
            nextPlayer();
        
       
    }  
})

document.querySelector('.btn-new').addEventListener('click',init);

function init(){
    gamePlaying = true;
    scores = [0,0];
    activePlayer = 0;
    roundScore = 0;
    lastRoll = 0;
    
    document.getElementById('dice-1').style.display = 'nonce';
   // document.getElementById('dice-2').style.display = 'nonce';
    document.getElementById('score-0').textContent = 0;
    document.getElementById('score-1').textContent = 0;
    document.getElementById('current-0').textContent = 0;
    document.getElementById('current-1').textContent = 0;
    document.getElementById('name-0').textContent = 'Player 1';
    document.getElementById('name-1').textContent = 'Player 2';
    document.querySelector('.player-0-panel').classList.remove('winner');
    document.querySelector('.player-1-panel').classList.remove('winner');
    document.querySelector('.player-0-panel').classList.remove('active');
    document.querySelector('.player-1-panel').classList.remove('active');
    document.querySelector('.player-0-panel').classList.add('active');

}
function nextPlayer(){
    roundScore = 0;
    lastRoll = 0;
    document.getElementById('current-' + activePlayer).textContent = 0;
    activePlayer === 0 ? activePlayer = 1 : activePlayer = 0;
    document.querySelector('.player-0-panel').classList.toggle('active');
    document.querySelector('.player-1-panel').classList.toggle('active');
     console.log(lastRoll);
    
}
