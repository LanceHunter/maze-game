const expect = require('chai').expect;
const thisOne = require('../js/jquery-3.2.1.min.js');
const materialize = require('../js/materialize.js');
const game = require('../js/game.js');

describe("Random pixel placement", function() {
  it("Generates an enemy pixel between less than 100", function() {
    expect(thisOne.materialize.game.playerPlacement()).to.equal(100);
  })
})
