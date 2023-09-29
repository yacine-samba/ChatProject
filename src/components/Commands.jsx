import { useEffect, useState } from 'react';
import { socket } from '@/utils/socket';

const Commands = () => {
	const [sounds, setSounds] = useState([]);

	useEffect(() => {
		const onCommand = command => {
			switch (command) {
				case 'frozen':
                    sounds.frozen.currentTime = 0;
					sounds.frozen.play();
					break;

				default:
					break;
			}
		};

		setSounds({
			sounds: new Audio('/assets/frozen.mp3'),
		});

		socket.on('command', onCommand);

		return () => {
			socket.off('command', onCommand);
		};
	}, []);

	return <div></div>;
};

export default Commands;
