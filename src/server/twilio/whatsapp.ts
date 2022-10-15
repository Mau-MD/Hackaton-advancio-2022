import client from './twilio';

const sendWhatsapp = (number: string) => {
  var message = client.messages.create({
    body: 'This is the whatsapp that made the Kessel Run in fourteen parsecs?',
    from: 'whatsapp:+14155238886',
    to: 'whatsapp:' + number
    })
    .then((message: { status: any; }) =>  console.log(message.status))
    .done();
}

export default sendWhatsapp;
