let squares = document.querySelectorAll(".square");
let judge = document.getElementById("judge");
let winner_color = document.querySelector("#winner-color");

let bodyBackgroundColor = document.querySelector("body").style.backgroundColor;


let colors = randomColors(6);
// [
//     "rgb(255, 0, 0)",
//     "rgb(0, 255, 0)",
//     "rgb(0, 0, 255)",
//     "rgb(255, 255, 0)",
//     "rgb(0, 255, 255)",
//     "rgb(255, 0, 255)"
// ];


let pickedColor = pickColor();

winner_color.textContent = pickedColor;



for(let i=0 ; i<squares.length ; i++)
{
    squares[i].style.backgroundColor = colors[i];
    squares[i].addEventListener("click", function(){
        
        if(this.style.backgroundColor == pickedColor)
        {
            fillColor(pickedColor);
            judge.textContent = "Winner!!!";
        }
        else
        {
            this.style.backgroundColor = bodyBackgroundColor;
            judge.textContent = "Try Again!!!";
        }
    });
}


function fillColor(color)
{
    for(let i=0 ; i<squares.length ; i++)
    {
        squares[i].style.backgroundColor = color;
    }
    
}


function pickColor()
{
    let random = Math.floor(Math.random() * colors.length);   
    return colors[random];
}

function randomColors(number)
{
    let arr = [];
    
    for(let i=0 ; i<number ; i++)
    {
        let r = Math.floor(Math.random() * 256);   
        let g = Math.floor(Math.random() * 256);   
        let b = Math.floor(Math.random() * 256);

        let randomColor = "rgb(" + r + ", " + g + ", " + b +")";
        arr.push(randomColor);
    }

    return arr;
}







