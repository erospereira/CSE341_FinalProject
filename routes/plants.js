const express = require('express');
const router = express.Router();
const validation = require('../middleware/validate.js');
const plantController = require('../controllers/plant.js');
const { isAuthenticated } = require('../middleware/authenticate.js')

router.get('/', plantController.getAllPlants);

router.get('/:id', plantController.getSinglePlant);
router.post('/',isAuthenticated,validation.plant, plantController.createPlant);
router.put('/:id',isAuthenticated,validation.plant, plantController.updatePlant);
router.delete('/:id',isAuthenticated, plantController.deletePlant);

module.exports = router;
