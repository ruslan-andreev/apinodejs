const fs = require('fs');
const connection = require('./connection');

function configDataBase() {
  let schemaDataBase = null;

  fs.readFile('./src/database/schema/storeDatabase.sql', 'utf-8', (err, data) => {

    if (err) {
      console.log('Error on reading schemaDataBase file:', err);
    } 
    
    schemaDataBase = data;

    connection.query(schemaDataBase, (err) => {
      if (err) {
        console.log('Error on query schema for database:', err);
        return;
      }
      console.log('Database schema created success');
    });
  });
  
}

module.exports = configDataBase;