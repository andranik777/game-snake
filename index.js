const canvas = document.getElementById("game")
const ctx = canvas.getContext("2d")

const ground = new Image()
ground.src = "img/ground.png"

const foodImage = new Image()
foodImage.src = "img/food.png"

let box = 32

let score = 0

let snake = []

snake[0] = {
    x: 9 * box,
    y: 10 * box
}



let food = {
    x: Math.floor((Math.random() * 17 + 1)) * box,
    y: Math.floor((Math.random() * 15 + 3)) * box,

}

const messageGameOver = () => {
    ctx.font = '48px serif';
    ctx.fillText('GAME OVER', 150, 325)

}

const replay = () => {
    b = document.createElement("div")
    b.innerHTML = "<button style='position: absolute; top: 350px; width:100px; height: 30px' onclick ='document.location.reload()'>REPLAY</button>"
    document.querySelector("#main").appendChild(b)
}
let dir

const direction = (event) => {
    if (event.keyCode == 37 && dir != "right")
        dir = "left"
    else if (event.keyCode == 38 && dir != "down")
        dir = "up"
    else if (event.keyCode == 39 && dir != "left")
        dir = "right"
    else if (event.keyCode == 40 && dir != "up")
        dir = "down"


}

document.addEventListener("keydown", direction)

const eatTail = (head, arr) => {
    for (let i in arr) {
        if (head.x == arr[i].x && head.y == arr[i].y) {
            clearInterval(game);
            messageGameOver()
            replay()
        }
    }
}


const drawGame = () => {
    ctx.drawImage(ground, 0, 0)
    ctx.drawImage(foodImage, food.x, food.y)

    for (let i = 0; i < snake.length; i++) {
        ctx.fillStyle = i == 0 ? "green" : "red"
        ctx.fillRect(snake[i].x, snake[i].y, box, box)
    }
    ctx.fillStyle = "white"
    ctx.font = "50px Arial"
    ctx.fillText(score, box * 2.5, box * 1.7)


    let snakeX = snake[0].x
    let snakeY = snake[0].y

    if (snakeX == food.x && snakeY == food.y) {
        food = {
            x: Math.floor((Math.random() * 17 + 1)) * box,
            y: Math.floor((Math.random() * 15 + 3)) * box,
        }
        score++

    } else {
        snake.pop()

    }


    if (snakeX < box || snakeX > box * 17 || snakeY < 3 * box || snakeY > box * 17) {
        clearInterval(game)
        messageGameOver()
        replay()
    }

    if (dir == "left") snakeX -= box
    if (dir == "right") snakeX += box
    if (dir == "up") snakeY -= box
    if (dir == "down") snakeY += box


    let newHead = {
        x: snakeX,
        y: snakeY
    }

    eatTail(newHead, snake)

    snake.unshift(newHead)


}


let game = setInterval(drawGame, 150)






// https://developer.mozilla.org/fr/docs/Web/API/CanvasRenderingContext2D/drawImage

// https://developer.mozilla.org/fr/docs/Web/API/CanvasRenderingContext2D/fillText
