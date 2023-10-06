import Link from "next/link"

const Home = () => {
    return (
        <div className="flex flex-col h-screen items-center space-x-4">
        <h1 className="font-medium text-4xl sm:text-5xl lg:text-6xl tracking-tight text-center text-white">Welcome to <br/><span className="font-extrabold">Locket</span></h1>
        <Link href="/login">Log in</Link>
        </div>
    )
}

export default Home