// import { EventEmitter } from '../events/Event';
import students from '../data/students.json';
import books from '../data/books.json';
import axios from 'axios';
import emitter from '../events/native-event';
import fetch from 'node-fetch';
require('dotenv').config();

const { BASE_URL } = process.env;

export default (socket) => {
  emitter.on('cardReceived', async (id) => {
    console.log('event');
    try {
      const response = await fetch(`${BASE_URL}/members/rfidTag/${id}`);
      const member = await response.json();
      console.log('received!');
      if (member) {
        socket.emit('studentReceived', member);
        return;
      }
    } catch(error) {
      console.log(error);
    }
  });
  socket.on('disconnect', () => {
    console.log('Disconnect');
    emitter.removeAllListeners('cardReceived');
  });
};
