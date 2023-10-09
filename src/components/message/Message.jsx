import s from './Message.module.scss';

const Message = ({ username, content, fromSelfPrivate, fromSelfPublic, sending }) => {
	return (
		<div
			className={`
			${s.message} 
			${fromSelfPublic ? s.message__selfPublic : ''}
			${fromSelfPrivate ? s.message__selfPrivate : ''}
			${sending ? s.message__sending : ''}
			message__sending
			`}
		>
			<span className={s.message__user}>
				{username.length > 16 ? (
					<p>{username.substring(0, 16)}...</p>
				) : (
					<p>{username}</p>
				)}
			</span>
			<br /> {content}
		</div>
	);
};

export default Message;
