import { useEffect, useRef, useState } from 'react';
import { socket } from '@/utils/socket';
import { useRouter } from 'next/router';
import Input from '../components/Input';
import Commands from '../components/Commands';
import Notification from '../components/notification/Notification';
import UsersList from '../components/usersList/usersList';

const Chat = () => {
	const { push } = useRouter();
	const [messages, setMessages] = useState([]);
	const [users, setUsers] = useState([]);
	const [error, setError] = useState({});
	const [selectedUser, setSelectedUser] = useState();
	const messagesEndRef = useRef(null);
	const viewerRef = useRef();

	const onSession = ({ sessionID, userID }) => {
		// attach the session ID to the next reconnection attempts
		socket.auth = { sessionID };
		// store it in the localStorage
		localStorage.setItem('sessionID', sessionID);
		// save the ID of the user
		socket.userID = userID;
	};

	const onConnectionError = err => {
		console.log(err);
		localStorage.clear('username');
		localStorage.clear('sessionsID');
		push('/login');
	};

	const onError = ({ code, error }) => {
		let title = '';
		let content = '';

		switch (code) {
			// code 100, vous savez que ça correspond à du spam, donc vous pouvez changer les valeurs
			case 100:
				title = `Erreur ${code} : Spam`;
				content = 'Tu spam trop chacal';
				break;

			// case 200:
			//   break;

			default:
				break;
		}

		setError({
			title,
			content,
		});
	};

	const getUsersAtInit = _users => {
		setUsers(_users);
	};

	const getMessagesAtInit = messagesAtInit => {
		// console.log(messagesAtInit);
		setMessages(messagesAtInit);
	};

	const onMessage = message => {
		setMessages(oldMdessage => {
			return [...oldMdessage, message];
		});
	};

	const onUserConnected = _user => {
		setUsers(currentUsers => {
			return [...currentUsers, _user];
		});
	};

	const onUserDeconnected = _userID => {
		const filteredArray = [...users].filter(_user =>
			_user.userID !== _userID ? true : false
		);
		setUsers(filteredArray);
	};

	const scrollToBottom = () => {
		viewerRef.current.scrollTop = viewerRef.current.scrollHeight;
	};

	useEffect(() => {
		socket.on('user connected', onUserConnected);
		socket.on('user disconnected', onUserDeconnected);

		return () => {
			socket.off('user connected', onUserConnected);
			socket.off('user disconnected', onUserDeconnected);
		};
	}, [users]);

	useEffect(() => {
		const sessionID = localStorage.getItem('sessionID');

		// session is already defined
		if (sessionID) {
			socket.auth = { sessionID };
			socket.connect();
			// first time connecting and has already visited login page
		} else if (localStorage.getItem('username')) {
			const username = localStorage.getItem('username');
			socket.auth = { username };
			socket.connect();
			//   // redirect to login page
		} else {
			push('/login');
		}

		socket.on('error', onError);
		socket.on('session', onSession);
		socket.on('message', onMessage);
		socket.on('messages', getMessagesAtInit);
		socket.on('disconnect', onConnectionError);
		socket.on('users', getUsersAtInit);
		socket.on('connect_error', onConnectionError);

		return () => {
			socket.disconnect();
			socket.off('error', onError);
			socket.off('session', onSession);
			socket.off('message', onMessage);
			socket.off('messages', getMessagesAtInit);
			socket.off('disconnect', onConnectionError);
			socket.off('users', getUsersAtInit);
			socket.off('connect_error', onConnectionError);
		};
	}, []);

	useEffect(scrollToBottom, [messages]);

	useEffect(() => {
		console.log(selectedUser);
	}, [selectedUser]);

	return (
		<div className="flex box-border h-screen">
			<div className="p-8 bg-main-color-light">
				<h1 className=" font-extrabold text-xl sm:text-2xl lg:text-3xl tracking-tight text-center text-white ">
					Locked
				</h1>
				<UsersList users={users} setSelectedUser={selectedUser} />
			</div>
			{/* <div className="w-full">
				<Notification
					title={'Error'}
					content={'Ça marche pas'}
					onClose={() => setError(null)}
				/>
			</div> */}
			<div className="chat-container w-full p-2">
				<ul>
					{selectedUser
						? selectedUsers.messages.map((message, k) => {
								return (
									<li key={k}>
										{message.username} : {message.content}
									</li>
								);
						  })
						: messages.map((message, k) => {
								return (
									<li key={k}>
										{message.username} : {message.content}
									</li>
								);
						  })}
					<div ref={viewerRef} />
				</ul>
				<Input
					placeholder="Send a message in general chat"
					selectedUser={selectedUser}
					setSelectedUser={setSelectedUser}
				/>
			</div>
		</div>
	);
};

export default Chat;
