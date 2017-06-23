//判断大鱼与果实的碰撞:先判断果实的状态，再判断与大鱼之间的距离
function momFruitCollision()
{
	if (!data.gameover) 
	{
		for (var i=0;i<fruit.num;i++) 
		{
			if(fruit.alive[i])
			{
				var l=calLength2(fruit.x[i],fruit.y[i],mom.x,mom.y);
				if(l<900)
				{
					//果实被吃掉eat
					fruit.dead(i);
					data.fruitNum++;
					mom.momBodyCount++;
					if(mom.momBodyCount>7)
					{
						mom.momBodyCount=7;
					}
					if(fruit.fruitType[i]=="blue")
					{
						data._double=2;
					}//blue
					wave.born(fruit.x[i],fruit.y[i]);
				}
			}
		
	    }	
	}
	
}


function momBabyCollision(){
	if(data.fruitNum>0){
		var l=calLength2(mom.x,mom.y,baby.x,baby.y);
		if(l<900)
		{
			baby.babyBodyCount=0;
			//data=0
	   		// data.reset();
	    	mom.momBodyCount=0;
	    	data.addScore();
	    	halo.born(baby.x,baby.y);
		}
	
	}
	
	
	
	
}
