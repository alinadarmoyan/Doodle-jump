let takegrid = document.getElementsByClassName("grid");
const doodler = document.createElement("div");
let grid = takegrid[0];
let platformCount = 5;
let platforms = [];
let doodlerLeftSpace = 0;
let doodlerBottom = 150;
let doodlerTop = 0;
let newPlatBottom;
let intervalRight;
let intervalLeft;
let doodFall;
let movePlats;
let doodJump;
let platBottom;
let doodBot;
let score = 0;
let sound = document.getElementById("aud");
let pause = document.getElementById('stop');
let clicked = 0;
let clickCount = 0;

class Platform
{
    constructor(newPlatBottom)
    {
        this.left = Math.random() * 300;
        this.bottom = newPlatBottom;
        this.visual = document.createElement("div");
        const visual = this.visual;

        visual.classList.add("platform");
        visual.style.left = this.left + "px";
        visual.style.bottom = this.bottom + "px";
        grid.appendChild(visual);
    }
}

function createPlatforms() 
{
    for (let i = 0; i < platformCount; i++)
    {
        let platGap = 600 / platformCount;
        newPlatBottom = 100 + i * platGap;
        platforms.push(new Platform(newPlatBottom));
        
    }
}

function createDoodler() 
{
    doodler.classList.add("doodler");
    grid.appendChild(doodler);
    doodlerLeftSpace = platforms[0].left;
    doodler.style.left = doodlerLeftSpace + "px";
    doodler.style.bottom = doodlerBottom  + "px";
  
}

function stop(intervalID){
    clearInterval(intervalID);
}

function gameOver() 
{
    stop(movePlats);
    while (grid.firstChild) {
        grid.removeChild(grid.firstChild);
    }

    let y = document.createElement('h1');
    y.innerText = 'game over!';
    grid.appendChild(y)
   
    let x = document.createElement('h3');
    x.innerText = "your score : " + score;
    grid.appendChild(x);

    let pButton = document.getElementById("pButton");
    pButton.style.zIndex = 10;
    
}

function moveLeft() 
{
    if (doodlerLeftSpace > 3) 
    {
        doodlerLeftSpace -= 2;
        doodler.style.left = doodlerLeftSpace + "px";
    }
    else
    {
        stop(intervalLeft);
    }
}

function moveRight() 
{

    if (doodlerLeftSpace < 325) 
    {
        doodlerLeftSpace += 2;
        doodler.style.left = doodlerLeftSpace + "px";
    }
    else if (doodlerLeftSpace >= 320)
    {
        stop(intervalRight);
    }
}


function jump()
{
    stop(doodFall);
    if(clickCount % 2 == 0)
    {
        const audio = new Audio('jump.mp3');
        audio.play();
    }
    let ar = doodlerBottom;
    doodJump = setInterval(function ()
    {
        doodlerBottom += 5;
        doodler.style.bottom = doodlerBottom + "px";
        if (doodlerBottom > ar + 200)
        {
            fall();        
        }
    }, 20)
}


function fall() 
{
    stop(doodJump);
    doodFall = setInterval(function ()
    {
        if(doodlerBottom > 0)
        {
            doodlerBottom -= 5;
            doodler.style.bottom = doodlerBottom + "px";
        }
        else
        {
            gameOver();
        }

        platforms.forEach(
            platform =>
            {
                if(
                    ((doodlerBottom >= platform.bottom ) &&
                    (platform.bottom + 17) >= doodlerBottom) && 
                    ((doodlerLeftSpace + 60) >= platform.left) &&
                    (doodlerLeftSpace <= (platform.left + 85))
                )
                {
                    jump();
                    score+=1;
                }
            }
        ) 
    }, 20)
     
}

function control(a) 
{
    if (a.key === "ArrowLeft") 
    {
        isGoingRight = false;
        isGoingLeft = true;
        stop(intervalRight);
        stop(intervalLeft);
        intervalLeft = setInterval(moveLeft, 10);
    }
    else if (a.key === "ArrowRight") 
    {
        isGoingRight = true;
        isGoingLeft = false;
        stop(intervalRight);
        stop(intervalLeft);
        intervalRight = setInterval(moveRight, 10);
    }
    else if (a.key === "ArrowUp")
    {
        stop(intervalRight);
        stop(intervalLeft);
    }
}



function movePlatforms() 
{
    movePlats = setInterval(function(){
        platforms.forEach( 
            platform => 
            {
                platform.bottom = platform.bottom - 4;
                let visualbottom = platform.visual;
                visualbottom.style.bottom = platform.bottom + 'px';
    
                if (platform.bottom < 10) 
                {
                    let firstPlatform = platforms[0].visual;
                    firstPlatform.classList.remove("platform");
                    platforms.shift();
    
                    platforms.push(new Platform(newPlatBottom));
                }
            }
            
        )
    }, 30)
    
}



function start() 
{
    createPlatforms();
    createDoodler(); 
    fall();
    movePlatforms();
    addEventListener("keyup", control);
    console.log(sound.style.backgroundImage);
    sound.addEventListener("click", ()=>{
        clickCount++;
        if (clickCount % 2) 
        {
            sound.style.backgroundImage = "url(img/mute.png)";
        }
        else
        {
            sound.style.backgroundImage = "url(img/withaudio.png)";
        }
    });
    pause.addEventListener('click', ()=>{
        clicked++;
        if (clicked % 2) 
        {
            removeEventListener("keyup", control);
            pause.style.backgroundImage = "url(img/startimg.png)";
            stop(movePlats);
            stop(doodFall);
            stop(doodJump);
            stop(intervalLeft);
            stop(intervalRight);
        }
        else
        {    
            addEventListener("keyup", control);
            pause.style.backgroundImage = "url(img/pause.png)";
            movePlatforms();
            fall();
        }
    })
}








// let arr = [];
// for (let i = 0; i < 10; i++) 
// {
//     arr[i] = i;
//     console.log(arr[i]);
// }



// let fruits = [15, 'lemon', 'orange'];
// fruits.forEach(item => console.log(item * 10));


// function print() 
// {
//     for (let i = 0; i < fruits.length; i++) 
//     {
//         console.log(fruits[i]);        
//     }    
// }

// print();


// function esim()
// {
//     console.log("barev");
//     console.log('5 + 5');
    
// }

// setInterval(esim, 1000);




start();
