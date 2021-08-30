//aфайл где будем соеденять наши редусеры applyMiddleware  для thunk
import { createStore, combineReducers, applyMiddleware } from 'redux'
import thunk from 'redux-thunk'
import { composeWithDevTools } from 'redux-devtools-extension'
import {productListReducer, productDetailsReducer} from './reducers/productReducers'
import {cartReducer} from './reducers/cartReducers'

// постоянная в которую мы будем перелавать наши редьюсеры; preloadedState
const reducer = combineReducers({
    productList: productListReducer,
    productDetails: productDetailsReducer,
    cart: cartReducer,
})

//  получаем из Storage обьявленого в cartAction
const cartItemFromStorage = localStorage.getItem('cartItems') ? 
JSON.parse(localStorage.getItem('cartItems')) 
:[]

// для записи продуктов,  token, пользователей
const initialState = {
    cart: {cartItems: cartItemFromStorage}
}
//массив в который будут добавляться все midleware
const midleware = [thunk]

const store = createStore(
reducer,
initialState,
composeWithDevTools(applyMiddleware(...midleware)))
 
export default store