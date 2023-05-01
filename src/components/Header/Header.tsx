import {useDispatch, useSelector} from "react-redux";
import {StateType} from "../store/store";
import {useEffect, useState} from "react";
import {setCategory, setSearchValue} from "../store/shopReducer";
import {useLocation, useNavigate} from "react-router-dom";
import {CartButton} from "../Cart/CartButton";
import SearchIcon from '@mui/icons-material/Search';

export const Header = () => {
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const location = useLocation()

    const [currentSearchValue,setCurrentSearchValue] = useState('')
    const [showMode,setShowMode] = useState(true)

    const searchValue = useSelector((state:StateType) => state.shop.searchValue)

    useEffect(() => {
        navigate('/')
        dispatch(setSearchValue(currentSearchValue))
        dispatch(setCategory(0))
    },[currentSearchValue])

    useEffect(() => {
        if(location.pathname.slice(1) === 'cart'){
            return setShowMode(false)
        }
        setShowMode(true)
    },[location])


    return <header className={'header'}>
        <div className="header_inner">
            <div className="header_logo" onClick={() => navigate('/')}>
                <div className="header_logo__text">
                    <h2><span>aqua</span>marine</h2>
                    <h3>Интернет-магазин товаров для плавания</h3>
                </div>
            </div>
            {showMode && <>
                <div className="header_search">
                    <button>
                        <SearchIcon />
                    </button>
                    <input type="text" value={currentSearchValue} placeholder={'Поиск...'} onChange={(e) => {
                        setCurrentSearchValue(e.currentTarget.value)
                    }}/>
                </div>
                <CartButton />
            </>}
        </div>
    </header>
}
