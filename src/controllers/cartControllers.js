const cartHandlers = require('../database/handlersDB/cartHandlersDB');

async function getAllCartsHandler(req, res) {
  try {
    const carts = await cartHandlers.getAllCarts();
    
    if (carts && carts.length) {
      res.status(200).json(carts);
    } else {
      res.status(404).json({ error: "No carts found" });
    }
  } catch (err) {
    res.status(500).json({ error: "Internal server error" });
  }
}

async function getCartByUserIdHandler(req, res) {
  try {
    const cart = await cartHandlers.getCartByUserId(req.params.userId)
    
    if (cart) {
      res.status(200).json(cart);
    } else {
      res.status(404).json({ error: "Cart not found" });
    }
  } catch (err) {
    res.status(500).json({ error: "Internal server error" });
  }
}

module.exports = {
  getAllCartsHandler,
  getCartByUserIdHandler
}