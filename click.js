import { snackList,decorationList } from "./lists.js";
const presents = document.querySelector(".presents");
const coinLabel = document.querySelector(".coins");
const snackStand = document.querySelector(".stand2");
const entertainer = document.querySelector(".ent-pic");
const tree2 = document.querySelector(".tree2");
const snackIMG = document.createElement("img");
const grid3 = document.querySelector(".grid-3");
const decorationStand = document.querySelector(".stand1");
const decorIMG = document.querySelector(".decor-img");

let spinnerSound = new Audio("./spinner-66626.mp3");
let backgroundMusic = new Audio("./reflected-light-147979.mp3");
backgroundMusic.loop=true;
let playing = false;

let prices = {
    snackPrice: 100,
    snackPriceMultiplier: 2,
    decorationPrice: 1000,
    decorationMultiplier: 5,
}
let currentSnack = 0;
let currentDecoration = 0;
let clickAmount = 1;
let coins = 10000000;

presents.addEventListener("click",()=>{
    if(playing===false){
        backgroundMusic.play();
        playing = true;
    }
    coins = coins + clickAmount;
    coinLabel.innerHTML = "Chameleon Coins: " + coins;
});
setSnackImage(currentSnack);
snackStand.addEventListener("click",()=>{
    if(coins>=prices.snackPrice){
        coins-=prices.snackPrice;
        coinLabel.innerHTML = "Chameleon Coins: " + coins;
        prices.snackPrice = prices.snackPrice * prices.snackPriceMultiplier;
        currentSnack++;
        clickAmount = clickAmount * prices.snackPriceMultiplier;
        setSnackImage(currentSnack);
    }
});

setInterval(() => {
    entertainer.style.visibility = "visible";
    randomReward();
}, 60000); //entertainer every 4 minutes

function randomReward(){
    let reward = Math.floor(Math.random()*3); // random num 0-2
    switch(reward){
        case 0:
            entertainer.src = "./images/clown.jfif";
            break;
        case 1:
            entertainer.src = "./images/magician.jpg"
            break;
        case 2:
            entertainer.src = "./images/jester.jpg"
            break;
    }
    entertainer.addEventListener("click",()=>{
        switch (reward) {
            case 0: //bad case
                coins = Math.round(coins/2);
                coinLabel.innerHTML = "Chameleon Coins: " + coins;
                break;
            case 1: //neutral case
                coins = Math.round(coins*1.11); //11% addition
                coinLabel.innerHTML = "Chameleon Coins: " + coins;
                break;
            case 2: //good case
                coins = Math.round(coins*1.5); //50% addition
                coinLabel.innerHTML = "Chameleon Coins: " + coins;
                break;
        }
        entertainer.style.visibility = "hidden";
    });
}
let currentDisplay
snackStand.addEventListener("mouseover",()=>{
    currentDisplay =  displayPrice("Snacks: ",prices.snackPrice);
});
snackStand.addEventListener("mouseleave",()=>{
    removeDisplayPrice(currentDisplay);
});

function displayPrice(text,price){
    const textPopup = document.createElement("h1");
    textPopup.innerHTML = `${text}$${price}`;
    textPopup.classList.add("display-text");
    tree2.appendChild(textPopup);
    return textPopup;
}
function removeDisplayPrice(item){
    tree2.removeChild(item);
}


function setSnackImage(snackIdentifier){
    
    snackIMG.src = snackList[snackIdentifier];
    snackIMG.classList.add("snack-img");
    grid3.appendChild(snackIMG);
}
decorIMG.src = decorationList[currentDecoration];
decorationStand.addEventListener("click",()=>{
    if(coins>=prices.decorationPrice){
        coins-=prices.decorationPrice;
        coinLabel.innerHTML = "Chameleon Coins: " + coins;
        prices.decorationPrice = 
        prices.decorationPrice * prices.decorationMultiplier;
        currentDecoration++;
        clickAmount = clickAmount * prices.decorationMultiplier;
        decorIMG.src = decorationList[currentDecoration];
    }
});
decorationStand.addEventListener("mouseover",()=>{
    currentDisplay =  displayPrice("Decoration: ",prices.decorationPrice);
});
decorationStand.addEventListener("mouseleave",()=>{
    removeDisplayPrice(currentDisplay);
});

const spinner = document.querySelector(".spinner");
spinner.style.transition = "5s ease";

spinner.addEventListener("click",()=>{
    spinnerSound.play();
    backgroundMusic.volume = .5;
    let result = Math.round(Math.random()*360); //random 0deg - 360deg
    let spinDegrees = result + 3000; 
    spinner.style.transform = "rotateZ(" + spinDegrees + "deg)";
    setTimeout(() => {
        spinner.style.transition = "0s";
        getReward(result);
        spinner.style.visibility = "hidden";
        spinnerSound.pause();
        backgroundMusic.volume = 1;  
    }, 5000);
    setTimeout(() => {
        spinner.style.transform = "rotateZ(0deg)";
    }, 8000);
    setTimeout(() => {
        spinner.style.transition = "5s ease";
    }, 10000);
    setTimeout(() => {
        spinner.style.visibility = "visible";
        spinnerSound.currentTime = 0;
    }, 30000);
});

function getReward(item){
    switch(true){
        case (item<60): 
            coins+=100;
        break;
        case(item >= 60 && item <120):
            coins+=1000;
        break;
        case(item >= 120 && item <180):
            coins+= Math.round(coins * .02);
        break;
        case(item >= 180 && item < 240):
            coins-=Math.round(coins * .02);
        break;
        case(item >= 240 && item <300):
            coins-= Math.round(coins * .1);
        break;
        case(item >= 300): 
            coins-=Math.round(coins * .5);
        break;
    }
    coinLabel.innerHTML = "Chameleon Coins: " + coins;
}