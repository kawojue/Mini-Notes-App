const Navigation = () => {
    return (
        <div className="bg-black p-3 flex justify-between tracking-wide">
            <input type="text" placeholder="Search Posts" className="focus:outline-none rounded-md pl-1 font-medium" />
            <ul className="flex gap-3 text-white text-lg">
                <li>
                    <a href="home">Home</a>
                </li>
                <li>
                    <a href="post">Post</a>
                </li>
                <li>
                    <a href="about">About</a>
                </li>
            </ul>
        </div>
    )
}

export default Navigation