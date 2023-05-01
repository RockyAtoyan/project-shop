import {useDispatch, useSelector} from "react-redux";
import {StateType} from "../store/store";
import {Categories} from "../Categories";
import {Sort} from "../Sort";
import {useCallback, useEffect} from "react";
import {ProductType} from "../api";
import {Product} from "./Product";
import {setLS} from "../store/shopReducer";


export const Main = () => {
    const dispatch:any = useDispatch()

    const searchValue = useSelector((state:StateType) => state.shop.searchValue)
    const currentCategory = useSelector((state:StateType) => state.shop.currentCategory)
    const currentSortValue = useSelector((state:StateType) => state.shop.currentSortValue)
    const sexSortValue = useSelector((state:StateType) => state.shop.sexSort)
    const products = useSelector((state:StateType) => state.shop.products)

    const sort = useCallback((a:ProductType,b:ProductType) => {
        return currentSortValue === 1 ? b.rating - a.rating : (currentSortValue === 2 ? a.price - b.price : -a.price + b.price)
    },[currentSortValue])

    useEffect(() => {
        dispatch(setLS())
    },[])

    const items = products
        .filter(product => !currentCategory ? true : product.category === currentCategory)
        .filter(product => product.name.toLowerCase().includes(searchValue.toLowerCase()))
        .filter(product => sexSortValue < 0 ? true : (product.sex !== undefined ? product.sex === sexSortValue : true))
        .sort(sort)
        .map(product => {
            return <Product key={product.id} product={product} />
        })

    return <main className={'main'}>
        <Categories />
        <h1>Каталог</h1>
        <Sort />
        <div className={'products'}>
            {items.length > 0 ? items : <h2>Товара нет!</h2>}
        </div>
    </main>
}