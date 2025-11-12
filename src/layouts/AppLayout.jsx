import { Outlet } from "react-router-dom"

import AppHeader from "../component/AppHeader"
import AppNavbar from "../component/AppNavbar"
import AppFooter from "../component/AppFooter"

const AppLayout = ( {products, carts, setToken } ) => {

    return ( 
    <>
    <AppHeader />
    <AppNavbar products={products} carts={carts} setToken={setToken} />
    <Outlet />
    <AppFooter />
    </> 
    )
}
 
export default AppLayout;