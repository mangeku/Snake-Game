function init(){
   // console.log("Initialisation of data"); 
    gameCanvas = document.getElementById("gameCanvas"); 
    gameCanvas.height = gameCanvas.width = 1000;
    w = gameCanvas.width; 
    h = gameCanvas.height; 
    pen = gameCanvas.getContext('2d');
   
    blockSize = 50; 
    gameOver = false; 
    score = 0; 
    foodImage = new Image(60,60);
    foodImage.src  = "./images/apple.png"; 
    scoreImage = new Image(60,60); 
    scoreImage.src = "./images/score.png" 
    food = getRandomFood();
    snake = {
        cells:[], 
        size : 5,
        direction:"right", 
        color:"blue",

        createSnake:function(){
            for(let i = this.size ; i > 0 ; i--){
                this.cells.push({x:i,y:0}); 
            }
        },
        drawSnake:function(){
            for(let i = 0 ; i < this.cells.length ; i++){
                pen.fillStyle = this.color; 
                pen.fillRect(this.cells[i].x*blockSize , this.cells[i].y*blockSize , blockSize - 2 , blockSize - 2); 
            }
        }, 
        updateSnake:function(){
            var headX = this.cells[0].x; 
            var headY = this.cells[0].y; 
            check(headX,headY,this.cells);  
            if(food.x == headX && food.y == headY){
                this.size++; 
                food = getRandomFood(); 
                score++; 
            }
            else
                this.cells.pop(); 
            if(this.direction == "right"){
                headX = headX + 1; 
            }
            else if(this.direction == "left"){
                headX = headX - 1; 
            }
            else if(this.direction == "up"){
                headY = headY - 1; 
            }
            else {
                headY = headY  + 1; 
            }
            this.cells.unshift({x:headX,y:headY}); 
            let boundaryX = Math.round(w/blockSize); 
            let boundaryY = Math.round(h/blockSize);
            console.log(headX + " " + headY); 
            if(headX >= boundaryX || headY  >= boundaryY || headX < 0 || headY < 0){
                gameOver = true; 
            }
        }
    }
    snake.createSnake();   
    function keyHandler(e){
        if(e.key == "ArrowRight" && snake.direction != "left") 
            snake.direction = "right";  
        if(e.key == "ArrowDown" && snake.direction != "up") 
            snake.direction = "down"; 
        if(e.key == "ArrowLeft" && snake.direction != "right")
            snake.direction =  "left"; 
        if(e.key == "ArrowUp" && snake.direction != "down")
            snake.direction = "up"; 
        console.log(e.key); 
        console.log(snake.direction); 
    }
    document.addEventListener('keydown',keyHandler);  
}

function check(headx , heady , cells){
    for(var i = 1 ; i < cells.length ; i++){
        if(headx == cells[i].x && heady == cells[i].y) gameOver = true; 
    }
}

function getRandomFood(){
    var foodx = Math.round(Math.random()*(w-blockSize)/blockSize); 
    var foody = Math.round(Math.random()*(h-blockSize)/blockSize); 
    console.log(foodx + " " + foody); 
    var foodii = {
        x : foodx, 
        y : foody, 
        color : "red"
    };
    return foodii; 
}

function draw(){
    pen.clearRect(0,0,w,h); 
    snake.drawSnake(); 
    console.log("foodx = " + food.x + " foody = " + food.y); 
    pen.drawImage(foodImage,food.x*blockSize ,food.y*blockSize , blockSize , blockSize); 
    pen.drawImage(scoreImage,18,25,blockSize*2,blockSize*2); 
    pen.fillStyle = "red"; 
    pen.font = "40px Arial";  
    pen.fillText(score,55,65); 
}

function update(){
    snake.updateSnake(); 
}

function gameLoop(){
    if(gameOver){
        clearInterval(f); 
        var text = "Your score is :" + score + "\n Press F5 to play again"; 
        alert(text);
        return ; 
    }
    draw(); 
    update(); 
}

init(); 

let f = setInterval(gameLoop,100); 
