import client from './twilio';
import Event from './eventtype'

const sendWhatsapp = (event: Event, cellphone_number: string) => {
  var message = client.messages.create({
    body: "Don't forget your next appointment!\n" + event.name_event.toUpperCase() + 
    "\n" + event.description_event.toUpperCase() + "\nThe appointment of the event is the following: " + event.date_event,
    from: 'whatsapp:+14155238886',
    to: 'whatsapp:' + cellphone_number
    })
    .then((message: { status: any; }) =>  console.log(message.status))
    .done();
}

export default sendWhatsapp;
