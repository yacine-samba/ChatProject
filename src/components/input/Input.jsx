import { socket } from '@/utils/socket';
import { useRef } from 'react';
import s from './Input.module.scss';

const Input = ({ placeholder, selectedUser, setSelectedUser }) => {
	const inputRef = useRef();

	const onKeyDown = e => {
		if (inputRef.current.value.lenght !== 0 && e.keyCode === 13) {
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
				socket.emit('message', { content: inputRef.current.value });
				inputRef.current.value = '';
			}
		}
	};

	return (
		<input
			className={s.input}
			ref={inputRef}
			type="text"
			onKeyDown={onKeyDown}
			placeholder={placeholder}
		/>
	);
};

export default Input;
