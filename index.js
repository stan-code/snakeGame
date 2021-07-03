console.log('hello')

const canvas = document.getElementById('game');
const ctx = canvas.getContext('2d');

let speed = 7;

let tileCount = 20;
let tileSize = canvas.width / tileCount -2
let headX = 10
let headY = 10

let appleX = 5
let appleY = 5

let xVelocity = 0
let yVelocity = 0

function drawGame(){
  clearScreen()
  changeSnakePosition()
  checkAppleCollision()
  drawApple()
  drawSnake()
  setTimeout(drawGame, 1000/ speed)
}

function clearScreen(){
 ctx.fillStyle = 'black'
 ctx.fillRect(0,0,canvas.width,canvas.height)
}

function drawSnake(){
  ctx.fillStyle = 'green'
  ctx.fillRect(headX * tileCount, headY * tileCount, tileSize,tileSize)
}

function changeSnakePosition(){
  headX = headX + xVelocity
  headY = headY + yVelocity
}

function drawApple(){
  ctx.fillStyle = 'red'
  ctx.fillRect(appleX * tileCount, appleY * tileCount, tileSize, tileSize)
}

function checkAppleCollision(){
  if(appleX === headX && appleY === headY){
    appleX = Math.floor(Math.random() * tileCount)
    appleY = Math.floor(Math.random() * tileCount)
  }
}

document.body.addEventListener('keydown', keyDown)

function keyDown(event){

  if(event.keyCode == 38){
    yVelocity = -1;
    xVelocity = 0;
  }

  if (event.keyCode == 40) {
    yVelocity = 1;
    xVelocity = 0;
  }

  if (event.keyCode == 37) {
    yVelocity = 0;
    xVelocity = -1;
  }

  if (event.keyCode == 39) {
    yVelocity = 0;
    xVelocity = 1;
  }
}

drawGame()