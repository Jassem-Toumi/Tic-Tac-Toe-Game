
const Winning_Combinations = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
]
const X_CLASS = 'x'
const CIRCLE_CLASS = 'circle'
const cellElements = document.querySelectorAll('[data-cell]');
const board = document.getElementById('board')
const winningMessageTextElement = document.querySelector('[data-winning-message-text]')
const winningMessageContainer = document.querySelector('.winning-message')
const restartBtn = document.getElementById('restartBtn')
const continueBtn = document.getElementById('ContinueBtn')
const settings = document.querySelector('.settings');
var player1 = ''
var player2 = ''
const Startbtn = document.querySelector('.btn');
let p1 = document.querySelector('.p1 span')
let p2 = document.querySelector('.p2 span')
const winningSign = document.querySelector('[winSign]')
const RefreshBtn = document.querySelector('.RefreshBtn')
let scoreP1 = document.querySelectorAll('.scoreP1')
let scoreP2 = document.querySelectorAll('.scoreP2')
let circleTurn
let currentWinClass
let score = 1
let UpdateScore
let Input1 = document.getElementById('Username1')
let Input2  = document.getElementById('Username2') 
let Inputs = document.querySelectorAll('.inputs')
let form = document.getElementsByName('form')


UpdateSettings()

Startbtn.addEventListener('click', UpdateSettings)
Startbtn.addEventListener('click', startGame)
continueBtn.addEventListener('click', startGame)



Inputs.forEach(input => {
    
// Execute a function when the user presses a key on the keyboard
input.addEventListener("keypress", function(event) {
    // If the user presses the "Enter" key on the keyboard
    if (event.key === "Enter") {
      // Cancel the default action, if needed
      event.preventDefault();
      // Trigger the button element with a click
      Startbtn.click();
    }
  });

  input.onfocus = blur();
})



function startGame (){
    circleTurn = false;
    setBoardHoverClass()
    settings.classList.add('hide')
    p1.innerText = `${player1}`
    p2.innerText = `${player2}`
    Input1.value = ''
    Input2.value = ''
    winningSign.classList.remove(`${currentWinClass}`)

    cellElements.forEach(cell => {
        cell.classList.remove(X_CLASS)
        cell.classList.remove(CIRCLE_CLASS)
        cell.removeEventListener('click', handleClick)
        cell.addEventListener('click', handleClick, {once: true})
    })
    winningMessageContainer.classList.remove('show')
}


function handleClick (e){
    //place a Mark
    //check for a Win
    //check for a Draw
    //switch Turns
    const cell = e.target
    const currentClass = circleTurn ? CIRCLE_CLASS : X_CLASS
    placeMark(cell, currentClass)
    if(checkWin(currentClass)){
        endGame(false)
    } else if (isDraw()){
        endGame(true)
    } else {
        swapTurns()
        setBoardHoverClass()
    }
}

function endGame(draw){
    if(draw){
        winningMessageTextElement.innerText = 'Draw!'
    } else {
        currentWinClass = `${circleTurn ? `${CIRCLE_CLASS}` : `${X_CLASS}`}`
        winningSign.classList.add(`${currentWinClass}`)
        winningMessageTextElement.innerText = `${circleTurn ? `${player2}` : `${player1}`} Wins!`
        if(currentWinClass === `${CIRCLE_CLASS}`){

            scoreP2.forEach(scorep2 => {
                if(scorep2.innerText >= `${score}`){             
                    UpdateScore = +scorep2.innerText + 1
                    scorep2.innerText = `${UpdateScore}`
                
                } else {           
                    scorep2.innerText = `${score}`          
                }
            }) 

            scoreP1.forEach(scorep1 => {
                if(scorep1.innerText == 0 || scorep1.innerText == ''){
                    scorep1.innerText = `0`  
            } 
            }) 
  
            
        } else if ( currentWinClass === `${X_CLASS}`) {

            scoreP1.forEach(scorep1 => {
                if(scorep1.innerText >= `${score}`){
                    UpdateScore = +scorep1.innerText + 1;
                    scorep1.innerText = `${UpdateScore}`

                } else {         
                    scorep1.innerText = `${score}`
                }
            }) 

            scoreP2.forEach(scorep2 => {
                if (scorep2.innerText == 0 || scorep2.innerText == '' ){
                    scorep2.innerText = '0'
            }
            }) 

 
        }
        
    }
    winningMessageContainer.classList.add('show')
}

function isDraw(){
    return [...cellElements].every(cell =>{
        return cell.classList.contains(X_CLASS) || cell.classList.contains(CIRCLE_CLASS)
    })
}


function placeMark(cell, currentClass){
    cell.classList.add(currentClass)
    cell.classList.add('clicked')
} 

function swapTurns(){
    circleTurn = !circleTurn
}

function setBoardHoverClass(){
    board.classList.remove(X_CLASS)
    board.classList.remove(CIRCLE_CLASS)
    if (circleTurn){
       board.classList.add(CIRCLE_CLASS)
    } else {
        board.classList.add(X_CLASS)
    }
}

function checkWin(currentClass){
    return Winning_Combinations.some(combination => {
      return combination.every(index => {
          return cellElements[index].classList.contains(currentClass)
      })
    })
}


function UpdateSettings () {
    player1 =  Input1.value;
    player2 =  Input2.value;
    scoreP1.forEach(scorep1 => {
        scorep1.innerText = ''
    })
    scoreP2.forEach(scorep2 => {
        scorep2.innerText = ''
    })

    settings.classList.remove('hide');


}


function NewGame () {
  startGame()
  settings.classList.remove('hide')
}


restartBtn.addEventListener('click', NewGame)
RefreshBtn.addEventListener('click', NewGame)




// /*=======================
//     Settings of the game 
// ==========================*/
// const settings = document.querySelector('.settings');
// var player1 = ''
// var player2 = ''
// const Startbtn = document.querySelector('.btn');

// Startbtn.addEventListener('click', UpdateSettings);

// function UpdateSettings () {
//     player1 = document.getElementById('Username1').value;
//     player2 = document.getElementById('Username2').value;
//     console.log(player1)
//     console.log(player2)
//     settings.classList.add('hide')
// }










