// когда мы добавляем продуты в корзину, мы хотим делать запрос на API product
// для ID чтобы получить поля для получения данных о конкретном продукте для добавления в корзину
import axios from 'axios'
import {CART_REMOVE_ITEM, 
    CART_ADD_ITEM, 
    CART_SAVE_SHIPPING_ADDRESS,
    CART_SAVE_PAYMENT_METHOD
} from '../constants/cartConstants'

// с помощью dispatch можно ложить и получать state и это позволяет получить весь стейт getState для получения любого из state
export const addToCart = (id, qty) => async (dispatch, getState) => {

    const {data} = await axios.get(`/api/products/${id}`)

    dispatch({ 
        type: CART_ADD_ITEM,
        payload: {
            //айди
            product: data._id,
            name: data.name,
            image: data.image,
            price: data.price,
            countInStock: data.countInStock,
            qty
        } 
    })

    //console.log(localStorage);

    // записываем в локальное хранилище
    localStorage.setItem('cartItems', JSON.stringify(getState().cart.cartItems)) 
}


export const removeFromCart = (id) => async (dispatch, getState) => {
    dispatch({
        type: CART_REMOVE_ITEM,
        payload: id
    })

    localStorage.setItem('cartItems', JSON.stringify(getState().cart.cartItems))
}

// сохраняем адресс отправки
export const saveShippingAddress = (data) => async (dispatch) => {
    dispatch({
        type: CART_SAVE_SHIPPING_ADDRESS,
        payload: data
    })
// записываем в localStorage наши данные под именнем shippingAddress
    localStorage.setItem('shippingAddress', JSON.stringify(data))
}


// сохраняем метод оплаты 
export const savePaymentMethod = (data) => async (dispatch) => {
    dispatch({
        type: CART_SAVE_PAYMENT_METHOD,
        payload: data
    })
// записываем в localStorage наши данные под именнем shippingAddress
    localStorage.setItem('paymentMethod', JSON.stringify(data))
}