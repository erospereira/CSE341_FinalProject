const express = require('express');
const router = express.Router();
const validation = require('../middleware/validate');
const gardeningSuppliesController = require('../controllers/gardeningsupplies');
const { isAuthenticated } = require('../middleware/authenticate');

router.get('/', gardeningSuppliesController.getAllSupplies);

router.get('/:id', gardeningSuppliesController.getSingleSupply);
router.post('/', isAuthenticated, validation.gerdeningSupplies, gardeningSuppliesController.createSupply);
router.put('/:id', isAuthenticated, validation.gerdeningSupplies, gardeningSuppliesController.updateSupply);
router.delete('/:id', isAuthenticated, gardeningSuppliesController.deleteSupply);

module.exports = router;
