import Navigation from "./Navigation"
const Header = () => {
    return (
        <header>
            <div className="px-2 py-4 bg-orange-400">
                <h1 className="text-3xl text-black font-semibold tracking-wider">
                    React JS Blog
                </h1>
            </div>
            <Navigation />
        </header>
    )
}

export default Header