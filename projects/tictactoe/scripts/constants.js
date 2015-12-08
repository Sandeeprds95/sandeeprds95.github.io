const XPLAYER = 1.0;
const OPLAYER = 0.0;
const EMPTY = -1.0;
const NONE = -5.0;
const DRAW = -2.0;

var wins = [
	[0,1,2], [3,4,5], [6,7,8],
	[0,3,6], [1,4,7], [2,5,8],
	[0,4,8],[2,4,6]
];


var gameBoard;
var currentPlayer = XPLAYER;
var gameInProgress;
var mode = 0;

var gamesPlayed = 0, XWins = 0, numOfDraws = 0, OWins = 0;