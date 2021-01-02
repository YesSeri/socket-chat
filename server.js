const express = require('express');
const server = require('http').createServer();
options={
  cors:true,
 };
const io = require('socket.io')(server, options);
io.on('connection', (socket) => {
	socket.on('message', ({ name, message }) => {
		io.emit('message', { name, message });
	});
});

server.listen(5000);