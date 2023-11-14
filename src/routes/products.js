const express = require('express');
const router = express.Router();
const { auth, adminPermission } = require('../utils/auth');
const productControllers = require('../controllers/productControllers')

/**get all products */
router.get('/products', (req, res) => {

  const { gender, category, sale } = req.query;
  
  if (gender || category || sale) {
   productControllers.getProductsByParamsHandler(req, res);
  } else {
    productControllers.getAllProductsHandler(req, res);
  }
});

/**get product by id */
router.get('/products/id/:productId', productControllers.getProductByIdHandler);

/**get products by category */
router.get('/products/category/:category', productControllers.getProductsByCategoryHandler);

/**add product  protected rout*/
router.post('/products', auth, adminPermission, (req, res, next) => {
  productControllers.addProductHandler(req, res);
})

/**update product protected rout */
router.put('/products/id/:productId', auth, adminPermission, (req, res, next) => {
  productControllers.updateProductByIdHandler(req, res);
});

/**delete product by id */
router.delete('/products/id/:productId', auth, adminPermission, (req, res, next) => {
  productControllers.deleteProductByIdHandler(req, res);
});

module.exports = router;