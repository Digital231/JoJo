// 3. At the top of the game.js file, create a new array called buttonColours and set it to hold the sequence "red", "blue", "green", "yellow".
var buttonColours = ["red", "blue", "green", "yellow"];

// 5. At the top of the game.js file, create a new empty array called gamePattern.
var gamePattern = [];

// 3. Create a new empty array called userClickedPattern.
var userClickedPattern = [];

// 1. Use jQuery to detect when any of the buttons are clicked and trigger a handler function.
$(".btn").click(function() {
  // 2. Inside the handler, create a new variable called userChosenColour to store the id of the button that got clicked.
  var userChosenColour = $(this).attr("id");

  // 4. Add the contents of the variable userChosenColour created in step 2 to the end of this new userClickedPattern.
  userClickedPattern.push(userChosenColour);

  // Play the sound for the clicked button.
  playSound(userChosenColour);

  // Call the animatePress() function to add the "pressed" class and remove it after 100 milliseconds
  animatePress(userChosenColour);

  // Log userClickedPattern to the console to track user input
  console.log(userClickedPattern);

  // Check if the user's sequence matches the game pattern
  checkAnswer(userClickedPattern.length - 1);
});

// 2. Create a new function called playSound() that takes a single input parameter called name.
function playSound(name) {
  // Construct the path to the sound file based on the name
  var soundFilePath = "sounds/" + name + ".mp3";

  // Create an audio element and play the sound
  var audio = new Audio(soundFilePath);
  audio.play();
}

// 3. Create a new function called animatePress(), it should take a single input parameter called currentColour.
function animatePress(currentColour) {
  // Add the "pressed" class to the button with the matching currentColour
  $("#" + currentColour).addClass("pressed");

  // Use setTimeout to remove the "pressed" class after 100 milliseconds
  setTimeout(function() {
    $("#" + currentColour).removeClass("pressed");
  }, 100);
}

// 1. Use jQuery to detect when a keyboard key has been pressed, when that happens for the first time, call nextSequence().
var gameStarted = false;

$(document).keydown(function() {
  if (!gameStarted) {
    $("#level-title").text("Level 0");
    nextSequence();
    gameStarted = true;
  }
});

// 4. Create a new variable called level and start at level 0.
var level = 0;

// 5. Inside nextSequence(), increase the level by 1 every time nextSequence() is called.
function nextSequence() {
    level++;
    $("#level-title").text("Level " + level);
  
    // Define a base delay and decrease it with each level to increase the flashing speed
    var baseDelay = 1000; // Adjust the base delay as needed
  
    // Loop through the gamePattern array and flash each color
    for (var i = 0; i < gamePattern.length; i++) {
      (function(index) {
        setTimeout(function() {
          var currentColour = gamePattern[index];
          $("#" + currentColour)
            .fadeOut(baseDelay / (level * 0.5)) // Adjust the division factor for speed
            .fadeIn(baseDelay / (level * 0.5)); // Adjust the division factor for speed
          playSound(currentColour);
        }, baseDelay * index / (level * 0.5)); // Adjust the division factor for speed
      })(i);
    }
  
    // Generate a new random color and add it to the gamePattern
    setTimeout(function() {
      var randomNumber = Math.floor(Math.random() * 4);
      var randomChosenColour = buttonColours[randomNumber];
      gamePattern.push(randomChosenColour);
      $("#" + randomChosenColour)
        .fadeOut(baseDelay / (level * 0.5)) // Adjust the division factor for speed
        .fadeIn(baseDelay / (level * 0.5)); // Adjust the division factor for speed
      playSound(randomChosenColour);
    }, baseDelay * gamePattern.length / (level * 0.5)); // Adjust the division factor for speed
  }
  
  

// 4. Create a new function called checkAnswer(), it should take one input with the name currentLevel
function checkAnswer(currentLevel) {
  // 3. Write an if statement inside checkAnswer() to check if the most recent user answer is the same as the game pattern. If so then log "success", otherwise log "wrong".
  if (userClickedPattern[currentLevel] === gamePattern[currentLevel]) {
    console.log("success");
    
    // 4. If the user got the most recent answer right in step 3, then check that they have finished their sequence with another if statement.
    if (userClickedPattern.length === gamePattern.length) {
      // 5. Call nextSequence() after a 1000 millisecond delay.
      setTimeout(function() {
        nextSequence();
      }, 1000);

      // 6. Once nextSequence() is triggered, reset the userClickedPattern to an empty array ready for the next level.
      userClickedPattern = [];
    }
  } else {
    console.log("wrong");
    
    // 1. In the sounds folder, there is a sound called wrong.mp3, play this sound if the user got one of the answers wrong.
    var wrongSound = new Audio("sounds/wrong.mp3");
    
    // 2. In the styles.css file, there is a class called "game-over", apply this class to the body of the website when the user gets one of the answers wrong and then remove it after 200 milliseconds.
    $("body").addClass("game-over");
    setTimeout(function() {
      $("body").removeClass("game-over");
    }, 200);
    
    // 3. Change the h1 title to say "Game Over, Press Any Key to Restart" if the user got the answer wrong.
    $("#level-title").text("Game Over, Press Any Key to Restart");
    
    // Reset the game when the user gets it wrong by clearing arrays and variables
    startOver();
  }
}

// 7. Create a new function called startOver() to reset the game when the user gets it wrong.
function startOver() {
  level = 0;
  gamePattern = [];
  userClickedPattern = [];
  gameStarted = false;
}

// ... (previous code)
