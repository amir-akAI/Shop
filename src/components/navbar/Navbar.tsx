
import { Link } from "react-router-dom";
import Container from "../container/Container";
import { useShopContext } from "../../context/ShopContext";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCartShopping } from '@fortawesome/free-solid-svg-icons';
function Navbar() {

    const { totalQty } = useShopContext()


    return (
        <div className="h-16 border-b border-b-gray-300 shadow flex items-center">
            <Container>
                <div className="flex justify-between flex-row-reverse items-center">
                    <ul className="flex font-bold flex-row-reverse">
                        <li className="ml-5"><Link to="/">خانه</Link></li>
                        <li><Link to="/store">فروشگاه</Link></li>
                    </ul>

                    <div>
                        <Link to="/carts" className="relative">
                            <FontAwesomeIcon icon={faCartShopping} className="text-2xl"/>
                            <span className="absolute w-5 h-5 bg-red-600 flex justify-center items-center rounded-full text-white -top-3 -right-3 text-xs">{totalQty !== 0 ? totalQty : ""}</span>

                        </Link>
                    </div>
                </div>
            </Container>
        </div>
    )
}


export default Navbar