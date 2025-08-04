const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');

const Order = require('../models/order');

//Handling requests
router.get('/', (req, res, next) => {
    res.status(200).json({
        message: 'Handling GET requests to /orders'
    });
});

router.get('/:orderId', (req, res, next) => {
    const id = req.params.orderId

    if (id === '20') {
        res.status(200).json({
            message: 'Handling GET request for order id 20',
            id: id
        });
    } else {
        res.status(200).json({
            message: 'No id match found',
            id: id
        });
    }
});

router.post('/', (req, res, next) => {
    const order = new Order({
        _id: new mongoose.Types.ObjectId(),
        quantity: req.body.quantity,
        product: req.body.productId
    });
    order
        .save()
        //.exec() //turns it to a true promise
        .then(result => {
            console.log(result);
            res.status(201).json(result);
        })
        .catch(err => {
            console.log(err);
            res.status(500).json({
                error: err
            });

        });
   
});

router.delete('/:orderId', (req, res, next) => {
    const id = req.params.orderId

    res.status(200).json({
        message: 'Order has been succesfully deleted',
        id: id
    });
});

module.exports = router;