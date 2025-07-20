const express = require('express');
const app = express();
const morgan = require('morgan');
const bodyParser = require('body-parser');

const productRouter = require('./api/routes/product');
const orderRouter = require('./api/routes/orders');

app.use(morgan('dev')); //Handles request logging
app.use(bodyParser.urlencoded({extended: false})); //Handles body data
app.use(bodyParser.json()); //Extracts json data in a easy to read format

//Handles  requests to api
app.use('/products', productRouter);
app.use('/orders', orderRouter);

//Handles all errors that occure with the api's
app.use((req,res,next) => {
    const error = new Error('Not found');
    error.status = 404;
    next(error);
});

//Handles all errors that occure at any instance
app.use((error,req,res,next) => {
    res.status(error.status || 500)
    res.json({
        error: {
            message: error.message
        }
    });
});

module.exports = app;