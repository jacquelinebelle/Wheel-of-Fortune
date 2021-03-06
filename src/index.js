import $ from 'jquery';
import './css/base.scss';
import './images/turing-logo.png';
import Game from './Game';
import Wheel from './Wheel';
import domUpdates from './domUpdates';

let game;

$('.start-button').click(function() {
  $('.player-start-page').addClass('hidden');
  $('.dim').addClass('hidden');
  $('main, header').removeClass('hidden')
  const names = [$('#input-1').val(), $('#input-2').val(), $('#input-3').val()]
  const wheel = new Wheel();
  wheel.createWheel();
  game = new Game(wheel);
  game.createPlayers(names);
  game.start();
});

$(document).on('click', ".usable", function(e) {
  game.currentRound.currentTurn.letterGuessCheck($(e.currentTarget).text());
  domUpdates.displayPlayerScores(game, game.currentRound.currentTurn.player.id);
  domUpdates.updateCurrentPlayer(game.currentRound.currentTurn.player);
  domUpdates.clearSpinVal();
  domUpdates.useLetter(e.target);
});

$('.letter').click(function(e) {
  if (!$(e.target).hasClass('usable')) {
    domUpdates.showError('Spin the wheel or buy a vowel to make a guess.');
  }
})

$('.sad-btn').click(function() {
  $('.error').text('');
  $('.sad-btn').addClass('hidden');
  $('.spin-btn, .solve-btn, .buy-btn').removeClass('hidden');
});

$('.spin-btn').click(function() {
  if (game.currentRound.currentTurn.hasSpun === true) {
    domUpdates.showError('Please select a letter.');
  } else {
    game.currentRound.currentTurn.spinWheel();
    $('.vowel').addClass('hidden');
    $('.consonant').addClass('usable');
    domUpdates.showHelp('Choose a letter from the box on the right!');
  }
});

$('.solve-btn').click(function(e) {
  e.preventDefault();
  domUpdates.toggleSolveForm();
  domUpdates.showHelp('Type in what you think the answer is and then click "Solve!"');
});  

$('.actions-container').click(function(e) {
  e.preventDefault();
  if (e.target.id === 'solve-button') {
    game.currentRound.currentTurn.solvePuzzle($('#solve-input').val().toUpperCase());
    domUpdates.clearForm('#solve-input');
    domUpdates.toggleSolveForm();
  } 
});

$('#cancel-btn').click(function() {
  domUpdates.toggleSolveForm();
})

$('.buy-btn').click(function() {
  if (game.currentRound.currentTurn.buyVowel() && (!game.currentRound.currentTurn.hasSpun)) {
    $('.consonant').addClass('hidden');
    $('.vowel').addClass('usable');
    domUpdates.showHelp('Choose a vowel from the box on the right!');
  } if (game.currentRound.currentTurn.hasSpun) {
    domUpdates.showError('You can only choose a consonant after spinning. You may buy a vowel on your next turn if you have the funds.')
  }
});

$('.quit-btn').click(function() {
  location.reload();
});

$('button, .letter').click(function() {
  $('.help').text('');
})