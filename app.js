const startBtn = document.querySelector('#startBtn')
const hideStart = document.querySelector('.start-button')
const restartBtn = document.querySelector('#restart')
const timer = document.querySelector('#timer h2')
const score = document.querySelector('#score h2')
const holes = document.querySelectorAll('.holes')
const moles = document.querySelectorAll('.moles')
const hiddenClasses = document.querySelector('.hide')

let lastHole
let gameOver = false
let gameTimer = 30
let scoreCount = 0

// starts game when button clicked
let gameStart = () => {
    hideStart.classList.add('hide')
    hiddenClasses.classList.remove('hide')
    
    // delays the game from starting immediately after button press
    let prepTimer = 2
    const countDown = setInterval(() => {
    prepTimer--
    if (prepTimer <= 0) {
        clearInterval(countDown)
        hiddenClasses.classList.remove('hide')
        
        // starts the game timer
        let gameTime = setInterval(() => {
        gameTimer--
        timer.textContent = gameTimer
    if (gameTimer <= 0) {
        clearInterval(gameTime)
        gameOver = true
    }
        },1000)
       
        // timer for the game to end
        setTimeout (() => {
        peep()
        }, gameTimer)
    }
}, 1000)
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
    }, Math.random() * 300 + 800)
}

// bonk the mole to earn points
function bonk(e) {
    scoreCount++
    this.style.backgroundImage = 'url("img/moleHit.png")'
    this.style.pointerEvents = 'none'
    setTimeout(() => {
        this.style.backgroundImage = 'url("img/mole.png")'
        this.style.pointerEvents = 'all'
    }, 750);
    score.textContent = scoreCount
}

moles.forEach(mole => mole.addEventListener('click', bonk))
startBtn.addEventListener('click', gameStart)