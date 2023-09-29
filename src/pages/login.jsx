import { useRouter } from 'next/router';
import { useEffect, useRef, useState } from 'react';

const Login = () => {
	const inputRef = useRef();
	const [username, setUsername] = useState();
	const [error, setError] = useState(false);
	const { push } = useRouter();

	const handleSubmit = e => {
		e.preventDefault();
		if (inputRef.current.value.length !== 0) {
			setUsername(inputRef.current.value);
		} else {
			setError(true);
		}
		if (localStorage.getItem('error') == 200) {
			console.log('error is present');

			setError('Server is down atm');
		}
	};

	useEffect(() => {
		if (username) {
			localStorage.setItem('username', username);
			push('/chat');
		}
	});

	return (
		<div className="flex flex-col content-center h-full">
			{error !== '' ? <h2>{error}</h2> : ''}
			<h1 className=" font-extrabold text-4xl sm:text-5xl lg:text-6xl tracking-tight text-center text-white ">
				Locked
			</h1>
			<h2 className="text-slate-200 font-semibold text-center text-xl sm:text-2x1 lg:text-3x1">
				log in to access the chat
			</h2>
			<form
				className="rounded px-8 pt-6 pb-8 mb-4 h-full flex flex-col items-center"
				onSubmit={handleSubmit}
			>
				<div className="mb-4">
					<label className="block text-gray-200 text-sm font-bold mb-2">
						Pseudo
					</label>
					<input
						className={`shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline ${
							error ? 'border-red-500' : ''
						}`}
						id="username"
						type="text"
						ref={inputRef}
						placeholder="Username"
					/>
					{error ? (
						<p className="text-red-500 text-xs italic">
							Please enter a username
						</p>
					) : (
						<></>
					)}
				</div>
				<div className="flex items-center justify-between">
					<button
						className="bg-teal-500 hover:bg-teal-800 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
						type="submit"
					>
						Log in
					</button>
				</div>
			</form>
		</div>
	);
};
export default Login;
