import s from './User.module.scss';

const Profil = ({ users, myID }) => {
	return (
		<div className={s.profil}>
			{users.map(user => {
				if (myID === user.userID) {
					return (
						<p key={user.id}>
							{user.username.length > 12 ? (
								<p>{user.username.substring(0, 12)}...</p>
							) : (
								<p>{user.username}</p>
							)}
						</p>
					);
				}
			})}
		</div>
	);
};

export default Profil;
