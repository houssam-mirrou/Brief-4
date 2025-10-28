const container = document.querySelector(".container");
const difficultty = document.getElementById("difficulty");
const butt = document.getElementById("play-button");
const card = document.getElementById("card");


butt.addEventListener("click", function () {
    let diff = Number(difficultty.value);
    console.log(typeof diff);
    let cpt = 1;
    while (container.firstChild) {
        container.removeChild(container.firstChild);
    }

    let list = new Array(diff * diff);
    let k = diff * diff;

    for (let i = 0; i < k; i++) {
        let card = document.createElement("div");
        if (i == k / 2) {
            cpt = 1;
        }
        card.setAttribute("class", "card");
        let text = document.createElement("h2");
        text.setAttribute("class", "number");
        text.textContent = cpt++;
        card.appendChild(text);
        list[i] = card;
    }
    for (let i = 0; i < (diff * diff); i++) {
        let j = (Math.floor(Math.random() * (diff * diff)));
        let temp = list[i];
        list[i] = list[j];
        list[j] = temp;
    }

    let number_1 = 1;
    let number_2;
    let number_3;

    for (let i = 0; i < (diff * diff); i++) {
        list[i].addEventListener("click", function () {
            if (number_1 % 2 === 0) {
                let val1 = list[i].querySelector(".number").textContent.replace("card turned ", "");
                let val2 = list[number_2].querySelector(".number").textContent.replace("card turned ", "");
                if (val1 !== val2) {
                    let trim = list[number_2].textContent;
                    trim = trim.substring(12, (list[number_2].textContent.length));
                    list[number_2].textContent = trim;
                    console.log("not-equals");

                }
                else if (("card turned " + list[i].textContent) === (list[number_2].textContent)) {
                    list[i].textContent = "card turned " + list[i].textContent;
                    console.log("equals");

                }
            }
            else {
                turn_card(list[i], list[i].textContent);
                number_2 = i;
            }

            number_1++;
        })
    }

    for (let card of list) {
        container.append(card);
    }
});


function turn_card(item, i) {
    item.innerHTML = "";
    let text = document.createElement("h2");
    text.setAttribute("class", "number");
    text.textContent = "card turned " + i;
    item.appendChild(text);
}