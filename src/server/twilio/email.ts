// import sgMail from './sendgrid'
const sgMail = require('@sendgrid/mail');
sgMail.setApiKey(process.env.SENDGRID_API_KEY);

const sendEmail = (to_email: string) => {
    let msg = {
        to: to_email,
        from: 'oscar.encinas@cetys.edu.mx',
        subject: 'Acerca de tu cuenta',
        html: `<p><b>Tu cuenta ha sido creada exitosamente!</b></p><p>Hemos recibido tu aplicación de registro. 
        Estamos orgullosos de anunciar que ya eres parte de esta asombrosa comunidad. Muchas gracias por todo.
        Te invitamos a seguir explorando para conocer todo lo que tenemos para ofrecer! <b>Puedes seguir explorando 
        dando click al siguiente enlace: </b>https://app.sendgrid.com/email_activity.</p>`
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
