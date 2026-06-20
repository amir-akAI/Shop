import { createContext, useContext, useState, type ReactNode } from "react";
import { useLocalStorage } from "../hooks/useLocalStorage";



interface IShopContext {
    cartItems: cart[]
    IncreaseQty: (id: number) => void
    DcreaseQty: (id: number) => void
    DeleteItem: (id: number) => void
    ProductQty: (id: number) => number
    totalQty : number
}
interface cart {
    id: number,
    qty: number
}
interface IShopCartsProvider {
    children: ReactNode
}


// let crtItems = [
//     {id:1 , qty:5},
//     {id:2 , qty:14}
// ]

export const ShopContext = createContext({} as IShopContext)

export const useShopContext = () => { //------------------------custom hook
    return (useContext(ShopContext))
}




export function ShopCartsProvider({ children }: IShopCartsProvider) {

    const [cartItems, setCartItems] = useLocalStorage<cart[]>("cartItems", [])


    const ProductQty = (id: number) => {
        return cartItems.find((items) => items.id == id)?.qty || 0
    }


    const IncreaseQty = (id: number) => {
        setCartItems((prevItems) => {
            let selected = prevItems.find((item) => item.id == id)
            if (selected == null) {
                return [...prevItems, { id: id, qty: 1 }]
            }
            else {
                return prevItems.map((item) => {
                    if (item?.id == id) {
                        return { ...item, qty: item?.qty + 1 }
                    }
                    else {
                        return item
                    }
                })
            }
        })
    }
    console.log(cartItems)

    const DcreaseQty = (id: number) => {
        setCartItems((curenItems) => {
            let selected = curenItems.find((items) => items.id == id)
            if (selected?.qty === 1) {
                return curenItems.filter((items) => items.id !== id)
            }
            else {
                return curenItems.map((items => {
                    if (items?.id == id) {
                        return { ...items, qty: items.qty - 1 }
                    }
                    else {
                        return items
                    }
                }))
            }
        })
    }


    const DeleteItem = (id: number) => {
        setCartItems((curenItems) => {
            return curenItems.filter((item) => item.id !== id)
        })
    }


    const totalQty = cartItems.reduce((totalQty, item) =>  totalQty + item.qty, 0)


    return (
        <ShopContext.Provider value={{ cartItems, IncreaseQty, DcreaseQty, ProductQty, DeleteItem, totalQty }}>
            {children}
        </ShopContext.Provider>
    )
}