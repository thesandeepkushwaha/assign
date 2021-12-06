const pdf = require("pdf-creator-node");
const fs = require("fs");
const path = require('path');

const ejs = require("ejs");


const options = {
    format: "A3",
    orientation: "portrait",
    border: "10mm",
    header: {
        height: "45mm",
        contents: '<div style="text-align: center;">SignUp Details</div>'
    },
    footer: {
        height: "28mm",
        contents: {
            first: 'Cover page',
            2: 'Second page', // Any page number is working. 1-based index
            default: '<span style="color: #444;">{{page}}</span>/<span>{{pages}}</span>', // fallback value
            last: 'Last Page'
        }
    }
};

module.exports.createPdf = async (userEmail, firstName) => {
    return new Promise((resolve, reject) => {


        ejs.renderFile(path.join(__dirname, "../views/mail.tamplate.ejs"), { firstName, userEmail }, function (err, htmlData) {


            if (err) {
                console.log(err);
                reject(err);
            } else {

                const document = {
                    html: htmlData,
                    data: {
                    },
                    path: path.join(__dirname, "../pdf/" + userEmail + ".pdf"),
                    type: "",
                };

                pdf
                    .create(document, options)
                    .then(() => {
                        resolve('Pdf Created!');
                    })
                    .catch((error) => {
                        reject(error);
                    });

            }

        });

    });
}
