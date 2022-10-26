import Navigation from "./Navigation"
import { FaLaptop, FaTabletAlt, FaMobileAlt } from 'react-icons/fa'
import DataContext from "../context/DataContext"
import { useContext } from 'react'
const Header = () => {
    const { width } = useContext(DataContext)
    return (
        <header>
            <div className="flex justify-between items-center px-2 py-4 bg-orange-400 text-3xl">
                <h1 className="text-black font-semibold tracking-wider">
                    Notes App
                </h1>
                <p>
                    {width <= 640 ?
                        <FaMobileAlt /> :
                        width <= 960 ?
                            <FaTabletAlt /> :
                            <FaLaptop />}
                </p>
            </div>
            <Navigation />
        </header>
    )
}

export default Header