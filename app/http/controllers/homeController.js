const Menu = require('../../models/menu');

function homeController() {
    return {
        // GETTING AL MENU ITEMS FROM DB COLLECTION
        async index(req, res) {
            const pizzas = await Menu.find();
            res.render('home.ejs', { pizzas: pizzas });
        }
    }
};

module.exports = homeController;