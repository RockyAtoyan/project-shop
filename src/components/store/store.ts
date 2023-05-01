import {applyMiddleware, combineReducers, createStore} from "redux";
import thunk from "redux-thunk";
import {shopReducer} from "./shopReducer";


const rootReducer = combineReducers({
    shop:shopReducer,
})

export type StateType = ReturnType<typeof rootReducer>

export const store = createStore(rootReducer,applyMiddleware(thunk))