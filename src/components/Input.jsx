import { socket } from '@/utils/socket';
import { useRef } from 'react';

const Input = ({ placeholder, selectedUser }) => {
	const inputRef = useRef();

	const onKeyDown = e => {
		if (inputRef.current.value.lenght !== 0 && e.keyCode === 13) {
			if (selectedUser) {
				socket.emit('private message', {
					content: inputRef.current.value,
					to: selectedUser.userID,
				});
			} else {
				socket.emit('message', { content: inputRef.current.value });
				inputRef.current.value = '';
			}
		}
	};

	return (
		<input
			className="shadow bg-main-color-light appearance-none border rounded w-full py-2 px-3 text-gray-200 leading-tight focus:outline-none focus:shadow-outline bottom-0"
			ref={inputRef}
			type="text"
			onKeyDown={onKeyDown}
			placeholder={placeholder}
		/>
	);
};

export default Input;
