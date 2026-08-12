import type { productTyps } from "../../types/server"


function ProductItem(item : productTyps){
// console.log(prop.prop.title)
    return(
        <div className="shadow rounded pb-4 ">
            <img className="w-full h-90 rounded-t" src={item.image} alt="" />

            <div className="flex justify-between flex-row-reverse px-4 pt-4 h-10 overflow-y-hidden">
               
               <span>{item.price} $</span>
               <h3>{item.title}</h3>
               
            </div>
            <div className="px-4 mt-3">
                <p className="line-clamp-2 text-xs text-gray-500" dir="rtl">
                    {item.description}
                </p>
            </div>
        </div>
    )
}


export default ProductItem