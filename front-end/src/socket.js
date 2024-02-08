import io from 'socket.io-client';

const socket = io('http://localhost:8900'); // Connect to the server

socket.emit('addUser', { userId: 'yourUserId', roomId: 'yourRoomId' });

socket.on('getUsers', (users) => {
  console.log('Users in the room:', users);
});


socket.emit('sendMessage', {
  senderId: 'yourSenderId',
  receiverId: 'yourReceiverId',
  text: 'Hello from client',
  roomId: 'yourRoomId',
});


socket.on('getMessage', (message) => {
  console.log('Received message from server:', message);
});

// Handle disconnection
socket.on('disconnect', () => {
  console.log('Disconnected from server');
});