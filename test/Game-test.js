import chai from 'chai';
const expect = chai.expect;
import spies from 'chai-spies';
chai.use(spies);
import domUpdates from '../src/domUpdates.js';
import Data from '../src/Data';
import Game from '../src/Game.js';
import Wheel from '../src/Wheel.js';
import Round from '../src/Round.js';
chai.spy.on(domUpdates, [
  'displayPuzzleDescription',
  'displayPuzzleBlanks',
  'displayPuzzleInformation',
  'displayNames',
  'updatePlayer',
  'updateCurrentPlayer',
  'updateRound',
  'clearCorrectLetters',
  'clearIncorrectLetters',
  'reanimateUsedLetters',
  'revealCorrectGuess',
  'addIncorrectGuess',
  'displaySpinVal',
  'displayPlayerScores',
  'turnMessage',
  'showError'
], () => true);


describe('Game', function() {
  let names;
  let wheel;
  let game;

  beforeEach(function() {
    wheel = new Wheel(Data);
    wheel.createWheel();
    names = ['Steve', 'Vinton', 'Jacqueline'];
    game = new Game(wheel);
    game.createPlayers(names);
    game.start();
  });

  it('should have default properties', function() {
    expect(game.wheel).to.deep.equal(wheel);
    expect(game.roundCounter).to.equal(0);
    expect(game.players.length).to.eql(3);
    expect(game.wheel.values.length).to.equal(22);
  });

  it('Should be able to create a puzzle block', function() {
    expect(game.puzzleBlock.length).to.equal(4);
  });

  it('Should be able to start a game', function () {
    game.currentRound.newTurn();
    expect(game.currentRound.currentTurn.player.name).to.equal('Steve');
  });

  it('Should be able to create players', function () {
    expect(game.players[0].name).to.equal('Steve');
  });

  it('should return a puzzle based on the round being played', function() {
    expect(game.roundCounter).to.equal(0);
    expect(game.returnPuzzle()).to.equal(game.puzzleBlock[0]);
    game.currentRound.endRound();
    game.currentRound.endRound();
    expect(game.returnPuzzle()).to.equal(game.puzzleBlock[2]);
  });

  it('should store each new Round as a property', function() {
    expect(game.currentRound).to.be.an.instanceOf(Round);
  });

  it('should return the winner with the highest total score', function() {
    expect(game.roundCounter).to.equal(0);
    game.currentRound.endRound();
    game.currentRound.endRound();
    game.currentRound.endRound();
    game.players[0].totalScore = 4000;
    game.currentRound.endRound();
    game.findWinner();
    expect(game.winner).to.equal(game.players[0]);
  })
});
