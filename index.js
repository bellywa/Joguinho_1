var buttonColours = ['red', 'blue', 'green', 'yellow']
gamePattern = []
userClickedPattern = []
var started = false
var level = 0

$(document).keypress(function () {
  if (!started) {
    $('#level-title').text('Level ' + level)
    nextSequence()
    started = true
  }
})

$('.btn').click(function () {
  var userChosenColour = $(this).attr('id') //to store the id of the button that got clicked.
  userClickedPattern.push(userChosenColour)
  playSound(userChosenColour)
  animatePress(userChosenColour)
  checkAnswer(userClickedPattern.length - 1) //Call checkAnswer() after a user has clicked and chosen their answer, passing in the index of the last answer in the user's sequence.
})

function nextSequence() {
  userClickedPattern = []
  level++
  $('#level-title').text('Level ' + level)
  var randomNumber = Math.random()
  randomNumber = randomNumber * 4
  randomNumber = Math.floor(randomNumber)
  var randomChosenColour = buttonColours[randomNumber]
  gamePattern.push(randomChosenColour)
  $('#' + randomChosenColour)
    .fadeIn(100)
    .fadeOut(100)
    .fadeIn(100)
  playSound(randomChosenColour)
}

function playSound(name) {
  var audio = new Audio('sounds/' + name + '.mp3') //parametro name é especificado nas respectivas funções onde é chamado
  audio.play()
}

function animatePress(currentColor) {
  $('#' + currentColor).addClass('pressed')
  setTimeout(function () {
    $('#' + currentColor).removeClass('pressed')
  }, 100)
}

function checkAnswer(currentLevel) {
  if (userClickedPattern[currentLevel] === gamePattern[currentLevel]) {
    console.log('succes')
    if (userClickedPattern.length === gamePattern.length) {
      setTimeout(function () {
        nextSequence()
      }, 1000)
    }
  } else {
    console.log('wrong')
    playSound('wrong')
    $('body').addClass('game-over')
    setTimeout(function () {
      $('body').removeClass('game-over')
    }, 200)
    $('#level-title').text('Game Over, Press Any Key to Restart')
    startOver()
  }
}

function startOver() {
  level = 0
  gamePattern = []
  started = false
}
