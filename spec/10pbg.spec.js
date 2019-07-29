var Scorecard = require("../scorecard");
var Frame = require("../frames");
var FrameTen = require("../frame10");

describe("Facilitating the scoring", function() {
  var scorecard, frame, frame10;

  beforeEach(function() {
    scorecard = new Scorecard();
    scorecard.create(Frame);
  });

  it("should be able to create a set of 10 frames", function() {
    expect(scorecard.frames.length).toEqual(10);
  });

  it("should be instantiated with zero points", function() {
    expect(scorecard.score()).toEqual(0);
  });

  it("should be able to detemine the current score after shots", function() {
    scorecard.frames[0].receiveShot(4);
    scorecard.frames[0].receiveShot(3);
    scorecard.frames[1].receiveShot(4);
    scorecard.frames[1].receiveShot(1);
    expect(scorecard.score()).toEqual(12);
  });

  it("should not be able to create more than 10 frames", function() {
    expect(function() {
      scorecard.create(Frame);
    }).toThrow(
      new Error("No more frames available, create a new game to play again.")
    );
  });

  it("should update a frames score if it was a spare", function() {
    scorecard.frames[0].receiveShot(5);
    scorecard.frames[0].receiveShot(5);
    scorecard.frames[1].receiveShot(6);
    scorecard.frames[1].receiveShot(3);
    scorecard.checkScores();
    expect(scorecard.frames[0].score).toEqual(16);
  });

  it("should update a frames score if it was a strike", function() {
    scorecard.frames[0].receiveShot(10);
    scorecard.frames[1].receiveShot(7);
    scorecard.frames[1].receiveShot(3);
    scorecard.checkScores();
    expect(scorecard.frames[0].score).toEqual(20);
  });

  it("should be able to score consecutive strikes correctly", function() {
    scorecard.frames[0].receiveShot(10);
    scorecard.frames[1].receiveShot(10);
    scorecard.frames[2].receiveShot(10);
    scorecard.checkScores();
    expect(scorecard.frames[0].score).toEqual(30);
  });

  it("should deal with a strike in frame 9 and 10 correctly", function() {
    scorecard.frames[8].receiveShot(10);
    scorecard.frames[9].receiveShot(10);
    scorecard.frames[9].receiveShot(5);
    scorecard.frames[9].receiveShot(5);
    scorecard.checkScores();
    expect(scorecard.frames[8].score).toEqual(25);
    expect(scorecard.frames[9].score).toEqual(20);
  });

  it("should deal with a spare in frame 10 correctly", function() {
    scorecard.frames[9].receiveShot(5);
    scorecard.frames[9].receiveShot(5);
    scorecard.frames[9].receiveShot(8);
    scorecard.checkScores();
    expect(scorecard.frames[9].score).toEqual(18);
  });

  it("should deal with frame 10 correctly", function() {
    scorecard.frames[9].receiveShot(5);
    scorecard.frames[9].receiveShot(3);
    scorecard.checkScores();
    expect(scorecard.frames[9].score).toEqual(8);
  });

  it("should work for a full game", function() {
    scorecard.frames[0].receiveShot(1);
    scorecard.frames[0].receiveShot(4);
    scorecard.frames[1].receiveShot(4);
    scorecard.frames[1].receiveShot(5);
    scorecard.frames[2].receiveShot(6);
    scorecard.frames[2].receiveShot(4);
    scorecard.frames[3].receiveShot(5);
    scorecard.frames[3].receiveShot(5);
    scorecard.frames[4].receiveShot(10);
    scorecard.frames[5].receiveShot(0);
    scorecard.frames[5].receiveShot(1);
    scorecard.frames[6].receiveShot(7);
    scorecard.frames[6].receiveShot(3);
    scorecard.frames[7].receiveShot(6);
    scorecard.frames[7].receiveShot(4);
    scorecard.frames[8].receiveShot(10);
    scorecard.frames[9].receiveShot(2);
    scorecard.frames[9].receiveShot(8);
    scorecard.frames[9].receiveShot(6);
    scorecard.checkScores();
    expect(scorecard.score()).toEqual(133);
  });

  it("should work for a gutter game", function() {
    scorecard.frames[0].receiveShot(0);
    scorecard.frames[0].receiveShot(0);
    scorecard.frames[1].receiveShot(0);
    scorecard.frames[1].receiveShot(0);
    scorecard.frames[2].receiveShot(0);
    scorecard.frames[2].receiveShot(0);
    scorecard.frames[3].receiveShot(0);
    scorecard.frames[3].receiveShot(0);
    scorecard.frames[4].receiveShot(0);
    scorecard.frames[4].receiveShot(0);
    scorecard.frames[5].receiveShot(0);
    scorecard.frames[5].receiveShot(0);
    scorecard.frames[6].receiveShot(0);
    scorecard.frames[6].receiveShot(0);
    scorecard.frames[7].receiveShot(0);
    scorecard.frames[7].receiveShot(0);
    scorecard.frames[8].receiveShot(0);
    scorecard.frames[8].receiveShot(0);
    scorecard.frames[9].receiveShot(0);
    scorecard.frames[9].receiveShot(0);
    scorecard.checkScores();
    expect(scorecard.score()).toEqual(0);
  });

  it("should work for a perfect game", function() {
    scorecard.frames[0].receiveShot(10);
    scorecard.frames[1].receiveShot(10);
    scorecard.frames[2].receiveShot(10);
    scorecard.frames[3].receiveShot(10);
    scorecard.frames[4].receiveShot(10);
    scorecard.frames[5].receiveShot(10);
    scorecard.frames[6].receiveShot(10);
    scorecard.frames[7].receiveShot(10);
    scorecard.frames[8].receiveShot(10);
    scorecard.frames[9].receiveShot(10);
    scorecard.frames[9].receiveShot(10);
    scorecard.frames[9].receiveShot(10);
    scorecard.checkScores();
    expect(scorecard.score()).toEqual(300);
  });
});

describe("frame regulation", function() {
  var frame;
  var frame10;

  beforeEach(function() {
    frame = new Frame();
  });

  it("should be instantiated with 10 pins", function() {
    expect(frame.pinCount).toEqual(10);
  });

  it("should receive a throw", function() {
    frame.receiveShot(3);
    expect(frame.pinCount).toEqual(7);
  });

  it("should only receive 2 throws", function() {
    frame.receiveShot(2);
    frame.receiveShot(2);
    expect(function() {
      frame.receiveShot(2);
    }).toThrow(new Error("You can not receive another shot in this frame."));
  });

  it("should only receive 2 throws totalling 10 points", function() {
    frame.receiveShot(9);
    expect(function() {
      frame.receiveShot(2);
    }).toThrow(new Error("You can only hit 10 pins per frame."));
  });

  it("should be able to keep track of the score for each shot", function() {
    frame.receiveShot(3);
    frame.receiveShot(4);
    expect(frame.firstShot).toEqual(3);
    expect(frame.secondShot).toEqual(4);
  });

  it("should know if it is a spare", function() {
    frame.receiveShot(4);
    frame.receiveShot(6);
    expect(frame.isSpare()).toBe(true);
  });

  it("should know if it is a strike", function() {
    frame.receiveShot(10);
    expect(frame.isStrike()).toBe(true);
  });

  it("should only allow 2 shots in frame 10 without a strike or spare", function() {
    frame10 = new FrameTen();
    frame10.isFrame10 = true;
    frame10.receiveShot(2);
    frame10.receiveShot(2);
    expect(function() {
      frame10.receiveShot(2);
    }).toThrow(new Error("You can not receive another shot in this frame."));
  });

  it("should only allow 3 shots in frame 10 with a strike", function() {
    frame10 = new FrameTen();
    frame10.isFrame10 = true;
    frame10.receiveShot(10);
    frame10.receiveShot(5);
    frame10.receiveShot(2);
    expect(function() {
      frame10.receiveShot(2);
    }).toThrow(new Error("You can not receive another shot in this frame."));
  });

  it("should only allow 3 shots in frame 10 with a spare", function() {
    frame10 = new FrameTen();
    frame10.isFrame10 = true;
    frame10.receiveShot(5);
    frame10.receiveShot(5);
    frame10.receiveShot(5);
    expect(function() {
      frame10.receiveShot(2);
    }).toThrow(new Error("You can not receive another shot in this frame."));
  });
});
