import Event from './eventtype'

// import sgMail from './sendgrid'
const sgMail = require('@sendgrid/mail');
sgMail.setApiKey(process.env.SENDGRID_API_KEY);

const sendEmail = (event: Event, to_email: string) => {
    let msg = {
        to: to_email,
        from: 'oscar.encinas@cetys.edu.mx',
        subject: 'Acerca de tu cuenta',
        html: 'Se ha creado tu evento: ' + event.name_event + '<br />' + event.description_event + 
        '<br />En la fecha: ' + event.date_event + '<br />En la cuidad: ' + event.city_event + '<br />En la escuela: ' +
        event.school_event
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
