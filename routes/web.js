const homeController = require('../app/http/controllers/homeController');
const authController = require('../app/http/controllers/authController');
const cartController = require('../app/http/controllers/customers/cartController');
const orderController = require('../app/http/controllers/customers/orderController');
const AdminOrderController = require('../app/http/controllers/admin/orderController');

// MIDDLEWARES
const guest = require('../app/http/middlewares/guest');
const auth = require('../app/http/middlewares/auth');
const admin = require('../app/http/middlewares/admin')

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

    // ORDERS
    app.post('/orders', auth, orderController().store);

    // CUSTOMERS ROUTES
    app.get('/customer/orders', auth, orderController().index);

    // ADMIN ROUTES
    app.get('/admin/orders', admin, AdminOrderController().index);
};

module.exports = initRoutes;