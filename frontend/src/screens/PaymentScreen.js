//Экран выбора метода оплаты
import React, { useState } from 'react'
import { Form, Button, Col } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import FormContainer from '../components/FormContainer' 
import CheckoutSteps from '../components/CheckoutSteps'
import { savePaymentMethod } from '../actions/cartActions'


//экран для заполнения формы отправки history -для редиректа а экран оплты
const PaymentScreen = ({history}) => {
// получаем из стейта cartReducer  обьект shippingAddress
    const cart =  useSelector(state => state.cart)
    const { shippingAddress } = cart

    if(!shippingAddress.address) {
        history.push('/shipping')
    }

    const [paymentMethod, setPaymentMethod] = useState('PayPal')

    const dispatch = useDispatch()


    const submitHandler = (e) => {
        e.preventDefault()
        //будем диспачить  action сохранения адресса отправки
        dispatch(savePaymentMethod(paymentMethod))
        // перекидываем на другую страницу для оплаты  
        history.push('/placeorder')
    }

    return (
        <FormContainer>
            <CheckoutSteps step1 step2 step3 />
            <h1>Payment MEthod</h1>
            <Form onSubmit={submitHandler} >

                <Form.Group>
                    <Form.Label as='legend' >Select Method</Form.Label>

                <Col>
                    <Form.Check 
                    type="radio" 
                    label="PayPal or Credit Card" 
                    id="PayPal" 
                    name='paymentMethod'
                    value='PayPal'
                    checked
                    onChange={(e) => setPaymentMethod(e.target.value)}
                    ></Form.Check>

                    {/*<Form.Check 
                    type="radio" 
                    label="Stripe" 
                    id="Stripe" 
                    name='paymentMethod'
                    value='Stripe'
                    onChange={(e) => setPaymentMethod(e.target.value)}
                    ></Form.Check>*/}
                </Col>

                </Form.Group>


                <Button type="submit" variant='primary' >
                    Continue
                </Button>

            </Form>
        </FormContainer>
    )
}

export default PaymentScreen
