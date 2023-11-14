const connection = require('../connection');

async function getAllUsers() {
  return new Promise((resolve, reject) => {
    connection.query('CALL spGetAllUsers();', (err, response) => {

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

async function getUserById(id) {
  return new Promise((resolve, reject) => {
    connection.query('CALL spGetUserById(?);', id, (err, response) => {

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

async function getUserByName(name) {
  return new Promise((resolve, reject) => {
    connection.query("CALL spGetUserByName(?);", name, (err, response) => {

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
  });
}

async function addUser(data) {
  return new Promise((resolve, reject) => {
    connection.query("CALL spAddUser(?,?,?,?);", data, (err, response) => {

      if (err) {
        reject(err);
        return;
      }
     resolve(response);
    });
  });
}


module.exports = {
  getAllUsers,
  getUserById,
  getUserByName,
  addUser
}