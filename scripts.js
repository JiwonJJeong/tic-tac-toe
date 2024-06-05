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
            case 0:
                (row1[col] === undefined) ? (row1[col] = symbol) : console.log("This spot is filled!");
                break;
            case 1:
                (row2[col] === undefined) ? (row2[col] = symbol) : console.log("This spot is filled!");
                break;
            case 2:
                (row3[col] === undefined) ? (row3[col] = symbol) : console.log("This spot is filled!");
                break;
            default:
                console.log("something went wrong in addSymbolToArray");
        }
        displayBoard();
    }

    const displayBoard = function(){
        console.log(row1,row2,row3);
    }

    return {addSymbolToArray, displayBoard};
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