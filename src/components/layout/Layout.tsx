import type { ReactNode } from "react"
import Navbar from "../navbar/Navbar"
import Footer from "../footer/Footer"


interface ILayout {
    children: ReactNode
}


function Layout({children}: ILayout) {

    return (
        <>
            <Navbar />
            {children}
            <Footer/>
        </>
    )
}



export default Layout