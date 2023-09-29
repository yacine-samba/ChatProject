import Link from "next/link"

const Home = () => {
    return (
        <div>
        <h1>Home</h1>
        <Link href="/login">Se connecter</Link>
        </div>
    )
}

export default Home