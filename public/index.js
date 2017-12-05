$(document).ready(function() {

	var x_pos='';
	var y_pos='';
	var winner='';

    $('.prefix').text("You are X, Computer is O, Click on anywhere of the board to start playing");
    $('#player').addClass(currentPlayer).text(config[currentPlayer + "PlayerName"]);


    var tblBody = document.createElement("tbody");
 
  
    for (var i = 0; i <3 ; i++) {
    
        var row = document.createElement("tr");
 
        for (var j = 0; j < 3; j++) {
          
          var cell = document.createElement("td");
          var button=document.createElement('button');
          button.setAttribute('type', 'button');
          cell.appendChild(button);
          row.appendChild(cell);
        }
 
   
        tblBody.appendChild(row);
    }
 
    var table= $(".board");
    table.append(tblBody);

    createBoard();

    $('.board button').click(function(e) {
        y_pos = $('.board tr').index($(this).closest('tr'));
        x_pos = $(this).closest('tr').find('td').index($(this).closest('td'));


        if (cellIsTaken(x_pos, y_pos)) {
            return;
        }

        markBoard(currentPlayer, x_pos, y_pos);

        printBoard();

        if (verticalWin() || horizontalWin() || diagonalWin()) {
 	        passResult();
 	        if(currentPlayer==='X') {
 	        	winner="You";}else{
 	        		winner="Computer";
 	        	}

            $('.board button').unbind('click');
            $('.prefix').text(config.winPrefix + winner);
            $('.play-again').show("slow");
            return;

        } else if (gameDraw()) {
        	 passResult();
            $('.board button').unbind('click');
            $('.message').text(config.drawMsg);
            $('.play-again').show("slow");
            return;
        }

        changePlayer();

      
        computerPlay(x_pos, y_pos, function(){
 			fetch('https://zpj6onnvm5.execute-api.us-west-2.amazonaws.com/prod/getmove')
            .then(
            function(response) {
              if (response.status !== 200) {
                console.log('Looks like there was a problem. Status Code: ' +
                  response.status);
                return;
              }

              response.json().then(function(data) {

              	console.log(data);
                var index=data.substr(data.length-2).substr(0,1);
                y_pos=Math.floor(index/3);
                x_pos=index%3;

                console.log(x_pos);
                console.log(y_pos);
                if(!cellIsTaken(x_pos, y_pos)){
                	markBoard(currentPlayer, x_pos, y_pos);
                printBoard();
		
		        if (verticalWin() || horizontalWin() || diagonalWin()) {
		        	
		            
		            $('.board button').unbind('click');
		            $('.prefix').text(config.winPrefix);
		            $('.play-again').show("slow");
		            return;

		        } else if (gameDraw()) {
		        	
		            $('.board button').unbind('click');
		            $('.message').text(config.drawMsg);
		            $('.play-again').show("slow");
		            return;
		        }

		        changePlayer();
                	
                }else{
                	
                	$(".replay").click();               
                }
                
                
                
              });
            }
          )
          .catch(function(err) {
            console.log('Fetch Error :-S', err);
          });        	          
        });	

    });

     

    $('.play-again').click(function(e) {
        location.reload();
    });

    $('.replay').click(function(e){
computerPlay(x_pos, y_pos, function(){
 			fetch('https://zpj6onnvm5.execute-api.us-west-2.amazonaws.com/prod/getmove')
            .then(
            function(response) {
              if (response.status !== 200) {
                console.log('Looks like there was a problem. Status Code: ' +
                  response.status);
                return;
              }

              
              response.json().then(function(data) {

              	console.log(data);
                var index=data.substr(data.length-2).substr(0,1);
                y_pos=Math.floor(index/3);
                x_pos=index%3;

                console.log(x_pos);
                console.log(y_pos);
                if(!cellIsTaken(x_pos, y_pos)){
                	markBoard(currentPlayer, x_pos, y_pos);
                printBoard();
		
		        if (verticalWin() || horizontalWin() || diagonalWin()) {
		        	
		            
		            $('.board button').unbind('click');
		            $('.prefix').text(config.winPrefix);
		            $('.play-again').show("slow");
		            return;

		        } else if (gameDraw()) {
		        	
		            $('.board button').unbind('click');
		            $('.message').text(config.drawMsg);
		            $('.play-again').show("slow");
		            return;
		        }

		        changePlayer();
                	
                }else{
                	$(".replay").click(); 

                }
                
                
                
              });
            }
          )
          .catch(function(err) {
            console.log('Fetch Error :-S', err);
          });        	          
        });

    });

    function computerPlay(x_pos, y_pos, callback){
          if (cellIsTaken(x_pos, y_pos)){
                  callback();	        	
		        } 		           
		     }


});

