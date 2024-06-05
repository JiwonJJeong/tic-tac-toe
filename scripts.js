// JS script

const gameboard = function board() {
    let row1 = [];
    let row2 = [];
    let row3 = [];

    const _cacheDOM = function(){
        const squaresNodeList = document.querySelectorAll(".game.grid > div");
    }
    
    const _bindEvents = function(){
        // assign event listeners to each square here using delegation
    }

    const _render = function(){
        // render board here
    }

    const checkWin = function () {
        if (row1[0] !== undefined && row1[0] === row1[1] && row1[1] === row1[2]) { // 3 across first row
            return row1[0] + " wins!";
        } else if (row2[0] !== undefined && row2[0] === row2[1] && row2[1] === row2[2]) { // 3 across middle row
            return row2[0] + " wins!";
        } else if (row3[0] !== undefined && row3[0] === row3[1] && row3[1] === row3[2]) { // 3 across bottom row
            return row3[0] + " wins!";
        } else if (row1[0] !== undefined && row1[0] === row2[0] && row2[0] === row3[0]) { // 3 down left column
            return row1[0] + " wins!";
        } else if (row1[1] !== undefined && row1[1] === row2[1] && row2[1] === row3[1]) { // 3 down middle column
            return row1[1] + " wins!";
        } else if (row1[2] !== undefined && row1[2] === row2[2] && row2[2] === row3[2]) { // 3 down right column
            return row1[2] + " wins!";
        } else if (row1[0] !== undefined && row1[0] === row2[1] && row2[1] === row3[2]) { // diagonal
            return row1[0] + " wins!";
        } else if (row3[0] !== undefined && row3[0] === row2[1] && row2[1] === row1[2]) { // other diagonal
            return row3[0] + " wins1";
        } else if (_checkBoardIsFilled()) {
            return "It's a tie!";
        }
        return false;
    }

    const _checkBoardIsFilled = function () {
        for (let i = 0; i <= 2; i++) {
            if (row1[i] === undefined) {
                return false;
            } else if (row2[i] === undefined) {
                return false;
            } else if (row3[i] === undefined) {
                return false;
            }

        }
        return true;
    }

    const addSymbolToArray = function (symbol, row, col) {
        switch (Number(row)) {
            case 0:
                row1[col] = symbol;
                break;
            case 1:
                row2[col] = symbol;
                break;
            case 2:
                row3[col] = symbol;
                break;
            default:
                console.log("something went wrong in addSymbolToArray" + row + col);
        }
    }

    const displayBoard = function () {
        console.log(row1, row2, row3);
    }

    const isInputLocationEmpty = function (row, col){
        switch (Number(row)) {
            case 0:
                return (row1[col] !== undefined);
            case 1:
                return (row2[col] !== undefined);
            case 2:
                return (row3[col] !== undefined);
            default:
                console.log("something went wrong in isInputLocationEmpty" + row + col);
        }
    }

    return { addSymbolToArray, displayBoard, checkWin, isInputLocationEmpty};
}();

const gameManager = function manager() {
    let player1;
    let player2;
    let currentTurnHolder;
    const XSYMBOL = "X";
    const OSYMBOL = "O";

    const startGame = function () {
        // prompt name for player 1
        let player1NameInput = prompt("Enter name for player 1:");
        // prompt name for player 2
        let player2NameInput = prompt("Enter name for player 2:");
        player1 = createPlayer(player1NameInput);
        player2 = createPlayer(player2NameInput);
        _assignPlayers();
        currentTurnHolder = XSYMBOL;
        gameboard.displayBoard();
        _playRound();
    }

    const _assignPlayers = function () {
        if (Math.random <= 0.5) {
            player1.setSymbol(XSYMBOL);
            player2.setSymbol(OSYMBOL);
        } else {
            player1.setSymbol(OSYMBOL);
            player2.setSymbol(XSYMBOL);
        }
    }

    const _playRound = function () {
        console.log("It is player " + currentTurnHolder + "'s turn.");
        const inputs = _getInputs();
        console.log("The JS thinks you chose row: " + inputs.inputRow + " and col: " + inputs.inputColumn);
        while(gameboard.isInputLocationEmpty(inputs.inputRow, inputs.inputColumn)){
            console.log("The spot is taken! Choose again!");
            inputs = _getInputs();
        }
        gameboard.addSymbolToArray(currentTurnHolder, inputs.inputRow, inputs.inputColumn);
        gameboard.displayBoard();
        const winState = gameboard.checkWin();
        if (!winState) {
            _updateTurnHolder();
            _playRound();
        } else {
            console.log(winState);
        }
    }

    const _updateTurnHolder = function () {
        if (currentTurnHolder === XSYMBOL) {
            currentTurnHolder = OSYMBOL;
        } else {
            currentTurnHolder = XSYMBOL;
        }
    }

    const _getInputs = function () {
        let inputRow = prompt("What row do you choose?");
        let inputColumn = prompt("What column do you choose?");
        return {inputRow, inputColumn};
    }

    return { startGame };
}();

function createPlayer(name) {
    let playerName = name;
    let symbol;

    const setSymbol = function (inputSymbol) {
        symbol = inputSymbol;
    }

    return { setSymbol }
}