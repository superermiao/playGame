document.body.onload=game;
var can1;
var can2;

var ctx1;//场景
var ctx2;

var canWidth;
var canHeight;

var lastTime;//上一帧被执行的时间
var deltaTime;//两帧间隔的时间差

var bgPic=new Image();//背景

var ane;
var fruit;

var mom;
var baby;

var mx;
var my;

var babyTail=[];//将小鱼尾巴摆动的图片组成一组数组，每隔一段时间绘制
var babyEye=[];//小鱼眨眼睛
var babyBody=[];//身体变白

var momTail=[];
var momEye=[];
var momBodyOrg=[];
var momBodyBlue=[];

var data;

var wave;
var halo;


function game(){
	init();
	lastTime=Date.now();
	deltaTime=0;
	gameloop();
	
}

function init(){
	//获得canvas context 画笔与画布
	can1=document.getElementById("canvas1");
	ctx1=can1.getContext("2d");//fishes,dust,UI,circle
	can2=document.getElementById("canvas2");//background,ane,fruits
	ctx2=can2.getContext("2d");
	bgPic.src="img/background.jpg";
	canWidth=can2.width;
	canHeight=can2.height;
	
	can1.addEventListener('mousemove',onMouseMove,false);
	
	
	ane=new anobj();
	ane.inite();
	
	fruit=new fruitObj();
	fruit.init();
	
	mom=new momObj();
	mom.init();
	
	baby=new babyObj();
	baby.init();
	
	mx=canWidth*0.5;
	my=canHeight*0.5;
	
	for(var i=0;i<8;i++)
	{
		babyTail[i]=new Image();
		babyTail[i].src="img/babyTail"+i+".png";
	}
	
	for(var i=0;i<2;i++)
	{
		babyEye[i]=new Image();
		babyEye[i].src="img/babyEye"+i+".png";
	}
	
	for(var i=0;i<20;i++)
	{
		babyBody[i]=new Image();
		babyBody[i].src="img/babyFade"+i+".png";
	}
	
	
	for (var i=0;i<8;i++) {
		momTail[i]=new Image();
		momTail[i].src="img/bigTail"+i+".png";
	}
	
	for (var i=0;i<2;i++) {
		momEye[i]=new Image();
		momEye[i].src="img/bigEye"+i+".png";
	}
	
	data=new dataObj();
	
	for (var i=0;i<8;i++) {
		momBodyOrg[i]=new Image();
		momBodyBlue[i]=new Image();
		momBodyOrg[i].src="img/bigSwim"+i+".png";
		momBodyBlue[i].src="img/bigSwimBlue"+i+".png";
	}
	
	
	wave =new waveObj();
	wave.init();
	
	halo=new haloObj();
	halo.init();
	
}
function gameloop(){
	requestAnimationFrame(gameloop);//相同效果=setInterval,setTimeout。fps=frame per second
    var now=Date.now();
    deltaTime=now-lastTime;
    lastTime=now;
    if(deltaTime>40) deltaTime=40;
    
    drawBackground();
    
    ane.draw();//每一帧都去绘制海葵
    fruitMoniter();
    fruit.draw();
    
    ctx1.clearRect(0,0,canWidth,canHeight);//因为ctx1覆盖在ctx2上，所以每一帧都要去清楚下重新绘制，在干净的画布上绘制
    mom.draw();
    baby.draw();
  
    momFruitCollision();
    momBabyCollision();
    
    data.draw();
    wave.draw();
    halo.draw();
}

function onMouseMove(e)
{
	if(!data.gameover)
	{
		if(e.offsetX||e.offsetY)
		{
			mx=e.offsetX==undefined?e.layerX:e.offsetX;
			my=e.offsetY==undefined?e.layerY:e.offsetY;
		}
	}
		
}
