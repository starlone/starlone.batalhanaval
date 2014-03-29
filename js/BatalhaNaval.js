function removeItem(lista,item){
	aux = lista.indexOf(item);
	if (aux != -1){
		if(lista.length == 1)
			lista = []
		else{			
			copy = [];
			copy = copy.concat(lista.slice(0,aux));
			copy = copy.concat(lista.slice(aux+1));
			lista = copy;		
		}		
	}
	return lista;
}

function Ship(tam){
	this.location = new Array();
	this.length = tam;
}

Ship.prototype.removeCell = function(cell){
	after = this.location.length;
	this.location = removeItem(this.location,cell);
	next = this.location.length;
	if(next < after)
		return true;
	else
		return false;
}

function BatalhaNaval () {
	this.ships = new Array();
	this.numOfShips = 3;
	this.shipLength = 3;
	this.columns = 7;
	this.lines = 7;
}

BatalhaNaval.prototype.setConfig = function (numOfShips,shipLength,columns,lines){
	this.numOfShips = numOfShips;
	this.shipLength = shipLength;
	this.columns = columns;
	this.lines = lines;	
}

BatalhaNaval.prototype.endGame = function (){
	if(!this.ships.length) return true;	
	return false;
}

BatalhaNaval.prototype.checkGuess = function(guess){		
		wreckedShip = null;
		flag = false;
		for (z =0; z< this.ships.length;z++) {			
			flag = this.ships[z].removeCell(guess);			
			if(this.ships[z].location.length == 0)
				wreckedShip = this.ships[z];
			if (flag)
				break;
		}
		if (wreckedShip != null)
			this.ships = removeItem(this.ships,wreckedShip);
		return flag;
}


BatalhaNaval.prototype.checkCellOccupied = function (guess){
    for (k=0 ; k < this.ships.length ; k++){
	aux = this.ships[k].location.indexOf(guess);
	if (aux != -1)
	    return true;
    }
    return false;
}

BatalhaNaval.prototype.checkDirecionOccupied = function(ship,vert,line,col){
    s = "" + (line) + (col);
					
    for ( aux2 = 0; aux2 < this.shipLength; aux2++) {
	if(vert)
	    s = ""+(line+aux2) + (col);
	else
	    s = ""+(line)+(col+aux2);				
	if (this.checkCellOccupied(s)){
	    return true;					
	}
    }		
    return false;
}

BatalhaNaval.prototype.initLocation = function(ship){
    col = this.columns;
    line = this.lines ;
		
    erro = true;
    vert = true;
    while(erro){
	col = this.columns + 1;
	line = this.lines + 1;
			
	// Verifica se ship nao excede horizontal e vertical
	while ((line > this.lines - ship.length + 1)&&
		(col > this.columns - ship.length + 1))
	{
	    line = parseInt(Math.random() *this.lines) + 1;
	    col = parseInt(Math.random() *this.columns) + 1;				
	}			
	// Se não couber na horizontal
	if (col > this.columns - ship.length + 1){				
	    vert = true;				
	}			
	else{
	    // Se não couber na vertical
	    if (line > this.lines - ship.length + 1){
		vert = false;					
	    }
	    else{
		aux =parseInt(Math.random()*2);
		// Aux:  0 - Vertical / 1 - Horizontal
		if(aux == 0){
		    vert = true;
		    erro = this.checkDirecionOccupied(ship, vert, line, col);
		    // Se vertical ocupado então testa na horizontal
		    if(erro){
		    	vert = false;							
		    }
		}
		else{
		    vert = false;
		    erro = this.checkDirecionOccupied(ship, vert, line, col);
		    // Se horizontal ocupado testa na vertical
		    if(erro){
		    	vert = true;
		    }
		}					
	    }			
	}	
	erro = this.checkDirecionOccupied(ship, vert, line, col);
    }   
    // Cria a lista de localização
    lista = new Array();
    if(vert){			
	// Vertical
	for (i = 0; i < ship.length; i++) {
	    s = (line+i+"") + (col + "");								
	    lista.push(s);
	}
    }
    else{			
	// Horizontal
	for (i = 0; i < ship.length; i++) {
	    s = (line + "") + (col+i+"");								
	    lista.push(s);
	}
    }
    ship.location = lista;
}

BatalhaNaval.prototype.createShips = function (){
    this.ships = new Array();
    tam = this.numOfShips;
    for(cont=0; cont<tam;cont++){
	ship = new Ship(this.shipLength);
	this.initLocation(ship);
	this.ships.push(ship);
    }	
}

BatalhaNaval.prototype.startGame = function(){
	this.createShips();
}

