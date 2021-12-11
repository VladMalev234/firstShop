import {
    USER_LOGIN_REQUEST, 
    USER_LOGIN_SUCCESS, 
    USER_LOGIN_FAIL, 
    USER_LOGOUT,
    USER_REGISTER_REQUEST,
    USER_REGISTER_SUCCESS,
    USER_REGISTER_FAIL,
    USER_DETAILS_REQUEST,
    USER_DETAILS_SUCCESS,
    USER_DETAILS_FAIL,
    USER_UPDATE_PROFILE_REQUEST,
    USER_UPDATE_PROFILE_SUCCESS,
    USER_UPDATE_PROFILE_FAIL,
    USER_UPDATE_PROFILE_RESET,
    USER_DETAILS_RESET,
    USER_LIST_REQUEST,
    USER_LIST_SUCCESS,
    USER_LIST_FAIL,
    USER_LIST_RESET,
    USER_DELETE_REQUEST,
    USER_DELETE_SUCCESS,
    USER_DELETE_FAIL,
    USER_UPDATE_REQUEST,
    USER_UPDATE_SUCCESS,
    USER_UPDATE_FAIL,
    USER_UPDATE_RESET

} from '../constants/userConstants'

//Reducer для продуктов выступает как стейт, action - то что мы диспатчим
//Для проверки зарегистрированых пользователей
export const userLoginReducer = (state = {}, action) => {
    switch(action.type) {
        //при запросе на сервер
        case USER_LOGIN_REQUEST :
            return {
                loading: true,
            } 
        //при успешном запросе
        case USER_LOGIN_SUCCESS: 
            return {
                loading: false,
                userInfo: action.payload, 
            }
            // при ошибке
        case USER_LOGIN_FAIL: 
            return {
                loading: false,
                error: action.payload
            }
            // для выхода из системы
        case USER_LOGOUT:
                return {}
                
        default: 
         return state 
    }
}


//Reducer для регистрации пользователей выступает как стейт, action - то что мы диспатчим
export const userRegisterReducer = (state = {}, action) => {
    switch(action.type) {
        //при запросе на сервер
        case USER_REGISTER_REQUEST :
            return {
                loading: true,
            } 
        //при успешном запросе
        case USER_REGISTER_SUCCESS: 
            return {
                loading: false,
                userInfo: action.payload, 
            }
            // при ошибке
        case USER_REGISTER_FAIL: 
            return {
                loading: false,
                error: action.payload
            }   
        case USER_LOGOUT:
            return {}    
        default: 
         return state 
    }
}

// для вывода данных пользователя в профиле 
export const userDetailsReducer = (state = {user: {}}, action) => {

    switch(action.type) {
        //при запросе на сервер
        case USER_DETAILS_REQUEST :
            return {
                //то что находиться в начальном состоянии а именно user: {}
                ...state,
                 loading: true,
            } 
        //при успешном запросе
        case USER_DETAILS_SUCCESS: 
            return {
                loading: false,
                user: action.payload, 
            }
            // при ошибке
        case USER_DETAILS_FAIL: 
            return {
                loading: false,
                error: action.payload
            }   
        case USER_DETAILS_RESET: 
            return { user: {}}    
        default: 
         return state 
    }
}


// для изменения данных профиля  
export const userUpdateProfileReducer = (state = {}, action) => {

    switch(action.type) {
        //при запросе на сервер
        case USER_UPDATE_PROFILE_REQUEST :
            return {
                loading: true,
            } 
        //при успешном запросе
        case USER_UPDATE_PROFILE_SUCCESS: 
            return {
                loading: false,
                success: true,
                userInfo: action.payload, 
            }
            // при ошибке
        case USER_UPDATE_PROFILE_FAIL: 
            return {
                loading: false,
                error: action.payload
            } 
        case USER_UPDATE_PROFILE_RESET:
            return {}  
        default: 
         return state 
    }
}



// для вывода списка пользователей 
export const userListReducer = (state = {users: []}, action) => {

    switch(action.type) {
        //при запросе на сервер
        case USER_LIST_REQUEST :
            return {
                loading: true,
            } 
        //при успешном запросе
        case USER_LIST_SUCCESS: 
            return {
                loading: false,
                users: action.payload, 
            }
            // при ошибке
        case USER_LIST_FAIL: 
            return {
                loading: false,
                error: action.payload
            }  
        case USER_LIST_RESET :
            return { users:[] }
        default: 
         return state 
    }
}


// для вывода списка пользователей 
export const userDeleteReducer = (state = {}, action) => {

    switch(action.type) {
        //при запросе на сервер
        case USER_DELETE_REQUEST :
            return {
                loading: true,
            } 
        //при успешном запросе
        case USER_DELETE_SUCCESS: 
            return {
                loading: false,
                success: true, 
            }
            // при ошибке
        case USER_DELETE_FAIL: 
            return {
                loading: false,
                error: action.payload
            }  
        default: 
         return state 
    }
}



// для изменения данных пользователя админом 
export const userUpdateReducer = (state = { user: {} }, action) => {

    switch(action.type) {
        //при запросе на сервер
        case USER_UPDATE_REQUEST:
            return {
                loading: true,
            } 
        //при успешном запросе
        case USER_UPDATE_SUCCESS: 
            return {
                loading: false,
                success: true 
            }
            // при ошибке
        case USER_UPDATE_FAIL: 
            return {
                loading: false,
                error: action.payload
            }  
        case USER_UPDATE_RESET: 
            return {
                user: {}
            }
        default: 
         return state 
    }
}