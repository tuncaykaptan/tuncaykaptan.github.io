let hostCards = document.querySelector('#hostCards');
let hostTotal = document.querySelector('#hostTotal');
let userCards = document.querySelector('#userCards');
let userTotal = document.querySelector('#userTotal');
let takeButton = document.querySelector('#takeButton');
let stopButton = document.querySelector('#stopButton');
let doubleButton = document.querySelector('#doubleButton');
let startButton = document.querySelector('#startButton');
let scoreboard = document.querySelector('#scoreboard');
let price = document.querySelector('#price');

let betPrice = 0;
let isGameEnd = true;
let hostsFirsCardPicked = false;
let hostRealTotal = 0;


const cards = [[1, "sinek"], [2, "sinek"], [3, "sinek"], [4, "sinek"], [5, "sinek"], [6, "sinek"], [7, "sinek"], [8, "sinek"], [9, "sinek"], [10, "sinek"], [11, "sinek"],
               [1, "karo"], [2, "karo"], [3, "karo"], [4, "karo"], [5, "karo"], [6, "karo"], [7, "karo"], [8, "karo"], [9, "karo"], [10, "karo"], [11, "karo"],
               [1, "kupa"], [2, "kupa"], [3, "kupa"], [4, "kupa"], [5, "kupa"], [6, "kupa"], [7, "kupa"], [8, "kupa"], [9, "kupa"], [10, "kupa"], [11, "kupa"],
               [1, "maça"], [2, "maça"], [3, "maça"], [4, "maça"], [5, "maça"], [6, "maça"], [7, "maça"], [8, "maça"], [9, "maça"], [10, "maça"], [11, "maça"]
];

const playerCardsArray = [];
const hostCardsArray = [];


document.addEventListener('DOMContentLoaded', () => {
    if(sessionStorage.getItem("firstOpen") === null){
        alertF("BlackJack Oyununa Hoşgeldiniz! Oyuna başlarken size <span style='text-decoration: underline;'>1000TL</span> bakiye veriyoruz. Oyuna başlamak için aşağıdaki tuşa basınız. <br> (Tuşa basarak çerezleri kabul etmiş sayılırsınız.)", "blue", "firstOpen", 700 ,"noInfo");
    }else{
        scoreboard.innerHTML = sessionStorage.getItem("bakiye");
        if(sessionStorage.getItem("bakiye") == 0 || sessionStorage.getItem("bakiye") < 0){
            alertF("Olamaz! Görünüşe göre bakiyeniz bitmiş. Size oynamaya devam edebilmeniz için 200TL bakiye veriyoruz. Şeytanınız bol olsun :))", "black", 0, 300 , "noInfo")
            sessionStorage.setItem("bakiye", 200);
            scoreboard.innerHTML = sessionStorage.getItem("bakiye");
        }
    }

})


function startGame(){
    if(price.value != "" && Number(price.value) <= Number(sessionStorage.getItem("bakiye")) && price.value != 0){

        console.log("----Yeni Oyun----")

        betPrice = Number(price.value);

        scoreboard.innerHTML = Number(scoreboard.innerHTML) - Number(betPrice)

        startButton.classList.add('hidden');
        price.classList.add('hidden');

        playerCardsArray.push(getRandomCard(playerCardsArray , 2, "player"));
        console.log(playerCardsArray)

        hostCardsArray.push(getRandomCard(hostCardsArray , 2, "host"));
        console.log(hostCardsArray)
    }else{
        alertF("Lütfen geçerli bir sayı giriniz.", "red", "", 0, "noInfo")
    }
}


function getRandomCard(array, repeat, who, total) {
    for (let i = 0; i < repeat; i++) {
        var randomIndex = Math.floor(Math.random() * cards.length);
        pickedCard = cards[randomIndex][1]+" "+cards[randomIndex][0];

        console.log("Seçilen kart: "+ pickedCard);
        console.log(who + " eski kartları: "+array);

        
        array.forEach(function(card) {
            if (pickedCard == card) {
                console.log("Yeni kart seçiliyor..")
                getRandomCard(array);
            }
        });

        switch(who){
            case "player":
                who = userCards;
                total = userTotal;
                break;
            case "host":
                who = hostCards;
                total = hostTotal;
                break;
        }

        let newCard = document.createElement("div")
        if (who == hostCards && hostsFirsCardPicked == false){
            newCard.innerHTML = pickedCard;
            hostsFirsCardPicked = true;
            console.log("KART SEÇİLDİ")
            who.appendChild(newCard);
            array.push(pickedCard);

            total.innerHTML = Number(total.innerHTML) + Number(cards[randomIndex][0]);
            hostRealTotal = Number(total.innerHTML);
            
            console.log(who + " yeni kartları: "+array);
        } else if (who == hostCards && hostsFirsCardPicked == true){
            newCard.innerHTML = "********";
            who.appendChild(newCard);
            array.push(pickedCard);

            hostRealTotal += Number(cards[randomIndex][0]);

            console.log(who + " yeni kartları: "+array);
        }else{
            newCard.innerHTML = pickedCard;
            who.appendChild(newCard);
            array.push(pickedCard);

            total.innerHTML = Number(total.innerHTML) + Number(cards[randomIndex][0]);
        
            console.log(who + " yeni kartları: "+array);
        }
    }

    setTimeout(function(){
        isGameEnd = checkWinner("inGame");
        if(!isGameEnd) {
            continueGame();
        }
    }, 500);

}


function continueGame(){
    console.log("oyun devam ediyor!");
    
}

function takeCard(){
    if(!isGameEnd){
        playerCardsArray.push(getRandomCard(playerCardsArray , 1, "player"));
    }else{
        alert("Şu anda bu tuşa basamazsınız!")
    }
}

function stopCard(){
    if(!isGameEnd){
        isGameEnd = true;
        hostCards.children[1].innerHTML = hostCardsArray[1];

        setTimeout(function(){
            if(hostRealTotal <= 16){
                hostCardsArray.push(getRandomCard(hostCardsArray , 1, "host"));
                hostCards.children[2].innerHTML = hostCardsArray[3];
            }
            hostTotal.innerHTML = hostRealTotal;
            setTimeout(function(){
                checkWinner("endGame")
            }, 600)
        }, 600)

    }else{
        alert("Şu anda bu tuşa basamazsınız!")
    }
}

function doubleCard(){
    if(!isGameEnd){
        if(betPrice > Number(scoreboard.innerHTML)){
            alert("Yetersiz bakiye.")
        }else{
        isGameEnd = true;

        scoreboard.innerHTML = Number(scoreboard.innerHTML) - Number(betPrice);
        betPrice += betPrice;
        sessionStorage.setItem("bakiye", Number(scoreboard.innerHTML));

            playerCardsArray.push(getRandomCard(playerCardsArray , 1, "player"));

            setTimeout(function(){
                hostCards.children[1].innerHTML = hostCardsArray[1];
                setTimeout(function(){
                    if(hostRealTotal <= 16){
                        hostCardsArray.push(getRandomCard(hostCardsArray , 1, "host"));
                        hostCards.children[2].innerHTML = hostCardsArray[3];
                    }
                    hostTotal.innerHTML = hostRealTotal;
                    checkWinner("endGame")

                },500)
            },600)
        }
        
    }else{
        alert("Şu anda bu tuşa basamazsınız!")
    }
}


function checkWinner(status){
    if(status == "inGame"){
       if(userTotal.innerHTML > 21){
            gameEnd("host")
            return true;
        }
    }else if(status == "endGame"){
        let uT = Number(userTotal.innerHTML);
        let hT = Number(hostTotal.innerHTML);

        if(hT == 21 && uT == 21){
            gameEnd("draw")
        }else if(hT > 21 && uT > 21){
            gameEnd("draw")
        }else if(hT == 21){
            gameEnd("host")
        }else if(uT == 21){
            gameEnd("player")
        }else if(hT > 21){
            gameEnd("player")
        }else if(hT > uT){
            gameEnd("host")
        }else if(uT > hT){
            gameEnd("player")
        }else if(uT == hT){
            gameEnd("draw")
        }

    }
}

function gameEnd(who){
        switch(who){
            case "player":
                isGameEnd = true;
                scoreboard.innerHTML = Number(betPrice) * 2 + Number(scoreboard.innerHTML);
                sessionStorage.setItem("bakiye", Number(scoreboard.innerHTML));

                alertF("Oyunu kazandınız!", "green")
            break;
    
            case "host":
                isGameEnd = true;

                sessionStorage.setItem("bakiye", Number(scoreboard.innerHTML));
                alertF("Oyunu kaybettiniz!", "red")
            break;

            case "draw":
                isGameEnd = true;
                scoreboard.innerHTML = Number(betPrice) + Number(scoreboard.innerHTML);
                sessionStorage.setItem("bakiye", Number(scoreboard.innerHTML));

                alertF("Oyun berabere!", "orange");
        }
    
}


function alertF(message, color, type, time = 700, info){
    let alert = document.createElement("div");
    alert.style = "opacity:0; transition:all 1s ease; position:absolute; width: 500px; height: 200px; right: 0; left: 0; top: 0; bottom: 0; margin: auto; color:white; background-color: "+color+"; padding: 10px 30px; border-radius: 10px; text-align: center; font-size: 20px; font-weight: bold; font-style: italic; z-index: 10;"
    
    alertInside = document.createElement("div");
    alertInside.style = "position:relative;"
    
    let alertText = document.createElement("p");
    if(info == "noInfo"){
        alertText.innerHTML = message;
    }else{
        alertText.innerHTML = message + "<br> Kurpiyer: "+hostRealTotal+", Siz: "+userTotal.innerHTML;

    }

    let close = document.createElement("a");
    close.style = "position: absolute; bottom: 0; left: 0; right: 0; margin: auto; color:white; background-color: red; padding: 10px; border-radius: 0px 0px 10px 10px; cursor: pointer; transition:all 0.5s ease;"

    close.innerHTML = "Tamam";
    close.onclick = function(){
        if(type == "firstOpen"){
            sessionStorage.setItem("firstOpen", true);
            sessionStorage.setItem("bakiye", 1000);
            scoreboard.innerHTML = sessionStorage.getItem("bakiye");
        }
        document.body.removeChild(alert);
        document.body.removeChild(alertBg);   
        resetGame();
    }

    let alertBg = document.createElement("div");
    alertBg.style = "opacity:0; transition:all 1s ease; position: absolute; top: 0; left: 0; right: 0; bottom: 0; background-color: rgba(0, 0, 0, 0.33); z-index:5"

    document.body.appendChild(alertBg);
    document.body.appendChild(alert);
    alert.appendChild(alertInside);
    alertInside.appendChild(alertText);
    alert.appendChild(close);

    setTimeout(function(){
        alert.style.opacity = "1";
        alertBg.style.opacity = "1";
    }, time)
}


function resetGame(){

    price.value = "";
    userCards.innerHTML = "";
    userTotal.innerHTML = 0;

    hostCards.innerHTML = "";
    hostTotal.innerHTML = 0;
    
    playerCardsArray.length = 0;;
    hostCardsArray.length = 0;;
    
    startButton.classList.remove('hidden');
    price.classList.remove('hidden');

    hostsFirsCardPicked = false;
    isGameEnd = true;
    hostRealTotal = 0;
    betPrice = 0;

    if(sessionStorage.getItem("bakiye") == 0 || sessionStorage.getItem("bakiye") < 0){
        alertF("Olamaz! Görünüşe göre bakiyeniz bitmiş. Size oynamaya devam edebilmeniz için 200TL bakiye veriyoruz. Şeytanınız bol olsun :))", "black", 0, 300 , "noInfo")
        sessionStorage.setItem("bakiye", 200);
        scoreboard.innerHTML = sessionStorage.getItem("bakiye");
    }
    
}







//bahis sayı girişi
function isNumber(evt) {
    var theEvent = evt || window.event;
  
    var key = theEvent.keyCode || theEvent.which;
    key = String.fromCharCode(key);

    var regex = /[0-9]|\./;
    if( !regex.test(key) ) {
      theEvent.returnValue = false;
      if(theEvent.preventDefault) theEvent.preventDefault();
    }
}