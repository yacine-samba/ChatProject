import { socket } from '@/utils/socket';
import { useEffect, useRef, useState } from 'react';
import s from './Input.module.scss';
import Loader from '../loader/Loader';

const Input = ({ placeholder, selectedUser, setSelectedUser, sending }) => {
	const inputRef = useRef();
	const [loading, setLoading] = useState(false);
	const [sound, setSound] = useState({});

	const onCommand = () => {
		sound.sendingMessage.currentTime = 0;
		sound.sendingMessage.play();
	};

	const sendMessage = e => {
		if (inputRef.current.value.length !== 0) {
			if (selectedUser) {
				socket.emit('private message', {
					content: inputRef.current.value,
					to: selectedUser.userID,
				});

				const _selectedUser = { ...selectedUser };

				_selectedUser.messages.push({
					content: inputRef.current.value,
					username: localStorage.getItem('username'),
					from: socket.userID,
				});
				setSelectedUser(_selectedUser);
				inputRef.current.value = '';
			} else {
				setLoading(true);
				setTimeout(() => {
					setLoading(false);
					sending(false);
					socket.emit('message', { content: inputRef.current.value });
					inputRef.current.value = '';
					onCommand();
				}, 850);
				sending(true);
			}
		}
	};

	const onKeyDown = e => {
		if (e.keyCode === 13) {
			sendMessage();
		}
	};

	const onSubmit = () => {
		sendMessage();
	};

	useEffect(() => {
		setSound({
			sendingMessage: new Audio('/assets/sendingMessage.mp3'),
		});

		socket.on('command', onCommand);
		return () => {
			socket.off('command', onCommand);
		};
	}, []);

	return (
		<div className={s.containerInput}>
			<input
				ref={inputRef}
				type="text"
				onKeyDown={onKeyDown}
				placeholder={placeholder}
				className={s.input}
			/>
			{loading ? (
				<Loader className={s.loader} />
			) : (
				<p className={s.btnSubmit} onClick={onSubmit}>
					Send
					<svg
						xmlns="http://www.w3.org/2000/svg"
						height="1em"
						viewBox="0 0 512 512"
						className={s.arrow}
					>
						<path d="M498.1 5.6c10.1 7 15.4 19.1 13.5 31.2l-64 416c-1.5 9.7-7.4 18.2-16 23s-18.9 5.4-28 1.6L284 427.7l-68.5 74.1c-8.9 9.7-22.9 12.9-35.2 8.1S160 493.2 160 480V396.4c0-4 1.5-7.8 4.2-10.7L331.8 202.8c5.8-6.3 5.6-16-.4-22s-15.7-6.4-22-.7L106 360.8 17.7 316.6C7.1 311.3 .3 300.7 0 288.9s5.9-22.8 16.1-28.7l448-256c10.7-6.1 23.9-5.5 34 1.4z" />
					</svg>
				</p>
			)}
		</div>
	);
};

export default Input;
