//Global Variables
var myTurn = true;
var gamemoveX;
var gamemoveY;
var server;

function Game() {
    /*Private Instance Variables*/
    var myTurn = true;
    var gamemoveX;
    var gamemoveY;
    
    /*Private Helper Functions*/
    var snapToGrid = function(x, y){
        var gridsize = 24;
        var xLoc = Math.floor(x/gridsize);
        var yLoc = Math.floor(y/gridsize);
        if (xLoc > 14)
            xLoc = 14;
        if (yLoc > 14)
            yLoc = 14;

        gamemoveX = xLoc;
        gamemoveY = yLoc;
        /*the 30 and 27 are the offset for the space before the grid in the picture*/
        return [xLoc * gridsize + 30, yLoc * gridsize + 27];
    }
    
    var createCursorPiece = function(){
        var $hoverpiece = $('<img class="gamepiece tempPiece" src="/images/blocktopus.png" />');
        $('#board').append($hoverpiece);
    }
    
    /*Public functions*/
    this.mouseenter = function(){
        createCursorPiece();
    }
    
    this.mousemove = function(event){
        var xOff = $('#board').offset().left;
        var yOff = $("#board").offset().top;
        
        var coord = snapToGrid(event.pageX - xOff, 
            event.pageY - yOff);
        
        $('#board img:last-child').css('top', coord[1] - 11 + yOff);
        $('#board img:last-child').css('left', coord[0] - 11 + xOff);
        
    }
    
    this.mouseleave = function(){
        $('#board img:last-child').remove();
    }
    
    this.click = function(){
        if (myTurn){
            $('#board img:last-child').removeClass('tempPiece');
            createCursorPiece();
            //myTurn = false;
            
            
            socket.emit('gamemove', {moveX: gamemoveX, moveY: gamemoveY});    
        }
    }
    /*Parent will be the element we append our board to*/
    this.createGame = function(){
        
        //connect to server with socket.io
        server = io();
        server.on('msg', function(msg){
            console.log("hello!");
        });
        
        $('body').on('mouseenter', '#board', this.mouseenter);
        $('body').on('mousemove','#board', this.mousemove);

        $('body').on('mouseleave','#board', this.mouseleave);  

        /*On Click to play!*/
        $('body').on('click', '#board', this.click); //end click
        
    }
}

    

