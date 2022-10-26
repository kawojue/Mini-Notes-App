import Header from "./Header"
import Footer from "./Footer"
import { Outlet } from "react-router-dom"

const Structure = () => {
    return (
        <>
            <Header />
            <Outlet />
            <Footer />
        </>
    )
}

export default Structure