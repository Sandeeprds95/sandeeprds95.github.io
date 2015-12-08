//Returns EMPTY GRID values
function initGameBoard() {
    return [EMPTY, EMPTY, EMPTY,
             EMPTY, EMPTY, EMPTY,
             EMPTY, EMPTY, EMPTY];
};

//Returns the GRIDS that are empty
function getEmptyGrids(board) {
    console.log("Emptying grids");
    var emptyList = [];
    for(var i=0; i<board.length;++i) {
        if(board[i] == EMPTY) {
            emptyList.push(i);
        }
    }
    return emptyList;
};

//Selects the paricular GRID
function makeMove(board, grid_index, player) {
    console.log("Made a move!");
    board[grid_index] = player;
    return board;
}

//Updating board with current Grid clicks
function updateBoard(player, grid_index) {
    console.log("BOARD UPDATED!");
    if(player == XPLAYER) {
        console.log(grid_index);
        $('#' + grid_index).append('<h1>X</h1>');
    }
    else if(player == OPLAYER) {
        $('#' + grid_index).append('<h1>O</h1>');
    }
}

//Reset Display
function resetDisplay() {
    $('h1').remove();
}

//function that checks for winner
function checkForWin(board) {
    for(var i = 0; i < wins.length; ++i) {
        var possibleWin = wins[i];

        if (board[possibleWin[0]] == XPLAYER &&
                board[possibleWin[1]] == XPLAYER &&
                    board[possibleWin[2]]  == XPLAYER) {
                        return XPLAYER;
        }
        if (board[possibleWin[0]] == OPLAYER &&
                board[possibleWin[1]] == OPLAYER &&
                    board[possibleWin[2]]  == OPLAYER) {
                        return OPLAYER;
        }
    }
    if (getEmptyGrids(board).length == 0) {
        return DRAW;
    } else {
         return NONE;
    }
}

//Switches the player
function switchPlayer(player) {
    return ((player == XPLAYER) ? OPLAYER : XPLAYER);
}