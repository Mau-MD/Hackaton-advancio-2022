import client from './twilio';

const sendWhatsapp = (event_data: string, cellphone_number: string) => {
  var message = client.messages.create({
    body: "Don't forget your next appointment! " + event_data,
    from: 'whatsapp:+14155238886',
    to: 'whatsapp:' + cellphone_number
    })
    .then((message: { status: any; }) =>  console.log(message.status))
    .done();
}

export default sendWhatsapp;
