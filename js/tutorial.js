//This is a basic big of Javascript that is used to make sure the toasts work on the tutorial page.

(function() {
  //Getting the 'About' link.
  let highScores = $('#about');

  //Displays some basic information about the game in a toast when the About link is clicked.
  highScores.click(function() {
    Materialize.toast(`<ul><h2>Maze Game</h2><li>My Q1 project for the Galvanize Web Development Intensive Program.</li><li>This project uses HTML5, Javascript, jQuery, Materialize, and Youtube's iFrame Player API</li></ul>`, 15000);
  });

})();
