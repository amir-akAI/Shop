import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { getProducts } from "../../sevices/Api";
import type { productTyps } from "../../types/server";
import ProductItem from "../productItem/ProductItem";



export default function ProductCard() {

    const [products, setProducts] = useState<productTyps[]>([])

    useEffect(() => {
        getProducts().then((result) => {
            setProducts(result)
        })
    }, [])

    return (

        <>
            
            {
                products.map(item => (

                    <Link key={item.id} to={`/product/${item.id}`} className="bg-gray-100" dir="rtl">
                        <ProductItem {...item}  />
                    </Link>
                ))
            }
        </>
    );
}