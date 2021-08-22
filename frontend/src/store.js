//aфайл где будем соеденять наши редусеры applyMiddleware  для thunk
import { createStore, combineReducers, applyMiddleware } from 'redux'
import {productListReducer} from './reducers/productReducers'
import thunk from 'redux-thunk'
import { composeWithDevTools } from 'redux-devtools-extension'

// постоянная в которую мы будем перелавать наши редьюсеры; preloadedState
const reducer = combineReducers({
    productList: productListReducer,
})

const initialState = {}
//массив в который будут добавляться все midleware
const midleware = [thunk]

const store = createStore(reducer, initialState, composeWithDevTools(
applyMiddleware(...midleware)))

export default store