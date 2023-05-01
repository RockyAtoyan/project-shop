import {useDispatch, useSelector} from "react-redux";
import {StateType} from "./store/store";
import {setCategory, setSexSort, setSort} from "./store/shopReducer";
import {useRef, useState} from "react";

export const sortNames = ['по популярности','по возрастанию цены','по убыванию цены']

export const Sort = () => {
    const dispatch = useDispatch()

    const sortValue = useSelector((state:StateType) => state.shop.currentSortValue)
    const sexSortValue = useSelector((state:StateType) => state.shop.sexSort)

    const items = useRef<HTMLDivElement>(null)

    return <div className="sort">
        <div className="sex_sort category_btns">
            {['мужские','женские'].map((name,index) => {
                return <button className={sexSortValue === index ? 'active' : ''} onClick={() => dispatch(setSexSort(index))} key={index}>{name.toUpperCase()}</button>
            })}
        </div>
        <div className={'sort_btns'}>
            <h2 onClick={() => items.current?.classList.toggle('active')}>
                <span>Сортировка</span>
                {sortNames.filter((value, index) => index+1 === sortValue)[0].split(' ').map((value, index) => {
                    return <span key={index} className={index > 0 ? 'active' : ''}>{value}</span>
                })}</h2>
            <div ref={items} className={"btns"}>
                {sortNames.map((sort,index) => {
                    return <button className={sortValue === index+1  ? 'active' : ''} onClick={() => {
                        dispatch(setSort(index + 1))
                        items.current?.classList.remove('active')
                    }} key={index}>{sort.split(' ').map((el,index) => <span key={index} className={index > 0 ? 'active' : ''} >{el}</span>)}</button>
                })}
            </div>
        </div>
    </div>
}