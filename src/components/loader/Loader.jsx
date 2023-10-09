import s from './Loader.module.scss';

const Loader = ({ className }) => {
	return (
		<div className={`${s.loader} ${className}`}>
			<div className={s.loader__spinner}></div>
		</div>
	);
};

export default Loader;
