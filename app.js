const startBtn = document.querySelector('#startBtn')
const hideStart = document.querySelector('.start-button')
const getReady = document.querySelector('.getReady')
const timer = document.querySelector('#timer h2')
const score = document.querySelector('#score h2')
const holes = document.querySelectorAll('.holes')
const moles = document.querySelector('.mole')
const hideClasses = document.querySelector('.hide')

let gameOver = false
let gameTimer = 5

// starts game when button clicked
let gameStart = () => {
    hideStart.classList.add('hide')
    hideClasses.classList.remove('hide')
    
    // delays the game from starting immediately after button press
    let prepTimer = 4
    const countDown = setInterval(() => {
    prepTimer--
    getReady.textContent = prepTimer
    if (prepTimer <= 0) {
        clearInterval(countDown)
        getReady.classList.add('hide')
        
        // starts the game timer
        let gameTime = setInterval(() => {
        gameTimer--
        timer.textContent = gameTimer
    if (gameTimer <= 0) {
        clearInterval(gameTime)
        gameOver = true
    }
        },1000)
       
        // timer for the game to finish
        setTimeout (() => {
        peep()
        scoreCount = 0
        }, gameTimer)
    }
}, 1000)
}


// randomly chooses a hole for the mole
let randomHole = () => {
    let randomNum = Math.floor(Math.random() * holes.length)
    let hole = holes[randomNum]
    return hole
}

// mole peeps out of the random hole
let peep = () => { 
    let hole = randomHole()
    hole.classList.add('moles')
    console.log(hole)
    setTimeout(() => {

        hole.classList.remove('moles')
        if (!gameOver) peep()
    }, Math.floor(Math.random() * 1300))
}

// bonk the mole to earn points
let bonk = (e) => {
    scoreCount += 10
    score.textContent = scoreCount
}


holes.forEach(hole => hole.addEventListener('click', bonk))
startBtn.addEventListener('click', gameStart)