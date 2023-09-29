import { useEffect } from 'react';

const Notification = ({ title, content, onClose }) => {
	//type alert

	useEffect(() => {
		console.log('on mounted');
		setTimeout(onClose, 4000);
	}, []);

	return (
		<div
			className={`p-2 bg-rose-900 items-center text-rose-100 leading-none md:rounded-full flex md:inline-flex mx-auto 
            notification
            `}
			role="alert"
		>
			<span className="flex rounded-full bg-rose-600 uppercase px-2 py-1 text-xs font-bold mr-3">
				{title}
			</span>
			<span className="font-semibold mr-2 text-left flex-auto">{content}</span>
			<svg
				className={`close fill-current h-6 w-6 text-red-600`}
				role="button"
				xmlns="http://www.w3.org/2000/svg"
				viewBox="0 0 20 20"
                onClick={onClose}
			>
				<title>Close</title>
				<path d="M14.348 14.849a1.2 1.2 0 0 1-1.697 0L10 11.819l-2.651 3.029a1.2 1.2 0 1 1-1.697-1.697l2.758-3.15-2.759-3.152a1.2 1.2 0 1 1 1.697-1.697L10 8.183l2.651-3.031a1.2 1.2 0 1 1 1.697 1.697l-2.758 3.152 2.758 3.15a1.2 1.2 0 0 1 0 1.698z" />
			</svg>
		</div>
	);
};

export default Notification;
