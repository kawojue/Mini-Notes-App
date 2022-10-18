import { Link } from 'react-router-dom'

const Navigation = ({ search, onSetSearch }) => {
    return (
        <div className="bg-black p-3 flex justify-between tracking-wide">
            <input type="text" placeholder="Search Posts" className="focus:outline-none rounded-md pl-1 font-medium" value={search} onChange={e => onSetSearch(e.target.value)} />
            <ul className="flex gap-3 text-white text-lg">
                <li>
                    <Link to="home">Home</Link>
                </li>
                <li>
                    <Link to="post">Post</Link>
                </li>
                <li>
                    <Link to="about">About</Link>
                </li>
            </ul>
        </div>
    )
}

export default Navigation