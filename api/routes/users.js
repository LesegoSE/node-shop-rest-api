const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const User = require('../models/user');

router.post("/signup", (req, res, next) => {
    User.find({ email: req.body.email })
        .exec()
        .then(user => {
            if (user.length >= 1) {
                return res.status(409).json({
                    message: "Email already in use"
                });
            } else {
                bcrypt.hash(req.body.password, 10, (err, hash) => { //runs if body mail doesnt match any in the database
                    if (err) {
                        return res.status(500).json({
                            error: err
                        });//runs when hashing failed
                    } else {
                        const user = new User({
                            _id: new mongoose.Types.ObjectId(),
                            email: req.body.email,
                            password: hash
                        });
                        user
                            .save()
                            .then(result => {
                                console.log(result);
                                res.status(201).json({
                                    message: 'User successfully created'
                                });
                            })
                            .catch(err => {
                                console.log(err);
                                res.status(500).json({
                                    error: err
                                });
                            });
                    }

                });
            }
        });

});

router.delete('/:userId', (req, res, next) => {
    const id = req.body.userId;
    User.deleteOne({ _id: id })
    .exec()
    .then(result => {
        //catch error when user deletes non existent records
        console.log(result);
        const response = {
            message: ' record has been successfuly deleted'
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


module.exports = router;