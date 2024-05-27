const express = require('express');
const router = express.Router();
const validation = require('../middleware/validate');
const orderController = require('../controllers/order');
const { isAuthenticated } = require('../middleware/authenticate');

router.get('/', orderController.getAllOrders);

router.get('/:id', orderController.getSingleOrder);
router.post('/', isAuthenticated, validation.order, orderController.createOrder);
router.put('/:id', isAuthenticated, validation.order, orderController.updateOrder);
router.delete('/:id', isAuthenticated, orderController.deleteOrder);


module.exports = router;
