import nodemailer from 'nodemailer';
import {google} from 'googleapis'

const OAuth2 = google.auth.OAuth2;

const clientId = '899239921927-apn73rb7i58e6k9gt5c9t5b2nemb033d.apps.googleusercontent.com';
const clientSecret = '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';
const refreshToken = '1//04vEE1Km4R9pbCgYIARAAGAQSNwF-L9Iraicphe9i90RHTbqSIwXsZUzZ235jT1DLLgxFxQd_HbRXcSFgeVSOVM64nKbGoVzY2yQ';
const accessToken = 'ya29.A0ARrdaM_J-IW8JRHcZav0HTYFc0g9KQbJY10DhmV7O34xPv8iyuqqQuNnY-zKrOV7O8BYP4PrU5ekQYx6zLS-rA2uuIqceeNx9lnvtRXMzgFfPWWQeQEasO8gCAC708cIBObhzuvsrt4i8zI4MdbjJ9s2xtt1';

export default (mailTo, subject, title, text) => {

    const oauth2Client = new OAuth2(
        clientId, clientSecret, "https://developers.google.com/oauthplayground"
    )
    
    oauth2Client.setCredentials({
        refresh_token: refreshToken,
    });

   console.log(mailTo, subject, title, text);           
        
    const transporter = nodemailer.createTransport({
        service: "gmail",
        auth: {
            type: "OAuth2",
            user: "arthur.llorens@3wa.io",
            clientId: clientId, // client Id
            clientSecret: clientSecret, // client secret
            refreshToken: refreshToken,
            accessToken: accessToken,
        },
    })

    const mailOptions = { 
        from: '"Commersaas" <commersaas@gmail.com>', // sender address
        to: mailTo, // list of receivers
        subject: subject, // Subject line
        text: "", // plain text body
        html: "<b>" + title + "</b><p>" + text + "<p>", // html body
    };

    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            console.log("ça rate");
            return console.log(error);
        }
        console.log("Message %s sent: %s", info.messageId, info.response);
    });

    
}