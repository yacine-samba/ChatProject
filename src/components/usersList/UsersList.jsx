import { useEffect } from 'react';
import User from '../user/User';
import s from './UsersList.module.scss';

const UsersList = ({ users, setUsers, selectedUser, setSelectedUser, myID }) => {
	const clearNotification = user => {
		const _user = [...users];

		const index = _user.findIndex(_user => _user.userID === user.userID);

		_user[index].hasNewMessages = false;

		setUsers(_user);
	};

	useEffect(() => {
		console.log('users', users);
	}, [users]);

	//TODO users last connection
	return (
		<div className={s.userList}>
			<div className={s.main} onClick={() => setSelectedUser(null)}>
				Main
			</div>
			{users.map(user => {
				if (user.userID !== myID) {
					return (
						<User
							key={user.id}
							user={user}
							selectedUser={selectedUser}
							setSelectedUser={setSelectedUser}
							clearNotification={clearNotification}
						/>
					);
				}
			})}
		</div>
	);
};

export default UsersList;
