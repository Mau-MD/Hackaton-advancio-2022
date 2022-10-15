import client from './twilio';
import Event from './eventtype'

const sendSMS = (event: Event, cellphone_number: string) => {
  var message = client.messages.create({
    body: "Don't forget your next appointment!\n" + event.name_event.toUpperCase() + 
    "\n" + event.description_event.toUpperCase() + "\nThe appointment of the event is the following: " + event.date_event,
    from: '+18316042802',
    to: cellphone_number
  })
  .then((message: { status: any; }) =>  console.log(message.status))
  .done();
};

export default sendSMS;
