const nodemailer = require('nodemailer');
const senderInfo = require('../config/senderInfo.json');
const mailTemplateAuth = require('../views/mail_template_auth').mailTemplate;
const mailTemplate = require('../views/mail_template').mailTemplate;

const getEmailData = (to, data, form) => {
    let obj = {
        from: senderInfo.user,
        to,
    }

    if(form == "auth"){
        obj = {
            subject: " ** 기자재 대여 본인인증 이메일입니다. ** ",
            html: mailTemplateAuth(data)
        }
    }else if(form == "noti"){
        obj = {
            subject: " ** 기자재 반납 알림 이메일입니다. ** ",
            html: mailTemplate(data)
        }
    }


    return obj
}

const sendEmail = (to, data, form) => {
    return new Promise((resolve) => {


        const smtpTransport = nodemailer.createTransport({
            service: "gmail",
            auth: {
                user: senderInfo.user,
                pass: senderInfo.pass
            },
            tls: {
                rejectUnauthorized: false
            }
        });

        const mail = getEmailData(to, data, form)

        smtpTransport.sendMail(mail, function (error, res) {
            if (error) {
                console.log(error);
                
                resolve(false);
            } else {
                console.log("email sent successfully");
                
                resolve(true);
            }

            smtpTransport.close();

        })
    })
}


module.exports = { sendEmail }