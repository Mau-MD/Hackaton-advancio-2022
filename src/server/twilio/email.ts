// import sgMail from './sendgrid'
const sgMail = require('@sendgrid/mail');
sgMail.setApiKey(process.env.SENDGRID_API_KEY);

const sendEmail = (to_email: string) => {
    let msg = {
        to: to_email,
        from: 'oscar.encinas@cetys.edu.mx',
        subject: 'Sending with SendGrid is Fun',
        text: 'and easy to do anywhere, even with Node.js',
        html: '<strong>and easy to do anywhere, even with Node.js</strong>',
    }
    sgMail
        .send(msg)
        .then(() => {
        console.log('Email sent')
        })
        .catch((error: any) => {
        console.error(error)
        })
}

export default sendEmail;
