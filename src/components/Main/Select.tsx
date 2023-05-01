import {FC, useState} from "react";


export const Select:FC<{items:any[],currentValue:string,onSelect:(...args:any) => any,title?:string}> = ({items,currentValue,onSelect,title}) => {


    return <div className={'select'}>
        <h2>{title} :</h2>
         <ul>
            {items.map((item,index) => {
                return <li key={index} className={item === currentValue ? 'active' : ''} onClick={() => {
                    onSelect(item,index)
                }}>{item}</li>
            })}
            </ul>
    </div>
}