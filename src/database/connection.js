const mysql = require('mysql2');

const connection = mysql.createConnection({
  host: 'mysql-container',
  user: process.env.MYSQL_USER,
  password: process.env.MYSQL_ROOT_PASSWORD,
  database: process.env.MYSQL_DATABASE,
  multipleStatements: true
});

module.exports = connection;
