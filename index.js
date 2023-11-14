const express = require('express');
const dotenv = require('dotenv');
const configDataBase = require('./src/database/configDataBase.js');

dotenv.config();
configDataBase();

const productsRouter = require('./src/routes/products');
const usersRouter = require('./src/routes/users.js');
const cartsRouter = require('./src/routes/carts.js');

const PORT = process.env.PORT;
const app = express();

app.use(express.json());
app.use('/api', productsRouter);
app.use('/api', usersRouter);
app.use('/api', cartsRouter);

app.listen(PORT, ()=>{
  console.log("Server is running on port 3500");
});

module.exports = app