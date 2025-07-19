const express = require('express');
const app = express();

app.use((req, res, next) => {
    res.status(200).json({
        message: 'It is working poi, keep learning. :)'
    });
});

module.exports = app;