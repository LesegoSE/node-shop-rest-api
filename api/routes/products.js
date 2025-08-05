const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');

const Product = require('../models/product');
const product = require('../models/product');
const { response } = require('../../app');

//handling requests
router.get('/', (req, res, next) => {
    Product.find()
        .select('_id name price')
        .exec()
        .then(docs => {
            const response = {
                prdctCount: docs.length,
                products: docs.map(doc => {
                    return {
                        _id: doc.id,
                        name: doc.name,
                        price: doc.price,
                        request: {
                            type: 'GET',
                            description: 'returns detailed information about product',
                            url: 'http://localhost:3000/products/' + doc._id
                        }
                    }
                })
            };
            if (docs.length > 0) {
                res.status(200).json(response);
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
        res.status(201).json({
            message: 'Succesfully created a product',
            createdProduct: {
                id: req._id,
                name: req.name,
                price: req.price,
                request: {
                    type: 'GET',
                    description: 'returns detailed information about the created product',
                    url: 'http://localhost:3000/products/' + result._id
                }
            }
        });
    })
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
        .select('_id name price')
        .exec()
        .then(doc => {
            const response = {
                id: id,
                name: doc.name,
                price: doc.price,
                request: {
                    type: 'GET',
                    description: 'returns a list of all products on the database',
                    url: 'http://localhost:3000/products/'
                }
            }
            if (doc) {
                res.status(200).json(response);
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
            const response = {
                message: id + ' record has been successfuly deleted',
                request: {
                    type: 'POST',
                    description: 'returns a list of all products in the database',
                    url: 'http://localhost:3000/products',
                    data: {
                        name: 'String',
                        price: 'Number'
                    }
                }
            }
            res.status(200).json(response);
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

    for (const ops of req.body) {
        updateOps[ops.propName] = ops.value;
    }

    Product.updateOne({ _id: id }, { $set: updateOps })
        .exec()
        .then(result => {
            //const productName = result.name;
            res.status(200).json({
                message: 'product has been successfuly updated',
                request: {
                    type: 'GET',
                    description: 'returns information about updated record',
                    url: 'http://localhost:3000/products/' + id
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
module.exports = router;