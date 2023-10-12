import { useRouter } from 'next/router';
import { useEffect, useRef, useState } from 'react';
import Loader from '../components/loader/Loader';

const Login = () => {
	const inputRef = useRef();
	const [username, setUsername] = useState();
	const [loading, setLoading] = useState(false);
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
			setLoading(true);
			localStorage.setItem('username', username);
			setTimeout(() => {
				console.log('connexion');
				setLoading(false);
			}, 850);
			setLoading(false);
			push('/chat');
		}
	}, [username]);

	return (
		<div className="loginContainer">
			<div className="loginContainer__title">
				{error !== '' ? <h2>{error}</h2> : ''}
				<h1>Locked</h1>
				<h2>log in to access the chat</h2>
			</div>
			<form className="loginContainer__form" onSubmit={handleSubmit}>
				<div className="formContainer">
					<label>Pseudo :</label>
					<input
						className={`${error ? 'input__error' : ''}`}
						id="username"
						type="text"
						ref={inputRef}
						placeholder="Username"
					/>
					{error ? <p className="error">Please enter a username</p> : <></>}
				</div>
				{loading ? (
					<button>
						<Loader className="button__loading" />
					</button>
				) : (
					<button type="submit">Log in</button>
				)}
			</form>
		</div>
	);
};
export default Login;
