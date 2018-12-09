this.stage = new PIXI.Container();
this.renderer = PIXI.autoDetectRenderer(1280, 800);
document.body.appendChild(this.renderer.view);
this.width = 500;
this.height = 500;
this.step = 25;
this.stepW = this.width/this.step;
this.stepH = this.height/this.step;
this.mark = 0;
this.direction = 37;
this.ticker_switch = true;
//main function
function main(){
	
	PIXI.loader
	  .add("./images/bg.jpg")
	  .load(function(){
		//background
		window.background= new Background();
		background.drawBackground();
		//draw food
		window.food1 = new Food();
		food1.drawFood();
		//draw snake and move
		window.snake1 = new Snake();
		snake1.drawSnake();
		const ticker = new PIXI.ticker.Ticker();
		ticker.stop();
		ticker.add((deltaTime) => {
			//snake move
			if(window.ticker_switch){
				snake1.move(window.food1);
			}
		});
	ticker.start();
	});
}
//the snake function to create the snake
function Snake(){
	var self = this;
	this.snakeArr = new Array();
	this.headx = 37;
	this.heady =37;
	this.judge = false;
	this.judge = true;
	this.frame = 0;
	var snake = new PIXI.Graphics();
	this.drawSnake = function(){
		
		//snake body create
		if(self.snakeArr.length == 0){
			for(var i=0;i<5;i++){
				self.snakeArr[i] = {
					x:(window.stepW/2 + i -2)*window.step,
					y:(window.stepH/2)*window.step,
					d:'l'
				}
			
			}
		
		}
		snake.beginFill(0x00FF00);
		for(var i=0;i<self.snakeArr.length;i++){
			snake.drawRect(self.snakeArr[i].x,self.snakeArr[i].y,window.step,window.step);	
		}
		self.headx = self.snakeArr[0].x;
		self.heady = self.snakeArr[0].y;
		window.stage.addChild(snake);
		window.renderer.render(window.stage);
	}

	
	//move the snake with keyboard
	this.move = function(food){
		self.frame ++;
		if(self.frame % 10 !==0)
		{
			return;
		}
		//keyboard control
		window.document.onkeydown
		document.addEventListener("keydown",window.keydown,true);
		for(var i=self.snakeArr.length-1;i>0;i--){
			self.snakeArr[i].x = self.snakeArr[i-1].x;
			self.snakeArr[i].y = self.snakeArr[i-1].y;
		}
		//direction control
		switch (window.direction) {
		    case 37:
		    	self.snakeArr[0].x -= window.step; 
		       	break;
		    case 38:
			    self.snakeArr[0].y -= window.step; 
		        break;
		    case 39:
			    self.snakeArr[0].x += window.step; 
		        break;
		    case 40:
		        self.snakeArr[0].y += window.step; 
		        break;
		    default:    
		        break;
     	}
		snake.clear();
		self.drawSnake();
		self.judge = ((self.headx == food.foodx)&&(self.heady==food.foody));
		//eat food
		if(self.judge){
			food.food_length = 0;
			window.mark =1;
			food.drawFood();
		}
		self.hit();
		if(self.mark){
			self.snakeArr.length +=1;
			self.snakeArr[self.snakeArr.length-1] = {
				x:0,
				y:0,
				d:'l'
			}
		}
		window.mark=0;
	}
	
	//if then gameover
	this.hit = function(){
		if(self.snakeArr[0].x>window.width||self.snakeArr[0].x<0||self.snakeArr[0].y>window.height||self.snakeArr[0].y<0){
			//game over if hit the wall
			alert("gameover click the restart button to restart");
			window.ticker_switch = false;
		}
		//gameover if hit self
		for(var i=1;i<self.snakeArr.length;i++){
			if(self.snakeArr[i].x==self.headx && self.snakeArr[i].y==self.heady){
				alert("gameover click the restart button to restart");
				window.ticker_switch = false;
				
			}
		}
		
	}
}
//draw background
function Background(){
	//seting the size 
	this.width = 1280;
	this.height = 800;
	this.step = 25;
	this.stepW = this.width/this.step;
	this.stepH = this.height/this.step;
	//use the loaded resources as sprite to create background
	this.drawBackground = function(){
		var background = new PIXI.Sprite(
		PIXI.loader.resources["./images/bg.jpg"].texture
		);
		background.x = 0;
		background.y = 0;
		background.width = 1280;
		background.height = 800;
		window.stage.addChild(background); 
		window.renderer.render(window.stage);
	}
}
//create food 
function Food(){
	var self = this;
	this.food_length = 0;
	this.foodx = 37;
	this.foody = 37;
	snake_in_food = new Snake();
	var food = new PIXI.Graphics();
	this.drawFood = function(snake){
		if(window.mark == 1){
			food.clear();
		}
	
		if(self.food_length==0){
			self.foodx = Math.floor(Math.random()*window.stepW)*window.step;//0-1
			self.foody = Math.floor(Math.random()*window.stepH)*window.step;
			
			for(var i=0;i<snake_in_food.snakeArr.length;i++){
			if(snake_in_food.snakeArr[i].x==self.foodx && snake_in_food.snakeArr[i].y==self.foody){
				self.drawFood();
				break;
			}
			}
		}
		//set color of food
		food.beginFill(0xDC143C);
		food.drawRect(self.foodx, self.foody, window.step, window.step);
		window.stage.addChild(food);
		window.renderer.render(window.stage);
		self.food_length = 1;

	}
}

document.onkeydown =function(e) {
	var ev = window.event;
	switch(ev.keyCode){
		case 37:{
		    if (window.direction !== 39){
		        window.direction = 37;
		    }
		    break;
		}
		case 38:{
		    if (window.direction !== 40){
		        window.direction = 38;
		    }
		    break;
		}
		case 39:{
		    if (window.direction !== 37){
		        window.direction = 39;
		    }
		    break;
		}
		case 40:{
		    if (window.direction !== 38){
		        window.direction = 40;
		    }
		    break;
		}    
 }
}


