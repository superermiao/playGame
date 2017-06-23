var waveObj=function(){
	this.x=[];//x,y值
	this.y=[];
	this.alive=[];
	this.r=[];//圆圈的半径
}

waveObj.prototype.num=10;
waveObj.prototype.init=function(){
	for (var i=0;i<this.num;i++) {
		this.alive[i]=false;
		this.r[i]=0;
	}
}



waveObj.prototype.draw=function(){
	ctx1.save();
	ctx1.lineWidth=2;
	ctx1.shadowBlur=8;
	ctx1.shadowColor="white";
	for (var i=0;i<this.num;i++) {
		if (this.alive[i])
		{
			//api:arc(),linewidth(),stroke()
			//draw
			this.r[i]+=deltaTime*0.03;//圆圈慢慢增大
			if(this.r[i]>50)
			{
				this.alive[i]=false;
				break;//超过就不绘制
			}
			var alpha=1-this.r[i]/50;//反比【0，1】
			ctx1.beginPath();//开始绘制
			ctx1.arc(this.x[i],this.y[i],this.r[i],0,Math.PI*2);//绘制圆
			ctx1.closePath();
			ctx1.strokeStyle="rgba(255,255,255,"+alpha+")";
			ctx1.stroke();
			
		}
	}
	ctx1.restore();
}

waveObj.prototype.born=function(x,y){
	for (var i=0;i<this.num;i++)
	{
		if (!this.alive[i])
		{
			//born
			this.alive[i]=true;
			this.r[i]=10;
			this.x[i]=x;
			this.y[i]=y;
			return;
		}
	}
}
