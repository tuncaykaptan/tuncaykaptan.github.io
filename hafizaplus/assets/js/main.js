const menu = document.getElementById("menu");
const startButton = document.getElementById("start");
const descriptionButton = document.getElementById("description");
const creditsButton = document.getElementById("credits");
const game = document.getElementById("game");
const closeGame = document.getElementById("close_game");
const closeGame2 = document.getElementById("close_game2");
const playAgain = document.getElementById("play_again");
const sendButton = document.getElementById("send")
const number1 = document.getElementById("number1")
const number2 = document.getElementById("number2")
const number3 = document.getElementById("number3")
const number4 = document.getElementById("number4")
const number5 = document.getElementById("number5")
const number6 = document.getElementById("number6")
const write = document.getElementById("write");
const score = document.getElementById("score");
const deathScreen = document.getElementById("death_screen");
const about = document.getElementById("about");
const creators = document.getElementById("creators");
const backMenu = document.getElementById("back_menu")
const backMenu2 = document.getElementById("back_menu2")
let isGameStarted = false;

let number1R;
let number2R;
let number3R;
let number4R;
let number5R;
let number6R;

let removeTime = 3000;

sendButton.addEventListener("click",gameProgress);
write.addEventListener("keypress", function(event) {
    if (event.key === "Enter") {
        gameProgress();
    }
  }); 

function gameProgress(){
        if(!isGameStarted){
            isGameStarted = true;
            write.value = "";
            getNumber()
            setTimeout(removeNumbers,removeTime)
            sendButton.innerHTML = "Kontrol Et"
            sendButton.style.backgroundColor = "#163252"
        }else{
            checkNumbers()
        }

}

function checkNumbers(){
    let all = number1R+""+ number2R+"" + number3R+"" + number4R+"" + number5R+"" + number6R;
    if (write.value == all){
        score.innerHTML = parseInt(score.innerHTML)+1;
        isGameStarted = false;
        sendButton.innerHTML = "Yeni Sayı"
        sendButton.style.backgroundColor = "#163252"
        removeTime = removeTime - 250;
    } else{
        deathScreen.classList.toggle("death_screen_closed")
        deathScreen.classList.toggle("death_screen_opened")
    }
}

// Yapımcı: Tuncay Kaptan

function getNumber(){
    if(write.value == ""){
    number1R = Math.floor(Math.random() * 10);
    number2R = Math.floor(Math.random() * 10);
    number3R = Math.floor(Math.random() * 10);
    number4R = Math.floor(Math.random() * 10);
    number5R = Math.floor(Math.random() * 10);
    number6R = Math.floor(Math.random() * 10);

    number1.innerHTML = number1R;
    number2.innerHTML = number2R;
    number3.innerHTML = number3R;
    number4.innerHTML = number4R;
    number5.innerHTML = number5R;
    number6.innerHTML = number6R;
    
    write.disabled = true; 
    sendButton.disabled = true; 
    }
}

function removeNumbers(){
    write.disabled = false;
    sendButton.disabled = false; 
    write.focus()
    number1.innerHTML = "?";
    setTimeout(function(){
        number2.innerHTML = "?";
    },50)
    setTimeout(function(){
        number3.innerHTML = "?";
    },70)
    setTimeout(function(){
        number4.innerHTML = "?";
    },90)
    setTimeout(function(){
        number5.innerHTML = "?";
    },110)
    setTimeout(function(){
        number6.innerHTML = "?";
    },130)
}





startButton.addEventListener("click",openGamePage);
closeGame.addEventListener("click",closeGamePage)

closeGame2.addEventListener("click",function(){
    menu.classList.toggle("backScreenMenu1");


    sendButton.innerHTML = "Başlat"
    sendButton.style.backgroundColor = "#002B5B"
    game.classList.toggle("backScreenGame");
    game.classList.toggle("mainScreenGame");


    deathScreen.classList.toggle("death_screen_closed")
    deathScreen.classList.toggle("death_screen_opened")
    isGameStarted = false;
    score.innerHTML = 0;
    removeTime = 3000;
})

playAgain.addEventListener("click", function(){
    isGameStarted = false;
    sendButton.innerHTML = "Başlat"
    sendButton.style.backgroundColor = "#002B5B"
    deathScreen.classList.toggle("death_screen_closed")
    deathScreen.classList.toggle("death_screen_opened")
    score.innerHTML = 0;
    removeTime = 3000;
})

function openGamePage(){

    menu.classList.toggle("backScreenMenu1");


    game.classList.toggle("backScreenGame");
    game.classList.toggle("mainScreenGame");

    removeTime = 3000;
    
}

function closeGamePage(){

    menu.classList.toggle("backScreenMenu1");


    sendButton.innerHTML = "Başlat"
    sendButton.style.backgroundColor = "#002B5B"
    game.classList.toggle("backScreenGame");
    game.classList.toggle("mainScreenGame");

    score.innerHTML = 0;
    removeTime = 3000;
    isGameStarted = false;
    
}


descriptionButton.addEventListener("click", aboutPage);
backMenu.addEventListener("click", aboutPage);

function aboutPage(){

    menu.classList.toggle("backScreenMenu2");
    

    about.classList.toggle("backScreenAbout");
    about.classList.toggle("mainScreenAbout");
    
}

creditsButton.addEventListener("click", creditsPage);
backMenu2.addEventListener("click", creditsPage);
function creditsPage(){

    menu.classList.toggle("backScreenMenu");
    

    creators.classList.toggle("backScreenCreators");
    creators.classList.toggle("mainScreenCreators");

}



function validate(evt) {
    var theEvent = evt || window.event;
  
    // Handle paste
    if (theEvent.type === 'paste') {
        key = event.clipboardData.getData('text/plain');
    } else {
    // Handle key press
        var key = theEvent.keyCode || theEvent.which;
        key = String.fromCharCode(key);
    }
    var regex = /[0-9]|\./;
    if( !regex.test(key) ) {
      theEvent.returnValue = false;
      if(theEvent.preventDefault) theEvent.preventDefault();
    }
  }