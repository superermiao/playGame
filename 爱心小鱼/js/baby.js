var babyObj=function(){
	this.x;
	this.y;
	this.angle;
	//this.babyEye=new Image();
	//this.babyBody=new Image();
	//this.babyTail=new Image();
	/*thi.babyTail=[];*/
	
	this.babyTailTimer=0;//绘制尾巴的时间计时器
	this.babyTailCount=0;//尾巴绘制到哪一帧
	
	this.babyEyeTimer=0;
	this.babyEyeCount=0;
	this.babyEyeIntervel=1000;//时间间隔
	
	this.babyBodyTimer=0;
	this.babyBodyCount=0;
}

babyObj.prototype.init=function(){
	
	this.x=canWidth*0.5-50;
	this.y=canHeight*0.5+50;
	this.angle=0;
	//this.babyEye.src="img/babyEye0.png";
	//this.babyBody.src="img/babyFade0.png";
	//this.babyTail.src="img/babyEye0.png";
	/*for(var i=0;i<8;i++)
	{
		this.babyTail[i]=new Image();
		this.babyTail[i].src="img/babyTail"+i+".png";
	}*/
}

babyObj.prototype.draw=function(){
	
	
	this.x=lerpDistance(mom.x,this.x,0.98);
	this.y=lerpDistance(mom.y,this.y,0.98);
	
    //Math。atan2(x,y);
	var deltaY=mom.y-this.y;
	var deltaX=mom.x-this.x;
	var beta=Math.atan2(deltaY,deltaX)+Math.PI;

	//angle要不断趋向于beta
	this.angle=lerpAngle(beta,this.angle,0.6);	
	
	
	//count timer
	this.babyTailTimer+=deltaTime;
	if(this.babyTailTimer>50){//每大于五十毫秒就绘制下一张图片
		this.babyTailCount=(this.babyTailCount+1)%8;
		this.babyTailTimer%=50;//复原
	}
	
	//eye
	this.babyEyeTimer+=deltaTime;
	if(this.babyEyeTimer>this.babyEyeIntervel){//每大于五十毫秒就绘制下一张图片
		this.babyEyeCount=(this.babyEyeCount+1)%2;
		this.babyEyeTimer%=this.babyEyeIntervel;//复原
		if (this.babyEyeCount==0) {
			this.babyEyeIntervel=Math.random()*1500+2000;//[2000ms,3500)
		} else{
			this.babyEyeIntervel=200;//200ms
		}
	}
	
	//body
	this.babyBodyTimer+=deltaTime;
	if(this.babyBodyTimer>300){
		this.babyBodyCount=this.babyBodyCount+1;
		this.babyBodyTimer%=300;
		if(this.babyBodyCount>19)
		{
			this.babyBodyCount=19;
			//game over
			data.gameover=true;
		}
	}
	
	
	
	
	ctx1.save();
	ctx1.translate(this.x,this.y);//0,0
	ctx1.rotate(this.angle);
	//先画的在后面，后画的在前面
	var babyTailCount=this.babyTailCount;
	ctx1.drawImage(babyTail[babyTailCount],-babyTail[babyTailCount].width*0.5+25,-babyTail[babyTailCount].height*0.5);
	/*ctx1.drawImage(this.babyTail[babyTailCount],-this.babyTail[babyTailCount].width*0.5+25,-this.babyTail[babyTailCount].height*0.5);*/
	
	var BabyBodyCount=this.babyBodyCount;
	ctx1.drawImage(babyBody[BabyBodyCount],-babyBody[BabyBodyCount].width*0.5,-babyBody[BabyBodyCount].height*0.5);
	var babyEyeCount=this.babyEyeCount;
	ctx1.drawImage(babyEye[babyEyeCount],-babyEye[babyEyeCount].width*0.5,-babyEye[babyEyeCount].height*0.5);
	
	ctx1.restore();
}
