const left = document.querySelector(".left");
const right = document.querySelector(".right");
const left_link = document.querySelector("#left_link");
const right_link = document.querySelector("#right_link");

left.addEventListener("click",function(){
    window.location.href = "game_1/index.html";
})

right.addEventListener("click",function(){
    window.location.href = "game_2/index.html";
    
})