import axios from 'axios'
import  { 
    PRODUCT_LIST_REQUEST, 
    PRODUCT_LIST_SUCCESS, 
    PRODUCT_LIST_FAIL, 
    PRODUCT_DETAILS_REQUEST,
    PRODUCT_DETAILS_SUCCESS,
    PRODUCT_DETAILS_FAIL
} from '../constants/productConstants'

// для всинхронного запроса для отображения всех продуктов используем thunk
// dispatch метод для создания действия в redux для изменения reducer принимает в себя обьект, обязательно с типом
export const listProducts = () => async (dispatch) => {
    try {
        //вызывают reducer и возвращает
        dispatch({type: PRODUCT_LIST_REQUEST})

        //делаем реквест
        const {data} = await axios.get('/api/products')

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
        const {data} = await axios.get(`/api/products/${id}`)

        //вызываем reducer успешного реквеста передаем тип и данные
        dispatch({
            type: PRODUCT_DETAILS_SUCCESS,
            payload: data
        })
    } catch (error) {
        //если реквест не удался
        // хотим отобраить ошибку так как она отобажается на backend, проверяем если то и то правда, то возвращаем 1, а если нет, то 2
        dispatch({
            type: PRODUCT_DETAILS_FAIL,
            payload: error.response && error.response.data.message ? error.response.data.message 
            : error.message
        })
        console.log(error.response); 
    }
}