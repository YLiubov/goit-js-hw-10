import flatpickr from "flatpickr";
import "flatpickr/dist/flatpickr.min.css";

import iziToast from "izitoast";
import "izitoast/dist/css/iziToast.min.css";


const startBtn = document.querySelector("button[data-start]");
const inputEl = document.querySelector('input[type="text"]');

const timerRefs = {
    days: document.querySelector("span[data-days]"),
    hours: document.querySelector("span[data-hours]"),
    minutes: document.querySelector("span[data-minutes]"),
    seconds: document.querySelector("span[data-seconds]"),
};

let userSelectedDate;
startBtn.disabled = true;


const options = {
    enableTime: true,
    time_24hr: true,
    defaultDate: new Date(),
    minuteIncrement: 1,

    onClose(selectedDates) {
        userSelectedDate = selectedDates[0]
      if (userSelectedDate < Date.now()) {
        iziToast.error({
            message: 'Please choose a date in the future',
            position: 'topRight',
        });
    } else {
        startBtn.disabled = false;
    }
    },
  };

  flatpickr(inputEl, options);

  
function convertMs(ms) {
    
    const second = 1000;
    const minute = second * 60;
    const hour = minute * 60;
    const day = hour * 24;

    const days = Math.floor(ms / day);
    const hours = Math.floor((ms % day) / hour);
    const minutes = Math.floor(((ms % day) % hour) / minute);
    const seconds = Math.floor((((ms % day) % hour) % minute) / second);
  
    return { days, hours, minutes, seconds };
  }


function pad(value) {
    return String(value).padStart(2, "0");
}


startBtn.addEventListener('click', handleClick)

function handleClick () {
    startBtn.disabled = true;
    inputEl.disabled = true;

    let timerId = setInterval(() => {
        const countDown = userSelectedDate -  Date.now()

        if(countDown < 0) {
            clearInterval(timerId);
            inputEl.disabled = false;
            return;
        }

        updateTimer(convertMs(countDown))
    },
    1000)
}


function updateTimer ({days, hours, minutes, seconds}) {
    console.log(timerRefs);
    timerRefs.days.textContent = pad(days);
    timerRefs.hours.textContent = pad(hours);
    timerRefs.minutes.textContent = pad(minutes);
    timerRefs.seconds.textContent = pad(seconds);
}