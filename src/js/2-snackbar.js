import iziToast from "izitoast";
import "izitoast/dist/css/iziToast.min.css";

document.addEventListener('DOMContentLoaded', () => {
    const form = document.querySelector('.form');

    form.addEventListener('submit', async (event) => {
        event.preventDefault();

        const delayInput = document.querySelector('input[name="delay"]');
        const delay = parseInt(delayInput.value);

        const stateInput = document.querySelector('input[name="state"]:checked');
        const state = stateInput ? stateInput.value : null;

        if (!delay || !state) {
            console.error('Delay and state must be selected');
            return;
        }

        const promise = new Promise((resolve, reject) => {
            if (state === 'fulfilled') {
                setTimeout(() => {
                    resolve(delay);
                }, delay);
            } else if (state === 'rejected') {
                setTimeout(() => {
                    reject(delay);
                }, delay);
            }
        });

        try {
            const result = await promise;
            iziToast.success({ title: 'Success', message: `✅ Fulfilled promise in ${result}ms` });
        } catch (error) {
            iziToast.error({ title: 'Error', message: `❌ Rejected promise in ${error}ms` });
        }
    });
});