var board=new Array();//棋盘
var score=0;
var hasConflict=new Array();

$(document).ready(function(){
  /*  prepareForMobile();//适应手机端*/
    newgame();
});

/*function prepareForMobile(){
	$('#grid-container').css('width',gridContainerWidth-2*cellSpace);
	$('#grid-container').css('height',gridContainerWidth-2*cellSpace);
	$('#grid-container').css('padding',cellSpace);
	$('#grid-container').css('border-radius',0.02*gridContainerWidth);
	
	$('#grid-cell').css('width',cellSideLength);
	$('#grid-cell').css('height',cellSideLength);
	
	$('#grid-cell').css('border-radius',0.02*cellSideLength);
}
	*/




function newgame(){
	//初始化棋盘
	init();
	//在随机两个格子生成数字
	generateOneNumber();
	generateOneNumber();
}

function init(){
	
	//初始化各个方格的位置
	for (var i=0;i<4;i++) {
		for (var j=0;j<4;j++) {
			var gridCell=$('#grid-cell-'+i+'-'+j);
			gridCell.css('top',getPosTop(i,j));
			gridCell.css('left',getPosLeft(i,j));
		}
	}
	//当方格中数字为0隐藏，为其他数字时再显示,初始化时随机有两个为2，其余为零
	for (var i=0;i<4;i++) {
		board[i]=new Array();//一维数组
		hasConflict[i]=new Array();
		for (var j=0;j<4;j++) {
			board[i][j]=0;
			hasConflict[i][j]=false;
		}
	}
	
	//用户操作，发生变化,数字随机出现
	updateBoradView();	
	score=0;
}

function updateBoradView(){
	$('.number-cell').remove();//之前的数字去除
	for (var i=0;i<4;i++) {
		for (var j=0;j<4;j++) {
			 $("#grid-container").append( '<div class="number-cell" id="number-cell-'+i+'-'+j+'"></div>' );
			var theNumberCell=$('#number-cell-'+i+'-'+j);		
			//数字为0时
			if (board[i][j]==0) {//当数字为零时
				theNumberCell.css('width','0px');
				theNumberCell.css('height','0px');
				theNumberCell.css('top',getPosTop(i,j) + 50 );
        theNumberCell.css('left',getPosLeft(i,j) + 50 );
				/*theNumberCell.css('top',getPosTop(i,j)+cellSideLength/2);
				theNumberCell.css('left',getPosLeft(i,j)+cellSideLength/2);*/
			}
			else{
				theNumberCell.css('width','100px');
        theNumberCell.css('height','100px');
				/*theNumberCell.css('width',cellSideLength);
				theNumberCell.css('height',cellSideLength);*/
				theNumberCell.css('top',getPosTop(i,j));
				theNumberCell.css('left',getPosLeft(i,j));
				theNumberCell.css('background-color',getNumberBackgroundColor(board[i][j]));//随机化背景颜色
				theNumberCell.css('color',getNumberColor(board[i][j]));//随机化数字颜色
				theNumberCell.text(board[i][j]);//将数字添加
			}	
			hasConflict[i][j]=false;
		}
	}
	/*$('.number-cell').css('line-height',cellSideLength+'px');	
	$('.number-cell').css('font-size',0.6*cellSideLength+'px');*/
}


function generateOneNumber(){//随机产生数字
	if (nospace(board)) {
		return false;
	}
	//随机一个位置
	var randerx=parseInt(Math.floor(Math.random()*4));
	var randery=parseInt(Math.floor(Math.random()*4));
	
	//死循环找到空的格子
	var time=0;
	while(time<50){
		if (board[randerx][randery]==0) {
			break;
		}
		randerx=parseInt(Math.floor(Math.random()*4));
	    randery=parseInt(Math.floor(Math.random()*4));
	    time++;//让计算机在小于50次之后还没找到空位
	}
	
	//如果50次以内没有找到空位置，则人工生成一个位置
	if(time==50){
		for (var i=0;i<4;i++) {
			for (var j=0;j<4;j++) {
				if (board[i][j]==0) {
					randerx=i;
					randery=j;
				}
			}
		}
	}
	
	//随机一个数字2或4
	var randerNumber=Math.random()<0.5?2:4;

	//在随机位置显示随机数字
	board[randerx][randery]=randerNumber;
	showNumberAnimation(randerx,randery,randerNumber);//显示数字动画
	return true;
}


//键盘按下
$(document).keydown(function(event){
	switch (event.keyCode){
		case 37://left,先判断能不能左移，再移
		    if(moveLeft()){
		    	setTimeout("generateOneNumber()",210);//如果左移就产生一个新数字
		    	setTimeout("isgameover()",300);//判断游戏结束没有
		    }
			break;
		case 38://up
			if(moveUp()){
		    	setTimeout("generateOneNumber()",210);//如果上移就产生一个新数字
		    	setTimeout("isgameover()",300);//判断游戏结束没有
		    }
			break;
		case 39://right
			if(moveRight()){
		    	setTimeout("generateOneNumber()",210);//如果右移就产生一个新数字
		    	setTimeout("isgameover()",300);//判断游戏结束没有
		   }	
			break;
		case 40://down
			if(moveDown()){
		    	setTimeout("generateOneNumber()",210);//如果下移就产生一个新数字
		    	setTimeout("isgameover()",300);//判断游戏结束没有
		    }
			break;	
		default:
				break;
	}
});

//游戏结束
function isgameover(){
	if (nospace(board)||nomove(board)) {//没有空位置和移动空间
		gameover();
	}
}

function gameover(){//显示通知
	alert("Gameover!");
}


//对每一个数字的左侧位置进行判断，看是否能够成为落脚点：落脚位置为空？落脚位置数字和待判定元素数字相同？是否有障碍物？
function moveLeft(){
	if (!canMoveLeft(board)) {
		return false;
	}
	//MoveLeft
	for(var i=0;i<4;i++){
		for (var j=1;j<4;j++) {
			if(board[i][j]!=0){
				for (var k=0;k<j;k++) {
					if (board[i][k]==0&&noBlockhorizontal(i,k,j,board)) {
						//move
						showMoveanimation(i,j,i,k);
						board[i][k]=board[i][j];
						board[i][j]=0;
						continue;
					}else if(board[i][k]==board[i][j]&&noBlockhorizontal(i,k,j,board)&&hasConflict[i][k]==false){
						//move
						showMoveanimation(i,j,i,k);
						board[i][k]+=board[i][j];
						board[i][j]=0;
						//add score
						score+=board[i][k];
						hasConflict[i][k]=true;
						continue;
					}
				}
			}
		}
	}
	setTimeout("updateBoradView()",200);
	return true;	
}


function moveRight(){
	if (!canMoveRight(board)) {
		return false;
	}
	
	//MoveRight
	for(var i=0;i<4;i++){
		for (var j=2;j>=0;j--) {
			if(board[i][j]!=0){
				for (var k=3;k>j;k--) {
					if (board[i][k]==0&&noBlockhorizontal(i,j,k,board)) {
						//move
						showMoveanimation(i,j,i,k);
						board[i][k]=board[i][j];
						board[i][j]=0;
						continue;
					}else if(board[i][k]==board[i][j]&&noBlockhorizontal(i,j,k,board)&&hasConflict[i][k]==false){
						//move
						showMoveanimation(i,j,i,k);
						board[i][k]+=board[i][j];
						board[i][j]=0;
						//add score
						score+=board[i][k];
						updateScore(score);
						hasConflict[i][k]=true;
						continue;
					}
				}
			}
		}
	
	}
	setTimeout("updateBoradView()",200);
	return true;
}

function moveUp(){

    if( !canMoveUp( board ) )
        return false;

    //moveUp
    for( var j = 0 ; j < 4 ; j ++ )
        for( var i = 1 ; i < 4 ; i ++ ){
            if( board[i][j] != 0 ){
                for( var k = 0 ; k < i ; k ++ ){

                    if( board[k][j] == 0 && noBlockVertical( j , k , i , board ) ){
                        showMoveanimation( i , j , k , j );
                        board[k][j] = board[i][j];
                        board[i][j] = 0;
                        continue;
                    }
                    else if( board[k][j] == board[i][j] && noBlockVertical( j , k , i , board ) &&!hasConflict[k][j]){
                        showMoveanimation( i , j , k , j );
                        board[k][j] *= 2;
                        board[i][j] = 0;
                        //add score
						score+=board[k][j];
						updateScore(score);
						hasConflict[k][j]=true;
                        continue;
                    }
                }
            }
        }

    setTimeout("updateBoradView()",200);
    return true;
}

function moveDown(){
    if( !canMoveDown( board ) )
        return false;

    //moveDown
    for( var j = 0 ; j < 4 ; j ++ )
        for( var i = 2 ; i >= 0 ; i -- ){
            if( board[i][j] != 0 ){
                for( var k = 3 ; k > i ; k -- ){

                    if( board[k][j] == 0 && noBlockVertical( j , i , k , board ) ){
                        showMoveanimation( i , j , k , j );
                        board[k][j] = board[i][j];
                        board[i][j] = 0;
                        continue;
                    }
                    else if( board[k][j] == board[i][j] && noBlockVertical( j , i , k , board ) &&!hasConflict[k][j]){
                        showMoveanimation( i , j , k , j );
                        board[k][j] *= 2;
                        board[i][j] = 0;
                        //add score
						score+=board[i][k];
						updateScore(score);
						hasConflict[k][j]=true;
                        continue;
                    }
                }
            }
        }

    setTimeout("updateBoradView()",200);
    return true;
}