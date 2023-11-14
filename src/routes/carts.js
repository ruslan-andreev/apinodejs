const express = require('express');
const router = express.Router();
const cartControllers = require('../controllers/cartControllers');

/**get all carts */
router.get('/carts', cartControllers.getAllCartsHandler);

/**get cart by userId */
router.get('/carts/id/:userId', cartControllers.getCartByUserIdHandler);

module.exports = router;