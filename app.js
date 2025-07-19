const express = require('express');
const app = express();

const productRouter = require('./api/routes/product');

app.use('/products', productRouter);

module.exports = app;