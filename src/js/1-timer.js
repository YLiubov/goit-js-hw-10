import flatpickr from "flatpickr";
import "flatpickr/dist/flatpickr.min.css";

import iziToast from "izitoast";
import "izitoast/dist/css/iziToast.min.css";
document.addEventListener('DOMContentLoaded', () => {
  
  const datePicker = flatpickr("#datetime-picker", {
        enableTime: true,
        time_24hr: true,
        defaultDate: new Date(),
        minuteIncrement: 1,
        onClose(selectedDates) {
            const selectedDate = selectedDates[0];
            const currentDate = new Date();

            if (selectedDate <= currentDate) {
                iziToast.error({
                    title: 'Error',
                    message: 'Please choose a date in the future'
                });
                document.getElementById('start-btn').disabled = true;
            } else {
                document.getElementById('start-btn').disabled = false;
            }
        }
    });

    document.getElementById('start-btn').addEventListener('click', () => {
        const selectedDate = datePicker.selectedDates[0];

        if (!selectedDate) {
            return;
        }

        document.getElementById('datetime-picker').disabled = true;
        document.getElementById('start-btn').disabled = true;

        const interval = setInterval(() => {
            const now = new Date();
            const timeDifference = selectedDate - now;

            if (timeDifference <= 0) {
                clearInterval(interval);
                updateTimer({ days: 0, hours: 0, minutes: 0, seconds: 0 });
                document.getElementById('datetime-picker').disabled = false;
                iziToast.success({
                    title: 'Success',
                    message: 'Countdown timer has ended!'
                });
            } else {
                const time = convertMs(timeDifference);
                updateTimer(time);
            }
        }, 1000);
    });

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

    function updateTimer({ days, hours, minutes, seconds }) {
        document.querySelector('[data-days]').textContent = addLeadingZero(days);
        document.querySelector('[data-hours]').textContent = addLeadingZero(hours);
        document.querySelector('[data-minutes]').textContent = addLeadingZero(minutes);
        document.querySelector('[data-seconds]').textContent = addLeadingZero(seconds);
    }

    function addLeadingZero(value) {
        return value < 10 ? `0${value}` : value;
    }
}); 








// import flatpickr from "flatpickr";
// import "flatpickr/dist/flatpickr.min.css";

// import iziToast from "izitoast";
// import "izitoast/dist/css/iziToast.min.css";

// document.addEventListener('DOMContentLoaded', () => {
//   const datePicker = flatpickr("#datetime-picker", {
//     enableTime: true,
//     time_24hr: true,
//     defaultDate: new Date(),
//     minuteIncrement: 1,
//     onClose(selectedDates) {
//       const selectedDate = selectedDates[0];
//       const currentDate = new Date();

//       if (selectedDate <= currentDate) {
//         iziToast.error({
//           title: 'Error',
//           message: 'Please choose a date in the future'
//         });
//         document.getElementById('start-btn').disabled = true;
//       } else {
//         document.getElementById('start-btn').disabled = false;
//       }
//     }
//   });

//   document.getElementById('start-btn').addEventListener('click', () => {
//     const selectedDate = datePicker.selectedDates[0];

//     if (!selectedDate) {
//       return;
//     }

//     document.getElementById('datetime-picker').disabled = true;
//     document.getElementById('start-btn').disabled = true;

//     const interval = setInterval(() => {
//       const now = new Date();
//       const timeDifference = selectedDate - now;

//       if (timeDifference <= 0) {
//         clearInterval(interval);
//         updateTimer({ days: 0, hours: 0, minutes: 0, seconds: 0 });
//         document.getElementById('datetime-picker').disabled = false;
//         iziToast.success({
//           title: 'Success',
//           message: 'Countdown timer has ended!'
//         });
//       } else {
//         const time = convertMs(timeDifference);
//         updateTimer(time);
//       }
//     }, 1000);
//   });

//   function convertMs(ms) {
//     const second = 1000;
//     const minute = second * 60;
//     const hour = minute * 60;
//     const day = hour * 24;

//     const days = Math.floor(ms / day);
//     const hours = Math.floor((ms % day) / hour);
//     const minutes = Math.floor(((ms % day) % hour) / minute);
//     const seconds = Math.floor((((ms % day) % hour) % minute) / second);

//     return { days, hours, minutes, seconds };
//   }

//   function updateTimer({ days, hours, minutes, seconds }) {
//     document.querySelector('[data-days]').textContent = addLeadingZero(days);
//     document.querySelector('[data-hours]').textContent = addLeadingZero(hours);
//     document.querySelector('[data-minutes]').textContent = addLeadingZero(minutes);
//     document.querySelector('[data-seconds]').textContent = addLeadingZero(seconds);
//   }

//   function addLeadingZero(value) {
//     return value < 10 ? `0${value}` : value;
//   }
// });