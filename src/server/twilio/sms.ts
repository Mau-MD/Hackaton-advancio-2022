import client from './twilio';

const sendSMS = (number: string) => {
  var message = client.messages.create({
    body: 'This is the ship that made the Kessel Run in fourteen parsecs?',
    from: '+18316042802',
    to: number
  })
  .then((message: { status: any; }) =>  console.log(message.status))
  .done();
};

export default sendSMS;
