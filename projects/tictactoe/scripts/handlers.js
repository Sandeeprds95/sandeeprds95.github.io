//On window load
window.onload = function() {
    resetGame();
};

//Resets the whole Game
function resetGame() {
    console.log("RESET DONE!");
    mode = 0;                       //inital mode - Manual
    gameBoard = initGameBoard();    //All grids are EMPTY
    resetDisplay();
    gameInProgress = true;
    if(mode === 0 || mode === 2) {
        currentPlayer = XPLAYER;    //1st player is X in manual and computer plays O
    } else {
        currentPlayer = OPLAYER;    //1st Player is X - Computer plays 2nd
    }
    updateScore();                  //Score is set to ZERO
};

//Updates the Score
function updateScore(){
    document.getElementById('gamesPlayed').innerHTML = "<b>Games played: " + gamesPlayed + "</b>";
    document.getElementById('XWins').innerHTML = "<b>Wins by X : " + XWins + "</b>";
    document.getElementById('OWins').innerHTML = "<b>Wins by O : " + OWins + "</b>";
    document.getElementById('numOfDraws').innerHTML = "<b>Draws: " + numOfDraws + "</b>";
}

//On GRID click
function gridClick(grid) {
    console.log("Inside gridClick!");
    if(!gameInProgress) {
        return;
    }
    
    var emptyList = getEmptyGrids(gameBoard);                   //To check if the clicked grid is EMPTY or not
    if(emptyList.indexOf(parseInt(grid.id)) == EMPTY) {
        return;
    }
    
    gameBoard = makeMove(gameBoard, grid.id, currentPlayer);
    updateBoard(currentPlayer, grid.id);

    var winner = checkForWin(gameBoard);
    if(winner  == NONE) {
        currentPlayer = switchPlayer(currentPlayer);
    } else {
        displayWinner(winner, currentPlayer);
    }
};

//Displays the winner
function displayWinner(winner, player) {
    gameInProgress = false;
    gamesPlayed += 1;
    if (winner == DRAW) {
        numOfDraws += 1;
        $('#winnerModal').modal('toggle');
        document.getElementById("displayWinner").innerHTML = "<h2>Tch. Tch. It's a draw!</h2>";
    } 
    else if (winner == player) {
        if (player == XPLAYER) {
            XWins += 1;
            $('#winnerModal').modal('toggle');
            document.getElementById("displayWinner").innerHTML = "<h2>Woohooo!! The winner is X.</h2>";
        } else {
            OWins += 1;
            $('#winnerModal').modal('toggle');
            document.getElementById("displayWinner").innerHTML = "<h2>Yippiee!! The winner is O.</h2>";
        }
    }
    resetGame();
    updateScore();
    document.getElementById('gamesPlayed').style.webkitTransform = 'scale(1)'; // Force the browser to update the score board
}

//Toggle mode for manual and auto
function toggleMode(button) {
    mode = parseInt(button.id) - 10;
    resetGame();
}