# maze-game
A maze game developed for my Galvanize Web Development Q1 project.

Maze Game

The game in one sentence:
Can you draw a maze in 60 seconds that takes more than 30 seconds to solve?

More detail:

The game opens with an empty board and the ability to select difficulty or start the game. When the player presses ‘Start’ 2 dots appear on the board. Simultaneously, a timer appears and begins counting down. The dots are are your dot and the enemy dot. You then need to draw “walls” on the board between the enemy dot and your dot to keep the enemy dot away. You will have the ability to erase mistakes. You can keep drawing and erasing until the timer runs out.

Once the timer runs out, the system will first verify that there is at least one valid path between your dot and the enemy dot. If there is not, the enemy wins. If a valid path is confirmed, a new timer begins and the enemy dot will then begin to “travel the maze” by drawing a line from itself to your dot. The enemy dot’s line cannot cross any wall. If the enemy’s line is not able to reach your dot before the timer runs out, you win. Otherwise, the enemy wins.

Requirements:
- Ability to generate a board.
- A timer.
- Ability for program to randomly generate two dots on the board.
- Ability for player to draw walls on the board.
- Ability for player to erase mistakes.
- Ability to stop player from drawing once timer runs out.
- Utilize a way-finding algorithm to verify that there is a valid path between the two dots after walls are set.
- Ability for player to cancel or reset game.
- Ability for player to set difficulty.
- Ability for “AI” to draw line from their dot to player dot at set pace (pace based on player’s selected difficulty).
- Ability to display a winning or losing screen.
- Ability to keep score.
- Utilize Facebook Games API to track player information.

Stretch goals - 2 player mode.
- Ability for player 2 to draw the line starting at enemy dot.
- Restrictions so that player 2 cannot draw over walls and can only draw only from the end of their line.
- Ability for player 2 to clear their line if they make a mistake.
