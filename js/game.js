(function() {

//Getting the game div from the page.
let game = $('#game');

let difficulty = 0;
let winner = 1;


//This function starts the game, creating the board, placing the player and enemy pixels, starting the timer, and calling the function that allows player to draw walls.
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

//Let's create the maze board's div.
function createBoard() {
  let board = document.createElement('div');
  board.classList.add('board');
  board.id = `board`;
  game.append(board);
  newBoard();
}

//This function adds the pixels of the blank maze to the maze board.
function newBoard() {
for (i=0; i<100; i++) {
  let pixel = document.createElement('div');
  pixel.classList.add('pixel');
  pixel.id = `pixel${i}`;
  board.append(pixel);
  }
}

//This function shows that the player's time is over. Calls functions to pass the walls to an array and verify that there is a valid path (eventually). Blanks out the screen and then tells player 2 that it is their turn.
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

function playerTwoTurn() {
  timeUpScreen.classList.toggle('hide');
  board.classList.toggle('hide');
  createTimer(10000); //Note this is temporarily set to 10 seconds.
  window.setTimeout(gameIsOver, 10000); //Note this is temporarily set to 10 seconds
  board.addEventListener('click', makeEnemyLine);
}

function makeEnemyLine() {
  let square = document.getElementById(event.target.id);
  //The following IF statement makes sure the player isn't selecting the actual player or enemy pixel.
  let enemyBuffer = [];
  for (i=0; i<100; i++) {
    if ($(`#pixel${i}`).hasClass('enemy')) {
      enemyBuffer.push(`pixel${(i)}`);
      enemyBuffer.push(`pixel${(i-1)}`);
      enemyBuffer.push(`pixel${(i+1)}`);
      enemyBuffer.push(`pixel${(i-11)}`);
      enemyBuffer.push(`pixel${(i-10)}`);
      enemyBuffer.push(`pixel${(i-9)}`);
      enemyBuffer.push(`pixel${(i+9)}`);
      enemyBuffer.push(`pixel${(i+10)}`);
      enemyBuffer.push(`pixel${(i+11)}`);
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

//This function will put all the pixels into an 2d array, each marked as either having a wall (1) or no wall (0). It returns that 2d array (wallsArray). It will also return the grid location of enemy (enemyPoint) and player (playerPoint).
function passWallsToArray() {
  let wallsArray = [];
  let enemyPoint = [];
  let playerPoint = [];
  for (i=0; i<10; i++) {
    let rowArray = [];
    for (j=0; j<10; j++) {
      let pixelNum = (i*10)+(j);
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

//This is where the system will verify that there is a valid path from the enemy to the player.
function verifyValidPath(wallsArray, enemyPoint, playerPoint) {
  console.log(wallsArray);
  console.log("Enemy point " + enemyPoint[0], ' ', + enemyPoint[1]);
  console.log("Player point " + playerPoint[0], ' ', + playerPoint[1]);
  //I'll do more on this later.
}


//This function puts a timer on the page below the board so player can see how much time they of the enemy have left in their turn. It takes in an argument of how much time is left, which will either be 60000 for player or 30000 for enemy.
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

//This function determines where the enemy will be on the board, makes a buffer zone so the player isn't put right besides the enemy, and then determines where the player is places. If then returns an array with two elements, the player's location and the enemy's location.
function piecePlacement() {
  let enemyPixel = Math.floor(Math.random()*100);
  let enemyBuffer = [(enemyPixel-1),(enemyPixel+1),(enemyPixel-11),(enemyPixel-10),(enemyPixel-9),(enemyPixel+9),(enemyPixel+10),(enemyPixel+11)];
  let playerPixel = Math.floor(Math.random()*100);
  while (enemyBuffer.includes(playerPixel)) {
    playerPixel = Math.floor(Math.random()*100);
  }
  return([playerPixel,enemyPixel]);
}

//This function adds the event listener for clicking squares to create walls.
function drawNow() {
  board.addEventListener('click', makeWall);
}

//This is the function called by the event listener in drawNow().
function makeWall() {
  let square = document.getElementById(event.target.id);
  //The following IF statement makes sure the player isn't selecting the actual player or enemy pixel.
  if (!($(`#${event.target.id}`).hasClass('player')) && !($(`#${event.target.id}`).hasClass('enemy'))) {
    square.classList.toggle('wall');
  }
}



startScreen();




//The following are functions dealing with Materialize and links on the page outside the actual game.

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
