import { useEffect, useState } from 'react';
import { socket } from '@/utils/socket';

const Commands = () => {
	const [sounds, setSounds] = useState({});

	// useEffect(() => {
	// 	setSounds({
	// 		sounds: new Audio('@/assets/frozen.mp3'),
	// 	});
	//   }, []);

	useEffect(() => {
		setSounds({
			sounds: new Audio('@/assets/frozen.mp3'),
		});

		const onCommand = command => {
			switch (command) {
				case '/frozen':
					sounds.frozen.currentTime = 0;
					sounds.frozen.play();
					break;

				default:
					break;
			}
		};

		socket.on('command', onCommand);

		return () => {
			socket.off('command', onCommand);
		};
	}, [sounds]);

	return <div></div>;
};

export default Commands;
