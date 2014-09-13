
function Game(){

    //Global Variables
    var myTurn = true;
    var socket;
    var gameData = {};

    /*Private Helper Functions*/

    var coordToGrid = function(event){
        //offset of the top left corner of the board div to the
        //top left corner of the window
        var xOff = $('#board').offset().left;
        var yOff = $("#board").offset().top;

        //find the difference
        var x = event.pageX - xOff;
        var y = event.pageY - yOff;

        var gridsize = 24;
        var xLoc = Math.floor(x/gridsize);
        var yLoc = Math.floor(y/gridsize);

        if (xLoc > 14)
            xLoc = 14;
        if (yLoc > 14)
            yLoc = 14;

        return {'xLoc': xLoc, 'yLoc': yLoc};
    }

    var GridToSnapCoord = function(x,y){
        //offset of the top left corner of the board div to the
        //top left corner of the window
        var xOff = $('#board').offset().left;
        var yOff = $("#board").offset().top;

        var gridsize = 24;
        return {'xLoc': x * gridsize + 19 + xOff, 'yLoc': y * gridsize + 16 + yOff};
    }

    var createPiece = function(playerID){
        var $hoverpiece = $('<img class="gamepiece" src="/images/' + gameData.gamepiece[playerID] + '.png" />');

        return $hoverpiece;
    }

    var createCursorPiece = function(){
        $hoverpiece = createPiece(gameData.myPiece);
        $hoverpiece.addClass('tempPiece');
        $('#board').append($hoverpiece);
    }

    var removeCursorPiece = function(){
        if ($('#board img:last-child').hasClass('tempPiece'))
            $('#board img:last-child').remove();
    }

    var placeGamePiece = function(playerID, x,y){
        var cursorPieceExists = $('#board img:last-child').hasClass('tempPiece');

        var $piece = createPiece(playerID);
        if (cursorPieceExists)
            removeCursorPiece();
        $('#board').append($piece);

        $('#board img:last-child').css('left', x);
        $('#board img:last-child').css('top', y);

        if(cursorPieceExists)
            createCursorPiece();
    }

    /*Public functions*/
    var mouseenter = function(){
        createCursorPiece();
    }

    var mousemove = function(event){
        var gridCoord = coordToGrid(event);
        coord = GridToSnapCoord(gridCoord.xLoc, gridCoord.yLoc);

        $('#board img:last-child').css('left', coord.xLoc);
        $('#board img:last-child').css('top', coord.yLoc);

    }

    var mouseleave = function(){
        $('#board img:last-child').remove();
    }

    var click = function(event){
        if (myTurn){
            //myTurn = false;
            var gridCoord = coordToGrid(event);
            socket.emit('gamemove', {moveX: gridCoord.xLoc, moveY: gridCoord.yLoc});     
        }
    }


    //connect to server with socket.io
    socket = io();
    //join our gameroom socket on the server
    socket.emit('joinroom', window.location.pathname.split('/')[2]);

    socket.on('gamemove', function(data){
        console.log(data);
        var coord = GridToSnapCoord(data.move.moveX, data.move.moveY);
        placeGamePiece(data.playerID, coord.xLoc, coord.yLoc);
    });

    socket.on('gamedata', function(data){
        gameData[data.type] = data.data;
        console.log(gameData);
    });
    
    socket.on('win', function(data){
        console.log("Win!");
        console.log(data);
    });
    
    socket.on('moveerr', function(data){
        console.log("moveerr!");
        console.log(data)
    });

    //add events to our body which act on board
    $('body').on('mouseenter', '#board', mouseenter);
    $('body').on('mousemove','#board', mousemove);
    $('body').on('mouseleave','#board', mouseleave);  
    $('body').on('click', '#board', click); //end click
    
}

//initialize the game
var game = new Game();

    

