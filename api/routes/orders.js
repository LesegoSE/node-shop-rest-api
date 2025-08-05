const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');

const Order = require('../models/order');
const { request } = require('../../app');


//Handling requests
router.get('/', (req, res, next) => {
    Order.find()
    .select('_id product quantity')
    .exec()
    .then(docs => {
        const response = {
            ordCount: docs.length,
            orders: docs.map(doc => {
                return {
                    _id: doc.id,
                    product: doc.productId,
                    quantity: doc.quantity,
                    request: {
                        type: 'Get',
                        description: 'returns detailed information about this order',
                        url: 'http://localhost:3000/orders/'+ doc._id
                    }
                }
            })
        }
        if (docs.length > 0) {
            res.status(200).json(response)    
        } else {
            res.status(200).json({
                message: 'NO RECORDS TO SHOW'
            })
        }
    })
    .catch( err => {
        console.log(err),
        res.status(500).json({
           error: err 
        })
    })
});

router.get('/:orderId', (req, res, next) => {
    const id = req.params.orderId

    Order.findById(id)
    .select('_id product quantity')
    .exec()
    .then(doc => {
        const response = {
            id: id,
            product: doc.productId,
            quantity: doc.quantity,
            request: {
                type: 'Get',
                description: 'returns a list of all orders in the database',
                url: 'http://localhost:3000/orders'
            }
        }
        if (doc) {
            res.status(200).json(response);
        } else {
            res.status(404).json({
                message: 'No valid ID record found'
            });
        }
    })
    .catch(err => {
        console.log(err);
        res.status(500).json({
            error: err
        })
    })
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
            res.status(201).json({
                message: 'Successfully created an order',
                createdOrder: {
                    id: req._id,
                    product: req.productId,
                    quantity: req.quantity,
                    request: {
                        type: 'Get',
                        description: 'returns detailed information about the created order',
                        url: 'http://localhost:3000/orders/' + result._id
                    }
                }
            });
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