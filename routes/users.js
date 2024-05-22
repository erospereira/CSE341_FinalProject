const express = require('express');
const router = express.Router();
const validation = require('../middleware/validate');
const userController = require('../controllers/user');
const { isAuthenticated } = require('../middleware/authenticate')

router.get('/', userController.getAllUsers);

router.get('/:id', userController.getSingleUser);
router.post('/',isAuthenticated,validation.user, userController.createUser);
router.put('/:id',isAuthenticated,validation.user, userController.updateUser);
router.delete('/:id', isAuthenticated,userController.deleteUser);

module.exports = router;
