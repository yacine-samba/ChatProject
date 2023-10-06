import { useEffect, useRef } from 'react';
import s from './User.module.scss';

const User = ({ user, selectedUser, setSelectedUser, clearNotification }) => {
	const userRef = useRef();

	return (
		<div
			ref={userRef}
			// key={user.id}
			className={`${s.user} ${
				selectedUser?.userID === user.userID ? s.user__active : ''
			} ${user.connected ? '' : s.user__disconnected}`}
			onClick={() => {
				setSelectedUser(user);
				clearNotification(user);
			}}
		>
			<p>{user.username}</p>
			{user.hasNewMessages === true ? (
				<span className={s.user__newMessage}>notif</span>
			) : null}
		</div>
	);
};

export default User;
