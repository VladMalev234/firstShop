import { PRODUCT_LIST_REQUEST,
         PRODUCT_LIST_SUCCESS, 
         PRODUCT_LIST_FAIL, 
         PRODUCT_DETAILS_REQUEST,
         PRODUCT_DETAILS_SUCCESS,
         PRODUCT_DETAILS_FAIL
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
                products: action.payload,
            }
            // при ошибке
        case PRODUCT_LIST_FAIL: 
            return {
                loading: false,
                error: action.payload
            }
        default:  return { state }
    }
}


//Reducer для продукта выступает как стейт, action - то что мы диспатчим, revies - отзывы которые мы будем передавать
export const productDetailsReducer = (state = { product: { revies: [] } }, action) => {
    switch(action.type) {
        //при запросе на сервер, будем добавлять все в текущее  состояние
        case PRODUCT_DETAILS_REQUEST :
            return {
                loading: true,
                ...state
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
        default:  return { state }
    }
}