import { Route, Routes } from "react-router-dom"
import Home from "./pages/home/Home"
import Store from "./pages/store/Store"
import Layout from "./components/layout/Layout"
import Product from "./pages/product/Product"
import Carts from "./pages/carts/Carts"
import { ShopCartsProvider } from "./context/ShopContext"
import Wishlist from "./pages/wishlist/Wishlist"
import Account from "./pages/account/account"

function App() {

  return (

    <ShopCartsProvider>
      <Layout>
        <Routes>
          <Route path="/wishlist" element={<Wishlist />}/>
          <Route path="/account" element={<Account />}/>
          <Route path="/" element={<Home />} />
          <Route path="/store" element={<Store />} />
          <Route path="/product/:id" element={<Product />} />
          <Route path="/carts" element={<Carts />} />
        </Routes>
      </Layout>
    </ShopCartsProvider>

  )
}

export default App
