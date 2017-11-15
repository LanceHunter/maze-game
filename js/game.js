/*

Table of Contents -

===========

Prologue - global variables:

  The three global variables are:
    - "game", which is the jQuery search for the main game div on the page.
    - "difficulty", which is the numerical value of the game difficulty.
    - "winner", which tells if player 1 or player 2 wins
    - "twoPlayerMode", a boolean determening if the game is in 2-player mode or not.
    - "pathBackTotal", a global array with results of the pathfinding.
    - "gameEnded", a global boolean that keeps the game from ending twice

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

  This function hides the timeUpScreen and makes the board visible again. If then calls the function to show the player a timer - createTimer(), and passes it 30 seconds. It also has a window.setTimeout that calls the function gameIsOver() after 30 seconds. Finally, it checks to see if we are in twoPlayerMode or not. If we are, it adds an eventListener that calls the function - makeEnemyLine() when the board is clicked. Otherwise, it has the enemyAI attack you at a pace determined by the difficulty.

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

  This is where the system will verify that there is a valid path from the enemy to the player. It takes 3 arguments, the 2d array of the grid, the array of the enemy's location, and the array of the player's location. It will either return "false" (if there is no valid path) or a map of the coordinates between the points.

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


Function 15 -dragToDraw()

  Allowing drag-to-draw for creating walls. This creates eventlisteners for mouseover that calls makeWall() for each instance while the mouse is down.

===========

Function 16 dragToDrawEnemy()

  Allowing drag-to-draw for creating enemy line. This creates eventlisteners for mouseover that calls makeEnemyLine() for each instance while the mouse is down.

===========

Function 17 optionsPage()

  This is the options screen, where player can select if they want 1-player or 2-player mode, and select the difficulty of 1-player mode.

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
let twoPlayerMode = false;
let pathBackTotal;
let gameEnded = false;



// Function 1 - This function creates the start screen with the game title, the "start" button, and "options" button.
function startScreen() {
  //Creating the blank white Start Page background.
  let startPage = document.createElement('div');
  startPage.classList.add('startPage');
  startPage.classList.add('center');
  startPage.id = `startPage`;
  game.append(startPage);

  //Creating the start button.
  let startButton = document.createElement('div');
  startButton.classList.add('startButton');
  startButton.classList.add('center-align');
  startButton.classList.add('valign-wrapper');
  startButton.id = `startButton`;

  //Creating the button that toggles between 1-player and 2-player mode.
  let twoPlayerModeButton = document.createElement('div');
  twoPlayerModeButton.classList.add('optionButton');
  twoPlayerModeButton.classList.add('center');
  twoPlayerModeButton.classList.add('valign-wrapper');
  twoPlayerModeButton.id = `twoPlayerModeButton`;

  //Creating the tutorial button.
  let tutorialButton = document.createElement('div');
  tutorialButton.classList.add('tutorialButton');
  tutorialButton.classList.add('valign-wrapper');
//  tutorialButton.classList.add('center-align');
  tutorialButton.id = `tutorialButton`;
//  tutorialButton.innerText = `Tutorial`;


  //Creating the logo (and a helpful breakline insert).
  let startLogo = document.createElement('h1');
  let breakLine = document.createElement('br');
  tutorialButton.classList.add('center');

  //Adding the title, start button, and option button to the start screen div.
//  startPage.append(startLogo);
  startPage.append(startButton);
  startPage.append(twoPlayerModeButton);
  startPage.append(tutorialButton);

  //Creating a click listener for the start button that begins the game.
  let $startButton = $('#startButton');
  $startButton.append(`<span class='insideButton'>Start</span>`);
  $startButton.click(function() {
    startPage.classList.toggle('hide');
    console.log('Start Button Pressed!');
    startGame();
  });

  //Creating a click listener for the twoPlayerMade button that toggles between 1 and 2 player mode the start page back.
  let $twoPlayerModeButton = $('#twoPlayerModeButton');
  $twoPlayerModeButton.append(`<span class='insideButton' id='onePlayerText'>One Player</span>`);
  $twoPlayerModeButton.append(`<span class='insideButton hide' id='twoPlayerText'>Two Players</span>`);
  $twoPlayerModeButton.click(function() {
    if (twoPlayerMode) {
      $('#onePlayerText').toggleClass('hide');
      $('#twoPlayerText').toggleClass('hide');
      console.log('Changed to 1 player mode!');
      twoPlayerMode = false;
    } else {
      $('#onePlayerText').toggleClass('hide');
      $('#twoPlayerText').toggleClass('hide');
      console.log('Changed to 2 player mode!');
      twoPlayerMode = true;
    }
  });


  //Creating a click listener for the tutorial button that opens the tutorial video.
  let $tutorialButton = $('#tutorialButton');
  $tutorialButton.append(`<span class='insideButton'>Tutorial</span>`);
  $tutorialButton.click(function() {
//    startPage.classList.toggle('hide');
    console.log('Tutorial Button Pressed!');
  });

}



//Function 2 - This function starts the game, creating the board, placing the player and enemy pixels, starting the timer, and calling the function that allows player to draw walls.
function startGame() {
  if ($('#timeUpScreen').length !== 0) {
    $('#timeUpScreen').off();
  }
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
  //Removing all the eventlisteners that happened on player one's turn.
  $('board').off();
  let tempArray = passWallsToArray(); //This array holds the returned array.
  pathBackTotal = verifyValidPath(tempArray[0], tempArray[1], tempArray[2]);
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
    if (pathBackTotal) {
      $(`#timeUpScreen`).click(playerTwoTurn);
    } else {
      winner = 2;
      timeUpScreen.innerText = 'You Walled Yourself off! Player 2 Wins!';
      $(`#timeUpScreen`).click(gameIsOver); //Need to update function!!!
    }
  }, 3000);
}

//Function 6 - This function hides the timeUpScreen and makes the board visible again. If then calls the function to show the player a timer - createTimer(), and passes it 30 seconds. It also has a window.setTimeout that calls the function gameIsOver() after 30 seconds. Finally, if we are in twoPlayerMode it adds an eventListener that calls the function - makeEnemyLine() when the board is clicked. (If we are not in twoPlayerMode, it will draw the enemy line at an interval determined in the options.)
function playerTwoTurn() {
  $(`#timeUpScreen`).addClass('hide');
  $(`#board`).removeClass('hide');
  createTimer(10000); //Note this is temporarily set to 10 seconds.
  window.setTimeout(gameIsOver, 10000); //Note this is temporarily set to 10 seconds
  if (twoPlayerMode) {
    enemyDrawNow();
  } else {
    let aiAttack = window.setInterval(function() {
      let changingPixel = pathBackTotal.shift();
      $(changingPixel).addClass('enemy');
      if ($(changingPixel).hasClass('player') && !gameEnded) {
        winner = 2;
        clearInterval(aiAttack);
        gameIsOver();
      }
    }, 300);
  }
}


//Function 7 - This function allows the enemy (player 2) to draw their line to the player's pixel. It first creates an array of the pixels that are directly around the original enemy pixel. If the enemy has clicked on any of the pixels that are in the array, that pixel is then part of the enemy's "line" and the pixels around that new enemy pixel are added to the array. If enemy's pixel reaches the player pixel before the time is up, global variable "winner" is set to "2" and gameisOver() is called.
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
  gameEnded = true;
  $(`#board`).off();
  $(`#timeUpScreen`).off();

  board.classList.add('hide');
  $('#timer').remove();
  if (winner === 1) {
    timeUpScreen.classList.remove('hide');
    timeUpScreen.style.backgroundColor = "#4caf50";
    timeUpScreen.style.opacity = "0.5";
    timeUpScreen.innerText = "Player 1 Wins! Click to play again!"
  } else {
    timeUpScreen.classList.remove('hide');
    timeUpScreen.style.backgroundColor = "#e53935";
    timeUpScreen.innerText = "Player 2 Wins! Click to play again!"
  }

  $('#timeUpScreen').click(function() {
    location.reload(true);
  });
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
        rowArray.push({'name': `#pixel${pixelNum}`, 'safe':false, 'distance':null, 'predecessor':null, 'coordinates': [i,j], 'visited':false});
      } else if ($(`#pixel${pixelNum}`).hasClass('player')) {
        rowArray.push({'name': `#pixel${pixelNum}`, 'safe':true, 'distance':null, 'predecessor':null, 'coordinates': [i,j], 'visited':false});
        playerPoint.push(i);
        playerPoint.push(j);
      } else if ($(`#pixel${pixelNum}`).hasClass('enemy')) {
        enemyPoint.push(i);
        enemyPoint.push(j);
        rowArray.push({'name': `#pixel${pixelNum}`, 'safe':true, 'distance':0, 'predecessor':null,'coordinates': [i,j], 'visited':false});
      } else {
        rowArray.push({'name': `#pixel${pixelNum}`, 'safe':true, 'distance':null, 'predecessor':null, 'coordinates': [i,j], 'visited':false});
      }
    }
    wallsArray.push(rowArray);
  }
  return([wallsArray, enemyPoint, playerPoint]);
}

//Function 10 - This is where the system will verify that there is a valid path from the enemy to the player. It uses the BFS pathfinding algorithm and returns either "false" (if there is no path) or an array of the path from the enemy to the player.
function verifyValidPath(wallsArray, enemyPoint, playerPoint) {
  console.log(wallsArray);
  console.log("Enemy point " + enemyPoint[0], ' ', + enemyPoint[1]);
  console.log("Player point " + playerPoint[0], ' ', + playerPoint[1]);

  //BFS Pathfinding Algorithm ahoy!

  let playerPointObject = wallsArray[(playerPoint[0])][(playerPoint[1])];
  console.log(playerPointObject);
  let queue = [];
  queue.push(wallsArray[(enemyPoint[0])][(enemyPoint[1])]);
  while ((queue.length !== 0) && !playerPointObject.visited) {
    let currentSquare = queue.shift();
//    console.log(currentSquare);
    //This is where it gets weird...

    //First we verify that there is an upper-Left square.
    if (((currentSquare.coordinates[0]-1)>=0) && ((currentSquare.coordinates[1]-1)>=0)) {
      let upLeftSquare = wallsArray[(currentSquare.coordinates[0]-1)][(currentSquare.coordinates[1]-1)];
      //Checking the upper-left square from the current square to see if it can be traversed and if it has been visited before..
      if (upLeftSquare.safe && !upLeftSquare.visited)  {
        upLeftSquare.visited = true;
        upLeftSquare.predecessor = currentSquare.name;
        upLeftSquare.predecessorCoordinates = currentSquare.coordinates;
        upLeftSquare.distance = currentSquare.distance + 1;
        queue.push(upLeftSquare);
      }
    }

    //Then we verify that there is an upper-center square.
    if ((currentSquare.coordinates[0]-1)>=0) {
      let upCenterSquare = wallsArray[(currentSquare.coordinates[0]-1)][(currentSquare.coordinates[1])];
      //Checking the upper-center square from the current square to see if it can be traversed and if it has been visited before.
      if (upCenterSquare.safe && !upCenterSquare.visited)  {
        upCenterSquare.visited = true;
        upCenterSquare.predecessor = currentSquare.name;
        upCenterSquare.predecessorCoordinates = currentSquare.coordinates;
        upCenterSquare.distance = currentSquare.distance + 1;
        queue.push(upCenterSquare);
      }
    }

    //Then we verify that there is an upper-right square.
    if (((currentSquare.coordinates[0]-1)>=0) && ((currentSquare.coordinates[1]+1)<=19)) {
      let upRightSquare = wallsArray[(currentSquare.coordinates[0]-1)][(currentSquare.coordinates[1]+1)];
      //Checking the upper-right square from the current square.
      if (upRightSquare.safe && !upRightSquare.visited)  {
        upRightSquare.visited = true;
        upRightSquare.predecessor = currentSquare.name;
        upRightSquare.predecessorCoordinates = currentSquare.coordinates;
        upRightSquare.distance = currentSquare.distance + 1;
        queue.push(upRightSquare);
      }
    }

    //Then we verify that there is an center-left square.
    if ((currentSquare.coordinates[1]-1)>=0) {
      let centerLeftSquare = wallsArray[currentSquare.coordinates[0]][(currentSquare.coordinates[1]-1)];
      //Checking the center-left square from the current square.
      if (centerLeftSquare.safe && !centerLeftSquare.visited)  {
        centerLeftSquare.visited = true;
        centerLeftSquare.predecessor = currentSquare.name;
        centerLeftSquare.predecessorCoordinates = currentSquare.coordinates;
        centerLeftSquare.distance = currentSquare.distance + 1;
        queue.push(centerLeftSquare);
      }
    }

    //Then we verify that there is an center-right square.
    if ((currentSquare.coordinates[1]+1)<=19) {
      let centerRightSquare = wallsArray[currentSquare.coordinates[0]][(currentSquare.coordinates[1]+1)];
      //Checking the center-right square from the current square.
      if (centerRightSquare.safe && !centerRightSquare.visited)  {
        centerRightSquare.visited = true;
        centerRightSquare.predecessor = currentSquare.name;
        centerRightSquare.predecessorCoordinates = currentSquare.coordinates;
        centerRightSquare.distance = currentSquare.distance + 1;
        queue.push(centerRightSquare);
      }
    }

    //Then we verify that there is an bottom-left square.
    if (((currentSquare.coordinates[0]+1)<=19) && ((currentSquare.coordinates[1]-1)>=0)) {
      let bottomLeftSquare = wallsArray[(currentSquare.coordinates[0]+1)][(currentSquare.coordinates[1]-1)];
      //Checking the bottom-left square from the current square.
      if (bottomLeftSquare.safe && !bottomLeftSquare.visited)  {
        bottomLeftSquare.visited = true;
        bottomLeftSquare.predecessor = currentSquare.name;
        bottomLeftSquare.predecessorCoordinates = currentSquare.coordinates;
        bottomLeftSquare.distance = currentSquare.distance + 1;
        queue.push(bottomLeftSquare);
      }
    }

    //Then we verify that there is an bottom-center square.
    if ((currentSquare.coordinates[0]+1)<=19) {
      let bottomCenterSquare = wallsArray[(currentSquare.coordinates[0]+1)][(currentSquare.coordinates[1])];
      //Checking the bottom-center square from the current square.
      if (bottomCenterSquare.safe && !bottomCenterSquare.visited)  {
        bottomCenterSquare.visited = true;
        bottomCenterSquare.predecessor = currentSquare.name;
        bottomCenterSquare.predecessorCoordinates = currentSquare.coordinates;
        bottomCenterSquare.distance = currentSquare.distance + 1;
        queue.push(bottomCenterSquare);
      }
    }

    //Finally, we verify that there is an bottom-right square.
    if (((currentSquare.coordinates[0]+1)<=19) && ((currentSquare.coordinates[1]+1)<=19)) {
      let bottomRightSquare = wallsArray[(currentSquare.coordinates[0]+1)][(currentSquare.coordinates[1]+1)];
      //Checking the bottom-right square from the current square.
      if (bottomRightSquare.safe && !bottomRightSquare.visited)  {
        bottomRightSquare.visited = true;
        bottomRightSquare.predecessor = currentSquare.name;
        bottomRightSquare.predecessorCoordinates = currentSquare.coordinates;
        bottomRightSquare.distance = currentSquare.distance + 1;
        queue.push(bottomRightSquare);
      }
    }
  }

  //We have now found if there is a path. We will now check to see if there path is there by seeing if the playerPointObject was visited...

  if (!playerPointObject.visited) {
    return false;
  } else {
    let pathBack = [];
    pathBack.unshift(playerPointObject.name);
    let pathBackSpot = playerPointObject.predecessorCoordinates;
    for (i = 0; i< playerPointObject.distance; i++) {
      pathBack.unshift(wallsArray[pathBackSpot[0]][pathBackSpot[1]].name);
      console.log(wallsArray[pathBackSpot[0]][pathBackSpot[1]].predecessorCoordinates);
      console.log(pathBack);
      pathBackSpot = wallsArray[pathBackSpot[0]][pathBackSpot[1]].predecessorCoordinates;
    }
    return(pathBack);
  }

}


//Function 11 - This function puts a timer on the page below the board so player can see how much time they of the enemy have left in their turn. It takes in an argument of how much time is left, which will either be 60000 for player or 30000 for enemy.
function createTimer(timeLeft) {
  let visibleTimer = document.createElement('div');
  game.append(visibleTimer);
  visibleTimer.classList.add('timer');
  visibleTimer.classList.add('grey-text');
  visibleTimer.classList.add('text-lighten-4');
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
  $(`#board`).click(makeWall);
  $(`#board`).mousedown(dragToDraw);
}

//Function 13.5 - This sets the eventlisteners that allow enemy to draw their line.

function enemyDrawNow() {
  $(`#board`).click(makeEnemyLine);
  $(`#board`).mousedown(dragToDrawEnemy);
}

//Function 14 - This is the function called by the event listener in drawNow().
function makeWall() {
  let square = document.getElementById(event.target.id);
  //The following IF statement makes sure the player isn't selecting the actual player or enemy pixel.
  if (!($(`#${event.target.id}`).hasClass('player')) && !($(`#${event.target.id}`).hasClass('enemy'))) {
    square.classList.toggle('wall');
  }
}

//Function 15 - Allowing drag-to-draw for creating walls. This creates eventlisteners for mouseover that calls makeWall() for each instance while the mouse is down.
function dragToDraw() {
  $(`#board`).mouseover(makeWall);
  $(`#board`).mouseup(function() {
    $(`#board`).off();
    drawNow();
  });
}

//Function 16 - Allowing drag-to-draw for creating enemy line. This creates eventlisteners for mouseover that calls makeEnemyLine() for each instance while the mouse is down.
function dragToDrawEnemy() {
  $(`#board`).mouseover(makeEnemyLine);
  $(`#board`).mouseup(function() {
    $(`#board`).off();
    enemyDrawNow();
  });
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
