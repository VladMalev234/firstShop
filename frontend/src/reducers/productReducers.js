import { PRODUCT_LIST_REQUEST,
    PRODUCT_LIST_SUCCESS, 
    PRODUCT_LIST_FAIL 
} from '../constants/productConstants'


//Reducer для продуктов выступает как стейт
export const productListReducer = (state = { products: [] }, actions) => {
    switch(actions.type) {
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
                products: actions.payload,
            }
            // при ошибке
        case PRODUCT_LIST_FAIL: 
            return {
                loading: false,
                error: actions.payload
            }
        default:  return { state }
    }
}