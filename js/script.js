function paginaInicial(){
    $("#menu").show();
    $("#botoes").empty();              
}

function newGame(e){
  e.preventDefault();
    game = new BatalhaNaval();    
    game.startGame();    
    adicionaBotoes();    
}

function adicionaBotoes(){
  l = 7;
  c =7; 
  $("#menu").hide();
  $("#botoes").empty();
  $("#botoes").append("<table id='tabela'>");
  for(i = 0; i <= l; i++){
    var linha = $("<tr>");
    for(j=0; j <= c; j++){
      if(i == 0 && j!=0){       
        var th = $("<th>"+j+"</th>");                   
        linha.append(th);
      }
      else{
        if(j==0){
          if(i!=0){           
            var th = $("<th>"+i+"</th>");       
            linha.append(th);
          }
          else{
            var th = $("<th>");       
            linha.append(th);
          }
        }
        else{
          var coluna = $("<td class = 'botao' id = '"+i+""+j+"'>"+i+""+j+"</td>");                    
          linha.append(coluna);
        }
      }
    }       
    $("#tabela").append(linha);
  }
  $(".botao").click(verificaGuess);
}

function verificaGuess(){
  flag = game.checkGuess($(this).html());
  if(flag){
    $(this).css("background-color","yellow");
  }
  if(game.endGame()){
      alert("Você ganhou");
      paginaInicial();
  }
  $(this).removeClass("botao");
  $(this).addClass("botao_pressed");
}

$(document).ready(function(){ 
  $(".newgame").click(newGame);              
  $("#home").click(paginaInicial);
});
