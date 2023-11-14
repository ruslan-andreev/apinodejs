const productHandlers = require('../database/handlersDB/productHandlersDB');

async function getAllProductsHandler(req, res) {

  try {
    const products = await productHandlers.getAllProducts();

    if (products && products.length) {
      res.status(200).json(products);
    } else {
      res.status(404).json({ error: "No products found" });
    }
  } catch (err) {
    res.status(500).json({ error: "Internal server error" });
  }
}

async function getProductByIdHandler(req, res) {

  try {
    const product = await productHandlers.getProductById(req.params.productId);

    if (product) {
      res.status(200).json(product);
    } else {
      res.status(404).json({ error: "Product not found" });
    }
  } catch (err) {
    res.status(500).json({ error: "Internal server error" });
  }
}

async function deleteProductByIdHandler(req, res) {
  
  try {
    const serverResponse = await productHandlers.deleteProductById(req.params.productId);

    if(serverResponse) {
      res.status(200).json({ message: "Product deleted" })
    }
  } catch (err) {
    res.status(500).json({ error: "Internal server error" });
  }
}

async function getProductsByCategoryHandler(req, res) {

  try {
    const products = await productHandlers.getProductsByCategory(req.params.category);

    if (products && products.length) {
      res.status(200).json(products);
    } else {
      res.status(404).json({ error: "No products found" });
    }
  } catch (err) {
    res.status(500).json({ error: "Internal server error" });
  }
}

async function addProductHandler(req, res) {
  
  let{ title, price, gender, description, size, color, category, image, sale, quantity } = req.body;

  if (title && price && gender && description && size && color && category && image && sale && quantity) {
    res.status(422).json({ message: "Wrong data information" });
    return;
  }

  try {
    const response = await productHandlers.addProduct([title, price, gender, description, size, color, category, image, sale, quantity]);

    if (response) {
      res.status(201).json({ massage: "Product created" })
    }
  } catch (err) {
    res.status(500).json({ error: "Internal server error" });
  }
}

async function updateProductByIdHandler(req, res) {
  let id = req.params.productId;
  let{ title, price, gender, description, size, color, category, image, sale, quantity } = req.body;

  if (id && title && price && gender && description && size && color && category && image && sale && quantity) {
    res.status(422).json({ message: "Wrong data information" });
    return;
  }

  try {
    const response = await productHandlers.updateProductById([id, title, price, gender, description, size, color, category, image, sale, quantity]);

    if (response && response.affectedRows) {
      res.status(201).json({ massage: "Product updated success" });
    }
  } catch (err) {
    res.status(500).json({ error: "Internal server error" });
  }
}

async function getProductsByParamsHandler(req, res) {
  let {gender = null, category = null, sale = null} = req.query; 

  if (sale) {
    sale = JSON.parse(sale);
  }
  
  try {
    const response = await productHandlers.getAllProductsByParams([gender, category, sale]);

    if (response && response.length) {
      res.status(200).json(response)
    } else {
      res.status(404).json({ error: "No products found" });
    }
  } catch (err) {
      res.status(500).json({ error: "Internal server error" });
  }
}

module.exports = {
  getAllProductsHandler,
  getProductByIdHandler,
  deleteProductByIdHandler,
  getProductsByCategoryHandler,
  addProductHandler,
  updateProductByIdHandler,
  getProductsByParamsHandler
}