let boxOneEl = document.getElementById("box-color-one");
let boxTwoEl = document.getElementById("box-color-two");
let boxThreeEl = document.getElementById("box-color-three");
let boxFourEl = document.getElementById("box-color-four");
let boxFiveEl = document.getElementById("box-color-five");
let boxSixEl = document.getElementById("box-color-six");
let winningRgbTextEl = document.getElementById("rgb-color");
let newColorsEl = document.getElementById("new-colors")
let scoreEl = document.getElementById("score");
let heartOneEl = document.getElementById("heart-img1");
let heartTwoEl = document.getElementById("heart-img2");
let heartThreeEl = document.getElementById("heart-img3");

let boxArray = [boxOneEl, boxTwoEl, boxThreeEl, boxFourEl, boxFiveEl, boxSixEl];
let livesArray = [heartOneEl, heartTwoEl, heartThreeEl];


function randomRGB(){
    let r = Math.floor(Math.random() * 256);
    let g = Math.floor(Math.random() * 256);
    let b = Math.floor(Math.random() * 256);
    return `RGB(${r},${g},${b})`;
}

function fadeToBlack(){
    //fades every box to black besides the winning box
    let livesLeft = livesArray.length;
    //check if user lost all their lives if lives left = 0 then end restart game
    this.classList.toggle("fadeIn");
    //index of the last live
    let indexOfLives = livesLeft - 1;
    let currentLife = livesArray[indexOfLives];  
    //remove one elemnt from livesArray based on the indexOfLives
    livesArray.splice(indexOfLives,1);  
    //fade to white to indicate life lost
    currentLife.classList.toggle("fadeToWhite");
    //end game when user reached 0 lives
    if(livesArray.length == 0){
        alert("game over"); 
        newGame();
    }
}

function removeClassListAndEventListener(){
    debugger;
        boxArray.forEach(boxEl => {
            //checks all box elements that contain class "fadeIn" to fades them back out for next game and removes fadeIn and fadeOut class in CSS
            //if (boxEl.classList.contains("fadeToBlack")) {
                boxEl.classList.toggle("fadeOut");
                boxEl.classList.remove("fadeIn");  
                boxEl.classList.remove("fadeOut");
                boxEl.removeEventListener("click",fadeToBlack);
                boxEl.removeEventListener("click", continueGame);
              
        })
       
}

function removeClassListFromLives(){
    livesArray.push(heartOneEl);
    livesArray.push(heartTwoEl);
    livesArray.push(heartThreeEl);
    livesArray.forEach(heartEl =>{
        heartEl.classList.remove("fadeToWhite");
    })
}

function newGame(){
        scoreEl.innerHTML = 0;
        removeClassListFromLives();
        removeClassListAndEventListener();
        startGame();
}

function continueGame(){
    scoreEl.innerHTML++;
    removeClassListAndEventListener();
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
    let winningBox = boxArray[randomBoxNumber];
    boxArray.splice(randomBoxNumber, 1);
    
    //assigns every box that is not the winning box to have a fade to black transition for incorrect guess
    boxArray.forEach(box =>{
        box.addEventListener("click", fadeToBlack)
    })
    boxArray.splice(randomBoxNumber, 0, winningBox);

    //if new colors is clicked it will reset the score while the winning box will continue the game
    winningBoxEl.addEventListener("click", continueGame);
    newColorsEl.addEventListener("click", newGame);
}

startGame();


