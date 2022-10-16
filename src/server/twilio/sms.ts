import client from './twilio';
import Eventt from './eventtype'

const sendSMS = (name_event: string, description_event: string, date_event: Date, city_event: string, school_event: string, cellphone_number: string) => {
  var message = client.messages.create({
    body: "Don't forget your next appointment!\n" + name_event.toUpperCase() + 
    "\n" + description_event.toUpperCase() + "\nThe appointment of the event is the following: " + date_event,
    from: '+18316042802',
    to: cellphone_number
  })
  .then((message: { status: any; }) =>  console.log(message.status))
  .done();
};

export default sendSMS;
