

var board=[];

function createBoard(){

for(var i=0; i<3; i++){
    var arr=[];
    for(var j=0; j<3; j++){
        arr.push(0);
    }
    board.push(arr);
 }

}


function markBoard(user, x_pos, y_pos) {
    board[y_pos][x_pos] = user;
    console.log(board);
}


function printBoard() {

    for (var y = 0; y <=3-1 ; y++) {
        for (var x = 0; x <= 3-1; x++) {
            if (board[y][x] !== 0) {
                var cell = $("tr:eq(" + y + ")").find('td').eq(x);
                cell.children('button').text(board[y][x]);
            }
        }
    }
}


function changePlayer() {
  
    if (currentPlayer === 'X') {
        currentPlayer = 'O';
    } else {
        currentPlayer = 'X';
    }

   
    $('#player').removeClass().addClass(currentPlayer).text(config[currentPlayer + "PlayerName"]);
}

function cellIsTaken(x_pos, y_pos) {
    var value = board[y_pos][x_pos];

    return value === 0 ? false : true;
}

function gameDraw() {
    for (var y = 0; y <= config.height-1; y++) {
        for (var x = 0; x <= config.width-1; x++) {
            if (board[y][x] === 0) {
                return false;
            }
        }
    }

   
    return true;
}


function horizontalWin() {
    var currentValue = null,
        previousValue = 0,
        tally = 0;

    for (var y = 0; y <= config.height-1; y++) {
        for (var x = 0; x <= config.width-1; x++) {
            currentValue = board[y][x];
            if (currentValue === previousValue && currentValue !== 0) {
                tally += 1;
            } else {
                
                tally = 0;
            }
            if (tally === 3- 1) {
                return true;
            }
            previousValue = currentValue;
        }

       
        tally = 0;
        previousValue = 0;
    }

    return false;
}


function verticalWin() {
    var currentValue = null,
        previousValue = 0,
        tally = 0;

    for (var x = 0; x <= config.width-1; x++) {
        for (var y = 0; y <= config.height-1; y++) {
            currentValue = board[y][x];
            if (currentValue === previousValue && currentValue !== 0) {
                tally += 1;
            } else {
                
                tally = 0;
            }
            if (tally === 3 - 1) {
                return true;
            }
            previousValue = currentValue;
        }
        tally = 0;
        previousValue = 0;
    }

    
    return false;
}


function diagonalWin() {
    var x = null,
        y = null,
        xtemp = null,
        ytemp = null,
        currentValue = null,
        previousValue = 0,
        tally = 0;

 
    for (y = 0; y <= config.height-1; y++) {
        xtemp = config.width-1;
        ytemp = y;

        while (0 <= xtemp && ytemp <= config.height-1) {
            currentValue = board[ytemp][xtemp];
            if (currentValue === previousValue && currentValue !== 0) {
                tally += 1;
            } else {
                
                tally = 0;
            }
            if (tally === 3 - 1) {
                return true;
            }
            previousValue = currentValue;

           
            xtemp--;
            ytemp++;
        }
    
        tally = 0;
        previousValue = 0;
    }

    
    for (y = 0; y <= config.height-1; y++) {
        xtemp = 0;
        ytemp = y;

        while (xtemp <= config.width-1 && ytemp <= config.height-1) {
            currentValue = board[ytemp][xtemp];
            if (currentValue === previousValue && currentValue !== 0) {
                tally += 1;
            } else {
                
                tally = 0;
            }
            if (tally === 3 - 1) {
                return true;
            }
            previousValue = currentValue;

            
            xtemp++;
            ytemp++;
        }
        
        tally = 0;
        previousValue = 0;
    }

    
    for (x = 0; x <= config.width-1; x++) {
        xtemp = x;
        ytemp = 0;

        while (xtemp <= config.width-1 && ytemp <= config.height-1) {
            currentValue = board[ytemp][xtemp];
            if (currentValue === previousValue && currentValue !== 0) {
                tally += 1;
            } else {
               
                tally = 0;
            }
            if (tally === 3 - 1) {
                return true;
            }
            previousValue = currentValue;

            xtemp++;
            ytemp++;
        }
        tally = 0;
        previousValue = 0;
    }

    
    for (x = 0; x <= config.width-1; x++) {
        xtemp = x;
        ytemp = 0;

        while (0 <= xtemp && ytemp <= config.height-1) {
            currentValue = board[ytemp][xtemp];
            if (currentValue === previousValue && currentValue !== 0) {
                tally += 1;
            } else {
                tally = 0;
            }
            if (tally === 3 - 1) {
                return true;
            }
            previousValue = currentValue;

            xtemp--;
            ytemp++;
        }
       
        tally = 0;
        previousValue = 0;
    }

   
    return false;
}

function passResult(){

    var obj={};

    for(var i=0; i<3; i++){
        for(var j=0; j<3; j++){

            obj[i*3+j] = (board[i][j]===0)?'' : board[i][j];
        }
    }

    var finalboard={"final_board": obj};
    console.log(finalboard);

    var data = new FormData();
    data.append( "json", JSON.stringify( finalboard ) );


    fetch("https://gnswrchqte.execute-api.us-west-2.amazonaws.com/prod/putboard",
    {
        method: "POST",
        body: data
    })
    .then(function(res){ return res.json(); })
    .then(function(data){ alert( JSON.stringify( data ) ) })

}

