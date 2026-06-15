import { Route, Routes } from "react-router-dom"
import Home from "./pages/home/Home"
import Store from "./pages/store/Store"
import Layout from "./components/layout/Layout"
import Product from "./pages/product/Product"
import Carts from "./pages/carts/Carts"
import { ShopCartsProvider } from "./context/ShopContext"

function App() {

  return (

    <ShopCartsProvider>
      <Layout>
        <Routes>
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
