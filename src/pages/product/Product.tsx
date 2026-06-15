import { useEffect, useState } from "react"
import Button from "../../components/button/Button"
import Container from "../../components/container/Container"
import { getSingleProduct } from "../../sevices/Api"
import { useParams } from "react-router-dom"
import type { productTyps } from "../../types/server"
import { useShopContext } from "../../context/ShopContext"



function Product() {
    const prams = useParams<{ id: string }>()


    const { IncreaseQty, DcreaseQty, ProductQty, DeleteItem } = useShopContext()


    const [singlePro, setSinglePro] = useState<productTyps>()

    useEffect(() => {
        getSingleProduct(prams.id as string).then(result => {
            setSinglePro(result)

        });
    }, [])


    return (
        <div>
            <Container>
                <div className="shadow mt-5 grid grid-cols-12 border border-gray-200">


                    <div className="col-span-4 sm:col-span-5 md:col-span-7 lg:col-span-9 p-4 text-right">
                        <p>
                            {singlePro?.description}
                        </p>
                    </div>

                    <div className="bg-gray-200 col-span-8 sm:col-span-7 md:col-span-5 lg:col-span-3 p-4 text-right">
                        <img className="rounded mb-5 w-full bg-amber-200" src={singlePro?.image} alt="" />
                        <p className="mb-2 font-bold">{singlePro?.title}</p>
                        <p className="font-bold">قیمت : {singlePro?.price}</p>

                        <div>

                            {
                                ProductQty(parseInt(prams.id as string)) === 0 ? (

                                    <Button
                                        className="mt-5 w-full p-2!" varient="primary" onClick={() => IncreaseQty(parseInt(prams.id as string))}>اضافه کردن
                                    </Button>

                                ) : (

                                    <div className="grid grid-cols-3 mt-5">
                                        <Button
                                            className="p-1!" varient="primary" onClick={() => IncreaseQty(parseInt(prams.id as string))}> + 
                                        </Button>

                                        <span className="flex justify-center items-center">{ProductQty(parseInt(prams.id as string))}</span>

                                        <Button
                                            className="p-1!" varient="primary" onClick={() => DcreaseQty(parseInt(prams.id as string))}> -
                                        </Button>

                                        <Button className="col-span-full p-1! mt-2" varient="danger" onClick={() => DeleteItem (parseInt(prams.id as string))}>
                                            حذف محصول
                                        </Button>
                                    </div>
                                )
                            }



                        </div>
                    </div>

                </div>
            </Container>
        </div>
    )
}


export default Product