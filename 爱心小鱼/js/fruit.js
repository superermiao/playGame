var fruitObj=function(){//定义一个fruitObj类

	this.alive=[];//属性，boolean值
	this.orange=new Image();
	this.blue=new Image();
	this.x=[];
	this.y=[];
	this.l=[];
	this.aneNo=[];
	this.fruitType=[];//果实颜色状态
	this.spd=[];//每个果实的速度
	
	
}
fruitObj.prototype.num=30;//果实数量为30,prototype 属性使您有能力向对象添加属性和方法。

fruitObj.prototype.init=function(){
	for(var i=0;i<this.num;i++)
	{
		this.alive[i]=false;
		this.x[i]=0;
		this.y[i]=0;
		this.spd[i]=Math.random()*0.017+0.003;//[0.003,0.017)
		/*this.born(i);//初始化的时候让所有果实出生*/
		this.fruitType[i]=" ";
		this.aneNo[i]=0;
	}
	this.orange.src="img/fruit.png";
	this.blue.src="img/blue.png";
}

/*果实从长大到成熟*find an ane,grow,fly up*/
fruitObj.prototype.draw=function(){
	for(var i=0;i<this.num;i++){
		if(this.alive[i]){
			if(this.fruitType[i]=="blue"){
				var pic=this.blue;
			}else{
				var pic=this.orange;
			}
			if(this.l[i]<=14){
				var NO=this.aneNo[i];
				this.x[i]=ane.headx[NO];
				this.y[i]=ane.heady[NO];
			    this.l[i]+=this.spd[i]*deltaTime;//deltaTime表示每一帧的时间间隔
		}
		else{
			this.y[i]-=this.spd[i]*2*deltaTime;
		}
		//在画布上定位图像，并规定图像的宽度和高度
		ctx2.drawImage(pic,this.x[i]-this.l[i]*0.5,this.y[i]-this.l[i]*0.5,this.l[i],this.l[i]);
		if(this.y[i]<10){
			this.alive[i]=false;
		}
	  }
	}
}

fruitObj.prototype.born=function(i){
	/*floor() 方法执行的是向下取整计算，它返回的是小于或等于函数参数，并且与之最接近的整数。*/
	/*var aneID=Math.floor(Math.random()*ane.num);
	this.x[i]=ane.rootx[aneID];
	this.y[i]=ane.heady[aneID];*/
	this.aneNo[i]=Math.floor(Math.random()*ane.num);
	this.l[i]=0;
	this.alive[i]=true;
	var van=Math.random();
	if(van<0.3){
		this.fruitType[i]="blue";
	}
	else{
		this.fruitType[i]="orange";
	}
	
}

/*果实死亡*/
fruitObj.prototype.dead=function(i){
	
	fruit.alive[i]=false;
}


/*果实数量监视器*/
function fruitMoniter(){
	var num=0;
	for(var i=0;i<fruit.num;i++){
		if(fruit.alive[i]) num++;
	}
	if(num<18){
		senFruit();
		return;
	}
}

/*果实重新开始任务*/
function senFruit(){
	
	for(var i=0;i<fruit.num;i++){
		if(!fruit.alive[i]){
			fruit.born(i);
			return;
		}
	}
}
