const homeController = require('../app/http/controllers/homeController');
const authController = require('../app/http/controllers/authController');
const cartController = require('../app/http/controllers/customers/cartController');
const guest = require('../app/http/middlewares/guest');

function initRoutes(app) {
    // ROUTES
    app.get('/', homeController().index);

    app.get('/login', guest, authController().login);

    app.get('/register', guest, authController().register);

    app.get('/cart', cartController().index);

    app.post('/update-cart', cartController().update);

    // AUTHENTICATION
    app.post('/register', authController().postRegister);

    app.post('/login', authController().postLogin);

    app.post('/logout', authController().logout);
};

module.exports = initRoutes;