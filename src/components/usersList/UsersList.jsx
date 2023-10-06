import { useEffect } from 'react';
import './UsersList.module.scss';

const UsersList = ({ users, selectedUser, setSelectedUser }) => {
	useEffect(() => {
		console.log('users', users);
	}, [users]);

	//TODO USERS DICONNECTED STYLES
	return (
		<div className="userList text-slate-400 py-4">
			{users.map(user => {
				return user.connected === true ? (
					<div
						key={user.id}
						className={`user ${
							selectedUser?.userID === user.userID ? 'user__active' : ''
						}`}
						onClick={() => setSelectedUser(user)}
					>
						<div className="py-2 px-1 my-2 bg-main-color-light text-white rounded-full text-center font-semibold">
							<p>{user.username}</p>
						</div>
					</div>
				) : 
				(
					<div
						key={user.id}
						className={`user ${
							selectedUser?.userID === user.userID ? 'user__active' : ''
						}`}
						onClick={() => setSelectedUser(user)}
					>
						<div className="py-2 px-1 my-2 bg-main-color rounded-full text-center">
							<p>{user.username}</p>
						</div>
					</div>
				);
			})}
		</div>
	);
};

export default UsersList;
