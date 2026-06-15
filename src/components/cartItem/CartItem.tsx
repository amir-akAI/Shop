import { useEffect, useState } from "react"
import { useShopContext } from "../../context/ShopContext"
import Button from "../button/Button"
import { getSingleProduct } from "../../sevices/Api"
import type { productTyps } from "../../types/server"
import { Link } from "react-router-dom"

interface ICartItem {
    id: number,
    qty: number
}




function CartItem({ ...item }: ICartItem) {
    const { IncreaseQty, DcreaseQty, ProductQty, DeleteItem } = useShopContext()

    const [prod, setProd] = useState<productTyps>()

    useEffect(() => {
        getSingleProduct(item.id).then((item) => {
            setProd(item)
        })
    })


    return (
        <div className="flex flex-row-reverse mb-3 border-b border-b-gray-300 pb-3">
            <Link to={`/product/${item.id}`}><img className="rounded w-36" src={prod?.image} alt="" /></Link>


            <div className="mr-4 w-full text-right relative">
                <h3 className="mt-2">{prod?.title}</h3>

                <div className="mt-3">
                    <Button varient="danger" className="absolute left-0" onClick={() => { DeleteItem(item?.id) }}>remove</Button>
                    <Button
                        varient="primary" className="px-3! rounded-full!" onClick={() => { IncreaseQty(item?.id) }}>
                        +
                    </Button>
                    <span className="mx-2">{ProductQty(item?.id)}</span>
                    <Button
                        varient="primary" className="px-3! rounded-full!" onClick={() => { DcreaseQty(item?.id) }}>
                        -
                    </Button>
                </div>

            </div>
        </div>
    )
}


export default CartItem