import React, {useEffect} from 'react'
import {Link} from 'react-router-dom'
import {useDispatch, useSelector} from 'react-redux'
import { Row, Col, ListGroup, Image, Form, Button, Card } from 'react-bootstrap'
import Message from '../components/Message'
import { addToCart, removeFromCart } from '../actions/cartActions'

//КОРЗИНА продуктов, вызывается в App.js добавления идут с ProductScreen
//location для получения qty - количекства продуктов и для получения queryString, history для редиректа
const CartScreen = ({match, location, history}) => {
    const productId= match.params.id
//   разбивает строку на массив из 2 значений и берем под индексом один
    const qty = location.search ? Number(location.search.split('=')[1]) : 1

    const dispatch = useDispatch()
// со всего стейта получаем поле cart
    const cart = useSelector((state) => state.cart)
    const { cartItems } = cart
    //console.log(cartItems);

    useEffect(() => {

        if(productId) {
            dispatch(addToCart(productId, qty))
        }
    }, [dispatch, productId, qty])

//удалить из корзины
    const removeFromCartHandler = (id) => {
       dispatch(removeFromCart(id))
    }
//оформить заказ
    const checkoutHandler = () => {
        //если человек не зарегистрирован его перекинет на регистрацию, если он заркгистрировался, перекиненет на доставку
        history.push('/login?redirect=shippiing')
    }

    return (
        <Row>
            <Col md = {8} >
                <h1>Shoping Cart </h1>
                {/* проверяем есть ли что-то в нашей корзине */}
                {cartItems.length === 0 
                ? <Message>Your cart is empty <Link to={'/'}>Go back</Link> </Message> 
                : (
                    <ListGroup variant='flush'>
                        {cartItems.map((item) => (
                            <ListGroup.Item key={item.product}>
                                 <Row>
                                    <Col md={2}> 
                                    {/*rounded закругленые углы  */}
                                        <Image src={item.image} alt={item.name} fluid rounded/>
                                    </Col>
                                    <Col md={3} >
                                        <Link to={`/product/${item.product}`}>{item.name}</Link>
                                    </Col>
                                    <Col md={2}>
                                        ${item.price}
                                    </Col>
                                    <Col md={2} >
                                        <Form.Control 
                                            style={{padding: '5px 15px'}}
                                            as="select" 
                                            value={item.qty} 
                                            //если изменить количество то оно измениться в редусере и в стейте соответственно
                                            onChange={(e) => dispatch(addToCart(item.product, Number(e.target.value)))}
                                            >
                                                {/* для отображения количества */}
                                                {
                                                    [...Array(item.countInStock).keys()].map((x) => (
                                                        <option key={x + 1} value={ x + 1}   >
                                                            { x + 1 }
                                                        </option>
                                                    ))
                                                }
                                        </Form.Control>
                                    </Col>
                                    <Col md={2} >
                                        {/* Удаление из корзины */}
                                        <Button type="button" variant='light' onClick={() => removeFromCartHandler(item.product)}>
                                            <i className='fas fa-trash'></i>
                                        </Button>
                                    </Col>
                                 </Row>
                            </ListGroup.Item>
                        ))}
                    </ListGroup>
                )}
            </Col>
            <Col md={4} >
                <Card>
                    <ListGroup variant='flush'>
                        <ListGroup.Item>
                            {/* принимает акамулятор и текущий aйтем */}
                            <h2>Subtotal ({cartItems.reduce((acc, item) => acc + item.qty, 0)}) items </h2>
                            {/* сумарная стоимость */}
                            ${cartItems
                            .reduce((acc, item) => acc + item.qty * item.price, 0)
                            .toFixed(2)}
                        </ListGroup.Item>
                        <ListGroup.Item>
                            <Button 
                            type='button' 
                            className="btn-block" 
                            disabled={cartItems.length === 0}
                            onClick={checkoutHandler}>
                                Proceed to checkout
                            </Button>
                        </ListGroup.Item>

                    </ListGroup>
                </Card>
            </Col>
        </Row>
    )
}

export default CartScreen
