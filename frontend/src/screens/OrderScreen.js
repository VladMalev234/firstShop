import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { PayPalButton } from 'react-paypal-button-v2'
import { Link } from 'react-router-dom'
import { Button, Row, Col, ListGroup, Image, Card } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import Message from '../components/Message' 
import Loader from '../components/Loader'
import {getOrderDetails, payOrder} from '../actions/orderActions'
import { ORDER_PAY_RESET } from '../constants/orderConstants'



const OrderScreen = ({match}) => {
    //console.log(match);
    const orderId = match.params.id


    const [sdkReady, setSdkReady] = useState(false)

    const  dispatch = useDispatch()
   
// сведенья про хаказ из reduser
   const orderDetails = useSelector(state => state.orderDetails)
   const {order, loading, error} = orderDetails

   // сведенья про оплату из reduser
   const orderPay = useSelector(state => state.orderPay)
//   loading: loadingPay переназвали переменную, так как она уже существует
   const {success:successPay, loading: loadingPay} = orderPay

//   console.log(order);

   if(!loading) {
          //Calculate prices
     const addDecimals = (num) => {
        return (Math.round(num * 100) / 100).toFixed(2)
    }

    //добавляем в обьект cart поля 
    order.itemsPrice = addDecimals(order.orderItems.reduce((acc, item) => acc + item.price * item.qty, 0))

   }
//  если заказ оформлен перекидывает на страницу заказа
   useEffect(() => {
//скрипт для получения клиентского айди с сервера 
       const addPayPalScript = async () => {
        //   получаем данные с запроса а с данных айди
           const {data: clientId } = await axios.get('/api/config/paypal')
           const script = document.createElement('script')
           script.type = 'text/javascript'
           script.src = `https://www.paypal.com/sdk/js?client-id=${clientId}`
           script.async = true
           script.onload = () => {
                setSdkReady(true) 
           }
           document.body.appendChild(script)
       }
//если тут нет заказа или он не оплачен
       if(!order || successPay ) {
        //   для того чтоб скнуть state и загрузить его заново
        dispatch({type: ORDER_PAY_RESET})
         dispatch(getOrderDetails(orderId))
       } else if(!order.isPaid) {
    //  если заказ не оплачен

            //если пейпал скрипт не загружен 
            if( !window.paypal ) {
                addPayPalScript()
            } else {
                setSdkReady(true)
            }
       }
     
   }, [dispatch, orderId, successPay, order])


  const successPaymentHandler = (paymentResult) => {
    console.log(paymentResult);
    dispatch(payOrder(orderId, paymentResult))
  }

    return loading ? <Loader /> : error ? <Message variant='danger'>{error}</Message> 
    : <>
        <h1>Order {order._id}</h1>

        <Row>
                <Col md={8}>
                    <ListGroup variant="flush" >

                        <ListGroup.Item>
                            <h2>Shipping</h2>
                            <p><strong>Name: </strong> {order.user.name}</p>
                            <p>
                                <strong>Name: </strong> 
                                <a href={`mailto:${order.user.email}`}>{order.user.email}</a>
                            </p>

                            <p>
                                <strong>Address:</strong>
                                {order.shippingAddress.address},
                                {order.shippingAddress.city}, 
                                {order.shippingAddress.postalCode},
                                {order.shippingAddress.country},

                            </p>
                            {order.isDelivered ? <Message variant='success'>Delivered on {order.deliveredAt}</Message> 
                            : <Message variant='danger'>Not Delivered</Message>}
                        </ListGroup.Item>

                        <ListGroup.Item>
                            <h2>Payment Method</h2>
                            <p>
                                <strong>Method: </strong>
                                {order.paymentMethod}
                            </p>
                            {order.isPaid ? <Message variant='success'>Paid on {order.paidAt}</Message> 
                            : <Message variant='danger'>Not Paid</Message>}
                        </ListGroup.Item>

                        <ListGroup.Item>
                            <h2>Order Items</h2>
                            {order.orderItems.length === 0 ? <Message>Order is empty</Message> 
                            : (<ListGroup variant='flush'>
                                {/* для того чтоб отобоазить все товары в которые будут оплачены */}
                                    {order.orderItems.map((item, index) =>
                                    (
                                    <ListGroup.Item key={index}>
                                        <Row>
                                            <Col md={1}>
                                                <Image src={item.image} alt={item.name} fluid rounded></Image>
                                            </Col>
                                            <Col>
                                                <Link to={`/product/${item.product}`}>
                                                    {item.name}
                                                </Link>
                                            </Col>
                                            <Col md={4}>
                                                {item.qty} x ${item.price} = ${item.qty * item.price}
                                            </Col>

                                        </Row>
                                    </ListGroup.Item>
                                    )
                                    )}
                                </ListGroup>
                            )
                            }
                        </ListGroup.Item>

                    </ListGroup>
                </Col>

                <Col md={4}>
                    <Card>
                        <ListGroup variant='Flush'>

                            <ListGroup.Item>
                                <h2>Order Summary</h2>
                            </ListGroup.Item>

                            <ListGroup.Item>
                                <Row>
                                    <Col>Items</Col>
                                    <Col>${order.itemsPrice}</Col>
                                </Row>
                            </ListGroup.Item>

                            <ListGroup.Item>
                                <Row>
                                    <Col>Shipping</Col>
                                    <Col>${order.shippingPrice}</Col>
                                </Row>
                            </ListGroup.Item>

                            <ListGroup.Item>
                                <Row>
                                    <Col>Tax</Col>
                                    <Col>${order.taxPrice}</Col>
                                </Row>
                            </ListGroup.Item>

                            <ListGroup.Item>
                                <Row>
                                    <Col>Total</Col>
                                    <Col>${order.totalPrice}</Col>
                                </Row>
                            </ListGroup.Item>

                            {!order.isPaid && (
                                <ListGroup.Item>
                                    {loadingPay && <Loader />}
                                    {!sdkReady ? <Loader /> : (
                                        // количество
                                        <PayPalButton amount={order.totalPrice} onSuccess={successPaymentHandler}/>
                                    )}
                                </ListGroup.Item>
                            )}


                        </ListGroup>
                    </Card>
                </Col>
            </Row>
    </>
}

export default OrderScreen
