const startGamebn = document.getElementById('start-game-bn');

function startGame() {
  console.log('Game is starting');
}


 // const person={ // name: 'Max'; // greet: function greet(){ // } // }; // person.greet();
console.log(typeof startGame);  // 'function'

startGamebn.addEventListener('click', startGame);
