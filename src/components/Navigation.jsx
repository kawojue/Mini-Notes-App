import { Link } from 'react-router-dom'
import DataContext from "../context/DataContext"
import { useContext } from 'react'

const Navigation = () => {
    const { search, setSearch } = useContext(DataContext)
    return (
        <div className="bg-black p-3 flex justify-between tracking-wide">
            <input type="search" placeholder="Search Notes" className="focus:outline-none rounded-md pl-1 font-medium" value={search} onChange={e => setSearch(e.target.value)} />
            <ul className="flex gap-3 text-white text-lg">
                <li>
                    <Link to="home">Home</Link>
                </li>
                <li>
                    <Link to="note">Note</Link>
                </li>
                <li>
                    <Link to="about">About</Link>
                </li>
            </ul>
        </div>
    )
}

export default Navigation