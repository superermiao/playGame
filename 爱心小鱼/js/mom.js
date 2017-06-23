var momObj=function(){
	this.x;
	this.y;
	this.angle;
	//this.bigEye=new Image();
	//this.bigBody=new Image();
	//this.bigTail=new Image();
	
	this.momTailTimer=0;
	this.momTailCount=0;
	
	this.momEyeTimer=0;
	this.momEyeCount=0;
	this.momEyeInterval=1000;
	
	this.momBodyCount=0;
}

momObj.prototype.init=function(){
	this.x=canWidth*0.5;
	this.y=canHeight*0.5;
	this.angle=0;
	//this.bigEye.src="img/bigEye0.png";
	//this.bigBody.src="img/bigSwim0.png";
	//this.bigTail.src="img/bigTail0.png";
	
}

momObj.prototype.draw=function(){
	
	this.x=lerpDistance(mx,this.x,0.92);
	this.y=lerpDistance(my,this.y,0.92);
	/*计算坐标差*/
	//Math。atan2(x,y);
	var deltaY=my-this.y;
	var deltaX=mx-this.x;
	var beta=Math.atan2(deltaY,deltaX)+Math.PI;

	//angle要不断趋向于beta
	this.angle=lerpAngle(beta,this.angle,0.6);


	//mom tail
	this.momTailTimer+=deltaTime;
	if(this.momTailTimer>50){
		this.momTailCount=(this.momTailCount+1)%8
		this.momTailTimer%=50;
	}
	
	//mom eye
	this.momEyeTimer+=deltaTime;
	if(this.momEyeTimer>this.momEyeInterval)
	{
		this.momEyeCount=(this.momEyeCount+1)%2;
		this.momEyeTimer%=this.momEyeInterval;
		if (this.momEyeCount==0) {
			this.momEyeInterval=Math.random()*1500+2000;
		} 
		else{
			this.momEyeInterval=200;
		}
	}
	

	ctx1.save();
	ctx1.translate(this.x,this.y);//translate之后，画鱼，相对位置
	ctx1.rotate(this.angle);
	var momTailCount=this.momTailCount;
	ctx1.drawImage(momTail[momTailCount],-momTail[momTailCount].width*0.5+30,-momTail[momTailCount].height*0.5);
	var momBodyCount=this.momBodyCount;
	if (data._double==1) {
		ctx1.drawImage(momBodyOrg[momBodyCount],-momBodyOrg[momBodyCount].width*0.5,-momBodyOrg[momBodyCount].height*0.5);
	} else{
		ctx1.drawImage(momBodyBlue[momBodyCount],-momBodyBlue[momBodyCount].width*0.5,-momBodyBlue[momBodyCount].height*0.5);
	}
	
	var momEyeCount=this.momEyeCount;
	ctx1.drawImage(momEye[momEyeCount],-momEye[momEyeCount].width*0.5,-momEye[momEyeCount].height*0.5);
	ctx1.restore();
}
