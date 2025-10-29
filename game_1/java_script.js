const container = document.querySelector(".container");
const difficultty = document.getElementById("difficulty");
const butt = document.getElementById("play-button");
const score = document.querySelector(".score");
const attempts = document.querySelector(".attempts");
const won_message = document.querySelector(".you-won");


let cpt = 0;
let number_of_tries = 0;
let scr = 0;

butt.addEventListener("click", function () {
    let diff = Number(difficultty.value);
    if (diff < 4 || diff > 8 || diff % 2 !== 0) {
        alert("Please Enter a valid difficulty (4,6, or 8).");
        return;
    }
    scr = 0;
    number_of_tries = 0;
    score.textContent = scr;
    attempts.textContent = number_of_tries;

    let total_number = diff * diff;
    let i;
    while (container.firstChild) {
        container.removeChild(container.firstChild);
    }
    let table = [];
    let j = 1;
    for (i = 0; i < total_number; i++) {
        if (i === (total_number / 2)) {
            j = 1;
        }
        table[i] = j++;
    }

    for (i = 0; i < total_number; i++) {
        j = Math.floor(Math.random() * (total_number));
        let temp = table[i];
        table[i] = table[j];
        table[j] = temp;
    }

    let firstCard = null;
    let secondCard = null;
    let locked = false;

    for (i = 0; i < total_number; i++) {
        let card = document.createElement("div");
        card.className = "card";

        let text = document.createElement("h2");
        text.className = "number";
        text.textContent = table[i];
        text.style.display = "none";
        card.appendChild(text);

        card.addEventListener("click", function () {

            if (locked === true) {
                return;
            }
            this.classList.add("flipped");

            let numberElem = this.querySelector(".number");
            numberElem.style.display = "block";
            this.style.pointerEvents = "none";
            if (firstCard == null) {
                firstCard = this;
            }
            else {
                secondCard = this;
                checkMAtch();
            }
        });
        container.appendChild(card);


    }

    function checkMAtch() {
        let val1 = firstCard.querySelector(".number").textContent;
        let val2 = secondCard.querySelector(".number").textContent;
        if (val1 === val2) {
            firstCard = null;
            secondCard = null;
            scr++;
            score.textContent = scr;
            if (scr == total_number / 2) {
                won_message.textContent = "You wonnnnn the game";
            }
        }
        else {
            locked = true;
            setTimeout(function () {
                firstCard.classList.remove("flipped");
                secondCard.classList.remove("flipped");
                firstCard.querySelector(".number").style.display = "none";
                secondCard.querySelector(".number").style.display = "none";
                firstCard.style.pointerEvents = "auto";
                secondCard.style.pointerEvents = "auto";
                firstCard = null;
                secondCard = null;
                locked = false;


            }, 700);
        }
        number_of_tries++;
        attempts.textContent = number_of_tries;
    }
});

