import io from 'socket.io-client';

const API_URL = 'localhost:5000';
const socket = io.connect(API_URL);
const mice = {};

socket.on('connect', () => {
  console.log('connected to the socket server!');
});

socket.on('message-client-disconnected', id => {
  if (mice[id]) {
    document.body.removeChilde(mice[id]);
  }
});

socket.on('mousemove', event => {
  let mouse = mice[event.id];
  if (!mouse) {
    const span = document.createElement('span');
    span.style.position = 'absolute';
    span.textContent = 'Rabbit';
    mice[event.id] = span;
    mouse = span;
    document.body.appendChild(span);
  }
  mouse.style.top = event.y + 'px';
  mouse.style.left = event.x + 'px';
  console.log(event);
});

document.addEventListener('mousemove', event => {
  socket.emit('mousemove', {
    x: event.clientX,
    y: event.clientY
  });
});
