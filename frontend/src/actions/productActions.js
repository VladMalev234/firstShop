import axios from 'axios'
import  { 
    PRODUCT_LIST_REQUEST, 
    PRODUCT_LIST_SUCCESS, 
    PRODUCT_LIST_FAIL, 
    PRODUCT_DETAILS_REQUEST,
    PRODUCT_DETAILS_SUCCESS,
    PRODUCT_DETAILS_FAIL,
    PRODUCT_DELETE_REQUEST,
    PRODUCT_DELETE_SUCCESS,
    PRODUCT_DELETE_FAIL,
    PRODUCT_CREATE_REQUEST,
    PRODUCT_CREATE_SUCCESS,
    PRODUCT_CREATE_FAIL,
    PRODUCT_UPDATE_REQUEST,
    PRODUCT_UPDATE_SUCCESS,
    PRODUCT_UPDATE_FAIL,
    PRODUCT_CREATE_REVIEW_REQUEST,
    PRODUCT_CREATE_REVIEW_SUCCESS,
    PRODUCT_CREATE_REVIEW_FAIL,
    PRODUCT_TOP_FAIL,
    PRODUCT_TOP_SUCCESS,
    PRODUCT_TOP_REQUEST
} from '../constants/productConstants'

import {logout} from './userActions'

// для aсинхронного запроса для отображения всех продуктов используем thunk
// dispatch метод для создания действия в redux для изменения reducer принимает в себя обьект, обязательно с типом
export const listProducts = (keyword = '', pageNumber = '') => async (dispatch) => {
    try {
        //вызывают reducer и возвращает
        dispatch({type: PRODUCT_LIST_REQUEST})

        //делаем реквест ?keyword - query string, & - если больше одной query string
        const { data } = await axios.get(`/api/products?keyword=${keyword}&pageNumber=${pageNumber}`)

        //вызываем reducer успешного реквеста передаем тип и данные
        dispatch({
            type: PRODUCT_LIST_SUCCESS,
            payload: data
        })
    } catch (error) {
        //если реквест не удался
        // хотим отобраить ошибку так как она отобажается на backend, проверяем если то и то правда, то возвращаем 1, а если нет, то 2
        dispatch({
            type: PRODUCT_LIST_FAIL,
            payload: error.response && error.response.data.message ? error.response.data.message 
            : error.message
        })
        console.log(error.response); 
    }
}

// для прдукта отдельно
export const listProductsDetails = (id) => async (dispatch) => {
    try {
        //вызывают reducer и возвращает
        dispatch({type: PRODUCT_DETAILS_REQUEST})

        //делаем реквест
        const { data } = await axios.get(`/api/products/${id}`)

        //вызываем reducer успешного реквеста передаем тип и данные
        dispatch({
            type: PRODUCT_DETAILS_SUCCESS,
            payload: data,
        })
    } catch (error) {
        //если реквест не удался
        // хотим отобразить ошибку так как она отображается на backend, проверяем если то и то правда, то возвращаем 1, а если нет, то 2
        dispatch({
            type: PRODUCT_DETAILS_FAIL,
            payload: error.response && error.response.data.message ? error.response.data.message 
            : error.message
        })
        //console.log(error.response); 
    }
}


//для удаления продукта из странички по айди
export const deleteProduct = (id) => async (dispatch, getState) => {
    try {
        dispatch({
            type: PRODUCT_DELETE_REQUEST,
        })

//двойная деструктуризация, получаем userLogin из getState а потом userInfo из userLogin, доступ к авторизованым пользователям
        const {userLogin : {userInfo},} = getState()

        //обьект который мы передаем при запросе как headers
        const config = {
            // место где мы отправим token для защищенных маршрутов адреса
            headers: {
                Authorization: `Bearer ${userInfo.token}`,
            },
        }
// вернет обьект с полем дата, по этому используем деструктуризацию
        await axios.delete(`/api/products/${id}`, config)
        // делаем реквест для получения данных

        //диспатчим полученные данныйе в редусер в data получакм обьект с функции userController с backend 
        dispatch({
            type: PRODUCT_DELETE_SUCCESS,
        })
    } catch (error) {
        const message =  error.response && error.response.data.message 
        ? error.response.data.message 
        : error.message
        if(message === 'Not authorized, token failed') {
            dispatch(logout())
          }
        dispatch({
            type: PRODUCT_DELETE_FAIL,
            payload: message
        })
        }
} 




//для изменения данных продукта из странички по айди
export const createProduct = () => async (dispatch, getState) => {
    try {
        dispatch({
            type: PRODUCT_CREATE_REQUEST,
        })

//двойная деструктуризация, получаем userLogin из getState а потом userInfo из userLogin, доступ к авторизованым пользователям
        const {userLogin : {userInfo},} = getState()

        //обьект который мы передаем при запросе как headers
        const config = {
            // место где мы отправим token для защищенных маршрутов адреса
            headers: {
                Authorization: `Bearer ${userInfo.token}`,
            },
        }
// вернет обьект с полем дата, по этому используем деструктуризацию
        const {data} = await axios.post(`/api/products`, {}, config)
        // делаем реквест для получения данных

        //диспатчим полученные данныйе в редусер в data получакм обьект с функции userController с backend 
        dispatch({
            type: PRODUCT_CREATE_SUCCESS,
            payload: data
        })
    } catch (error) {
        const message =  error.response && error.response.data.message 
        ? error.response.data.message 
        : error.message
        if(message === 'Not authorized, token failed') {
            dispatch(logout())
          }
        dispatch({
            type: PRODUCT_CREATE_FAIL,
            payload: message
        })
        }
} 

//для добавления отзыва о продукте из странички по айди
export const updateProduct = (product) => async (dispatch, getState) => {
    try {
        dispatch({
            type: PRODUCT_UPDATE_REQUEST,
        })

//двойная деструктуризация, получаем userLogin из getState а потом userInfo из userLogin, доступ к авторизованым пользователям
        const {userLogin : {userInfo},} = getState()

        //обьект который мы передаем при запросе как headers
        const config = {
            // место где мы отправим token для защищенных маршрутов адреса
            headers: {
                'Content-Type':'application/json',
                Authorization: `Bearer ${userInfo.token}`,
            },
        }
// вернет обьект с полем дата, по этому используем деструктуризацию
        const {data} = await axios.put(`/api/products/${product._id}`, product, config)
        // делаем реквест для получения данных

        //диспатчим полученные данныйе в редусер в data получакм обьект с функции userController с backend 
        dispatch({
            type: PRODUCT_UPDATE_SUCCESS,
            payload: data,
        })
        dispatch({type: PRODUCT_DETAILS_SUCCESS, payload: data,})
    } catch (error) {
        const message =  error.response && error.response.data.message 
        ? error.response.data.message 
        : error.message
        if(message === 'Not authorized, token failed') {
            dispatch(logout())
          }
        dispatch({
            type: PRODUCT_UPDATE_FAIL,
            payload: message
        })
        }
} 


//для добавления отзыва о продукте из странички по айди
export const createProductReview = (productId, review) => async (dispatch, getState) => {
    try {
        dispatch({
            type: PRODUCT_CREATE_REVIEW_REQUEST,
        })

//двойная деструктуризация, получаем userLogin из getState а потом userInfo из userLogin, доступ к авторизованым пользователям
        const {userLogin : {userInfo},} = getState()

        //обьект который мы передаем при запросе как headers
        const config = {
            // место где мы отправим token для защищенных маршрутов адреса
            headers: {
                'Content-Type':'application/json',
                Authorization: `Bearer ${userInfo.token}`,
            },
        }
// вернет обьект с полем дата, по этому используем деструктуризацию
        await axios.post(`/api/products/${productId}/reviews`, review, config)
        // делаем реквест для получения данных

        //диспатчим полученные данныйе в редусер в data получакм обьект с функции userController с backend 
        dispatch({
            type: PRODUCT_CREATE_REVIEW_SUCCESS,
        })
    } catch (error) {
        const message =  error.response && error.response.data.message 
        ? error.response.data.message 
        : error.message
        if(message === 'Not authorized, token failed') {
            dispatch(logout())
          }
        dispatch({
            type: PRODUCT_CREATE_REVIEW_FAIL,
            payload: message
        })
        }
} 


export const listTopProducts = () => async (dispatch) => {
    try {
        //вызывают reducer и возвращает
        dispatch({type: PRODUCT_TOP_REQUEST})

        //делаем реквест 
        const { data } = await axios.get(`/api/products/top`)
        

        //вызываем reducer успешного реквеста передаем тип и данные
        dispatch({
            type: PRODUCT_TOP_SUCCESS,
            payload: data
        })
    } catch (error) {
        //если реквест не удался
        // хотим отобраить ошибку так как она отобажается на backend, проверяем если то и то правда, то возвращаем 1, а если нет, то 2
        dispatch({
            type: PRODUCT_TOP_FAIL,
            payload: error.response && error.response.data.message ? error.response.data.message 
            : error.message
        })
    }
}




