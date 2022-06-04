function cartController() {
    return {
        index(req, res) {
            res.render('customers/cart.ejs');
        }
    }
}

module.exports = cartController;