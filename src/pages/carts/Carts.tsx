import { useEffect, useState } from "react"
import Button from "../../components/button/Button"
import CartItem from "../../components/cartItem/CartItem"
import Container from "../../components/container/Container"
import { useShopContext } from "../../context/ShopContext"
import { getSingleProduct } from "../../sevices/Api"
import type { productTyps } from "../../types/server"

function Carts() {

    const { cartItems } = useShopContext()

    const [finalPrice, setFinalPrice] = useState(0)


    useEffect(() => {
        const calculatePrice = async () => {
            let total = 0
            for (const item of cartItems) {
                const prod: productTyps = await getSingleProduct(item.id)
                total += prod.price * item.qty
            }
            setFinalPrice(total)
        }
        calculatePrice()
    }, [cartItems])




    return (
        <Container>
            <div className="mt-5">
                {
                    cartItems.map((item) => (
                        <CartItem key={item.id} {...item} />
                    ))
                }

            </div>

            <div className="mt-4 text-right shadow p-4 rounded bg-blue-50">
                <p>قیمت بدون تخفیف : {finalPrice}</p>
                <p> تخفیف : 0</p>
                <p> قیمت نهایی : {finalPrice}</p>

                <Button varient="success" className="mt-3 px-2!">
                    ثبت سفارش
                </Button>
            </div>

        </Container>
    )
}




export default Carts