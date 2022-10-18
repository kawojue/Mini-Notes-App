import Header from "./Header"
import Footer from "./Footer"
import { Outlet } from "react-router-dom"

const Structure = ({ search, onSetSearch }) => {
    return (
        <>
            <Header search={search} onSetSearch={onSetSearch} />
            <Outlet />
            <Footer />
        </>
    )
}

export default Structure