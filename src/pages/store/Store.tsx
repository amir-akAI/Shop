import { Link } from "react-router-dom"
import Container from "../../components/container/Container"
import ProductItem from "../../components/productItem/ProductItem"
import { useEffect, useState } from "react"
import { getProducts } from "../../sevices/Api"
import type { productTyps } from "../../types/server"

function Store() {


    const [products, setProducts] = useState<productTyps[]>([])

    useEffect(() => {
        getProducts().then((result) => {
            setProducts(result)
        })
    }, [])

    return (
        <div>
            <Container>
                <h1 className="text-right mt-5">جدید ترین محصولات</h1>

                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 mt-8 px-3">
                    
                    {
                        products.map(item => (
                            
                            <Link key={item.id} to={`/product/${item.id}`}>
                                <ProductItem {...item} />
                            </Link>
                        ))
                    }


                </div>
            </Container>
        </div>
    )
}


export default Store