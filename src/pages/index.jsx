import Link from 'next/link';

const Home = () => {
	return (
		<div className="homeContainer">
			<h1 className="homeContainer__title">
				Welcome to <br />
				<span>Locket</span>
			</h1>
			<Link href="/login" className="homeContainer__buttonLogin">
				Log in
			</Link>
		</div>
	);
};

export default Home;
