import smartcard from 'smartcard';
import emitter from '../events/native-event';

const { Devices } = smartcard;
const devices = new Devices();

devices.on('device-activated', (event) => {
  const { device } = event;
  device.on('card-inserted', (event) => {
    const { card } = event;
    card
      .issueCommand('FFCA000000')
      .then(() => {
      }).catch((error) => {
        console.error(error);
      });

    card.on('response-received', async (event) => {
      const ID = event.response.getDataOnly();
      console.log(ID);
      emitter.emit('cardReceived', ID);
    });
  });
});
