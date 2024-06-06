// JS script

const gameboard = function board() {
    let row1 = [];
    let row2 = [];
    let row3 = [];

    const init = function () {
        _cacheDOM();
        _bindEvents();
        _resetStoredArrays();
        _clearBoard();
    }

    let squaresNodeList;
    const _cacheDOM = function () {
        squaresNodeList = document.querySelectorAll(".game.grid > div");
    }

    const _bindEvents = function () {
        for (let square of squaresNodeList) {
            square.addEventListener("click", (e) => _getInputSequence(e.target));
        }
    }

    const _getInputSequence = function (eventTarget) {
        const position = _locateSquarePosition(eventTarget);
        if (_isInputLocationEmpty(position.row, position.col)) {
            gameManager.playRound(position.row, position.col);
        } else {
            console.log("This spot is taken! Choose another!");
        }
    }

    const _locateSquarePosition = function (eventTarget) {
        const squaresArray = Array.prototype.slice.call(squaresNodeList);
        const gridNumber = squaresArray.indexOf(eventTarget) + 1;
        let row;
        let col;
        if (gridNumber === 1 || gridNumber === 2 || gridNumber === 3) {
            row = 0;
        } else if (gridNumber === 4 || gridNumber === 5 || gridNumber === 6) {
            row = 1;
        } else if (gridNumber === 7 || gridNumber === 8 || gridNumber === 9) {
            row = 2;
        }
        if (gridNumber === 1 || gridNumber === 4 || gridNumber === 7) {
            col = 0;
        } else if (gridNumber === 2 || gridNumber === 5 || gridNumber === 8) {
            col = 1;
        } else if (gridNumber === 3 || gridNumber === 6 || gridNumber === 9) {
            col = 2;
        }
        console.log("row: " + row + " col: " + col + " logged in locateSquarePosition");
        return { row, col }
    }

    const _isInputLocationEmpty = function (row, col) {
        switch (Number(row)) {
            case 0:
                return (row1[col] === undefined);
            case 1:
                return (row2[col] === undefined);
            case 2:
                return (row3[col] === undefined);
            default:
                console.log("something went wrong in isInputLocationEmpty" + row + col);
        }
    }

    const checkWin = function () {
        if (row1[0] !== undefined && row1[0] === row1[1] && row1[1] === row1[2]) { // 3 across first row
            return row1[0];
        } else if (row2[0] !== undefined && row2[0] === row2[1] && row2[1] === row2[2]) { // 3 across middle row
            return row2[0];
        } else if (row3[0] !== undefined && row3[0] === row3[1] && row3[1] === row3[2]) { // 3 across bottom row
            return row3[0];
        } else if (row1[0] !== undefined && row1[0] === row2[0] && row2[0] === row3[0]) { // 3 down left column
            return row1[0];
        } else if (row1[1] !== undefined && row1[1] === row2[1] && row2[1] === row3[1]) { // 3 down middle column
            return row1[1];
        } else if (row1[2] !== undefined && row1[2] === row2[2] && row2[2] === row3[2]) { // 3 down right column
            return row1[2];
        } else if (row1[0] !== undefined && row1[0] === row2[1] && row2[1] === row3[2]) { // diagonal
            return row1[0];
        } else if (row3[0] !== undefined && row3[0] === row2[1] && row2[1] === row1[2]) { // other diagonal
            return row3[0];
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

    const addSymbol = function(symbol, row, col){
        _addSymbolToArray(symbol,row, col);
        const gridIndexInNodeList = row*3 + col;
        _renderSquareUpdate(symbol, squaresNodeList[gridIndexInNodeList]);
    }


    const _addSymbolToArray = function (symbol, row, col) {
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

    const _renderSquareUpdate = function (symbol, gridToChange) {
        if (symbol === "X"){
            gridToChange.classList.add("x");
            gridToChange.classList.remove("empty");
        } else {
            gridToChange.classList.add("o");
            gridToChange.classList.remove("empty");
        }
    }

    const _resetStoredArrays = function(){
        row1 = [];
        row2 = [];
        row3 = [];
        console.log("Arrays have been reset to " + row1 + row2 + row3);
    }

    const _clearBoard = function(){
        for (let square of squaresNodeList){
            square.classList.remove("x");
            square.classList.remove("o");
            square.classList.add("empty");
        }
    }

    return { addSymbol, checkWin, init };
}();

const gameManager = function manager() {
    let player1;
    let player2;
    let currentTurnHolder;
    const XSYMBOL = "X";
    const OSYMBOL = "O";
    let isRoundActive;

    const init = function(){
        // prompt player names
        let player1NameInput = prompt("Enter name for player 1:");
        let player2NameInput = prompt("Enter name for player 2:");
        player1 = createPlayer(player1NameInput);
        player2 = createPlayer(player2NameInput);
        _cacheDOM();
        _renderScores();
        _bindEvents();
        startGame();
    }

    const startGame = function () {
        _hideStartNewGameButton();
        _assignPlayers();
        _renderPlayerNames();
        currentTurnHolder = XSYMBOL;
        isRoundActive=true;
        gameboard.init();
        _declareTurn();
    }

    let playerTurnInfo;
    let symbolTurnInfo;
    let player1Name;
    let player1Score;
    let player2Name;
    let player2Score;
    let restartButton;
    const _cacheDOM = function(){
        const displayArea = document.querySelector(".display.area");
        playerTurnInfo = displayArea.querySelector(".turn.info .player");
        symbolTurnInfo = displayArea.querySelector(".turn.info .symbol");
        player1Name = displayArea.querySelector(".player1.info .name");
        player1Score = displayArea.querySelector(".player1.info .score");
        player2Name = displayArea.querySelector(".player2.info .name");
        player2Score = displayArea.querySelector(".player2.info .score");
        restartButton = displayArea.querySelector(".restart.button");
    }

    const _bindEvents = function(){
        restartButton.addEventListener("click", ()=> startGame());
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

    const playRound = function (row, col) {
        if (isRoundActive){
            console.log("It is player " + currentTurnHolder + "'s turn.");
            console.log("The JS thinks you chose row: " + row + " and col: " + col);
            gameboard.addSymbol(currentTurnHolder, row, col);
            const winState = gameboard.checkWin();
            if (!winState) {
                _updateTurnHolder();
                _declareTurn();
            } else {
                let winner = _determinePlayerWhoWon(winState);
                _updateScore(winner);
                _renderScores();
                isRoundActive=false;
                console.log("Winner: " + winState);
                _renderWinner(winner);
                _showStartNewGameButton();
            }
        }
    }

    const _updateTurnHolder = function () {
        if (currentTurnHolder === XSYMBOL) {
            currentTurnHolder = OSYMBOL;
        } else {
            currentTurnHolder = XSYMBOL;
        }
    }

    const _declareTurn = function (){
        if (player1.getSymbol() === currentTurnHolder){
            playerTurnInfo.textContent = player1.getName() + "'s turn!";
        } else if (player2.getSymbol() === currentTurnHolder){
            playerTurnInfo.textContent = player2.getName() + "'s turn!";
        }
        symbolTurnInfo.textContent = "You are " + currentTurnHolder + ".";
    }

    const _determinePlayerWhoWon = function (symbolThatWon){
        if (player1.getSymbol() == symbolThatWon){
            return player1;
        } else if (player2.getSymbol() == symbolThatWon){
            return player2;
        } else if (symbolThatWon == "It's a tie!"){
            return "tie";
        }
    }

    const _updateScore = function (winnerPlayer){
        if (winnerPlayer === "tie"){
            player1.incrementScore();
            player2.incrementScore();
        } else {
            winnerPlayer.incrementScore();
        }
    }

    const _renderWinner = function(winnerPlayer){
        if (winnerPlayer === "tie"){
            playerTurnInfo.textContent = "It's a tie!";
        } else{
            playerTurnInfo.textContent = winnerPlayer.getName() + " (" + winnerPlayer.getSymbol() + ") has won!";
        }
        symbolTurnInfo.textContent = "";
    }

    const _renderPlayerNames = function(){
        player1Name.textContent = "Player: " + player1.getName() + " (" + player1.getSymbol() + ")";
        player2Name.textContent = "Player: " + player2.getName() + " (" + player2.getSymbol() + ")";
    }

    const _renderScores = function(){
        player1Score.textContent  = "Score: " + player1.getScore();
        player2Score.textContent  = "Score: " + player2.getScore();
    }

    const _showStartNewGameButton = function(){
        restartButton.style.display = "block";
    }

    const _hideStartNewGameButton = function(){
        restartButton.style.display = "none";
    }

    return { startGame, playRound, init};
}();

function createPlayer(name) {
    let playerName = name;
    let symbol;
    let score = 0;

    const setSymbol = function (inputSymbol) {
        symbol = inputSymbol;
    }

    const getSymbol = function(){
        return symbol;
    }

    const getName = function(){
        return playerName;
    }

    const getScore = function(){
        return score;
    }

    const incrementScore = function(){
        score++;
    }

    return { setSymbol, getSymbol, getName, incrementScore, getScore};
}

gameManager.init();