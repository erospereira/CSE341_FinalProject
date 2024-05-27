const express = require('express');
const router = express.Router();
const validation = require('../middleware/validate.js');
const orderController = require('../controllers/order.js');
const { isAuthenticated } = require('../middleware/authenticate.js');

router.get('/', orderController.getAllOrders);

router.get('/:id', orderController.getSingleOrder);
router.post('/', isAuthenticated, validation.order, orderController.createOrder);
router.put('/:id', isAuthenticated, validation.order, orderController.updateOrder);
router.delete('/:id', isAuthenticated, orderController.deleteOrder);

module.exports = router;
