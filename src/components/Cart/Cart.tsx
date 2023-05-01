import {CartItem} from "./CartItem";
import {useDispatch, useSelector} from "react-redux";
import {StateType} from "../store/store";
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import DeleteIcon from '@mui/icons-material/Delete';
import {setLS} from "../store/shopReducer";
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import {useNavigate} from "react-router-dom";

export const Cart = () => {
    const dispatch:any = useDispatch()
    const navigate = useNavigate()

    const ls = useSelector((state:StateType) => state.shop.ls)

    return <section className={'cart'} >
        <div className="cart_actions">
            <h1>
                <span>
                    <ShoppingCartIcon />
                </span>
                <span>
                    Корзина
                </span>
            </h1>
            <button onClick={() => {
                localStorage.clear()
                dispatch(setLS())
            }}>
                <span>
                    <DeleteIcon />
                </span>
                <span>
                    Очистить корзину
                </span>
            </button>
        </div>
        <div className="cart_items">
            {ls.length > 0 ? ls.map((item:any) => {
                return <CartItem key={item.id} item={item} />
            }) : <h2>Корзина пуста!</h2> }
        </div>
        <div className="cart_info">
            <h3>Всего вещей: <span>{ls.reduce((acc:any,elem:any) => acc + elem.quality,0) + ' шт.'}</span></h3>
            <h3>Сумма заказа: <span>{ls.reduce((acc:any,elem:any) => acc + elem.quality*elem.price,0) + ' Р'}</span></h3>
        </div>
        <div className="cart_content">
            <button onClick={() => {
                navigate('/')
            }}>
                <span>
                    <ArrowBackIcon />
                </span>
                <span>Вернуться назад</span>
            </button>
            <button>
                <span>Оплатить сейчас</span>
            </button>
        </div>
    </section>
}