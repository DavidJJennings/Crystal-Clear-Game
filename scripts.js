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

const currentScore = document.querySelector(".highscore");
let allShopThemes = document.querySelectorAll(".gem-shop-tier");
let counterBackground = document.querySelector(".counterBackground");
let root = document.querySelector(":root");
let shopBackground = document.querySelector(".shopTheme");

/*Functionality for theme application, on click removes any existing themes, and then toggles the selected theme on*/
allShopThemes.forEach((element) => {
  element.addEventListener("click", () => {
    if (element.id == "onyx") {
      root.classList.remove(
        "rootThemeEmerald",
        "rootThemeOpal",
        "rootThemeRuby"
      );
      root.classList.toggle("rootThemeOnyx");

      shopBackground.classList.remove(
        "shopThemeEmerald",
        "shopThemeOpal",
        "shopThemeRuby"
      );
      shopBackground.classList.toggle("shopThemeOnyx");

      counterBackground.classList.remove(
        "counterThemeEmerald",
        "counterThemeOpal",
        "counterThemeRuby"
      );
      counterBackground.classList.toggle("counterThemeOnyx");
    } else if (element.id == "emerald") {
      root.classList.remove("rootThemeOnyx", "rootThemeOpal", "rootThemeRuby");
      root.classList.toggle("rootThemeEmerald");
      shopBackground.classList.remove(
        "shopThemeOnyx",
        "shopThemeOpal",
        "shopThemeRuby"
      );
      shopBackground.classList.toggle("shopThemeEmerald");
      counterBackground.classList.remove(
        "counterThemeOnyx",
        "counterThemeOpal",
        "counterThemeRuby"
      );
      counterBackground.classList.toggle("counterThemeEmerald");
    } else if (element.id == "opal") {
      root.classList.remove(
        "rootThemeEmerald",
        "rootThemeOnyx",
        "rootThemeRuby"
      );
      root.classList.toggle("rootThemeOpal");
      shopBackground.classList.remove(
        "shopThemeEmerald",
        "shopThemeOnyx",
        "shopThemeRuby"
      );
      shopBackground.classList.toggle("shopThemeOpal");
      counterBackground.classList.remove(
        "counterThemeEmerald",
        "counterThemeOnyx",
        "counterThemeRuby"
      );
      counterBackground.classList.toggle("counterThemeOpal");
    } else if (element.id == "ruby") {
      root.classList.remove(
        "rootThemeEmerald",
        "rootThemeOpal",
        "rootThemeOnyx"
      );
      root.classList.toggle("rootThemeRuby");
      shopBackground.classList.remove(
        "shopThemeEmerald",
        "shopThemeOpal",
        "shopThemeOnyx"
      );
      shopBackground.classList.toggle("shopThemeRuby");
      counterBackground.classList.remove(
        "counterThemeEmerald",
        "counterThemeOpal",
        "counterThemeOnyx"
      );
      counterBackground.classList.toggle("counterThemeRuby");
    }
  });
});

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
  disableUI();
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

/*Initiates game on spacebar press, generates initial sequence, enables inputs updates level and disables the event listener
until the player has lost */
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
