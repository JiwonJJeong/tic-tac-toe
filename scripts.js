// JS script

const gameboard = function board() {
    let row1 = [];
    let row2 = [];
    let row3 = [];

    const checkWin = function(){
        if (row1[0] === row1[1] && row1[1] === row1[2]){ // 3 across first row
            return row1[0] + " wins!";
        } else if (row2[0] === row2[1] && row2[1] === row2[2]){ // 3 across middle row
            return row2[0] + " wins!";
        } else if (row3[0] === row3[1] && row3[1] === row3[2]){ // 3 across bottom row
            return row1[0] + " wins!";
        } else if (row1[0] === row2[0] && row2[0] === row3[0]){ // 3 down left column
            return row1[0] + " wins!";
        } else if (row1[1] === row2[1] && row2[1] === row3[1]){ // 3 down middle column
            return row1[1] + " wins!";
        } else if (row1[2] === row2[2] && row2[2] === row3[2]){ // 3 down right column
            return row1[2] + " wins!";
        } else if (row1[0] === row2[1] && row2[1] === row3[2]){ // diagonal
            return row1[0] + " wins!";
        } else if (row3[0] === row2[1] && row2[1] === row1[2]){ // other diagonal
            return row3[0] + " wins1";
        }
        if (_checkBoardIsFilled){
            return "It's a tie!";
        }
        return false;
    }

    const _checkBoardIsFilled = function(){
        for (let i=0; i<=2; i++){
            if (row1[i] === undefined){
                return false;
            } if (row2[i] === undefined){
                return false;
            } if (row3[i] === undefined){
                return false;
            }

        }
        return true;
    }

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
    }

    const displayBoard = function(){
        console.log(row1,row2,row3);
    }

    return {addSymbolToArray, displayBoard, checkWin};
}();

const gameManager = function manager() {
    let player1;
    let player2;
    let currentTurnHolder;
    const XSYMBOL = "X";
    const OSYMBOL = "O";

    const startGame = function(){
        // prompt name for player 1
        let player1NameInput;
        // prompt name for player 2
        let player2NameInput;
        player1 = createPlayer(player1NameInput);
        player2 = createPlayer(player2NameInput);
        _assignPlayers();
        currentTurnHolder = XSYMBOL;
        gameboard.displayBoard();
    }

    const _assignPlayers = function(){
        if (Math.random <= 0.5){
            player1.setSymbol(XSYMBOL);
            player2.setSymbol(OSYMBOL);
        } else {
            player1.setSymbol(OSYMBOL);
            player2.setSymbol(XSYMBOL);
        }
    }

    const _playRound = function(){
        // ask for player's whose turn it is input
        // wait for input to know where to put the symbol
        gameboard.displayBoard();
        const winState = gameboard.checkWin();
        if (!winState){
            _playRound();
        } else {
            return winState;
        }
    }

}();

function createPlayer(name) {
    let name = name;
    let symbol;

    const setSymbol = function(inputSymbol){
        symbol = inputSymbol;
    }

    return {setSymbol}
}

// make playerO