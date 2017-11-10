//require('./jquery-3.2.1.min.js');
//require('./materialize.js');

(function() {

//Getting the game div from the page.
let game = $('#game');

function gameStart() {

}

//Let's create the maze board's div.
function createBoard() {
  let board = document.createElement('div');
  board.classList.add('board');
  board.id = `board`;
  board.style.width="400px";
  board.style.height="400px";
  board.style.border="none";
  board.style.display="flex";
  board.style.flexWrap="wrap";
  board.style.backgroundColor="white";
  game.append(board);
  newBoard();
}


//Let's see if we can add basic pixels to the board div.
function newBoard() {
for (i=0; i<100; i++) {
  let pixel = document.createElement('div');
  pixel.classList.add('pixel');
  pixel.id = `pixel${i}`;
  pixel.style.width="40px";
  pixel.style.height="40px";
  pixel.style.border="1px solid black";
  pixel.style.alignContent="flex-start";
  board.append(pixel);
  }
}

createBoard();

function piecePlacement() {
  let enemyPixel = Math.floor(Math.random()*100);
  let enemyBuffer = [(enemyPixel-1),(enemyPixel+1),(enemyPixel-11),(enemyPixel-10),(enemyPixel-9),(enemyPixel+9),(enemyPixel+10),(enemyPixel+11)];
  console.log(enemyPixel);
  console.log(enemyBuffer);
  let playerPixel = Math.floor(Math.random()*100);
  while (enemyBuffer.includes(playerPixel)) {
    playerPixel = Math.floor(Math.random()*100);
  }
  console.log(playerPixel);
}

piecePlacement();



//The following are functions dealing with Materialize and links on the page outside the actual game.

//Getting the 'High Scores' and 'How to play' links.
let highScores = $('#highScores');
let about = $('#about');

//Displays the high scores in a toast when the High Scores link is clicked.
highScores.click(function() {
  Materialize.toast(`<ol><h2>High Scores</h2><li>Testing</li><li>Still Testing</li></ol>`, 15000)
});

about.click(function() {
  Materialize.toast(`When you press start, you will be placed on a blank board with an enemy. You have sixty seconds to draw walls and create a maze between yourself and the enemy. When you are finished, the enemy has thirty seconds to reach you. Be careful not to wall yourself off!`, 15000)
});

})();

module.exports = {
  createBoard,
  gameStart,
  newBoard,
  piecePlacement
}
