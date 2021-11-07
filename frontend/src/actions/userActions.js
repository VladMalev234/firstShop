import axios from "axios"
import { USER_DETAILS_FAIL, USER_DETAILS_REQUEST, USER_DETAILS_SUCCESS, USER_LOGIN_FAIL, USER_LOGIN_REQUEST, USER_LOGIN_SUCCESS, USER_LOGOUT,
    USER_REGISTER_FAIL,
    USER_REGISTER_REQUEST, 
    USER_REGISTER_SUCCESS,
    USER_UPDATE_PROFILE_FAIL,
    USER_UPDATE_PROFILE_REQUEST,
    USER_UPDATE_PROFILE_SUCCESS,
    USER_DETAILS_RESET,
} from "../constants/userConstants"

import { ORDER_LIST_MY_RESET } from '../constants/orderConstants'

//request for login and getting token для входа
export const login = (email, password) => async (dispatch) => {
    try {
        dispatch({
            type: USER_LOGIN_REQUEST
        })
        //обьект который мы передаем при запросе как headers
        const config = {
            // место где мы отправим token для защищенных маршрутов адреса
            headers: {
                'Content-type': 'application/json'
            },
        }
// вернет обьект с полем дата, по этому используем деструктуризацию
// делаем реквест для получения данных //1 - адрес, 2 - тело с параметрами с инпутов, 3 - headers, заголовок
        const {data} = await axios.post('/api/users/login', {email, password}, config)
        // делаем реквест для получения данных

        //диспатчим полученные данныйе в редусер в data получаем обьект с функции userController с backend 
        dispatch({
            type: USER_LOGIN_SUCCESS,
            payload: data,
        })

        // добавляем пользователя в локальное хранилище
        localStorage.setItem('userInfo', JSON.stringify(data))
} catch (error) {
    dispatch({
        type: USER_LOGIN_FAIL,
        payload: error.response && error.response.data.message ? error.response.data.message 
        : error.message
    })
    }
}


// Для выхода из профиля
export const logout = () => (dispatch) => {
    localStorage.removeItem('userInfo')
    dispatch({
        type: USER_LOGOUT,
    })
    dispatch({
        type: USER_DETAILS_RESET,
    })
    dispatch({
        type: ORDER_LIST_MY_RESET,
    })
}


//для регистрации
export const register = (name, email, password) => async (dispatch) => {
    try {
        dispatch({
            type: USER_REGISTER_REQUEST
        })
        //обьект который мы передаем при запросе как headers
        const config = {
            // место где мы отправим token для защищенных маршрутов адреса
            headers: {
                'Content-type': 'application/json'
            },
        }
// вернет обьект с полем дата, по этому используем деструктуризацию
// делаем реквест для получения данных //1 - адрес, 2 - тело с параметрами с инпутов, 3 - headers, заголовок
        const {data} = await axios.post('/api/users', {name, email, password}, config)
        // делаем реквест для получения данных

        //диспатчим полученные данныйе в редусер в data получакм обьект с функции userController с backend 
        dispatch({
            type: USER_REGISTER_SUCCESS,
            payload: data,
        })
//чтоюы зарегистроированый пользователь сразу регистрировался
        dispatch({
            type: USER_LOGIN_SUCCESS,
            payload: data,
        })

        // добавляем пользователя в локальное хранилище
        localStorage.setItem('userInfo', JSON.stringify(data))
} catch (error) {
    dispatch({
        type: USER_REGISTER_FAIL,
        payload: error.response && error.response.data.message ? error.response.data.message 
        : error.message
    })
    }
}


//для входа в профиль зарегистрированого пользователей; getState потому что мы можем получить userInfo у которого есть токен внутри который нужен
export const getUserDetails = (id) => async (dispatch, getState) => {

    try {
        dispatch({
            type: USER_DETAILS_REQUEST
        })

//двойная деструктуризация, получаем userLogin из getState а потом userInfo из userLogin, доступ к авторизованым пользователям
        const {userLogin : {userInfo}} = getState()

        //обьект который мы передаем при запросе как headers
        const config = {
            // место где мы отправим token для защищенных маршрутов адреса
            headers: {
                //'Content-type': 'application/json',
                Authorization: `Bearer ${userInfo.token}`,
            },
        }
// вернет обьект с полем дата, по этому используем деструктуризацию
// делаем реквест для получения данных //1 - адрес, 2 - тело с параметрами с инпутов, 3 - headers, заголовок
        const {data} = await axios.get(`/api/users/${id}`, config)
        // делаем реквест для получения данных

        //диспатчим полученные данныйе в редусер в data получакм обьект с функции userController с backend 
        dispatch({
            type: USER_DETAILS_SUCCESS,
            payload: data,
        })
} catch (error) {
    dispatch({
        type: USER_DETAILS_FAIL,
        payload: error.response && error.response.data.message ? error.response.data.message 
        : error.message
    })
    }
}



//для изменения данных профиля  зарегистрированого пользователя; getState потому что мы можем получить userInfo у которого есть токен внутри который нужен
export const updateUserProfile = (user) => async (dispatch, getState) => {

    try {
        dispatch({
            type: USER_UPDATE_PROFILE_REQUEST
        })

//двойная деструктуризация, получаем userLogin из getState а потом userInfo из userLogin, доступ к авторизованым пользователям
        const {userLogin : {userInfo},} = getState()

        //обьект который мы передаем при запросе как headers
        const config = {
            // место где мы отправим token для защищенных маршрутов адреса
            headers: {
                //'Content-type': 'application/json',
                Authorization: `Bearer ${userInfo.token}`,
            },
        }
// вернет обьект с полем дата, по этому используем деструктуризацию
// делаем реквест для изменения данных //1 - адрес, 2 - тело с параметрами с инпутов, 3 - headers, заголовок
        const {data} = await axios.put(`/api/users/profile`, user, config)
        // делаем реквест для получения данных

        //диспатчим полученные данныйе в редусер в data получакм обьект с функции userController с backend 
        dispatch({
            type: USER_UPDATE_PROFILE_SUCCESS,
            payload: data,
        })
} catch (error) {
    dispatch({
        type: USER_UPDATE_PROFILE_FAIL,
        payload: error.response && error.response.data.message ? error.response.data.message 
        : error.message
    })
    }
}