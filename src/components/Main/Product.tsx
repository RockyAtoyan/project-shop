import {FC, useRef, useState} from "react";
import {ProductType} from "../api";
import { v4 as uuidv4 } from 'uuid';
import {useDispatch, useSelector} from "react-redux";
import {StateType} from "../store/store";
import {setLS} from "../store/shopReducer";
import {Select} from "./Select";
import Slider from "react-slick";
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import HighlightOffIcon from '@mui/icons-material/HighlightOff';

export const AddItemToLC = (item:ProductType,quality?:number,currentSize?:string,currentColor?:string,image?:string) => {
    const id = uuidv4()
    localStorage.setItem(id,JSON.stringify({...item,type:'project-shop-item',id,parentId:item.id,quality,currentSize,currentColor,image}))
}

// @ts-ignore
const PrevButton = ({ currentSlide, slideCount, ...props }) => {
    return <button  {...props} className={'prev_button'}>
        <ArrowBackIosNewIcon />
    </button>
}

// @ts-ignore
const NextButton = ({ currentSlide, slideCount, ...props }) => {
    return <button {...props} className={'next_button'}>
        <ArrowForwardIosIcon />
    </button>
}

export const Product:FC<{product:ProductType}> = ({product}) => {

    const dispatch:any = useDispatch()

    const ls = useSelector((state:StateType) => state.shop.ls)
    const slider = useRef<any>()

    const cartItem = ls.filter((el:any) => el.parentId === product.id)

    const [currentSize,setCurrentSize] = useState(product.sizes[0])
    const [currentColor,setCurrentColor] = useState(product.colors[0])
    const [currentImage,setCurrentImage] = useState<any>(0)
    const [showMode,setShowMode] = useState(false)

    const settings = {
        infinite: true,
        speed: 500,
        swipe:false,
        slidesToShow: 1,
        slidesToScroll: 1,
        nextArrow: <NextButton currentSlide={undefined} slideCount={undefined} />,
        prevArrow: <PrevButton currentSlide={undefined} slideCount={undefined} />,
        afterChange: (current:any) => {
            setCurrentColor(product.colors[current])
            setCurrentImage(current)
        },
        responsive:[
            {
                breakpoint: 769,
                settings: {
                    swipe: true
                }
            },
        ],
    }

    const imgSettings = {
        infinite: true,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1,
        initialSlide:currentImage,
        nextArrow: <NextButton currentSlide={undefined} slideCount={undefined} />,
        prevArrow: <PrevButton currentSlide={undefined} slideCount={undefined} />,
        fade:true,
    }

    return <div className={'product'}>
        {showMode && <div className={'popup_img'} onClick={(event) => {
            // @ts-ignore
            if(!event.target.closest('.popup_img__item__image__item') && product.image.length === 1){
                setShowMode(false)
            }
        }}>
            <button className="close" onClick={() => setShowMode(false)}>
                <HighlightOffIcon />
            </button>
            <div className="popup_img__item">
                <Slider {...imgSettings}>
                    {Array.isArray(product.image) ? product.image.map((img,index) => {
                        return <div key={index} className={'popup_img__item__image'}>
                            <img className={'popup_img__item__image__item'} src={img} alt=""/>
                        </div>
                    }) : <img className={'popup_img__item'} src={product.image[currentImage]} alt=""/>}
                </Slider>
            </div>

        </div>}
        <div className="product_images">
            {product.image.length > 1 && typeof product.image !== "string" ? <Slider ref={slider} {...settings}>{product.image.map((img, index) => {
                return <div key={index} className={'product_img'}>
                    <img src={img} alt="" onClick={() => {
                        setShowMode(true)
                    }}/>
                </div>
            })}</Slider> : <div className={'product_img'}>
                <img onClick={() => {
                    setShowMode(true)
                }} src={product.image[currentImage]} alt=""/>
            </div> }
        </div>
        <div className="product_content">
            <div className="product_info">
                <h2 className={'product_name'}>{product.name}</h2>
                <h2 className={'product_price'}>{product.price} руб</h2>
            </div>
            <div className="product_select">
                <Select title={'Размер'} items={product.sizes} currentValue={currentSize} onSelect={(value) => setCurrentSize(value)} />
                <Select title={'Цвет'} items={product.colors} currentValue={currentColor} onSelect={(value,index) => {
                    setCurrentColor(value)
                    slider.current.slickGoTo(index)
                }} />
            </div>
            <div className="product_actions">
                <button onClick={() => {
                    if(cartItem.length === 0 || cartItem.every((el:any) => el.image !== product.image[currentImage]) || cartItem.every((el:any) => el.currentSize !== currentSize) ) {
                        AddItemToLC(product,1,currentSize,currentColor,product.image[currentImage])
                        dispatch(setLS())
                    }
                    else {
                        const item = cartItem.filter((el:any) => el.image === product.image[currentImage] && el.currentSize === currentSize)[0]
                        localStorage.setItem(item.id,JSON.stringify({...item, quality: item.quality + 1}))
                        dispatch(setLS())
                    }
                }}>
                    <span>Добавить</span>
                    {cartItem.reduce((acc:any,elem:any) => acc + elem.quality,0) > 0 && <span>{cartItem.reduce((acc:any,elem:any) => acc + elem.quality,0)}</span>}
                </button>
            </div>
        </div>
    </div>
}

