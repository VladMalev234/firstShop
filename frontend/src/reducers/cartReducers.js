import {CART_ADD_ITEM, CART_REMOVE_ITEM} from '../constants/cartConstants'

export const cartReducer = (state = {cartItems: []}, action) => {

    switch (action.type) {
        case CART_ADD_ITEM: 
            const item = action.payload

            //существует ли продукт
            // для каждого айтема в state который соответствует текущему item
            const existItem = state.cartItems.find((x) => x.product === item.product )
            
            if(existItem) {
                return {
                    ...state,
                    //если текущая итерация текущего идентификатора элемента равна существующему элементу item.product,
                    // который является идентификатором, тогда мы просто вернем элемент для этой итерации.
                    //проходит по элементам корзины, если такой продукт уже есть в корзине то вернет его, если нет, то вернет итерируемый элемент
                    cartItems: state.cartItems.map( x => x.product === existItem.product ? item : x)
                } 
            } 
            // если не присутствует, то мы добавляем в массив новый item
            else {
                return {
                    ...state,
                    cartItems: [...state.cartItems, item]
                }
            }

            case CART_REMOVE_ITEM: 
            return {
                ...state,
                //возвращает все элементы которые соответствуют данному условию, а именно не совпадают с указанным айди action.payload
                cartItems: state.cartItems.filter(x => x.product !== action.payload)
            }

        default:
            return state
    }

}