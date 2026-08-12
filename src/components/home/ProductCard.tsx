
import { useEffect, useState } from "react";
import { getProducts } from "../../sevices/Api";
import type { productTyps } from "../../types/server";
import ProductItem from "../productItem/ProductItem";

export default function ProductCard() {
    const [products, setProducts] = useState<productTyps[]>([]);

    useEffect(() => {
        getProducts().then((result) => {
            setProducts(result);
        });
    }, []);

    return (
        <>
            {products.map((item) => (
                <ProductItem
                    key={item.id}
                    {...item}
                />
            ))}
        </>
    );
}

