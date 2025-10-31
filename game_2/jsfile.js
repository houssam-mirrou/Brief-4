const button = document.querySelector(".button");
const text_area = document.querySelector("#textarea");
const timer = document.querySelector(".timer");
const best_time = document.querySelector(".best_time");
const timer_input = document.querySelector("#timer_input");
const text_holder = document.querySelector("#text_holder");

button.addEventListener("click", function () {
    let text = "";

    fetch("text.txt")
        .then(function (response) {
            return response.text();
        })
        .then(function (data) {
            text = data;
            text_holder.textContent = text;
            text_area.addEventListener("input", function () {
                const text_value = text_area.value.trim();

                //contains all the word written in the textarea
                const words = text_value.split(/\s+/).filter(Boolean);
 
                //contains the last word in the text area written
                const lastWord = words[words.length - 1];
                const text_holder_words = text_holder.textContent.split(/\s+/).filter(Boolean);
                let i=0;
                for(let word of words){
                    if(text_holder_words[i] == lastWord){
                        console.log("equal");
                        console.log(lastWord);
                        text_area.style.color = "green";
                    }
                    else {
                        text_area.style.color = "red";
                    }
                    i++;
                }
            })



        })
        .catch(function (err) {
            console.error(err);
        });
    let timeleft = Number(timer_input.value);
    button.disabled = true;
    function updateTimer() {
        let min = Math.floor(timeleft / 60);
        let sec = timeleft % 60;
        if (timeleft <= 0) {
            clearInterval(timerInterval);
            timer.textContent = "Time's up";
            button.disabled = false;
        } else if (min <= 0) {
            if (sec < 10) {
                timer.textContent = "0" + sec;
            }
            else {
                timer.textContent = sec;
            }
        } else {
            if (sec < 10) {
                timer.textContent = min + " : 0" + sec;
            }
            else {
                timer.textContent = min + " : " + sec;
            }
        }
        timeleft--;
    }
    const timerInterval = setInterval(updateTimer, 1000);




});

