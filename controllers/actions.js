import fetch from 'node-fetch';
import emitter from '../events/native-event';

require('dotenv').config();

const { BASE_URL } = process.env;

export default (socket) => {
  emitter.on('cardReceived', async (id) => {
    console.log(new Date());
    try {
      const response = await fetch(`${BASE_URL}/members/rfidTag/${id}`);
      const member = await response.json();
      console.log('-->Received:', id);
      if (member) {
        socket.emit('studentReceived', member);
        return;
      }
    } catch (error) {
      console.log(error);
    }
  });
  socket.on('disconnect', () => {
    console.log('Disconnect');
    emitter.removeAllListeners('cardReceived');
  });
};
