if('serviceWorker' in navigator) {
    navigator.serviceWorker.register('service-worker.js')
    .then(() => console.log('Service Worker registrado!'))
    .catch((error) => console.log('Erro no Service Worker: || ', error))
}

const canvas = document.querySelector('#canvasGame')
const ctx = canvas.getContext('2d')
const RScore = document.querySelector('#RScore')
const BScore = document.querySelector('#BScore')

function randomNoZero() {
    let num = Math.floor(Math.random() * 2) + 1
    if (num === 1) {
        num = -5
    } else {
        num = 5
    }
    return num
}

const ball = {
    x: canvas.width / 2,
    y: canvas.height / 2,
    dx: randomNoZero(),
    dy: randomNoZero(),
    radius: 10,
    color: '#ccc'
}
const paddleL = {
    x: 15,
    y: canvas.height / 2 - 40,
    width: 20,
    height: 80,
    speed: 5,
    color: '#f55'
}
const paddleR = {
    x: canvas.width - 35,
    y: canvas.height / 2 - 40,
    width: 20,
    height: 80,
    speed: 5,
    color: '#55f'
}
const score = {
    red: 0,
    blue: 0
}

function drawBall() {
    ctx.beginPath()
    ctx.arc(ball.x, ball.y, ball.radius, 0, Math.PI * 2)
    ctx.fillStyle = ball.color
    ctx.fill()
    ctx.closePath()
}

function drawPaddles() {
    ctx.fillStyle = paddleL.color
    ctx.fillRect(paddleL.x, paddleL.y, paddleL.width, paddleL.height)
    ctx.fillStyle = paddleR.color
    ctx.fillRect(paddleR.x, paddleR.y, paddleR.width, paddleR.height)
}

function updateBall() {
    ball.x += ball.dx
    ball.y += ball.dy
    if (ball.y + ball.radius > canvas.height || ball.y - ball.radius < 0) {
        ball.dy *= -1
    }

    if (ball.x - ball.radius < paddleL.x + paddleL.width && ball.y < paddleL.y + paddleL.height && ball.y > paddleL.y && ball.dx < 0) {
        ball.dx *= -1
        ball.x = paddleL.x + paddleL.width + ball.radius
    }
    if (ball.x + ball.radius > paddleR.x && ball.y < paddleR.y + paddleR.height && ball.y > paddleR.y && ball.dx > 0) {
        ball.dx *= -1
        ball.x = paddleR.x - ball.radius
    }
    if (ball.x - ball.radius <= 0) {
        score.blue++
        gameOver()
    }
    if (ball.x + ball.radius >= canvas.width) {
        score.red++
        gameOver()
    }
}

let upPressed = false
let downPressed = false
let wPressed = false
let sPressed = false

document.addEventListener('keydown', (event) => {
    event.preventDefault()
    if(event.key === 'w') wPressed = true
    if(event.key === 's') sPressed = true
    if(event.key === 'ArrowUp') upPressed = true
    if(event.key === 'ArrowDown') downPressed = true
})
document.addEventListener('keyup', (event) => {
    event.preventDefault()
    if(event.key === 'w') wPressed = false
    if(event.key === 's') sPressed = false
    if(event.key === 'ArrowUp') upPressed = false
    if(event.key === 'ArrowDown') downPressed = false
})

function updatePaddles() {
    if (wPressed && paddleL.y > 5) {paddleL.y -= 6} else if (sPressed && paddleL.y + paddleL.height < canvas.height - 5) {paddleL.y += 6}
    if (upPressed && paddleR.y > 5) {paddleR.y -= 6} else if (downPressed && paddleR.y + paddleR.height < canvas.height - 5) {paddleR.y += 6}
}

function updateScoreboard() {
    let REDSCORE = String(score.red)
    let BLUESCORE = String(score.blue)
    RScore.textContent = REDSCORE.padStart(2, '0')
    BScore.textContent = BLUESCORE.padStart(2, '0')
}


function gameOver() {
    ball.x = canvas.width / 2
    ball.y = canvas.height / 2
    ball.dx = randomNoZero()
    ball.dy = randomNoZero()
}

function gameLoop() {
    ctx.clearRect(0, 0, canvas.width, canvas.height)

    updateBall()
    updatePaddles()
    updateScoreboard()
    drawBall()
    drawPaddles()

    requestAnimationFrame(gameLoop)
}
gameLoop()

function restart() {
    score.blue = 0
    score.red = 0
    ball.x = canvas.width / 2
    ball.y = canvas.height / 2
    ball.dx = randomNoZero()
    ball.dy = randomNoZero()
}

document.querySelector('#restart').addEventListener('click', restart)