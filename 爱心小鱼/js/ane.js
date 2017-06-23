/*绘制海葵*/

var anobj=function(){
	/*this.x=[];//海葵之间的宽度
	this.len=[];//海葵的高度*/
	this.rootx=[];
	this.headx=[];
	this.heady=[];
	this.amp=[];//振幅
	this.alpha=0;
	
}
anobj.prototype.num=50;//海葵的数量

/*海葵初始化*/
anobj.prototype.inite=function(){
	for(var i=0;i<this.num;i++){
		this.rootx[i]=i*16+Math.random()*20;//i*10定义海葵间的宽度，再加个随机值
		this.headx[i]=this.rootx[i];
		this.heady[i]=canHeight-250+Math.random()*50;
		this.amp[i]=Math.random()*50+50;
	}
	
}
/*海葵绘制*/
anobj.prototype.draw=function(){
	
	this.alpha+=deltaTime*0.0008;
	var l=Math.sin(this.alpha);//[-1,1]
	ctx2.save();
	ctx2.globalAlpha=0.6;//透明度
	ctx2.lineWidth=20;
	ctx2.lineCap="round";
	ctx2.strokeStyle="#3b1541";
	for(var i=0;i<this.num;i++)
	{
		//beginPath,moveTo,LineTo,stroke,strokeStyle,lineWidth,lineCap,globalAlpha（透明度）
		ctx2.beginPath();
		ctx2.moveTo(this.rootx[i],canHeight);
		this.headx[i]=this.rootx[i]+l*this.amp[i];
		ctx2.quadraticCurveTo(this.rootx[i],canHeight-100,this.headx[i],this.heady[i]);
		ctx2.stroke();
		
	}
	ctx2.restore();
}

