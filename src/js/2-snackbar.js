import iziToast from "izitoast";
import "izitoast/dist/css/iziToast.min.css";

const formEl = document.querySelector(".form");

formEl.addEventListener('submit', handleSubmit);

function handleSubmit (event) {
    event.preventDefault();
    const delay = Number(formEl.delay.value);
   
const promise = new Promise((resolve, reject) => {
            if (formEl.state.value === "fulfilled") {
                setTimeout(() => {
                    resolve(delay);
                }, delay)   
            } else {
                setTimeout(() => {
                    reject(delay);
                }, delay)
            }
    });

    promise
    .then(delay => 
        iziToast.success({
            title: 'OK',
            message: `✅ Fulfilled promise in ${delay}ms`
            ,
            position: "topRight",
            close: false,
            progressBar: false,
        })
        )
    .catch(delay =>
            iziToast.error({
            title: 'Error',
            message: `❌ Rejected promise in ${delay}ms`
            ,
            position: "topRight",
            close: false,
        })
    )
   event.currentTarget.reset()
 }
