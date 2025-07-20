const express = require('express');
const { route } = require('./product');
const router = express.Router();

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

router.post('/',(req,res,next) => {
    res.status(200).json({
        message: 'Order has been succesfully created'
    });
});

router.delete('/:orderId', (req,res,next) => {
    const id = req.params.orderId
    
    res.status(200).json({
        message: 'Order has been succesfully deleted',
        id: id
    });
});

module.exports = router;