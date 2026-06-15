import axios from "axios";

//-----------------------------------------------------config-----------------------------------
const client = axios.create({
    baseURL: "http://localhost:8001"
})


export async function getProducts() {
    const { data } = await client("/products")

    return data
}

// type getpro = any

export async function getSingleProduct(id : string | number) {
    const { data } = await client(`/products/${id}`)

    return data
}
