const fs = require("fs");
const nodemailer = require("nodemailer");
const ejs = require("ejs");
const path = require("path");

var transporter = nodemailer.createTransport({
    host: 'smtp.hostinger.com',
    port: 587,
    secure: false, // use SSL
    auth: {
        user: 'YourMail@xyz.com',
        pass: '123456789'
    },
    tls: {
        rejectUnauthorized: false
    }

});

module.exports.sendSignUpMail = async (userEmail, firstName) => {
    return new Promise((resolve, reject) => {

        ejs.renderFile(path.join(__dirname, "../views/mail.tamplate.ejs"), { firstName, userEmail }, function (err, data) {
            if (err) {
                console.log(err);
                reject(err);
            } else {
                var mainOptions = {
                    to: userEmail,
                    subject: 'SignUp Hello',
                    html: data
                };
                transporter.sendMail(mainOptions, function (err, info) {

                    if (err) {
                        console.log("in sending");
                        console.log(err);
                        reject(err);
                    } else {
                        console.log('Message sent: ' + info.response);
                        resolve('Message sent: ' + info.response);

                    }
                });
            }

        });

    });
}