const express = require('express');
const router = express.Router();
const validation = require('../middleware/validate.js');
const gardeningSuppliesController = require('../controllers/gardeningsupplies.js');
const { isAuthenticated } = require('../middleware/authenticate.js');

router.get('/', gardeningSuppliesController.getAllSupplies);

router.get('/:id', gardeningSuppliesController.getSingleSupply);
router.post('/', isAuthenticated, validation.supply, gardeningSuppliesController.createSupply);
router.put('/:id', isAuthenticated, validation.supply, gardeningSuppliesController.updateSupply);
router.delete('/:id', isAuthenticated, gardeningSuppliesController.deleteSupply);

module.exports = router;
