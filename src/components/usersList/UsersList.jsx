import { useEffect } from 'react';
import './UsersList.module.scss';

const UsersList = ({ users, selectedUser, setSelectedUser }) => {
	useEffect(() => {
		console.log('users', users);
	}, [users]);

	return (
		<div className="userList text-slate-400 py-4">
			{users.map(user => {
				return user.connected === true ? (
					<div
						key={user.id}
						className={`${
							selectedUser?.userID === user.userID ? 'user__active' : ''
						}`}
						onClick={() => setSelectedUser(user)}
					>
						<div className="p-4 bg-main-color rounded-full text-center">
						<p>{user.username}</p>
                        </div>
					</div>
				) : null;
			})}
		</div>
	);
};

export default UsersList;
