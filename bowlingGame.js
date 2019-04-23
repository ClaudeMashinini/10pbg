var bowlingGame = function() {

};

bowlingGame.prototype.roll = function(pins) {
	this.rolls.push(pins);
};

bowlingGame.prototype.score = function() {
	var result = 0, index = 0, game = this;

	for (var frameIndex = 0; frameIndex < 10; frameIndex++) {
		if (Strike()) {
			result += strikeScore();
			index++;
		} else if (Spare()) {
			result += spareScore();
			index += 2;
		} else {
			result += normalScore();
			index += 2;
		}

	}
	return result;

	function Strike() {
		return game.rolls[index];
	}

	function Spare() {
		return game.rolls[index] + game.rolls[index + 1] == 10;
	}

	function strikeScore(){
		return game.rolls[index] + game.rolls[index + 1] + game.rolls[index + 2];
	}
	function spareScore(){
		return game.rolls[index] + game.rolls[index + 1];
	}
}
