const container = document.querySelector(".container");
const difficultty = document.getElementById("difficulty");
const butt = document.getElementById("play-button");

butt.addEventListener("click", function () {
    let diff = Number(difficultty.value);
    let total_number = diff*diff;
    let i;
    while (container.firstChild){
        container.removeChild(container.firstChild);
    }
    let table = [];
    let j=1;
    for(i=0;i<total_number;i++){
        if(i === (total_number/2)){
            j=1;
        }
        table[i]=j++;
    }
    
    for(i=0 ; i<total_number;i++){
        j = Math.floor(Math.random() * (total_number)+1);
        let temp =table[i];
        table[i]=table[j];
        table[j]=temp;
    }

    let firstCard=null;
    let secondCard=null;
    for(i=0;i<total_number;i++){
        let card = document.createElement("div");
        card.className = "card";

        let text = document.createElement("h2");
        text.className="number";
        text.textContent=table[i];
        text.style.display="none";
        card.appendChild(text);

        card.addEventListener("click",function(){
            let numberElem = this.querySelector(".number");
            numberElem.style.display="block";
            this.style.pointerEvents="none";
            if(firstCard==null){
                firstCard=this;
            }
            else{
                secondCard=this;
                checkMAtch();
            }
        });
        container.appendChild(card);

    }

    function checkMAtch() {
    let val1 = firstCard.querySelector(".number").textContent;
    let val2 = secondCard.querySelector(".number").textContent;
    if(val1 === val2){
        firstCard=null;
        secondCard==null;
    }
    else {
        setTimeout(function() {
            firstCard.querySelector(".number").style.display="none";
            secondCard.querySelector(".number").style.display="none";
            firstCard.style.pointerEvents="auto";
            secondCard.style.pointerEvents="auto";
            firstCard=null;
            secondCard=null;
        },700);
    }
}
});

