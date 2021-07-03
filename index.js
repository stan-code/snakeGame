console.log('hello')

const canvas = document.getElementById('game');
const ctx = canvas.getContext('2d');

class SnakePart{
  constructor(x, y){
    this.x = x
    this.y = y

  }

}


let speed = 7;

let tileCount = 20;
let tileSize = canvas.width / tileCount -2
let headX = 10
let headY = 10
const snakeParts = []
let tailLength = 0;

let appleX = 5
let appleY = 5

let xVelocity = 0
let yVelocity = 0

let score = 0

let gameOverValue = false

function drawGame(){
  changeSnakePosition()
  let result = isGameOver()
  if(result){
    return;
  }

  clearScreen()
  checkAppleCollision()
  drawApple()
  drawSnake()
  drawScore()
  setTimeout(drawGame, 1000/ speed)
}

function isGameOver(event){
  let gameOver = false

  if(headX < 0){
    gameOver = true
  }

  if (headX >= tileCount){
    gameOver = true
  }

  if (headY < 0) {
    gameOver = true
  }

  if (headY >= tileCount) {
    gameOver = true
  }

  for(let i=0; i < snakeParts.length; i++){
    let part = snakeParts[i]
    if(part.x == headX && part.y == headY){
      gameOver = true
    }
  }

  if (gameOver){
    ctx.fillStyle = 'white'
    ctx. font = '50px Arial'
    ctx.fillText('Game Over!', canvas.width /6.5, canvas.height /2)
  }

  if (gameOver) {
    ctx.fillStyle = 'white'
    ctx.font = '20px Arial'
    ctx.fillText('Score: ' + score, canvas.width / 2.5, canvas.height / 1.5)
  }





  return gameOver
}

function clearScreen(){
 ctx.fillStyle = 'black'
 ctx.fillRect(0,0,canvas.width,canvas.height)
}

function drawScore(){
  ctx.fillStyle = 'white'
  ctx.font = '10px Arial'
  ctx.fillText('Score: ' + score, canvas.width-50, 10)
}

function drawSnake(){
  ctx.fillStyle = 'green'
  ctx.fillRect(headX * tileCount, headY * tileCount, tileSize,tileSize)

  ctx.fillStyle = 'green'
  for (let i = 0; i < snakeParts.length; i++ ){
    let part = snakeParts[i]
    ctx.fillRect(part.x * tileCount, part.y * tileCount, tileSize, tileSize)
  }

  snakeParts.push(new SnakePart(headX, headY))
  if(snakeParts.length > tailLength){
    snakeParts.shift()
  }

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
    tailLength++
    score++
    console.log(tailLength)
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