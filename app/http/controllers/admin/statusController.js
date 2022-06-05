const Order = require('../../../models/order');

function statusController() {
    return {
        update(req, res) {
            Order.updateOne({ _id: req.body.orderId }, { status: req.body.status }, (err, data) => {
                if (err) {
                    console.log('Error in updating pizza status', err);
                    return res.redirect('/admin/orders');
                }
                // USE SOCKETS FOR REAL TIME COMMUNICATION
                const eventEmitter = req.app.get('eventEmitter');
                eventEmitter.emit('orderUpdated', { id: req.body.orderId, status: req.body.status });
                return res.redirect('/admin/orders');
            });
        }
    }
}

module.exports = statusController;