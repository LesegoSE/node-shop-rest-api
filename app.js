const express = require('express');
const app = express();
const morgan = require('morgan');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

const productRouter = require('./api/routes/products');
const orderRouter = require('./api/routes/orders');

/*mongoose.connect('mongodb+srv://admin:' + process.env.MONGO_ATLAS_NODE_SHOP_PW + '@node-shop.nqvytnp.mongodb.net/?retryWrites=true&w=majority&appName=node-shop',
    {
        useMongoClient : true
    }
);//connection string to MongoDB database
*/

mongoose.connect('mongodb+srv://admin:' + process.env.MONGO_ATLAS_NODE_SHOP_PW + '@node-shop.nqvytnp.mongodb.net/?retryWrites=true&w=majority&appName=node-shop');
mongoose.Promise = global.Promise;

app.use(morgan('dev')); //Handles request logging
app.use('/uploads',express.static('uploads')) //sets uploads folder to be publicly accessible
app.use(bodyParser.urlencoded({ extended: false })); //Handles body data
app.use(bodyParser.json()); //Extracts json data in a easy to read format

//Prevents CORS errors
app.use((req, res, next) => {
    res.header('Acces-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization');
    if (req.method === 'OPTIONS') {
        res.header('Access-Control-Allow-Methods', 'PUT,POST,PATCH,DELETE,GET');
        return res.status(200).json({});
    }
    next();
});

//Handles  requests to api
app.use('/products', productRouter);
app.use('/orders', orderRouter);

//Handles all errors that occure with the api's
app.use((req, res, next) => {
    const error = new Error('Not found');
    error.status = 404;
    next(error);
});

//Handles all errors that occure at any instance
app.use((error, req, res, next) => {
    res.status(error.status || 500)
    res.json({
        error: {
            message: error.message
        }
    });
});

module.exports = app;