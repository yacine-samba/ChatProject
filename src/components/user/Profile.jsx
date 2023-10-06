import s from './User.module.scss';

const Profil = ({ users, myID }) => {
	return (
		<div className={s.profil}>
			{users.map(user => {
				if (myID === user.userID) {
					return <p key={user.id}>{user.username}</p>;
				}
			})}
		</div>
	);
};

export default Profil;
