"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var bodyParser = require("body-parser");
var cors = require("cors");
var express = require("express");
var nodemailer = require("nodemailer");
// const PORT = process.env.PORT || 8080;
var app = express();
app.use(cors());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
// app.use(bodyParser.urlencoded({ extended: true }));
// app.use(bodyParser.json());
var transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: 'james.p.development@gmail.com',
        pass: 'testpassword225',
    },
});
app.post('/sendMail', function (req, res) {
    var email = req.body.email;
    var message = req.body.body;
    var mailOptions = {
        from: 'james.p.development@gmail.com',
        to: 'jamesmoore255@gmail.com',
        subject: "A new enquiry from " + email + "!",
        html: "<p>" + message + "</p>" // plain text body
    };
    try {
        var sending = transporter.sendMail(mailOptions);
        console.log("Email sent to " + email);
        return res.json({
            status: 200,
            message: "Email sent to: " + email,
        });
    }
    catch (e) {
        console.log("Error: " + e);
        return res.json({
            status: 400,
            message: "Something went wrong, " + e,
        });
    }
});
app.listen(8080, function () {
    console.log("App running on localhost:8080");
});
