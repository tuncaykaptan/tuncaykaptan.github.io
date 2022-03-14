function load(){
    setTimeout(loading, 2000);
    document.getElementById("linkler").style.display = "none";
}

function loading(){
    document.getElementById("loading").style.display = "none";
    document.getElementById("linkler").style.display = "block";
    console.log("ok!")
}

document.getElementById("discord").addEventListener("click", dc());

function dc() {
    document.getElementById("iframe").src = "https://github.com/tuncaykaptan"
}