import type { productTyps } from "../../types/server"


function ProductItem(item : productTyps){
// console.log(prop.prop.title)
    return(
        <div className="shadow rounded pb-4">
            <img className="w-full rounded-t" src={item.image} alt="" />

            <div className="flex justify-between flex-row-reverse p-4">
               <h3>{item.title}</h3>
               
               <span>{item.price} $</span>
            </div>
            <div className="px-4">
                <p className="line-clamp-2 text-gray-500">
                    {item.description}
                </p>
            </div>
        </div>
    )
}


export default ProductItem