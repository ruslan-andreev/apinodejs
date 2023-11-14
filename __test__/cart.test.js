const cartHandlers = require('../src/database/handlersDB/cartHandlersDB');
const cartControllers = require('../src/controllers/cartControllers');

describe('cart', () => {
  it('should return a cart by id if it exists', async () => {

    cartHandlers.getCartByUserId = jest.fn().mockResolvedValue([{ "userId": 1, "product_id": 1, "quantity": 2}, {"product_id": 2, "quantity": 1}]);
    
    const req = {
      params: {
        userId: 1,
      },
    };
    const res ={
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    };

    await cartControllers.getCartByUserIdHandler(req, res);

    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.json).toHaveBeenCalledWith([{ "userId": 1, "product_id": 1, "quantity": 2}, {"product_id": 2, "quantity": 1}])
  });

  it('should return an error if the cart by user id does not exist', async () => {

    cartHandlers.getCartByUserId = jest.fn().mockResolvedValue(false);

    const req = {
      params: {
        userId: 1,
      },
    };
    res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    }

    await cartControllers.getCartByUserIdHandler(req, res);
    expect(res.status).toHaveBeenCalledWith(404);
    expect(res.json).toHaveBeenCalledWith({ error: "Cart not found" });
  });

  ('should return an error if an internal server error', async () => {
    cartHandlers.getCartByUserId = jest.fn.mockResolvedValue(new Error('Internal server error'));

    const req = {
      params: {
        userId: 1,
      },
    };
    const res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    };

    await cartControllers.getCartByUserIdHandler(req, res);
    expect(res.status).toHaveBeenCalledWith(500);
    expect(res.json).toHaveBeenCalledWith({ error: 'Internal server error' });
  });

  ('should return a list of carts if exist', async () => {
    cartHandlers.getAllCarts = jest.fn.mockResolvedValue([{"cartId":1,"userId":1,"productList":[{"title":"Product 1","quantity":2},{"title":"Product 2","quantity":1},{"title":"Product 1","quantity":2},{"title":"Product 2","quantity":1}]},
    {"cartId":2,"userId":2,"productList":[{"title":"Product 3","quantity":3},{"title":"Product 3","quantity":3}]}]);

    const req = {};
    const res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    };

    await cartControllers.getAllCartsHandler(req, res);
    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.json).toHaveBeenCalledWith([{"cartId":1,"userId":1,"productList":[{"title":"Product 1","quantity":2},{"title":"Product 2","quantity":1},{"title":"Product 1","quantity":2},{"title":"Product 2","quantity":1}]},
    {"cartId":2,"userId":2,"productList":[{"title":"Product 3","quantity":3},{"title":"Product 3","quantity":3}]}]);
  });

  ('should return an error if no carts are found', async () => {
    cartHandlers.getAllCarts = jest.fn.mockResolvedValue(false);

    const req = {};
    const res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    };

    await cartControllers.getAllCartsHandler(req, res);
    expect(res.status).toHaveBeenCalledWith(404);
    expect(res.json).toHaveBeenCalledWith({ error: "No carts found" });
  });

  ('should return an error if an internal server error', async () => {
    cartHandlers.getAllCarts = jest.fn.mockResolvedValue(new Error('Internal server error'));

    const req = {};
    const res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    };

    await cartControllers.getAllCartsHandler(req, res);
    expect(res.status).toHaveBeenCalledWith(500);
    expect(res.json).toHaveBeenCalledWith({ error: "Internal server error" })
  })
  
});