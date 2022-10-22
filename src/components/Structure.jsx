import Header from "./Header"
import Footer from "./Footer"
import { Outlet } from "react-router-dom"

const Structure = ({ search, onSetSearch, width }) => {
    return (
        <>
            <Header search={search} onSetSearch={onSetSearch} width={width} />
            <Outlet />
            <Footer />
        </>
    )
}

export default Structure