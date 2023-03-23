const nodemailer = require("nodemailer");
const ErrorResult = require("../results/error_result");
const SuccessResult = require("../results/success_result");
require('dotenv').config()

class MailAdapter{
    constructor(){
        this.transporter = nodemailer.createTransport({
            service:"gmail",
            auth:{
                user: process.env.EMAIL_USER,
                pass: process.env.EMAIL_PASS
            }
        });

        this.mailOptions = {
            from: process.env.EMAIL_USER,
            to: process.env.EMAIL_TO,
            subject:"",
            text:""
        };
    }


    sendEmail(subject, message){
        this.mailOptions.subject = subject;
        this.mailOptions.text = message;
        return new Promise((resolve, reject) => {
            this.transporter.sendMail(this.mailOptions, (error, info)=>{
                if(error) resolve(new ErrorResult(error));
                else resolve(new SuccessResult(info.response));
            })
        })
    }
}

module.exports = MailAdapter;