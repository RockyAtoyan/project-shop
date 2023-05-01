import React, {useEffect} from 'react';
import './App.scss';
import {Header} from "./components/Header/Header";
import {Route, Routes} from "react-router-dom";
import {Main} from "./components/Main/Main";
import {Cart} from "./components/Cart/Cart";
import {useDispatch, useSelector} from "react-redux";
import {StateType} from "./components/store/store";
import {getProducts} from "./components/store/shopReducer";
import {Preloader} from "./components/Main/Preloader";


const App = () => {

    const dispatch:any = useDispatch()

    const fetching = useSelector((state:StateType) => state.shop.fetching)

    useEffect(() => {
        dispatch(getProducts())
    },[])

    return (
        <div className="wrapper" onClick={(event) => {
            // @ts-ignore
            if(!event.target.closest('.mobile_categories__btns,.sort_btns')){
                document.querySelector('.sort_btns .btns')?.classList.remove('active')
                document.querySelector('.mobile_categories__btns .items')?.classList.remove('active')
            }
        }}>
            <Header/>
            {fetching ? <Preloader /> : <>
                <Routes>
                    <Route path={'/'} element={<Main/>}/>
                    <Route path={'/cart'} element={<Cart/>}/>
                </Routes>
            </>}
        </div>
    );
}

export default App;
