var userClickedPattern = [];
var gamePattern = [];
var randomNumber;
var buttonColours = ["red", "blue", "green", "yellow"];
var levelGame = 0;
var gameStart = false;
var clickBtn = false;


function animationStart(counter) { 
  clickBtn = true;
  
  setTimeout(function () {
    $(`#${gamePattern[counter]}`).fadeOut(100).fadeIn(100);
    playSound(gamePattern[counter]);
  }, counter * 500);

  setTimeout(function () {
    if (counter === gamePattern.length - 1) { 
      clickBtn = false;
    }
  }, counter * 800); 
}

function nextSequence() {
  gameStart = true;
  levelGame++;
  randomNumber = Math.floor(Math.random() * 4);
  var randomChosenColour = buttonColours[randomNumber];
  gamePattern.push(randomChosenColour);
  $("h1").text(`Level ${levelGame}`);

  for (let i = 0; i < gamePattern.length; i++) {
    animationStart(i);
  }
}


$(document).click(function (e) {
  e.preventDefault()
  e.stopPropagation()
  if (gameStart === true) {
    return;
  }
  nextSequence();
});

$(".btn").click(function (e) {
  e.preventDefault()
  e.stopPropagation()
  if (gameStart === false || clickBtn === true) {
    return;
  }
  var userChosenColour = $(this).attr("id");
  $(`#${userChosenColour}`).fadeOut(100).fadeIn(100);
  // $(`#${userChosenColour}`).addClass("pressed");
  userClickedPattern.push(userChosenColour);
  playSound(userChosenColour);

  setTimeout(function () {
    $(`#${userChosenColour}`).removeClass("pressed");
  }, 100);

  var currentLevel = userClickedPattern.length - 1;

  checkAnswer(currentLevel);
});

function checkAnswer(currentLevel) {
  if (gamePattern[currentLevel] === userClickedPattern[currentLevel]) {
    if (gamePattern.length === userClickedPattern.length) {
      nextLevel();
    }
  } else {
    startOver();
  }
}

function nextLevel() {
  setTimeout(function () {
    nextSequence();
    userClickedPattern = [];
  }, 1000);
}

function startOver() {
  gameStart = false;
  gamePattern = [];
  userClickedPattern = [];
  levelGame = 0;
  playSound("wrong");
  $("h1").text("Game Over, Press Any Key to Restart");
  $("body").addClass("game-over");
  setTimeout(function () {
    $("body").removeClass("game-over");
  }, 200);
}

function playSound(currentKey) {
  var audio = new Audio(`sounds/${currentKey}.mp3`);
  audio.play();
}
