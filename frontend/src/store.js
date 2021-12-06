//aфайл где будем соеденять наши редусеры applyMiddleware  для thunk
import { createStore, combineReducers, applyMiddleware } from 'redux'
import thunk from 'redux-thunk'
import { composeWithDevTools } from 'redux-devtools-extension'
import {productListReducer, 
        productDetailsReducer,
        productDeleteReducer,
        productCreateReducer,
        productUpdateReducer,
        productReviewCreateReducer,
        productTopRatedReducer,
    } from './reducers/productReducers'
import {cartReducer} from './reducers/cartReducers'
import { 
    userLoginReducer, 
    userRegisterReducer, 
    userDetailsReducer, 
    userUpdateProfileReducer,
    userListReducer,
    userDeleteReducer,
    userUpdateReducer,
} from './reducers/userReducers'
import { 
    orderCreateReducer, 
    orderDetailsReducer,
    orderPayReducer,
    orderDeliverReducer,
    orderListMyReducer,
    orderListReducer,
 } from './reducers/orderReducers'

// постоянная в которую мы будем перелавать наши редьюсеры; preloadedState
const reducer = combineReducers({
    productList: productListReducer,
    productDetails: productDetailsReducer,
    productDelete: productDeleteReducer,
    productCreate: productCreateReducer,
    productUpdate: productUpdateReducer,
    productReviewCreate: productReviewCreateReducer,
    productTopRated: productTopRatedReducer,



    cart: cartReducer,

    userLogin: userLoginReducer,
    userRegister: userRegisterReducer,
    userDetails: userDetailsReducer,
    userUpdateProfile: userUpdateProfileReducer,
    userList: userListReducer,
    userDelete: userDeleteReducer,
    userUpdate: userUpdateReducer,

    orderCreate: orderCreateReducer,
    orderDetails: orderDetailsReducer,
    orderPay: orderPayReducer,
    orderDeliver: orderDeliverReducer,
    orderListMy: orderListMyReducer,
    orderList: orderListReducer,

})

//  получаем из Storage обьявленого в cartAction 
// если данные в Storage есть, то мы их приводим к читаемому виду, если нет то получаем пустой массив
    const cartItemFromStorage = localStorage.getItem('cartItems') ? 
    JSON.parse(localStorage.getItem('cartItems')) 
    :[]

    //  получаем из Storage обьявленого в userAction проверяем есть ли такие данные
    const userInfoFromStorage = localStorage.getItem('userInfo') ? 
    JSON.parse(localStorage.getItem('userInfo')) 
    :null

    // при инициализации store если что-то есть в localStorage связаное с shippingAddress хотим добавлять это в стейт
    const shippinAddressFromStorage = localStorage.getItem('shippingAddress') ? 
    JSON.parse(localStorage.getItem('shippingAddress')) 
    : {}

// для записи продуктов,  token, пользователей, для предзагрузки
const initialState = {
    cart: {cartItems: cartItemFromStorage, shippingAddress: shippinAddressFromStorage },
    userLogin: {userInfo: userInfoFromStorage},
}

//массив в который будут добавляться все midleware
const midleware = [thunk]

const store = createStore(
reducer,
initialState,
composeWithDevTools(applyMiddleware(...midleware)))
 
export default store