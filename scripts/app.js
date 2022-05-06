const startBtn = document.querySelector('#startBtn')
const getReady = document.querySelector('.getReady')
const hideStart = document.querySelector('.start-button')
const restartBtn = document.querySelector('#restart')
const results = document.querySelector('.results')
const resultDisplay = document.querySelector('#result-display2')
const timer = document.querySelector('#timer h2')
const score = document.querySelector('#score h2')
const holes = document.querySelectorAll('.holes')
const moles = document.querySelectorAll('.moles')
const hiddenClasses = document.querySelector('.hide')

let lastHole
let moleHit = 0
let gameOver = false
let scoreCount = 0
let gameTimer = 15
let prepTimer = 3

// starts game when button clicked
let gameStart = () => {
    hideStart.classList.add('hide')

    // delays the game from starting immediately after button press
    const countDown = setInterval(() => {
    prepTimer--
    getReady.textContent = prepTimer
    if (prepTimer <= 0) {
        clearInterval(countDown)
        hiddenClasses.classList.remove('hide')
        getReady.classList.add('hide')
        
        // starts the game timer
        let gameTime = setInterval(() => {
        gameTimer--
        timer.textContent = gameTimer
    if (gameTimer <= 0) {
        clearInterval(gameTime)
        gameOver = true
        displayResults()
    }
        },1000)

    // stops the moles from continuing to peep out
        setTimeout (() => {
        peep()
        }, gameTimer)
    }
}, 1000)
}

// displays results once game has ended
let displayResults = () => {
        if (gameOver === true) {
        hiddenClasses.classList.add('hide')
        results.classList.remove('hide2')
        resultDisplay.textContent = `You bonked a total of ${moleHit} moles. Score: ${scoreCount}.`
    }
}

// randomly chooses a hole for the mole
let randomHole = () => {
    let randomNum = Math.floor(Math.random() * holes.length)
    let hole = holes[randomNum]

    // prevents the same hole from being selected
    if (hole === lastHole) {
        return randomHole()
    }
    lastHole = hole
    return hole
}

// mole peeps out of the random hole
let peep = () => { 
    const hole = randomHole()
    hole.classList.add('peep')
    setTimeout(() => {
        hole.classList.remove('peep')
        if (!gameOver) peep()
    }, Math.random() * 400 + 700)
}


// bonk the mole to earn points
function bonk(e) {
    moleHit++
    scoreCount +=2
    this.style.backgroundImage = 'url("img/moleHit.png")'
    this.style.pointerEvents = 'none'
    setTimeout(() => {
        this.style.backgroundImage = 'url("img/mole.png")'
        this.style.pointerEvents = 'all'
    }, 750);
    score.textContent = scoreCount
}

// resets and restarts game
function restart() {
    getReady.classList.remove('hide')
    results.classList.add('hide2')
    gameTimer.textContent = '30'
    scoreCount.textContent = '0'
    lastHole
    gameOver = false
    getReady.textContent = 3
    prepTimer = 3
    gameTimer = 15
    scoreCount = 0
    moleHit = 0
    gameStart()
}

moles.forEach(mole => mole.addEventListener('click', bonk))
startBtn.addEventListener('click', gameStart)
restartBtn.addEventListener('click', restart)