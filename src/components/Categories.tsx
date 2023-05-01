import {useDispatch, useSelector} from "react-redux";
import {StateType} from "./store/store";
import {setCategory, setSexSort} from "./store/shopReducer";
import {useEffect, useRef, useState} from "react";

export const categories = ['все','гидрокостюмы','очки','шапочки','акксессуары']

export const Categories = () => {
    const dispatch = useDispatch()

    const categoryValue = useSelector((state:StateType) => state.shop.currentCategory)

    const items = useRef<HTMLDivElement>(null)

    return <>
        <div className={'category_btns'}>
            {categories.map((category,index) => {
                return <button className={categoryValue === index ? 'active' : ''} onClick={() => {
                    dispatch(setCategory(index))
                    dispatch(setSexSort(-1))
                }} key={index}>{category.toUpperCase()}</button>
            })}
        </div>
        <div className="mobile_categories__btns">
            <h3 onClick={() => {
                items.current?.classList.toggle('active')
            }}>{categories[categoryValue].toUpperCase()}</h3>
            <div ref={items} className={"items"}>
                {categories.map((category,index) => {
                    return <button className={categoryValue === index ? 'active' : ''} onClick={() => {
                        dispatch(setCategory(index))
                        dispatch(setSexSort(-1))
                        items.current?.classList.remove('active')
                    }} key={index}>{category.toUpperCase()}</button>
                })}
            </div>
        </div>
    </>
}

