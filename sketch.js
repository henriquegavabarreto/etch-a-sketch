const grid = document.querySelector('.grid');
const gridSize = 600;
let currentColor = "black";
let numberOfSquares = [];
let border = true;
let currentNumber = 25;
let colorful = false;

function createGrid(number) {
  //check if number is valid
  while(number < 1 || number > 100) {
    number = prompt("The number must be between 1 and 100.");
  }

  if(isNaN(number) || number === "") return;

  currentNumber = number;

  //delete all squares to make a new grid
  if(numberOfSquares.length > 0){
    for(let i = 1;i <= numberOfSquares.length; i++) {
      document.querySelector('.grid').removeChild(document.querySelector(`.square${i}`));
    }
    numberOfSquares = [];
  }

  //create a new grid
  for (let i = 1; i <= number ** 2; i++){
    numberOfSquares.push(i);
    let square = document.createElement('div');
    square.classList.add("squares");
    square.classList.add(`square${i}`);
    square.classList.add("squareBorder");
    square.style.width = `${gridSize/number}px`;
    square.style.heigth = `${gridSize/number}px`;
    grid.appendChild(square);
    paint(i);
  }
}

function paint(i){
  const eachSquare = document.querySelector(`.square${i}`);
  let opacity = 0.0;
  let r = randomNumber();
  let g = randomNumber();
  let b = randomNumber();
  eachSquare.addEventListener('mouseover', function(){
    if(colorful === false){
      currentColor = "black";
      eachSquare.style.backgroundColor = currentColor;
    } else {
      currentColor = `rgb(${r},${g},${b})`;
      eachSquare.style.backgroundColor = currentColor;
      eachSquare.style.boxShadow = `inset 0px 0px 0px 20px rgba(0,0,0,${opacity})`;
      if(opacity < 1.0){
        opacity = opacity + 0.1;
        console.log("yes!")
      }
    }
  })
}

//event linked to the button that creates a new canvas of the same size
let clearButton = document.querySelector("#clear");
clearButton.addEventListener('mousedown', function(){
  createGrid(currentNumber);
});

//add or remove grid
let removeBorder = document.querySelector("#remove");
removeBorder.addEventListener('mousedown',function(){
  if(border === true){
    for(i = 1; i <= numberOfSquares.length; i++){
      document.querySelector(`.square${i}`).classList.remove("squareBorder");
    }
    border = false;
    removeBorder.textContent = "BORDER OFF";
  } else {
    for(i = 1; i <= numberOfSquares.length; i++){
      document.querySelector(`.square${i}`).classList.add("squareBorder");
    }
    removeBorder.textContent = "BORDER ON";
    border = true;
  }
});

//Changes brush to black or colorful
let changeColor = document.querySelector("#color");
changeColor.addEventListener('mousedown', function(){
  if(colorful === false){
    colorful = true;
    document.querySelector("#color").textContent = "BLACK";
  } else {
    colorful = false;
    document.querySelector("#color").textContent = "COLORFUL";
  }
})

//resize canvas
let resize = document.querySelector('#resize');
resize.addEventListener('mousedown', function(){
  createGrid(prompt("How many squares per side?"));
})

createGrid(currentNumber);

function randomNumber(){
  return Math.floor(Math.random()*255);
}
