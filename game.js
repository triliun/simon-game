const buttonColours = ["red", "blue", "green", "yellow", "orange", "purple", "pink", "gray"];
let userClickedPattern = [];
let gamePattern = [];
let randomNumber = 0;
let levelGame = 0;
let gameStart = false;
let clickBtn = false;
let soundStatus = false;

function playsound(nameSound) {
  if (!soundStatus) {
    const sound = new Audio(`assets/sounds/${nameSound}.mp3`);
    sound.play();
  }
}

function animationStart(counter) {
  clickBtn = false;

  setTimeout(function () {
    $(`#${gamePattern[counter]}`).addClass("active");
    playsound(gamePattern[counter]);
  }, counter * 500);

  setTimeout(function () {
    $(`#${gamePattern[counter]}`).removeClass("active");
  }, counter * 500 + 300);

  setTimeout(function () {
    if (counter === gamePattern.length - 1) {
      clickBtn = true;
    }
  }, counter * 700);
}

function nextSequence() {
  gameStart = true;
  randomNumber = Math.floor(Math.random() * 8);
  levelGame++;

  const randomColor = buttonColours[randomNumber];
  gamePattern.push(randomColor);
  $("h1").text(`Level ${levelGame}`);

  for (let i = 0; i < gamePattern.length; i++) {
    animationStart(i);
  }
}

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
    userClickedPattern = [];
    nextSequence();
  }, 1000);
}

function startOver() {
  setTimeout(function () {
    gameStart = false;
  }, 1100);
  gamePattern = [];
  userClickedPattern = [];
  levelGame = 0;
  playsound("wrong");
  $("#level_title").text("Game Over, Click Anywhere To Restart");
  $("body").addClass("game-over");
  setTimeout(function () {
    $("body").removeClass("game-over");
  }, 200);
}

$("#sound_button").click(function () {
  if (!soundStatus) {
    soundStatus = true;
  } else {
    soundStatus = false;
  }
  $(this).toggleClass("mute");
});

$(document).click(function () {
  if (gameStart !== true) {
    nextSequence();
  }
});

$(".btn").click(function () {
  if (gameStart === false || clickBtn === false) {
    return;
  }
  const userChosenColour = $(this).attr("id");
  $(`#${userChosenColour}`).addClass("active");
  userClickedPattern.push(userChosenColour);

  const currentLevel = userClickedPattern.length - 1;
  checkAnswer(currentLevel);
  playsound(userChosenColour);

  setTimeout(function () {
    $(`#${userChosenColour}`).removeClass("active");
  }, 100);
});
