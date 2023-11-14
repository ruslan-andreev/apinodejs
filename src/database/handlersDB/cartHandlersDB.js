const connection = require('../connection');

async function getAllCarts() {
  return new Promise((resolve, reject) => {
    connection.query("CALL spGetAllCarts();", (err, response) => {
      
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

async function getCartByUserId(id) {
  return new Promise((resolve, reject) => {
    connection.query('CALL spGetCartByUserId(?);', id, (err, response) => {
      
      if (err) {
        reject(err);
        return;
      }
      
      if (response && response[0].length) {
        resolve(response[0][0]);
      } else {
        resolve(false);
      }
    });
  })
}

module.exports = {
  getAllCarts,
  getCartByUserId
}
