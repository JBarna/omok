var snapToGrid = function(x, y){
    var gridsize = 24;
    var xLoc = Math.floor(x/gridsize);
    var yLoc = Math.floor(y/gridsize);
    if (xLoc > 14)
        xLoc = 14;
    if (yLoc > 14)
        yLoc = 14;
    /*the 30 and 27 are the offset for the space before the grid in the picture*/
    return [xLoc * gridsize + 30, yLoc * gridsize + 27];
}

$(document).ready(function(){
    /*On Hover of the board */
    $('body').on('mouseenter', '#board',function(){
        var $hoverpiece = $('<img class="gamepiece" src="images/mushroom.png" />');
        $('#board ul').append($hoverpiece);
    });
    $('body').on('mousemove','#board',function(event){
        var xOff = $('#board').offset().left;
        var yOff = $("#board").offset().top;
        
        var coord = snapToGrid(event.pageX - xOff, 
            event.pageY - yOff);
        
        $('#board img:last-child').css('top', coord[1] - 11 + yOff);
        $('#board img:last-child').css('left', coord[0] - 11 + xOff);
        
    });
    $('body').on('mouseleave','#board' ,function(){
        $('#board img:last-child').remove();
    });  
});


    