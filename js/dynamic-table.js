function Cel(x,y){
	this.x = x;
	this.y = y;
	
	this.element = $("<div class='cel' />");
	var ey = $("<div />").attr("class","x").text(this.x);
	var ex = $("<div />").attr("class","y").text(this.y);		
	this.element.append(ey).append(ex);
}

Cel.prototype.getElement = function(){
	return this.element;
};

function DynamicTable(len_lines,len_columns){
	this.len_lines = len_lines;
	this.len_columns = len_columns;
	
	this.element = $("<table />");
	for (var i = 0 ; i < this.len_lines ; i++){
		var line = $("<tr />");         
		this.element.append(line);
		for (var j = 0; j < this.len_columns; j++){
			var col = $("<td />");
			var cel = new Cel(i,j);
			col.append(cel.getElement());
			line.append(col);
		}    
	}
}

DynamicTable.prototype.getElement = function(){
	return this.element;
};

