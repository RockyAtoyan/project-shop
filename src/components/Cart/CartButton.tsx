import {useNavigate} from "react-router-dom";
import {useSelector} from "react-redux";
import {StateType} from "../store/store";
import {useMemo} from "react";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";


export const CartButton = () => {
    const navigate = useNavigate()

    const ls = useSelector((state:StateType) => state.shop.ls)

    const price = useMemo(() => ls.reduce((acc:any,elem:any) => acc + elem.price*elem.quality,0),[ls])

    return <div onClick={() => navigate('/cart')} className={'cart_button'}>
        <button><span>
            {ls.length}
        </span>
        <span>
            <ShoppingCartIcon />
        </span>
        </button>
        <button>{price} руб</button>
    </div>
}