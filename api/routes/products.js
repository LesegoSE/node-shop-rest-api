const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');

const Product = require('../models/product');

//handling requests
router.get('/', (req, res, next) => {
    Product.find()
        .exec()
        .then(docs => {
            console.log(docs);
            if (docs.length > 0) {
                res.status(200).json(docs);
            } else {
                res.status(200).json({
                    message: 'NO RECORDS TO SHOW'
                });
            }
        })
        .catch(err => {
            console.log(err),
                res.status(500).json({
                    error: err
                });
        });

    /*
    res.status(200).json({
        message: 'Handlng GET requests to /products'
    });
    */
});

router.post('/', (req, res, next) => {

    const product = new Product({
        _id: new mongoose.Types.ObjectId(),
        name: req.body.name,
        price: req.body.price
    });
    product.save().then(result => {
        console.log(result);
        res.status(200).json({
            message: 'Handling POST requests to /products',
            createdProduct: result
        });
    })                               // saves data to the database then displays data in console
        .catch(err => {
            console.log(err);
            res.status(500).json({
                error: err
            });
        }); //displays error in console when it occurs

        /* TEST BLOCK
    res.status(200).json({
        message: 'Handling POST requests to /products',
        createdProduct: product
    });
    */
});

router.get('/:productId', (req, res, next) => {
    const id = req.params.productId;
    Product.findById(id)
        .exec()
        .then(doc => {
            console.log(doc);
            if (doc) {
                res.status(200).json(doc);
            } else {
                res.status(404).json({ message: 'No valid ID record found' });
            }
        })
        .catch(err => {
            console.log(err);
            res.status(500).json({ error: err });
        });

    /* TEST BLOCK
    if (id === '165') {
        res.status(200).json({
            message: 'Handling get request for product id: 165 ',
            id: id
        });
    } else {
        res.status(200).json({
            message: 'No id match found',
            id: id
        });
    }
    */

});

router.delete('/:productId', (req, res, next) => {
    const id = req.params.productId;
    Product.deleteOne({ _id: id })
        .exec()
        .then(result => {
            res.status(200).json(result);
        })
        .catch(err => {
            console.log(err);
            res.status(500).json({
                error: err
            });
        });
});

router.patch('/:productId', (req, res, next) => {
    const id = req.params.productId;
    const updateOps = {};

    /*
    for (const key in req.body) {
        updateOps[key] = req.body[key];
    }
    */

    for (const ops of req.body) {
        updateOps[ops.propName] = ops.value;
    }
    

    Product.updateOne({ _id: id }, { $set: updateOps })
    .exec()
    .then( result => {
        console.log(result);
        res.status(200).json(result);
    })
    .catch(err => {
        console.log(err);
        res.status(500).json({
            error : err
        });
    });
});
module.exports = router;