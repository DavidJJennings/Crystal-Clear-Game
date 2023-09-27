//Toggler for the shop classes to make it extend/collapse, display tier headers and alter shop arrangement.
$(".shopIconBtnHidden").click(function () {
  $(".shopBackgroundHidden").toggleClass("shopBackground");
  $(".onyx").toggleClass("onyxClicked");
  $(".emerald").toggleClass("emeraldClicked");
  $(".opal").toggleClass("opalClicked");
  $(".ruby").toggleClass("rubyClicked");
  $(".hiddenTierHeaders").toggleClass("tierHeaders");
  $(".hiddenTierHeaders").toggleClass("fade-in-fade-out");
});

enableUI(); //enabled for testing

//Level is 0 before game is initiated to level 1.
let level = 0;
//Always false before game initiated
let alive = false;

let counter = 0;

//empty arrays for the game and user selected sequences
let gamePattern = [];
let userClickedPattern = [];

//All individual button assignment as well as a container for all of the buttons together.
const allButtons = document.querySelectorAll(".diamond");
const greenGem = document.querySelector("#green"); //INDEX NUMBER 1
const yellowGem = document.querySelector("#yellow"); // INDEX NUMBER 2
const blueGem = document.querySelector("#blue"); // INDEX NUMBER 3
const redGem = document.querySelector("#red"); //INDEX NUMBER 4

//pushes a random number between 1-4 on to the end of an array
function randomNum() {
  return Math.floor(Math.random() * 4);
}

//Uses the random number function to select a random index position inside the array of possible colors.
const buttonColors = ["green", "yellow", "blue", "red"];

function randomChosenColor() {
  return buttonColors[randomNum()];
}

function nextSequence() {
  gamePattern.push(randomChosenColor());
  sequenceAnimation(gamePattern);
  level++;
  currentScore.innerHTML = level;
  enableUI();
}

function checkAnswer(answer) {
  console.log(answer);
  console.log(gamePattern[counter]);
  switch (answer == gamePattern[counter]) {
    case true:
      counter++;
      switch (counter < gamePattern.length) {
        case true:
          break;
        case false:
          counter = 0;
          nextSequence();
      }
      break;

    case false:
      alive = false;
      counter = 0;
      currentScore.innerHTML = "PRESS THE SPACE KEY TO START";
      level = 0;
      disableUI();
      gamePattern = [];
      userClickedPattern = [];
      break;
  }
}

//Adds an event listener to each of the buttons, which then identifies the pressed button and pushes it to sequence of user inputs.
allButtons.forEach((element) => {
  element.addEventListener("click", () => {
    let userSelection = element.id;
    animatePress(element);
    checkAnswer(userSelection);
  });
});

//A function to be used inside an event listener, which takes an element, adds a css class then waits 100ms to remove, giving a flashing
//effect when the user clicks a button.
function animatePress(elementPressed) {
  elementPressed.classList.add("pressed");
  setTimeout(() => {
    elementPressed.classList.remove("pressed");
  }, 100);
}

const currentScore = document.querySelector(".highscore"); // Header element which changes to score counter when game is initiated.

document.querySelector(":root").addEventListener("keydown", (Event) => {
  if (Event.key == " " && alive === false) {
    nextSequence();
    alive = true;
    currentScore.innerHTML = level;
  }
});

function enableUI() {
  //toggles user if users are allowed to make inputs on the gems or not.   LARGE POTENTIAL FOR BUGS!!!
  document
    .querySelectorAll(".diamond")
    .forEach((element) => element.classList.add("enable-pointer-events"));
  document
    .querySelectorAll(".diamond")
    .forEach((element) => element.classList.remove("disable-pointer-events"));
}

function disableUI() {
  document
    .querySelectorAll(".diamond")
    .forEach((element) => element.classList.add("disable-pointer-events"));
  document
    .querySelectorAll(".diamond")
    .forEach((element) => element.classList.remove("enable-pointer-events"));
}

function sequenceAnimation(thisArray) {
  // this was hell on earth to make, refer to when needing to iterate through arrays with
  thisArray.forEach((Element, i) => {
    // a delay on each step. This takes an array, checks it for a value between 1-4,
    setTimeout(() => {
      // and then flashes the corresponding colored gem.
      switch (Element) {
        case "green":
          greenGem.classList.remove("flash-gem");
          greenGem.offsetHeight;
          greenGem.classList.add("flash-gem");
          break;
        case "yellow":
          yellowGem.classList.remove("flash-gem");
          yellowGem.offsetHeight;
          yellowGem.classList.add("flash-gem");
          break;
        case "blue":
          blueGem.classList.remove("flash-gem");
          blueGem.offsetHeight;
          blueGem.classList.add("flash-gem");
          break;
        case "red":
          redGem.classList.remove("flash-gem");
          redGem.offsetHeight;
          redGem.classList.add("flash-gem");
          break;
      }
    }, i * 500);
  });
}
