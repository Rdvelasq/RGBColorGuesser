let boxOneEl = document.getElementById("box-color-one");
let boxTwoEl = document.getElementById("box-color-two");
let boxThreeEl = document.getElementById("box-color-three");
let boxFourEl = document.getElementById("box-color-four");
let boxFiveEl = document.getElementById("box-color-five");
let boxSixEl = document.getElementById("box-color-six");
let winningRgbTextEl = document.getElementById("rgb-color");
let newColorsEl = document.getElementById("new-colors")
let scoreEl = document.getElementById("score");

let boxArray = [boxOneEl, boxTwoEl, boxThreeEl, boxFourEl, boxFiveEl, boxSixEl];


function randomRGB(){
    let r = Math.floor(Math.random() * 256);
    let g = Math.floor(Math.random() * 256);
    let b = Math.floor(Math.random() * 256);
    return `RGB(${r},${g},${b})`;
}

function fadeToBlack(){
    //fades every box to black besides the winning box
    this.classList.toggle("fadeIn");
}

function removeEventListenerAndClassList(){
    //remove event listener from the winnning box to avoid having multiple boxes with a new game event listener
    this.removeEventListener("click", newGame);
        boxArray.forEach(boxEl => {
            //checks all box elements that contain class "fadeIn" to fades them back out for next game and removes fadeIn and fadeOut class in CSS
            if (boxEl.classList.contains("fadeIn")) {
                boxEl.classList.toggle("fadeOut");
                boxEl.classList.remove("fadeIn");  
                boxEl.classList.remove("fadeOut");       
            }  
        })
}

function newGame(){
        scoreEl.innerHTML = 0;
        removeEventListenerAndClassList();
        startGame();
}

function continueGame(){
    scoreEl.innerHTML++;
    removeEventListenerAndClassList();
    startGame();
}

function startGame(){
    let boxArray = [boxOneEl, boxTwoEl, boxThreeEl, boxFourEl, boxFiveEl, boxSixEl];
    boxArray.forEach(boxEl => {
        //assigns every box a random RGB color
        boxEl.style.background = randomRGB();
    });

    //finds a random number based on length of array 
    let randomBoxNumber = Math.floor(Math.random() * (boxArray.length - 1));
    //retrieves winning box element box array
    let winningBoxEl = boxArray[randomBoxNumber]; 
    //retrieves coresponding RGB style from the winning box
    let rgbWinningBox = winningBoxEl.style.background;

    //replaces current text from HTML to the winning box's RGB style
    winningRgbTextEl.innerHTML = rgbWinningBox;

    //remove's winning box from box array
    boxArray.splice(randomBoxNumber, 1);
    //assigns every box that is not the winning box to have a fade to black transition for incorrect guess
    boxArray.forEach(box =>{
        box.addEventListener("click", fadeToBlack)
    })

    //if new colors is clicked it will reset the score while the winning box will continue the game
    winningBoxEl.addEventListener("click", continueGame);
    newColorsEl.addEventListener("click", newGame);
}

startGame();


