const connection = require('../connection');

async function getAllProducts() {
  return new Promise((resolve, reject) => {
    connection.query('CALL spGetAllProducts();', (err, response) => {

      if (err) {
        reject(err);
        return;
      }

      if (response && response[0].length) {
        resolve(response[0]);
      } else {
        resolve(false);
      }
    });
  });
}

async function getProductById(id) {
  return new Promise((resolve, reject) => {
    connection.query('CALL spGetProductById(?);', id, (err, response) => {

      if (err) {
        reject(err);
        return;
      }

      if (response && response[0].length) {
        resolve(response[0][0])
      } else {
        resolve(false);
      }
    });
  });
}

async function deleteProductById(id) {
  return new Promise((resolve, reject) => {
    connection.query('CALL spDeleteProductById(?);', id, (err, response) => {

      if (err) {
        reject(err);
        return;
      }
      resolve(response)
    });
  });
}

async function getProductsByCategory(category) {
  return new Promise((resolve, reject) => {
    connection.query('CALL spGetProductsByCategory(?);', category, (err, response) => {

      if (err) {
        reject(err);
        return;
      }

      if (response && response[0].length) {
        resolve(response[0]);
      } else {
        resolve(false);
      }
    });
  });
}

async function addProduct(data) {
  return new Promise((resolve, reject) => {
    connection.query('CAll spAddProduct(?,?,?,?,?,?,?,?,?,?);', data,(err, response) => {

      if (err) {
        reject(err);
        return;
      }
      resolve(response)
    });
  });
}

async function updateProductById(data) {
    return new Promise((resolve, reject) => {
      connection.query("CALL spUpdateProductById(?,?,?,?,?,?,?,?,?,?,?);", data, (err, response) => {

        if (err) {
          reject(err);
          return;
        }
        resolve(response);
      });
    });
}

async function getAllProductsByParams(data) {
  return new Promise((resolve, reject) => {
    connection.query("CALL spGetProductsByQueryParams(?,?,?)", data, (err, response) => {

      if (err) {
        reject(err);
        return;
      }
      
      if (response && response[0].length) {
        resolve(response[0]);
      } else {
        resolve(false);
      }
    });
  });
}

module.exports = {
  getAllProducts,
  getProductById,
  deleteProductById,
  getProductsByCategory,
  addProduct,
  updateProductById,
  getAllProductsByParams
}