var dataObj=function(){
	this.fruitNum=0;//果实数量
	this._double=1;//吃到蓝色果实乘以2
	this.score=0;
	this.gameover=false;
	this.alpha=0;
}
dataObj.prototype.reset=function(){
	this.fruitNum=0;
	this._double=1;
}

dataObj.prototype.draw=function(){
	
	var w=can1.width;
	var h=can1.height;
	
	ctx1.save();
	
	
	
	ctx1.font="20px Verdana";
	ctx1.textAlign="center";
	ctx1.fillStyle="white";
	ctx1.fillText("score "+this.score,w*0.5,h-500);
	ctx1.shadowBlur=10;//阴影，边缘模糊
	ctx1.shadowColor="white";//阴影颜色
	
	//ctx1.fillText("num "+this.fruitNum,w*0.5,h-50);
	//ctx1.fillText("double "+this._double,w*0.5,h-80);
	
	if (this.gameover)
	{
		this.alpha+=deltaTime*0.0005;
		if (this.alpha>1) {
			this.alpha=1;
		}
		ctx1.fillStyle="rgba(255,255,255,"+this.alpha+ ")";//0是透明，1是不透明
		ctx1.fillText("GameOver",w*0.5,h*0.5)//绘制文本
	}
    ctx1.restore(); 
}

dataObj.prototype.addScore=function(){
	this.score+=this.fruitNum*100*this._double;
	this.fruitNum=0;
	this._double=1;
}
