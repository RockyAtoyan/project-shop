import {ProductType} from "../api";
import {FC, useState} from "react";
import {useDispatch} from "react-redux";
import {setLS} from "../store/shopReducer";
import HighlightOffIcon from '@mui/icons-material/HighlightOff';
import Slider from "react-slick";

export const CartItem:FC<{item:ProductType | any}> = ({item}) => {
    const dispatch:any = useDispatch()
    const [showMode,setShowMode] = useState(false)


    return <div className={'cart_item'}>
        {showMode && <div className={'popup_img'} onClick={(event) => {
            // @ts-ignore
            if(!event.target.closest('.popup_img__item__image__item')){
                setShowMode(false)
            }
        }}>
            <div className="popup_img__item">
                <Slider>
                        <div className={'popup_img__item__image'}>
                            <img className={'popup_img__item__image__item'} src={item.image} alt=""/>
                        </div>
                </Slider>
            </div>
        </div>}
        <div className="cart_item__content">
            <div className="cart_item__img">
                <img onClick={() => {
                    setShowMode(true)
                }} src={item.image} alt=""/>
            </div>
            <div className="cart_item__info">
                <h2>{item.name}</h2>
                {item.sizes.length > 1 && <h3>Размер {item.currentSize}</h3>}
            </div>
        </div>
        <div className={'cart_item__quality'}>
            <button disabled={item.quality === 1} onClick={() => {
                if(item.quality > 1){
                    localStorage.setItem(item.id,JSON.stringify({...item,quality:item.quality - 1}))
                    dispatch(setLS())
                }
            }}>-</button>
            <span>{item.quality}</span>
            <button onClick={() => {
                localStorage.setItem(item.id,JSON.stringify({...item,quality:item.quality + 1}))
                dispatch(setLS())
            }}>+</button>
        </div>
        <div className="cart_item__price">
            <h2>{item.price*item.quality} Р</h2>
        </div>
        <button onClick={() => {
            localStorage.removeItem(item.id)
            dispatch(setLS())
        }}>
            <HighlightOffIcon />
        </button>

    </div>
}