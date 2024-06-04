// JS script

const gameboard = function board() {
    let row1 = [];
    let row2 = [];
    let row3 = [];


    // check win method
    // check all 3 in a rows for X
    // else check all 3 in a rows for O
    // else if board is full
    // declare tie

    const addSymbolToArray = function (symbol,row, col) {
        switch (row) {
            case row = 0:
                row1[col] = symbol;
                break;
            case row = 1:
                row2[col] = symbol;
                break;
            case row = 2:
                row3[col] = symbol;
                break;
            default:
                console.log("something went wrong in addSymbolToArray");
        }
        console.log(row1,row2,row2);
    }

    return {addSymbolToArray};
}();

const gameManager = function manager() {
    // start game method will assign players to O or X

    // run round method will prompt one player to choose a spot, then calls gameboard method to place their symbol
    // flips players each round
}();

function player() {
    // private variable for player name
    // private variable for whether they are player O or X
}

// make playerO