import axios from 'axios';

// CART COUNTER HANDLING
let cartCounter = document.getElementById('cart-counter');

// HANDLING ADD PIZZA TO CART USING AJAX
let addToCart = document.querySelectorAll('.add-to-cart');

function updateCart(pizza) {
    axios.post('/update-cart', pizza).then(res => {
        cartCounter.innerText = res.data.totalQty;
    });
};

addToCart.forEach((btn) => {
    btn.addEventListener('click', (e) => {
        // GETTING DATA OF THE CLCKED PIZZA USING DATA ATTRIBUTE (JSON STRING) TO JSONG OBJECT
        let pizza = JSON.parse(btn.dataset.pizza);
        updateCart(pizza);
    })
});