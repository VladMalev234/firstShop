import {CART_ADD_ITEM, 
    CART_REMOVE_ITEM, 
    CART_SAVE_SHIPPING_ADDRESS, 
    CART_SAVE_PAYMENT_METHOD,
    CART_CLEAR_ITEMS,
} from '../constants/cartConstants'

export const cartReducer = (state = {cartItems: [], shippingAddress: {}}, action) => {

    switch (action.type) {
        case CART_ADD_ITEM: 
            const item = action.payload 
            
            console.log('state',...state.cartItems);
            console.log('item', item);

            //существует ли продукт
            // для каждого айтема в state который соответствует текущему item
            const existItem = state.cartItems.find((x) => x.product === item.product )
            
            if(existItem) {
            console.log('item from if', item);

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
            console.log('item from else', item)
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

            case CART_SAVE_SHIPPING_ADDRESS: 
            return {
                ...state,
                shippingAddress: action.payload,
            }

            case CART_SAVE_PAYMENT_METHOD: 
            return {
                ...state,
                paymentMethod: action.payload,
            }
            //для очистки до прежнего вида про выходе
        case CART_CLEAR_ITEMS:
            return {
                ...state,
                cartItems: []
            } 
        default:
            return state
    }

}