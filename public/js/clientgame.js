//Global Variables
var myTurn = true;
var gamemoveX;
var gamemoveY;
var gameroom;
var socket;
    
/*Private Helper Functions*/
var snapToGrid = function(x, y){
    

    gamemoveX = xLoc;
    gamemoveY = yLoc;
    /*the 30 and 27 are the offset for the space before the grid in the picture*/
    return [xLoc * gridsize + 30, yLoc * gridsize + 27];
}

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
    
var createCursorPiece = function(){
    var $hoverpiece = $('<img class="gamepiece tempPiece" src="/images/blocktopus.png" />');
    $('#board').append($hoverpiece);
}

var placeGamePiece = function(x,y){
    var cursorPieceExists = $('#board img:last-child').hasClass('tempPiece');
    
    if(!cursorPieceExists)
        createCursorPiece();

    $('#board img:last-child').css('left', x);
    $('#board img:last-child').css('top', y);
    $('#board img:last-child').removeClass('tempPiece');

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
    placeGamePiece(coord.xLoc, coord.yLoc);
});

//add events to our body which act on board
$('body').on('mouseenter', '#board', mouseenter);
$('body').on('mousemove','#board', mousemove);
$('body').on('mouseleave','#board', mouseleave);  
$('body').on('click', '#board', click); //end click

    

