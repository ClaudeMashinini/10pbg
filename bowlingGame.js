function Score(game) {
    game = game.toUpperCase();
    var rolls = game.split('');

    var bonusBalls;
    if (game.charAt(game.length - 3) === 'X') {
        bonusBalls = 2;
    } else if (game.charAt(game.length - 2) === '/') {
        bonusBalls = 1;
    } else {
        bonusBalls = 0;
    }  

    var pins = [];
    for (k = 0; k < rolls.length; k++) {
        if (rolls[k] === 'X') {
            pins.push(10);
        } else if (rolls[k] === '/') {
            pins.push(10 - rolls[k-1]);
        } else if (rolls[k] === '-') {
            pins.push(0);
        } else { pins.push(parseInt(rolls[k])); }
    }

var result = 0;

for (k = 0; rolls.length - bonusBalls; k++) {
    result += pins[k];
    if (rolls[k] === 'X') {
        result += pins[k + 1]+ pins[k + 2];
    }
    if (rolls[k] === '/') {
        result += pins[k + 1];
    }
}
    if (result.toString() === 'NaN') {
        return 'Incorrect input';
    } else {
        return result;
    }
}