$(document).ready(function(){
    $("a").click(function(){
        $("#titulo")
            .css("color","blue").
            .text("Curso jQuery").
            .fadeToggle();
        });     
    });
    

