const startGamebn = document.getElementById('start-game-bn');


const ROCKS = 'ROCKS';
const PAPER = 'PAPER';
const SCISSORS = 'SCISSORS';
const DEFAUT_USER_CHOICE = ROCKS;

let gameIsrunning = false;


const getplayerchoice = function() {
    const selection = prompt(`${ROCKS}, ${PAPER} or ${SCISSORS}?`, '').toUpperCase();
    if(
        selection !== ROCKS && 
        selection !== PAPER && 
        selection !== SCISSORS
    ){
alert(`Invaild choice We chose ${DEFAUT_USER_CHOICE} for you`);
return DEFAUT_USER_CHOICE;
    }
    return selection;
};

const getComputerChoice = function(){
const randomValue = Math.random();
if(randomValue < 0.34){
    return ROCKS;
} else if(randomValue < 0.67 ) {
    return PAPER;
}else {
   return  SCISSORS;
}


};


const getWinner = (cChoice, pChoice) =>
    cChoice === pChoice
? RESULT_DRAW
: (cChoice === ROCKS && pChoice === PAPER) ||
  (cChoice === PAPER && pChoice === SCISSORS) ||
  (cChoice === SCISSORS && pChoice === ROCKS) 
  ? RESULT_PLAYER_WINS
  :RESULT_COMPUTER_WINS;
// //if(cChoice = ROCKS && pChoice) {
//     //return RESULT_DRAW;
// //} else if(
//     //(cChoice === ROCKS && pChoice === PAPER) ||
//     // (cChoice === PAPER && pChoice === SCISSORS) ||
//     (cChoice === SCISSORS && pChoice === ROCKS)
// ){
//     return RESULT_PLAYER_WINS;
// } else {
//     return RESULT_COMPUTER_WINS
// }


startGamebn.addEventListener('click', function() {
    if(gameIsrunning) {
        return;
    }
    gameIsrunning = true
    console.log('Game is starting...');
    const playChoice = getplayerchoice();
    const computerChoice = getComputerChoice();
    const winner = getWinner(computerChoice, playChoice);

    let message = `You picked ${playChoice}, computer picked ${computerChoice} therefore you`;
    if (winner === RESULT_DRAW){
      message = message + 'had a draw';

    } else if (winner === RESULT_PLAYER_WINS) {
      message = message + 'win';

    } else {
        message = message + 'lost';
    }
    alert(message);
    gameIsrunning = false;
    
});
