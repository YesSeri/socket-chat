import React, { useState, useEffect } from 'react';
import io from 'socket.io-client';
import { TextField } from '@material-ui/core';
import './App.css'

const socket = io.connect('http://localhost:5000');

function App() {
	const [state, setState] = useState({ message: '', name: '' });
	const [chat, setChat] = useState([]);

	useEffect(() => {
		socket.on('message', ({ name, message }) => {
			setChat([...chat, { name, message }]);
		});
	});

	const onTextChange = (e) => {
		setState({ ...state, [e.target.name]: e.target.value });
	};

	const onMessageSubmit = (e) => {
		e.preventDefault();
		const { name, message } = state;
		socket.emit('message', { name, message });
		setState({ message: '', name });
	};

	const renderChat = () =>
		chat.map(({ name, message }, idx) => (
			<div key={idx}>
				<h3>
					{name}: <span>{message}</span>
				</h3>
			</div>
		));
	return (
		<div className="card">
			<form onSubmit={onMessageSubmit}>
				<h1>Messenger</h1>
				<div className="name-field">
					<TextField
						name="name"
						onChange={(e) => onTextChange(e)}
						value={state.name}
						label="name"
					/>
				</div>
				<div className="message-field">
					<TextField
						name="message"
						onChange={(e) => onTextChange(e)}
						value={state.message}
						id="outlined-multiline-static"
						variant="outlined"
						label="message"
					/>
				</div>
				<button>Send Message</button>
				<div className="render-chat">
					<h1>Chat Log</h1>
					{renderChat()}
				</div>
			</form>
		</div>
	);
}

export default App;
