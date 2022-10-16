import Event from './eventtype'

// import sgMail from './sendgrid'
const sgMail = require('@sendgrid/mail');
sgMail.setApiKey(process.env.SENDGRID_API_KEY);

const sendEmail = (name_event: string, description_event: string, date_event: string, city_event: string, school_event: string, to_email: string) => {
    let msg = {
        to: to_email,
        from: 'oscar.encinas@cetys.edu.mx',
        subject: 'Acerca de tu cuenta',
        html: 'Se ha creado tu evento: ' + name_event + '<br />' + description_event + 
        '<br />En la fecha: ' + date_event + '<br />En la cuidad: ' + city_event + '<br />En la escuela: ' +
        school_event
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
