import axios from "axios";

const instance = axios.create({
    baseURL:'https://63f519423f99f5855dbd614a.mockapi.io/'
})

export type ProductType = {
    sex: number;
    id:number
    name:string
    descrition:string
    price:number
    rating:number
    sizes:any[]
    colors:any[]
    image:string | string[]
    category:number
}

export const shopAPI = {
    getProducts(){
        return instance.get<ProductType[]>('products').then((data) => {
            return data.data
        })
    },
    updateProduct(id:number){
        return instance.put('products',{id}).then(data => {
            return data.data
        })
    }
}
