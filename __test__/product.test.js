const productHandlers = require('../src/database/handlersDB/productHandlersDB');
const productControllers = require('../src/controllers/productControllers');

describe('product', () => {
    it('should return a list of products if exist', async () => {
      productHandlers.getAllProducts = jest.fn().mockResolvedValue([{productId: 1},{productId: 2},{productId: 3}])

      const req = {};
      const res = {
       status: jest.fn().mockReturnThis(),
       json: jest.fn(),
      }

      await productControllers.getAllProductsHandler(req, res);
      expect(res.status).toHaveBeenCalledWith(200);
      expect(res.json).toHaveBeenCalledWith([{productId: 1},{productId: 2},{productId: 3}]);
    })

   it('should return an error if no products are found', async () => {
     productHandlers.getAllProducts = jest.fn().mockResolvedValue([]);

     const req = {};
     const res = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn(),
     }

     await productControllers.getAllProductsHandler(req, res);
     expect(res.status).toHaveBeenCalledWith(404);
     expect(res.json).toHaveBeenCalledWith({ error: "No products found" });

   })

  it('should return an error if an internal server error', async () => {
    productHandlers.getAllProducts = jest.fn().mockRejectedValue(new Error('Internal server error'));

    const req = {};
    const res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    }

   await productControllers.getAllProductsHandler(req, res);
   expect(res.status).toHaveBeenCalledWith(500);
   expect(res.json).toHaveBeenCalledWith({ error: "Internal server error" });

  })

  it('should return a product by id if it exists', async () => {
    
    productHandlers.getProductById = jest.fn().mockResolvedValue({ id: 1, titel: "product 1" });

    const req = {
      params: {
        productId: 1,
      },
    };
    const res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    };

    await productControllers.getProductByIdHandler(req, res);

    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.json).toHaveBeenCalledWith({ id: 1, titel: "product 1" });
  });

  it('should return an error if the product id does not exist', async () => {
  
    productHandlers.getProductById = jest.fn().mockResolvedValue(false);

    const req = {
      params: {
        productId: 1,
      },
    };
    const res = {
        status: jest.fn().mockReturnThis(),
    json: jest.fn(),
    };

    await productControllers.getProductByIdHandler(req, res);

    expect(res.status).toHaveBeenCalledWith(404);
    expect(res.json).toHaveBeenCalledWith({ error: "Product not found" });
  });

  it('should return an error if an internal server error', async () => {
  
    productHandlers.getProductById = jest.fn().mockRejectedValue(new Error('Internal server error'));

    const req = {
      params: {
        productId: 1,
      },
    };
    const res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    };

    await productControllers.getProductByIdHandler(req, res);

    expect(res.status).toHaveBeenCalledWith(500);
    expect(res.json).toHaveBeenCalledWith({ error: 'Internal server error' });
  });

  it('should return message: "Product deleted" ', async () => {
    productHandlers.deleteProductById = jest.fn().mockResolvedValue({});

    const req = {
      params: {
        prodictId: 1,
      },
    };
    const res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    };

    await productControllers.deleteProductByIdHandler(req, res);
    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.json).toHaveBeenCalledWith({ message: "Product deleted" });
  })

  it('should return an error if an internal server error', async () => {
     productHandlers.deleteProductById = jest.fn().mockRejectedValue(new Error('Internal server error'));

     const req = {
      params: {
        prodictId: 1,
      },
    };
    const res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    };

    await productControllers.deleteProductByIdHandler(req, res);
    expect(res.status).toHaveBeenCalledWith(500);
    expect(res.json).toHaveBeenCalledWith({ error: 'Internal server error' });

  })

  it('should return a list of products by category', async () => {
    productHandlers.getProductsByCategory = jest.fn().mockResolvedValue([{productId: 1, category: "shirt"},{productId: 2 ,category: "shirt"},{productId: 3, category: "shirt"}])

      const req = {
        params: {
          category: "shirt",
        },
      };
      const res = {
       status: jest.fn().mockReturnThis(),
       json: jest.fn(),
      }

      await productControllers.getProductsByCategoryHandler(req, res);
      expect(res.status).toHaveBeenCalledWith(200);
      expect(res.json).toHaveBeenCalledWith([{productId: 1, category: "shirt"},{productId: 2 ,category: "shirt"},{productId: 3, category: "shirt"}]);
  })

  it('should return an error message if the product id does not exist with category', async () => {
    productHandlers.getProductsByCategory = jest.fn().mockResolvedValue(false);

    const req = {
      params: {
        category: "skirt",
      },
    };
    const res = {
     status: jest.fn().mockReturnThis(),
     json: jest.fn(),
    }

    await productControllers.getProductsByCategoryHandler(req, res);
    expect(res.status).toHaveBeenCalledWith(404);
    expect(res.json).toHaveBeenCalledWith({ error: "No products found" });
  })

  it('should return an error if an internal server error', async () => {
    productHandlers.getProductsByCategory = jest.fn().mockRejectedValue(new Error("Internal server error"));

    const req = {
      params: {
        category: "shoes",
      },
    };
    const res = {
     status: jest.fn().mockReturnThis(),
     json: jest.fn(),
    }

    await productControllers.getProductsByCategoryHandler(req, res);
    expect(res.status).toHaveBeenCalledWith(500);
    expect(res.json).toHaveBeenCalledWith({ error: "Internal server error" });
  })

});