describe ("Bowling Game", function(){

		beforeEach(function(){
				var game = new bowlingGame();
				});

		var repeatRolls = function(pins, rolls){
		for(var k = 0; k < rolls; k++){
		game.roll(pins);
		}
		} 

		it("can roll a spare", function(){
				game.roll(6);
				game.roll(4);
				game.roll(5);
				repeatRolls(0, 17);
				expect(game.score()).toBe(15);
				});

		it("can roll a strike", function(){
				game.roll(10);
				game.roll(4);
				game.roll(5);
				repeatRolls(0, 17);
				expect(game.score()).toBe(19);
				});

		it("can roll all strikes", function(){
				repeatRolls(10, 12);
				expect(game.score()).toBe(300);
				})

		it("can roll all ones", function(){
				repeatRolls(1, 20);
				expect(game.score()).toBe(20);
				});

		it("can roll a gutter game", function(){
				repeatRolls(0, 20);
				expect(game.score()).toBe(0);
				});






});
