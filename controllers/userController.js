
const { sequelize, User } = require('../models');
const { createPdf } = require('./createPdf');
const { sendSignUpMail } = require('./signUpMail')

const pdf = require("pdf-creator-node");
const fs = require("fs");

const ejs = require("ejs");

// Register Page
exports.registerPage = (req, res, next) => {
    res.render("register");
};

// User Registration
exports.register = async (req, res, next) => {

    console.log(req.body);


    try {

        const jane = await User.create({ first_name: req.body.firstName, last_name: req.body.lastName, user_email: req.body.userEmail, user_password: req.body.userPassword }).then(async () => {
            // res.render("register", {
            //     msg: 'You have successfully registered.'
            // });

            let firstName = req.body.firstName;
            let userEmail = req.body.userEmail;
            const creatingPdf = await createPdf(userEmail, firstName).then(async (result) => {

                // res.render("register", {
                //     msg: 'You have successfully registered.'
                // });

                console.log("Pdf Created");
                console.log(result);

                const sendMail = await sendSignUpMail(userEmail, firstName).then(async (result) => {

                    console.log(result);
                    res.render("register", {
                        msg: 'You have successfully registered.'
                    });

                }).catch(e => {
                    res.render("register", {
                        msg: 'You have successfully registered But Mail Not Send.'
                    });
                })

            }).catch((e) => {

                res.render("register", {
                    msg: 'You have successfully registered But Pdf Not Created.'
                });

                console.log("Error From Pdf Creating");
                console.log(e);
            })


            // console.log(creatingPdf);
        }).catch((e) => {

            console.log(e);
            return res.render('register', {
                error: 'Your registration has failed.'
            });
        })

    } catch (e) {
        console.log(e);
        next(e);
    }
};

