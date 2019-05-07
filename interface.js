var generateButton = document.getElementById('generator');
var resultDisplay = document.getElementById('results');
var scoreInput = document.getElementById('scores');

function generate() {
    var score = Score(scoreInput.value);
    resultDisplay.textContent = score;
}
generateButton.addEventListener('click', generate);

document.addEventListener('keydown', function(e){
    if (e.keyCode === 13) {
        generate();
    }
});

scoreInput.addEventListener('keydown', function(e) {
    if (!e.key.match(
      /[0-9]|x|X|\/|-|Enter|Backspace|Delete|Control|ArrowUp|ArrowDown|ArrowLeft|ArrowRight|Ctrl|Home|End|Shift|Alt|CapsLock/
    )) {
      e.preventDefault();
      scoreInput.className += ' red-bg';
      setTimeout(function() {
        scoreInput.classList.remove('red-bg');
      }, 200);
    }
 })