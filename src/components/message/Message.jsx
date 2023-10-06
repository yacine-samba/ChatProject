import s from './Message.module.scss';

const Message = ({ username, content, fromSelf }) => {
	return (
		<div className={`${s.message} ${fromSelf ? s.message__self : ''}`}>
			<span className={s.message__user}>{username}</span>
			<br /> {content}
		</div>
	);
};

export default Message;
