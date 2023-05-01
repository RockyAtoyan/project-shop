import {ProductType, shopAPI} from "../api";
import {ThunkAction} from "redux-thunk";
import {StateType} from "./store";

const initState = {
    products:[] as ProductType[],
    fetching:true,
    searchValue:'',
    cart:[],
    currentSortValue:1,
    currentCategory:0,
    sexSort:-1,
    ls:[] as any
}

export const shopReducer = (state = initState,action:ActionsType) => {
    if(action.type === 'set-fetching'){
        return {...state,fetching: action.fetching}
    }
    else if(action.type === 'set-search-value'){
        return {...state,searchValue:action.value}
    }
    else if(action.type === 'set-category'){
        return {...state,currentCategory:action.value}
    }
    else if(action.type === 'set-sort'){
        return {...state,currentSortValue:action.value}
    }
    else if(action.type === 'set-products'){
        return {...state,products: action.products}
    }
    else if(action.type === 'set-storage'){
        return {...state,ls: action.items}
    }
    else if(action.type === 'set-sex-sort'){
        return {...state,sexSort: action.value}
    }
    return {...state}
}

type ActionsType = setProductsType
    | setFethingType
    | setSearchValueType
    | setCategoryType
    | setSortType
    | setLocalStorageType
    | setSexSortType

type setFethingType = {
    type:'set-fetching',
    fetching:boolean
}
const setFething = (fetching:boolean):setFethingType => ({type:'set-fetching',fetching})

type setSearchValueType = {
    type:'set-search-value',
    value:string
}
export const setSearchValue = (value:string):setSearchValueType => ({type:'set-search-value',value})

type setCategoryType = {
    type:'set-category',
    value:number
}
export const setCategory = (value:number):setCategoryType => ({type:'set-category',value})

type setSexSortType = {
    type:'set-sex-sort',
    value:number
}
export const setSexSort = (value:number):setSexSortType => ({type:'set-sex-sort',value})

type setLocalStorageType = {
    type:'set-storage',
    items:any
}
export const setLocalStorage = (items:any):setLocalStorageType => ({type:'set-storage',items})

type setSortType = {
    type:'set-sort',
    value:number
}
export const setSort = (value:number):setSortType => ({type:'set-sort',value})



type setProductsType = {
    type:'set-products',
    products:ProductType[]
}
const setProducts = (products:ProductType[]):setProductsType => ({type:'set-products',products})

type ThunkType = ThunkAction<Promise<any> | any,StateType, any, ActionsType>

export const getProducts = ():ThunkType => dispatch => {
    dispatch(setFething(true))
    return shopAPI.getProducts().then(data => {
        dispatch(setProducts(data))
        dispatch(setFething(false))
    })
}

export const setLS = ():ThunkType => dispatch => {
    dispatch(setLocalStorage(Object.keys(localStorage).map(key => JSON.parse(localStorage.getItem(key) + '')).filter(el => el.type === 'project-shop-item')))
}



