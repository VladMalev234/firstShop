import { PRODUCT_LIST_REQUEST,
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
         PRODUCT_CREATE_RESET,
         PRODUCT_UPDATE_REQUEST,
         PRODUCT_UPDATE_SUCCESS,
         PRODUCT_UPDATE_FAIL,
         PRODUCT_UPDATE_RESET,
         PRODUCT_CREATE_REVIEW_REQUEST,
         PRODUCT_CREATE_REVIEW_SUCCESS,
         PRODUCT_CREATE_REVIEW_FAIL,
         PRODUCT_CREATE_REVIEW_RESET,
         PRODUCT_TOP_REQUEST,
         PRODUCT_TOP_SUCCESS,
         PRODUCT_TOP_FAIL,
        } from '../constants/productConstants'


//Reducer для продуктов выступает как стейт, action - то что мы диспатчим
export const productListReducer = (state = { products: [] }, action) => {
    switch(action.type) {
        //при запросе на сервер
        case PRODUCT_LIST_REQUEST :
            return {
                loading: true,
                products: []
            } 
        //при успешном запросе
        case PRODUCT_LIST_SUCCESS: 
            return {
                loading: false,
                products: action.payload.products,
                pages: action.payload.pages,
                page: action.payload.page,
            }
            // при ошибке
        case PRODUCT_LIST_FAIL: 
            return {
                loading: false,
                error: action.payload
            }
        default:  return  state 
    }
}


//Reducer для продукта выступает как стейт, action - то что мы диспатчим, revies - отзывы которые мы будем передавать
export const productDetailsReducer = (state = { product: { reviews:[] } }, action) => {
    switch(action.type) {
        //при запросе на сервер, будем добавлять все в текущее состояние
        case PRODUCT_DETAILS_REQUEST :
            return {
                ...state,
                loading: true, 
            } 
        //при успешном запросе
        case PRODUCT_DETAILS_SUCCESS: 
            return {
                loading: false,
                product: action.payload,
            }
            // при ошибке
        case PRODUCT_DETAILS_FAIL: 
            return {
                loading: false,
                error: action.payload
            }
        default:  return state 
    }
}


//Reducer для продукта выступает как стейт, action - то что мы диспатчим, revies - отзывы которые мы будем передавать
// для удаления подукта по айди
export const productDeleteReducer = (state = {}, action) => {
    switch(action.type) {
        //при запросе на сервер, будем добавлять все в текущее  состояние
        case PRODUCT_DELETE_REQUEST :
            return {
                loading: true,
            } 
        //при успешном запросе
        case PRODUCT_DELETE_SUCCESS: 
            return {
                loading: false,
                success: true,
            }
            // при ошибке
        case PRODUCT_DELETE_FAIL: 
            return {
                loading: false,
                error: action.payload
            }
        default:  return state 
    }
}



// для создания нового продукта 
export const productCreateReducer = (state = {}, action) => {
    switch(action.type) {
        //при запросе на сервер, будем добавлять все в текущее  состояние
        case PRODUCT_CREATE_REQUEST:
            return {
                loading: true,
            } 
        //при успешном запросе
        case PRODUCT_CREATE_SUCCESS: 
            return {
                loading: false,
                success: true,
                product: action.payload,
            }
            // при ошибке
        case PRODUCT_CREATE_FAIL: 
            return {
                loading: false,
                error: action.payload
            }
        case PRODUCT_CREATE_RESET: 
            return {}
        default:  return state 
    }
}


// для редактирования данных  продукта 
export const productUpdateReducer = (state = { product: {} }, action) => {
    switch(action.type) {
        //при запросе на сервер, будем добавлять все в текущее  состояние
        case PRODUCT_UPDATE_REQUEST:
            return {
                loading: true,
            } 
        //при успешном запросе
        case PRODUCT_UPDATE_SUCCESS: 
            return {
                loading: false,
                success: true,
                product: action.payload,
            }
            // при ошибке
        case PRODUCT_UPDATE_FAIL: 
            return {
                loading: false,
                error: action.payload
            }
        case PRODUCT_UPDATE_RESET: 
            return { product: {} }
        default:  return state 
    }
}



// для редактирования данных  продукта 
export const productReviewCreateReducer = (state = {}, action) => {
    switch(action.type) {
        //при запросе на сервер, будем добавлять все в текущее  состояние
        case PRODUCT_CREATE_REVIEW_REQUEST:
            return {
                loading: true,
            } 
        //при успешном запросе
        case PRODUCT_CREATE_REVIEW_SUCCESS: 
            return {
                loading: false,
                success: true,
            }
            // при ошибке
        case PRODUCT_CREATE_REVIEW_FAIL: 
            return {
                loading: false,
                error: action.payload
            }
        case PRODUCT_CREATE_REVIEW_RESET: 
            return {}
        default:  return state 
    }
}



// для ролучения продуктов по рейтингу 
export const productTopRatedReducer = (state = { products: [] }, action) => {
    switch(action.type) {
        //при запросе на сервер, будем добавлять все в текущее  состояние
        case PRODUCT_TOP_REQUEST:
            return {
                loading: true,
                products: [],
            } 
        //при успешном запросе
        case PRODUCT_TOP_SUCCESS: 
            return {
                loading: false,
                products: action.payload
            }
            // при ошибке
        case PRODUCT_TOP_FAIL: 
            return {
                loading: false,
                error: action.payload
            }
        default:  return state 
    }
}