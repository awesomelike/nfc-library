import emitter from '../events/native-event';

export default (socket) => {
  emitter.on('cardReceived', async (rfid) => {
    console.log('-->Connection:', new Date());
    try {
      console.log('-->Received:', rfid);

      socket.emit('studentReceived', rfid);

      console.log('-->Done<--');
      console.log('----------');
    } catch (error) {
      console.log(error);
    }
  });
  socket.on('disconnect', () => {
    console.log('Disconnect');
    emitter.removeAllListeners('cardReceived');
  });
};
