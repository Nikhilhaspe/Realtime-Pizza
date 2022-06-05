// FOR MAKING REQUESTS
import axios from 'axios';
// FOR NOTIFICATIONS
import Noty from 'noty';

// ADMIN JS FILE
import { initAdmin } from './admin.js';

// CART COUNTER HANDLING
let cartCounter = document.getElementById('cart-counter');

// HANDLING ADD PIZZA TO CART USING AJAX
let addToCart = document.querySelectorAll('.add-to-cart');

function updateCart(pizza) {
    axios.post('/update-cart', pizza).then(res => {
        cartCounter.innerText = res.data.totalQty;
        // NOTY NOTIFICATIONS
        new Noty({
            text: 'Pizza Added to cart 😋',
            type: 'success',
            timeout: 1000,
            progressBar: false
        }).show();
    }).catch(err => {
        new Noty({
            text: 'Something went wrong 😢',
            type: 'error',
            timeout: 1000,
            progressBar: false
        }).show();
    });
};

addToCart.forEach((btn) => {
    btn.addEventListener('click', (e) => {
        // GETTING DATA OF THE CLCKED PIZZA USING DATA ATTRIBUTE (JSON STRING) TO JSONG OBJECT
        let pizza = JSON.parse(btn.dataset.pizza);
        updateCart(pizza);
    })
});

// REMOVE ALERT MESSAGE AFTER X SECONDS
const alertMsg = document.querySelector('#success-alert');
if (alertMsg) {
    setTimeout(() => {
        alertMsg.remove();
    }, 3000);
}

// ADMIN EVENTS
initAdmin();