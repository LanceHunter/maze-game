/*

Table of Contents -

===========

Prologue - global variables:

  The three global variables are:
    - "game", which is the jQuery search for the main game div on the page.
    - "winner", which tells if player 1 or player 2 wins
    - "twoPlayerMode", a boolean determening if the game is in 2-player mode or not.
    - "pathBackTotal", a global variable that will either be an array with results of the pathfinding or the value of "false" if there is no path.
    - "gameEnded", a global boolean that is marked as true when the game ends. This prevents the game from ending twice.

===========

Function 1 - startScreen()
  Created the start screen for the game. Creates a div for the start page, and puts a start button, a 1/2 player toggle button, and a tips button on that div. It then created a click listener for all three buttons. The click listener for the start button calls 'startGame', the click listener for the 1/2 player toggle button will change the game mode from 1 player to 2 player (toggling the boolean value of the global variable "twoPlayerMode"), and the click listener for the tutorial button will load the tutorial/tips page.

===========

Function 2 - startGame()
  This function starts the game, calling the function that places the player and enemy pixels - piecePlacement(), calling the function that creates the visual the timer - createTimer() (and passing it 60 seconds), calls a window.setTimeout method that will call turnIsOver() after 60 seconds, marks the player and the enemy pixels on the board, and calls the function that allows player to draw walls - drawNow().

===========

Function 3 - createBoard()

  This function create the maze board's blank div and calls the function that will add the pixels to the board - newBoard().

===========

Function 4 - newBoard()

  This function adds the pixels of the blank maze to the maze board. It gives each pixel the id 'pixel(i)' where i is from 0 to the last number. This calls no functions.

===========

Function 5 - turnIsOver()

  This function shows that the player's time is over. It displays a timeUp screen. It then calls functions to pass the walls to an array - passWallsToArray(), and passes the array of returned values (the 2d-array of each pixel with its status, an array of the X & Y location of Player 2's pixel in that array, and an array of the X & Y location of Player 1's pixel) to a temporary holding array--"pathBackTotal". If then passes those three values in pathBackTotal to the function verifyValidPath(). After that it removes the old board from the screen and creates a new board with all the same information by calling makePlayerTwoBoard() and passing it the three values in pathBackTotal. Then, after 3 seconds it tells Player 2 that it is their turn and puts an eventListener for a click that calls - playerTwoTurn().

===========

Function 6 - playerTwoTurn()

  This function hides the timeUpScreen and makes the board visible again. If then calls the function to show the player a timer - createTimer(), and passes it 30 seconds. It also has a window.setTimeout that calls the function gameIsOver() after 30 seconds. Finally, if we are in twoPlayerMode it adds an eventListener that calls the function - makeEnemyLine() when the board is clicked. (If we are not in twoPlayerMode, it will draw the enemy line at 1 square every 300ms.).

===========

Function 7 - makeEnemyLine()

  This function draws Player 2's line to Player 1's pixel. It first creates an array of the pixels that are directly around Player 2's pixel. If Player 2 has clicked or dragged on any of the pixels that are in the array, that pixel is then part of the Player 2's "line" and the pixels around that new part of the line are added to the array. If Player 2's pixel reaches Player 1's pixel before the time is up, global variable "winner" is set to "2" and gameisOver() is called.

===========

Function 8 - gameIsOver()

  This function sets the gameEnded boolean to TRUE. It then turns off all eventListeners for the board and the timeUpScreen. It also hides the board and removes the timer. Then, if the global variable "winner" is "1", the timeUpScreen changes to a "player 1 wins" screen. If global variable "winner" is "2", the timeUpScreen changes to a "player 2 wins" screen. It also creates a new eventlistener on the timeUpScreen that reloads the page if clicked.

===========

Function 9 - passWallsToArray()

  This function will put all the pixels into an 2d array "wallsArray", with each pixel becoming an object that has the values --- "name" (with the CSS ID for the pixel), "safe" (a boolean saying if the location is not a wall), "distance" (set to NULL now, for later use in pathfinding), "predecessor" (also set to NULL now, for later use in pathfinding), "coordinates" (the X & Y location of the pixel in the array/board), "visited" (a boolean set to FALSE, for later use in pathfinding). --- It also gets an array of the X & Y location for player 1, pushing that to the array playerPoint, and doing the same for location of Player 2 in the array enemyPoint. Finally, it returns an array containing wallsArray, enemyPoint, and playerPoint.


===========

Function 9.5 makePlayerTwoBoard()

  This creates a second div that is added to the board with the same walls and Player 1 / Player 2 locations as the original, to ensure that any mouse holdover events from the previous board div aren't carried over. It takes three values, the wallsArray 2d array of pixel objects, the enemyPoint array of the X & Y location for Player 2, and the playerPoint array of the X & Y location for Player 1

===========

Function 10 - verifyValidPath()

  This is where the system will verify that there is a valid path from the enemy to the player. It takes three values, the wallsArray 2d array of pixel objects, the enemyPoint array of the X & Y location for Player 2, and the playerPoint array of the X & Y location for Player 1. It uses a BFS (Breadth First Search) pathfinding algorithm to verify that there is a valid path. When the function is complete it will either return "false" (if there is no valid path) or a "map" array of the coordinates between the pixels.

===========

Function 11 - createTimer()

  This function puts a timer on the page below the board so player can see how much time they of the enemy have left in their turn. It takes in an argument of how much time is left, which will either be 60000 for player or 30000 for enemy. It counts down with a setInterval that iterates every 10ms, reducing that amount from the amount of displayed time remaining. It will display down to the 1/10th of a second until there are <9 seconds remaining, then it will display to the 1/100th of a second.

===========

Function 12 - piecePlacement()

  This function determines where the enemy will be on the board, makes a buffer zone so the player isn't put right besides the enemy, and then determines where the player is placed. If then returns an array with two numbers from 1 to 400, the player's location (by pixel number) and the enemy's location (by pixel number).

===========

Function 13 - drawNow()

  This function adds two eventlisteners. The first call the function makeWall() for each time a square is clicked, and the second calls dragToDraw() when the mouse is held down. This is the Player 1 version

===========

Function 13.5 - enemyDrawNow()

  This function adds two eventlisteners. The first call the function makeEnemyLine() for each time a square is clicked, and the second calls dragToDrawEnemy() when the mouse is held down. This is the Player 2 version.

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

===========

Epilogue - Functions and variables that deal with clicks outside of the game. Mostly Materialize toasts.

===========
*/

(function() {

//Prologue - global variables

//Getting the game div from the page.
let game = $('#game');
let winner = 1;
let twoPlayerMode = false;
let pathBackTotal;
let gameEnded = false;



// Function 1 -

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
  twoPlayerModeButton.classList.add('twoPlayerModeButton');
  twoPlayerModeButton.classList.add('center');
  twoPlayerModeButton.classList.add('valign-wrapper');
  twoPlayerModeButton.id = `twoPlayerModeButton`;

  //Creating the tutorial button.
  let tutorialPageLink = document.createElement('a');
  tutorialPageLink.href= `./tutorial.html`;
  tutorialPageLink.id= `tutorialPageLink`;
  tutorialPageLink.classList.add('tutorialPageLink');
  tutorialPageLink.classList.add('valign-wrapper');
  tutorialPageLink.classList.add('black-text');
  let tutorialButton = document.createElement('div');
  tutorialButton.classList.add('tutorialButton');
  tutorialButton.id = `tutorialButton`;
  tutorialPageLink.append(tutorialButton);


  //Adding the title, start button, and option button to the start screen div.
  startPage.append(startButton);
  startPage.append(twoPlayerModeButton);
  startPage.append(tutorialPageLink);

  //Creating a click listener for the start button that begins the game.
  let $startButton = $('#startButton');
  $startButton.append(`<span class='insideButton'>Start</span>`);
  $startButton.click(function() {
    startPage.classList.toggle('hide');
    startGame();
  });

  //Creating a click listener for the twoPlayerMade button that toggles between 1 and 2 player mode the start page back.
  let $twoPlayerModeButton = $('#twoPlayerModeButton');
  $twoPlayerModeButton.append(`<span class='insideButton' id='onePlayerText'>1<br>Player<br>Mode</span>`);
  $twoPlayerModeButton.append(`<span class='insideButton hide' id='twoPlayerText'>2<br>Player<br>Mode</span>`);
  $twoPlayerModeButton.click(function() {
    if (twoPlayerMode) {
      $('#onePlayerText').toggleClass('hide');
      $('#twoPlayerText').toggleClass('hide');
      twoPlayerMode = false;
    } else {
      $('#onePlayerText').toggleClass('hide');
      $('#twoPlayerText').toggleClass('hide');
      twoPlayerMode = true;
    }
  });

  //Creating text for the Tips/tutorial button.
  let $tutorialButton = $('#tutorialButton');
  $tutorialButton.append(`<span class='insideButton'>Tips</span>`);

}


//Function 2 -
function startGame() {
  if ($('#timeUpScreen').length !== 0) {
    $('#timeUpScreen').off();
  }
  let startingPlaces = piecePlacement();
  createBoard();
  createTimer(60000); //Sending the visual timer 60 seconds for Player 1 turn.
  window.setTimeout(turnIsOver, 60000); //The real timer that marks end of turn.
  $(`#pixel${startingPlaces[0]}`).addClass('player');
  let enemyStart = $(`#pixel${startingPlaces[1]}`);
  enemyStart.addClass('enemy');
  drawNow();
}


//Function 3 -
function createBoard() {
  let board = document.createElement('div');
  board.classList.add('board');
  board.id = `board`;
  game.append(board);
  newBoard();
}

//Function 4 -
function newBoard() {
for (i=0; i<400; i++) {
  let pixel = document.createElement('div');
  pixel.classList.add('pixel');
  pixel.id = `pixel${i}`;
  board.append(pixel);
  }
}

//Function 5 -
function turnIsOver() {
  //Removing all the eventlisteners that happened on player one's turn.
  $('#board').off();
  $(`#timer`).addClass('hide');
  let tempArray = passWallsToArray(); //This array holds the returned array.
  pathBackTotal = verifyValidPath(tempArray[0], tempArray[1], tempArray[2]);
  //This will remove the old board and then call the function to make the player 2 board.
  $('#board').remove();
  makePlayerTwoBoard(tempArray[0], tempArray[1], tempArray[2]);

  //Shows player a "Time Up" screen
  let timeUpScreen = document.createElement('div');
  timeUpScreen.classList.add('timeUpScreen');
  timeUpScreen.classList.add('valign-wrapper');
  timeUpScreen.id = `timeUpScreen`;
  timeUpScreen.innerHTML = `<span class="insideButton">Time is up!</span>`;
  game.prepend(timeUpScreen);
  window.setTimeout(function() {
    timeUpScreen.innerHTML = `<span class="insideButton center-align">Player 2 click to begin</span>`;
    if (pathBackTotal) {
      $(`#timeUpScreen`).click(playerTwoTurn);
    } else {
      winner = 2;
      timeUpScreen.style.backgroundColor = "#e53935";
      timeUpScreen.innerHTML = `<span class="insideButton center-align">No walling off!<br><br>Player 2 Wins!<br><br>Click to play again</span>`;
      $(`#timeUpScreen`).click(function() {
        location.reload(true);
      }); //Need to update function!!!
    }
  }, 3000);
}

//Function 6 -
function playerTwoTurn() {
  $(`#timeUpScreen`).addClass('hide');
  $(`#board`).removeClass('hide');
  createTimer(30000); //Creates the visible timer with a 30 second countdown.
  window.setTimeout(gameIsOver, 30000); //The real 30 second timer to end game.
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


//Function 7 -
function makeEnemyLine() {
  let square = document.getElementById(event.target.id);
  let enemyBuffer = [];

  //This goes through the entire board and checks to see which pixels are near the enemy and can thus be part of the enemy's line.
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

  //This makes sure that the target location is not a wall and is one of the valid targets in the buffer.
  if ((!($(`#${event.target.id}`).hasClass('wall'))) && (enemyBuffer.includes(event.target.id))) {
    square.classList.add('enemy');
  }

  //This checks to see if Player 2 has reached Player 1's pixel.
  if (($(`#${event.target.id}`).hasClass('player')) && (enemyBuffer.includes(event.target.id))) {
    winner = 2;
    gameIsOver();
  }
}


//Function 8 - This function sets the gameEnded boolean to TRUE. It then turns off all eventListeners for the board and the timeUpScreen. It also hides the board and removes the timer. Then, if the global variable "winner" is "1", the timeUpScreen changes to a "player 1 wins" screen. If global variable "winner" is "2", the timeUpScreen changes to a "player 2 wins" screen. It also creates a new eventlistener on the timeUpScreen that reloads the page if clicked.
function gameIsOver() {
  gameEnded = true;
  $(`#board`).off();
  $(`#timeUpScreen`).off();

  board.classList.add('hide');
  $('#timer').remove();
  if (winner === 1) {
    timeUpScreen.classList.remove('hide');
    timeUpScreen.style.backgroundColor = "#4caf50";
    timeUpScreen.innerHTML = `<span class="insideButton center-align">Player 1 Wins!<br><br>Click to play again</span>`;
  } else {
    timeUpScreen.classList.remove('hide');
    timeUpScreen.style.backgroundColor = "#e53935";
    timeUpScreen.innerHTML = `<span class="insideButton center-align">Player 2 Wins!<br><br>Click to play again</span>`;
  }

  $('#timeUpScreen').click(function() {
    location.reload(true);
  });
}

//Function 9 -
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

//Function 9.5 -
function makePlayerTwoBoard(wallsArray, enemyPoint, playerPoint) {
  let board = document.createElement('div');
  board.classList.add('board');
  board.id = `board`;
  game.append(board);
  let tempString = '';
  for (i=0; i<20; i++) {
    for (j=0; j<20; j++) {
      let pixel = document.createElement('div');
      pixel.classList.add('pixel');
      pixel.id = wallsArray[i][j].name.slice(1);
      if (!wallsArray[i][j].safe) {
        pixel.classList.add('wall');
      }
      board.append(pixel);
    }
  }
  let x = enemyPoint[0];
  let y = enemyPoint[1];
  $(wallsArray[x][y].name).addClass('enemy');
  x = playerPoint[0];
  y = playerPoint[1];
  $(wallsArray[x][y].name).addClass('player');
  $(`#board`).addClass('hide');
}

//Function 10 -
function verifyValidPath(wallsArray, enemyPoint, playerPoint) {
  //BFS Pathfinding Algorithm ahoy!
  let playerPointObject = wallsArray[(playerPoint[0])][(playerPoint[1])];
  let queue = [];
  queue.push(wallsArray[(enemyPoint[0])][(enemyPoint[1])]);
  while ((queue.length !== 0) && !playerPointObject.visited) {
    let currentSquare = queue.shift();
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
    //If it wasn't, there is no path and we return 'False'.
    return false;
  } else {
    //If there was, then we return an array of the path from the enemy to the player.
    let pathBack = [];
    pathBack.unshift(playerPointObject.name);
    let pathBackSpot = playerPointObject.predecessorCoordinates;
    for (i = 0; i< playerPointObject.distance; i++) {
      pathBack.unshift(wallsArray[pathBackSpot[0]][pathBackSpot[1]].name);
//      console.log(wallsArray[pathBackSpot[0]][pathBackSpot[1]].predecessorCoordinates);
//      console.log(pathBack);
      pathBackSpot = wallsArray[pathBackSpot[0]][pathBackSpot[1]].predecessorCoordinates;
    }
    return(pathBack);
  }

}


//Function 11 -
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

//Function 12 -
function piecePlacement() {
  let enemyPixel = Math.floor(Math.random()*400);
  let enemyBuffer = [(enemyPixel-1),(enemyPixel+1),(enemyPixel-21),(enemyPixel-20),(enemyPixel-19),(enemyPixel+19),(enemyPixel+20),(enemyPixel+21)];
  let playerPixel = Math.floor(Math.random()*100);
  while (enemyBuffer.includes(playerPixel)) {
    playerPixel = Math.floor(Math.random()*100);
  }
  return([playerPixel,enemyPixel]);
}

//Function 13 -
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

//Getting the 'About' link.
let highScores = $('#about');

//Displays some basic information about the game in a toast when the About link is clicked.
highScores.click(function() {
  Materialize.toast(`<ul><h2>Maze Game</h2><li>My Q1 project for the Galvanize Web Development Intensive Program.</li><li>This project uses HTML5, Javascript, jQuery, Materialize, and Youtube's iFrame Player API</li></ul>`, 15000);
});


})();
