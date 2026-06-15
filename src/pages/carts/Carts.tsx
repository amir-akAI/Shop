import Button from "../../components/button/Button"
import CartItem from "../../components/cartItem/CartItem"
import Container from "../../components/container/Container"
import {  useShopContext } from "../../context/ShopContext"

function Carts() {

    const {cartItems} = useShopContext()
    
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
                <p>قیمت بدون تخفیف : 2500</p>
                <p> تخفیف : 500</p>
                <p> قیمت نهایی : 2000</p>

                <Button varient="success" className="mt-3 px-2!">
                    ثبت سفارش
                </Button>
            </div>

        </Container>
    )
}




export default Carts