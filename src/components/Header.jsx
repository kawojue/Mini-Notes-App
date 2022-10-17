import Navigation from "./Navigation"
const Header = () => {
    return (
        <>
            <div className="px-2 py-4 bg-orange-400">
                <h1 className="text-2xl text-black font-semibold tracking-wider">
                    React JS Blog
                </h1>
            </div>
            <Navigation />
        </>
    )
}

export default Header