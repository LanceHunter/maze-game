(function() {

//Getting the game div from the page.
let game = $('#game');



//This function starts the game, creating the board, placing the player and enemy pixels, and starting the timer.
function startGame() {
  createBoard();
  window.setTimeOut(slowAlert, 60000);
  let startingPlaces = piecePlacement();
  let playerStart = $(`#pixel${startingPlaces[0]}`);
  let enemyStart = $(`#pixel${startingPlaces[1]}`);
  playerStart.addClass('green');
  enemyStart.addClass('red');
  enemyStart.addClass('darken-1');
}

//This function creates the start screen with the "start" and "options" buttons.
function startScreen() {
  //Creating the blank white Start Page background.
  let startPage = document.createElement('div');
  startPage.classList.add('startPage');
  startPage.classList.add('center');
  startPage.classList.add('col');
  startPage.classList.add('s12');
  startPage.classList.add('m12');
  startPage.classList.add('l12');
  startPage.id = `startPage`;
  game.append(startPage);

  //Creating the start button.
  let startButton = document.createElement('div');
  startButton.classList.add('startButton');
  startButton.classList.add('center');
  startButton.classList.add('green');
  startButton.classList.add('darken-1');
  startButton.id = `startButton`;
  startButton.innerText = `Start`;

  //Creating the options button.
  let optionButton = document.createElement('div');
  optionButton.classList.add('optionButton');
  optionButton.classList.add('center');
  optionButton.classList.add('red');
  optionButton.classList.add('darken-1');
  optionButton.id = `optionButton`;
  optionButton.innerText = `Options`;

  //Creating the logo (and a helpful breakline insert).
  let startLogo = document.createElement('h1');
  let breakLine = document.createElement('br');
  startLogo.innerText = `Maze Game!`;

  //Adding the title, start button, and option button to the start screen div.
  startPage.append(startLogo);
  startPage.append(startButton);
  startPage.append(breakLine);
  startPage.append(optionButton);

  //Creating a click listener for the start button that begins the game.
  let $startButton = $('#startButton');
  $startButton.click(function() {
    console.log('Start Button Pressed!');
  });

  //Creating a click listener for the options button that brings up the options screen.
  let $optionButton = $('#optionButton');
  $optionButton.click(function() {
    console.log('Option Button Pressed!');
  });
}


//Let's create the maze board's div.
function createBoard() {
  let board = document.createElement('div');
  board.classList.add('board');
  board.id = `board`;
  game.append(board);
  newBoard();
}


//This function creates the blank board.
function newBoard() {
for (i=0; i<100; i++) {
  let pixel = document.createElement('div');
  pixel.classList.add('pixel');
  pixel.id = `pixel${i}`;
  board.append(pixel);
  }
}


//startScreen();
startGame();


//This function determines where the enemy will be on the board, makes a buffer zone so the player isn't put right besides the enemy, and then determines where the player is places. If then returns an array with two elements, the player's location and the enemy's location.
function piecePlacement() {
  let enemyPixel = Math.floor(Math.random()*100);
  let enemyBuffer = [(enemyPixel-1),(enemyPixel+1),(enemyPixel-11),(enemyPixel-10),(enemyPixel-9),(enemyPixel+9),(enemyPixel+10),(enemyPixel+11)];
//  console.log(enemyPixel);
//  console.log(enemyBuffer);
  let playerPixel = Math.floor(Math.random()*100);
  while (enemyBuffer.includes(playerPixel)) {
    playerPixel = Math.floor(Math.random()*100);
  }
  return([playerPixel,enemyPixel]);
}




//The following are functions dealing with Materialize and links on the page outside the actual game.

//Getting the 'High Scores' and 'How to play' links.
let highScores = $('#highScores');
let about = $('#about');

//Displays the high scores in a toast when the High Scores link is clicked.
highScores.click(function() {
  Materialize.toast(`<ol><h2>High Scores</h2><li>Testing</li><li>Still Testing</li></ol>`, 15000)
});

about.click(function() {
  Materialize.toast(`You have sixty seconds to draw walls and create a maze between yourself and the enemy. When you are finished, the enemy has thirty seconds to reach you. Be careful not to wall yourself off!`, 15000)
});

})();
