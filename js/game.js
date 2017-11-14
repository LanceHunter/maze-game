/*

Table of Contents -

===========

Prologue - global variables:

  The three global variables are:
    - "game", which is the jQuery search for the main game div on the page.
    - "difficulty", which is the numerical value of the game difficulty.
    - "winner", which tells if player 1 or player 2 wins

===========

Function 1 - startScreen()
  Created the start screen for the game. Created a div for the start page, and puts the game title, a start button, and an options button on that div. If then created a click listener for the start and option button. The click listener for the start button calls 'startGame' and the click listener for the options button will call that function once it is written.

===========

Function 2 - startGame()
  This function starts the game, calling the function that places the player and enemy pixels - piecePlacement(), calling the function that starts the timer - createTimer() (and passing it 60 seconds), calling the function that puts a timer display on the screen turnIsOver() (also passing it 60 seconds), marks the player and the enemy pixels on the board, and calls the function that allows player to draw walls - drawNow().

===========

Function 3 - createBoard()

  This function create the maze board's div and calls the function that will add the pixels to the board - newBoard().

===========

Function 4 - newBoard()

  This function adds the pixels of the blank maze to the maze board. It gives each pixel the id 'pixel(i)' where i is from 0 to the last number. This calls no functions.

===========

Function 5 - turnIsOver()

  This function shows that the player's time is over. It removes the eventListener that allows walls to be drawn. It then calls functions to pass the walls to an array - passWallsToArray() - and verify that there is a valid path - verifyValidPath(). It also blanks out the screen so neither player can see what has been drawn. Then, after 3 seconds it tells player 2 that it is their turn and puts an eventListener for a click that calls - playerTwoTurn().

===========

Function 6 - playerTwoTurn()

  This function hides the timeUpScreen and makes the board visible again. If then calls the function to show the player a timer - createTimer(), and passes it 30 seconds. It also has a window.setTimeout that calls the function gameIsOver() after 30 seconds. Finally, it adds an eventListener that calls the function - makeEnemyLine() when the board is clicked.

===========

Function 7 - makeEnemyLine()

  This function allows the enemy (player 2) to draw their line to the player's pixel. It first creates an array of the pixels that are directly around the original enemy pixel. If the enemy has clicked on any of the pixels that are in the array, that pixel is then part of the enemy's "line" and the pixels around that new enemy pixel are added to the array. If enemy's pixel reaches the player pixel before the time is up, gameisOver() is called.

===========

Function 8 - gameIsOver()

  This function removes the eventListener for the clicks on the board that allows enemy lines to be made, and the eventListener on the timeUpScreen that starts player 2's turn. It also hides the board and removes the timer. Then, if the global variable "winner" is "1", the player 1 wins screen is displayed. If global variable "winner" is "2", the player 2 wins screen is displayed.

===========

Function 9 - passWallsToArray()

  This function will put all the pixels into an 2d array, each marked as either having a wall (1) or no wall (0). It returns that 2d array (wallsArray). It will also return an array of the grid location of enemy (enemyPoint) and an array the grid location of player (playerPoint).


===========

Function 10 - verifyValidPath()

  This is where the system will verify that there is a valid path from the enemy to the player. It takes 3 arguments, the 2d array of the grid, the array of the enemy's location, and the array of the player's location. (Pathfinding algorithm to-be-written later today.)

===========

Function 11 - createTimer()

  This function puts a timer on the page below the board so player can see how much time they of the enemy have left in their turn. It takes in an argument of how much time is left, which will either be 60000 for player or 30000 for enemy.

===========

Function 12 - piecePlacement()

  This function determines where the enemy will be on the board, makes a buffer zone so the player isn't put right besides the enemy, and then determines where the player is placed. If then returns an array with two numbers from 1 to 100, the player's location and the enemy's location.

===========

Function 13 - drawNow()

  This function adds the event listener for clicking squares and calls the function makeWall() for each of them.

===========

Function 14 - makeWall()

  This is the function called by the event listener in drawNow(). It toggles a wall on or off for whichever pixel the player has clicked, and makes sure that the player hasn't clicked their own pixel or the enemy pixel.

===========

Epilogue - Functions and variables that deal with clicks outside of the game. Mostly Materialize toasts.

===========
*/

(function() {

//Prologue - global variables

//Getting the game div from the page.
let game = $('#game');
let difficulty = 0;
let winner = 1;



// Function 1 - This function creates the start screen with the game title, the "start" button, and "options" button.
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
  startButton.id = `startButton`;
  startButton.innerText = `Start`;

  //Creating the options button.
  let optionButton = document.createElement('div');
  optionButton.classList.add('optionButton');
  optionButton.classList.add('center');
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
    startPage.classList.toggle('hide');
    console.log('Start Button Pressed!');
    startGame();
  });

  //Creating a click listener for the options button that brings up the options screen.
  let $optionButton = $('#optionButton');
  $optionButton.click(function() {
    console.log('Option Button Pressed!');
  });
}



//Function 2 - This function starts the game, creating the board, placing the player and enemy pixels, starting the timer, and calling the function that allows player to draw walls.
function startGame() {
  let startingPlaces = piecePlacement();
  createBoard();
  createTimer(10000); //Note this is set to 10 seconds for now.
  window.setTimeout(turnIsOver, 10000); //Note this is set to 10 seconds for now.
  let playerStart = $(`#pixel${startingPlaces[0]}`);
  let enemyStart = $(`#pixel${startingPlaces[1]}`);
  playerStart.addClass('player');
  enemyStart.addClass('enemy');
  drawNow();
}


//Function 3 - This function create the maze board's div and calls the function that will add the pixels to the board.
function createBoard() {
  let board = document.createElement('div');
  board.classList.add('board');
  board.id = `board`;
  game.append(board);
  newBoard();
}

//Function 4 - This function adds the pixels of the blank maze to the maze board.
function newBoard() {
for (i=0; i<400; i++) {
  let pixel = document.createElement('div');
  pixel.classList.add('pixel');
  pixel.id = `pixel${i}`;
  board.append(pixel);
  }
}

//Function 5 - This function shows that the player's time is over. Calls functions to pass the walls to an array and verify that there is a valid path (eventually). Blanks out the screen and then tells player 2 that it is their turn.
function turnIsOver() {
  board.removeEventListener('click', makeWall);
  let tempArray = passWallsToArray(); //This array holds the returned array.
  verifyValidPath(tempArray[0], tempArray[1], tempArray[2]);
  //Hides the board so it can't be seen by player 2.
  board.classList.toggle('hide');
  //Shows player a "Time Up" screen
  let timeUpScreen = document.createElement('div');
  timeUpScreen.classList.add('timeUpScreen');
  timeUpScreen.id = `timeUpScreen`;
  timeUpScreen.innerText = 'Time is up!';
  game.prepend(timeUpScreen);
  window.setTimeout(function() {
    timeUpScreen.innerText = 'Player 2 click to begin';
    timeUpScreen.addEventListener('click', playerTwoTurn);
  }, 3000);
}

//Function 6 - This function hides the timeUpScreen and makes the board visible again. If then calls the function to show the player a timer - createTimer(), and passes it 30 seconds. It also has a window.setTimeout that calls the function gameIsOver() after 30 seconds. Finally, it adds an eventListener that calls the function - makeEnemyLine() when the board is clicked.
function playerTwoTurn() {
  timeUpScreen.classList.toggle('hide');
  board.classList.toggle('hide');
  createTimer(10000); //Note this is temporarily set to 10 seconds.
  window.setTimeout(gameIsOver, 10000); //Note this is temporarily set to 10 seconds
  board.addEventListener('click', makeEnemyLine);
}


//Function 7 - This function allows the enemy (player 2) to draw their line to the player's pixel. It first creates an array of the pixels that are directly around the original enemy pixel. If the enemy has clicked on any of the pixels that are in the array, that pixel is then part of the enemy's "line" and the pixels around that new enemy pixel are added to the array. If enemy's pixel reaches the player pixel before the time is up, global variable "winner" is set to "2" and gameisOver() is called
function makeEnemyLine() {
  let square = document.getElementById(event.target.id);
  //The following IF statement makes sure the player isn't selecting the actual player or enemy pixel.
  let enemyBuffer = [];
  for (i=0; i<400; i++) {
    if ($(`#pixel${i}`).hasClass('enemy')) {
      enemyBuffer.push(`pixel${(i)}`);
      enemyBuffer.push(`pixel${(i-1)}`);
      enemyBuffer.push(`pixel${(i+1)}`);
      enemyBuffer.push(`pixel${(i-21)}`);
      enemyBuffer.push(`pixel${(i-20)}`);
      enemyBuffer.push(`pixel${(i-19)}`);
      enemyBuffer.push(`pixel${(i+19)}`);
      enemyBuffer.push(`pixel${(i+20)}`);
      enemyBuffer.push(`pixel${(i+21)}`);
    }
  }
  console.log(enemyBuffer);
  if ((!($(`#${event.target.id}`).hasClass('wall'))) && (enemyBuffer.includes(event.target.id))) {
    square.classList.add('enemy');

  }
  if (($(`#${event.target.id}`).hasClass('player')) && (enemyBuffer.includes(event.target.id))) {
    console.log('Player 2 Wins!');
    winner = 2;
    gameIsOver();
  }
}


//Function 8 - This function removes the eventListener for the clicks on the board that allows enemy lines to be made, and the eventListener on the timeUpScreen that starts player 2's turn. It also hides the board and removes the timer. Then, if the global variable "winner" is "1", the player 1 wins screen is displayed. If global variable "winner" is "2", the player 2 wins screen is displayed.
function gameIsOver() {
  board.removeEventListener('click', makeEnemyLine);
  timeUpScreen.removeEventListener('click', playerTwoTurn);
  board.classList.toggle('hide');
  $('#timer').remove();
  if (winner === 1) {
    timeUpScreen.classList.toggle('hide');
    timeUpScreen.style.backgroundColor = "#4caf50";
    timeUpScreen.innerText = "Player 1 Wins!"
  } else {
    timeUpScreen.classList.toggle('hide');
    timeUpScreen.style.backgroundColor = "#e53935";
    timeUpScreen.innerText = "Player 2 Wins!"
  }
}

//Function 9 - This function will put all the pixels into an 2d array, each marked as either having a wall (1) or no wall (0). It returns that 2d array (wallsArray). It will also return the grid location of enemy (enemyPoint) and player (playerPoint).
function passWallsToArray() {
  let wallsArray = [];
  let enemyPoint = [];
  let playerPoint = [];
  for (i=0; i<20; i++) {
    let rowArray = [];
    for (j=0; j<20; j++) {
      let pixelNum = (i*20)+(j);
      if ($(`#pixel${pixelNum}`).hasClass('wall')) {
        rowArray.push(1);
      } else if ($(`#pixel${pixelNum}`).hasClass('player')) {
        rowArray.push(2);
        playerPoint.push(i);
        playerPoint.push(j);
      } else if ($(`#pixel${pixelNum}`).hasClass('enemy')) {
        enemyPoint.push(i);
        enemyPoint.push(j);
        rowArray.push(2);
      } else {
        rowArray.push(0);
      }
    }
    wallsArray.push(rowArray);
  }
//  console.log(wallsArray);
//  console.log("start " + enemyPoint + " and end " + playerPoint);
  return([wallsArray, enemyPoint, playerPoint]);
}

//Function 10 - This is where the system will verify that there is a valid path from the enemy to the player.
function verifyValidPath(wallsArray, enemyPoint, playerPoint) {
  console.log(wallsArray);
  console.log("Enemy point " + enemyPoint[0], ' ', + enemyPoint[1]);
  console.log("Player point " + playerPoint[0], ' ', + playerPoint[1]);
  //I'll do more on this later.
}


//Function 11 - This function puts a timer on the page below the board so player can see how much time they of the enemy have left in their turn. It takes in an argument of how much time is left, which will either be 60000 for player or 30000 for enemy.
function createTimer(timeLeft) {
  let visibleTimer = document.createElement('h1');
  game.append(visibleTimer);
  visibleTimer.classList.add('timer');
  visibleTimer.classList.add('center');
  visibleTimer.id = `timer`;
  let counter = setInterval(function() {
    if (timeLeft>=1000) {
      visibleTimer.innerText = `${(timeLeft/1000).toPrecision(3)} seconds`;
      timeLeft = timeLeft-10;
    } else if (timeLeft>=100) {
      visibleTimer.innerText = `${(timeLeft/1000).toPrecision(2)} seconds`;
      timeLeft = timeLeft-10;
    } else if (timeLeft>=0) {
      visibleTimer.innerText = `${(timeLeft/1000).toPrecision(1)} seconds`;
      timeLeft = timeLeft-10;
    } else {
      clearInterval(counter);
      $('#timer').remove();
    }
  }, 10);
}

//Function 12 - This function determines where the enemy will be on the board, makes a buffer zone so the player isn't put right besides the enemy, and then determines where the player is places. If then returns an array with two elements, the player's location and the enemy's location.
function piecePlacement() {
  let enemyPixel = Math.floor(Math.random()*400);
  let enemyBuffer = [(enemyPixel-1),(enemyPixel+1),(enemyPixel-21),(enemyPixel-20),(enemyPixel-19),(enemyPixel+19),(enemyPixel+20),(enemyPixel+21)];
  let playerPixel = Math.floor(Math.random()*100);
  while (enemyBuffer.includes(playerPixel)) {
    playerPixel = Math.floor(Math.random()*100);
  }
  return([playerPixel,enemyPixel]);
}

//Function 13 - This function adds the event listener for clicking squares to create walls.
function drawNow() {
  board.addEventListener('click', makeWall);
}

//Function 14 - This is the function called by the event listener in drawNow().
function makeWall() {
  let square = document.getElementById(event.target.id);
  //The following IF statement makes sure the player isn't selecting the actual player or enemy pixel.
  if (!($(`#${event.target.id}`).hasClass('player')) && !($(`#${event.target.id}`).hasClass('enemy'))) {
    square.classList.toggle('wall');
  }
}


//Calling startScreen now to run game while testing
startScreen();




// Epilogue - The following are functions dealing with Materialize and links on the page outside the actual game.

//Getting the 'High Scores' and 'How to play' links.
let highScores = $('#highScores');
let about = $('#about');

//Displays the high scores in a toast when the High Scores link is clicked.
highScores.click(function() {
  Materialize.toast(`<ol><h2>High Scores</h2><li>Testing</li><li>Still Testing</li></ol>`, 15000);
});

about.click(function() {
  Materialize.toast(`You have sixty seconds to draw walls and create a maze between yourself and the enemy. When you are finished, the enemy has thirty seconds to reach you. Be careful not to wall yourself off!`, 15000);
});


})();
