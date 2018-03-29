$(document).ready(function(){
	//set up canvas
	var canvas = document.getElementById("myCanvas");
	var context = canvas.getContext("2d");

	//set up grids
	var gridNum = 20;
	var gridSize = canvas.width / gridNum; 

	//set up player and candy objects
	var player = {
		x: 7,
		y: 7,
		//direction: Right - 0, Left - 1, Up - 2, 
		//Down - 3, Stopped - 5
		direction: 5,
		alive: true,
		tail: 1
	}

	var candy = {
		x:0,
		y:0,
		alive: false
	}

	//store snake body parts coordinates
	var snakeBody = [[7,7]]

	//set up keys
	var keyPressed = null;
	var leftKey = 37, upKey = 38, rightKey = 39, downKey = 40;

	//make a custom insert method for Array
	Array.prototype.insert = function(index, item){
		//.splice(index_to_insert, no_of_items_to_delete, new_items)
		this.splice(index, 0, item)
	}


	function update(){
		if(keyPressed){
			if(keyPressed == rightKey && player.direction != 1) player.direction = 0;
			if(keyPressed == leftKey && player.direction != 0) player.direction = 1;
			if(keyPressed == upKey && player.direction != 3) player.direction = 2;
			if(keyPressed == downKey && player.direction != 2) player.direction = 3;
		}

		//spawn candy
		if(!candy.alive){
			//generate random whole numbers from 0 to 19 (20 by 20 grid)
			candy.x = Math.floor( Math.random()*gridNum);
			candy.y = Math.floor( Math.random()*gridNum);

			//check if spawning on snake
			var collided;

			do {
				collided = false;
				//loop through all snake parts to check collision
				for(var i = 0; i < player.tail; i++){
					if(candy.x == snakeBody[i][0] && candy.y == snakeBody[i][1]){
						collided = true;
						candy.x = Math.floor( Math.random()*gridNum);
						candy.y = Math.floor( Math.random()*gridNum);
						break;
					}
				}

			} while(collided)

			candy.alive = true;


		}

if (player.x < 0 || player.x >= gridNum || player.y < 0 || player.y >= gridNum){
	player.alive = false;
	clearInterval(updates);
}

if (player.tail > 1){
	for (var i =0 ; i < player.tail; i++){
		if(player.x == snakeBody[i][0] && player.y == snakeBody[i][1]){
			player.alive = false;
			clearInterval(updates);
		}
	}	
}

snakeBody.insert(0, [player.x, player.y]);
if (snakeBody.length> player.tail+1){
	snakeBody.pop();
}	

switch(player.direction){
	case 0:
	player.x += 1; 
	break;
	case 1:
	player.x -= 1 ;
	break;
	case 2:
	player.y -= 1;
	break;
	case 3:
	player.y += 1;
	break;
	}

	if (player.alive){
		draw();
	}
}

function draw(){
	context.clearRect(0, 0, canvas.width, canvas.height);
	//Draw the candy
	context.fillStyle = "blue";
	context.fillRect(candy.x * gridSize, candy.y * gridSize, gridSize, gridSize);

	//Draw the snake
	for (var i = 0; i < player.tail; i++){
		context.fillStyle = "Fuchsia";
		context.fillRect(snakeBody[i][0] * gridSize, snakeBody[i][1] * gridSize, gridSize, gridSize)
	}
}
	update();
	var updates = setInterval(update, 100);

	$(window).on("keydown", function(event){
		keyPressed = event.which;
	});

})







