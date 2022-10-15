import client from './twilio';

interface Event {
  name_event: string,
  description_event: string,
  date_event: string,
  cellphone_number: string
}

const sendSMS = (event: Event) => {
  var message = client.messages.create({
    body: "Don't forget your next appointment!\n" + event.name_event.toUpperCase() + 
    "\n" + event.description_event.toUpperCase() + "\nThe appointment of the event is the following: " + event.date_event,
    from: '+18316042802',
    to: event.cellphone_number
  })
  .then((message: { status: any; }) =>  console.log(message.status))
  .done();
};

export default sendSMS;
