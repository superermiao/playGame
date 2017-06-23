function showNumberAnimation(i,j,randeNumber){
	var numberCell=$("#number-cell-"+i+"-"+j);
	numberCell.css("background-color",getNumberBackgroundColor(randeNumber));
	numberCell.css("color",getNumberColor(randeNumber));
	numberCell.text(randeNumber);
	
	
	numberCell.animate({
        width:"100px",
        height:"100px",
        top:getPosTop( i , j ),
        left:getPosLeft( i , j )
    },80);
}

function showMoveanimation(fromx,fromy,tox,toy){
	var numberCell=$("#number-cell-"+fromx+"-"+fromy);
	numberCell.animate({
		top:getPosTop(tox,toy),
		left:getPosLeft(tox,toy)
	},200);
}

function updateScore(score){
	$("#score").text(score);
}
