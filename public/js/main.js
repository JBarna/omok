$(document).ready(function(){
    var game = new Game();
    
    /*On Hover of the board */
    $('body').on('mouseenter', '#board', game.mouseenter);
    $('body').on('mousemove','#board', game.mousemove);
    
    $('body').on('mouseleave','#board', game.mouseleave);  
    
    /*On Click to play!*/
    $('body').on('click', '#board', game.click); //end click
    
    
});



    