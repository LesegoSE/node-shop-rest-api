const express = require('express');
const router = express.Router();

//handling requests
router.get('/', (req, res, next) => {
    res.status(200).json({
        message: 'Handlng GET requests to /products'
    });
});

router.post('/', (req, res, next) => {
    const product = {
        name: req.body.name,
        price: req.body.price
    };

    res.status(200).json({
        message: 'Handling POST requests to /products',
        createdProduct: product
    });
});

router.get('/:productId', (req, res, next) => {
    const id = req.params.productId;

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
});
module.exports = router;