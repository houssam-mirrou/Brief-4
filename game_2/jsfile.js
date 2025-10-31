const button = document.querySelector(".button");
const timer = document.querySelector(".timer");
const accuracy = document.querySelector(".accuracy");
const timer_input = document.querySelector("#timer_input");
const text_holder = document.querySelector("#text_holder");
const textarea_container = document.querySelector(".textarea-container");
const wpm = document.querySelector(".wpm");
const errors = document.querySelector(".errors");


text_holder.style.height = "30vh";

let wpm_value = 0;
let accuracy_value = 0;
let span_arr = new Array();
let number_of_words = 0;
let error_number = 0;
let string = "";
let k = 0;

function reset_the_game() {
    string = "";
    span_arr = [];
    while (text_holder.firstChild) {
        text_holder.removeChild(text_holder.firstChild);
    }
    text_holder.setAttribute("tabindex", "0");
    text_holder.focus();
    timer.textContent = "";
    text_holder.style.height = "auto";
}

function createSpans(text) {
    for (let i = 0; i < text.length; i++) {
        let span = document.createElement("span");
        span.textContent = text[i];
        span.style.opacity = 0.7;
        span_arr.push(span);
        text_holder.appendChild(span);
    }
}

function key_pressed(event) {
    if (event.key == 'Backspace') {

        if (k > 0) {
            k--;
            span_arr[k].style.color = "white";
            span_arr[k].style.opacity = 0.7;
            string = string.slice(0, -1);
        }
        return;
    }
    if (event.key == span_arr[k].textContent) {
        span_arr[k].style.color = "green";
        span_arr[k].style.opacity = 1;
        string = string + event.key;
        k++;
    }
    else if (event.key == 'CapsLock' || event.key == 'Tab' || event.key == 'Control' || event.key == 'Alt') {
        return;
    }
    else {
        error_number++;
        span_arr[k].style.color = "red";
        span_arr[k].style.opacity = 1;
        string = string + event.key;
        k++;
    }
}

function start_timer() {
    let timeleft = Number(timer_input.value);
    timeleft--;
    button.disabled = true;
    function updateTimer() {
        let min = Math.floor(timeleft / 60);
        let sec = timeleft % 60;
        if (timeleft <= 0) {
            clearInterval(timerInterval);
            timer.textContent = "Time's up";
            button.disabled = false;
            text_holder.removeAttribute("tabindex");
            accuracy_value = 0;
            for (let j = 0; j < span_arr.length; j++) {
                if (span_arr[j].style.color == "green") {
                    accuracy_value++;
                }
            }
            accuracy_value = (accuracy_value * 100) / span_arr.length;
            accuracy.textContent = accuracy_value.toFixed(2) + "%";
            let string_arr = string.split(/\s+/);
            wpm_value = string_arr.length;
            wpm.textContent = wpm_value;
            errors.textContent = error_number;

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
    k = 0;
}

button.addEventListener("click", function () {
    reset_the_game();
    fetch("text.txt")
        .then(function (response) {
            return response.text();
        })
        .then(function (data) {
            text = data;
            createSpans(text);
            text_holder.addEventListener("keydown", key_pressed);
        })
        .catch(function (err) {
            console.error(err);
        });

    start_timer();

});

