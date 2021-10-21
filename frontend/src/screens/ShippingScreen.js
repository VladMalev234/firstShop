import React, { useState } from 'react'
import { Form, Button } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import FormContainer from '../components/FormContainer' 
import CheckoutSteps from '../components/CheckoutSteps'
import { saveShippingAddress } from '../actions/cartActions'


//экран для заполнения формы отправки history -для редиректа а экран оплты
const ShippingScreen = ({history}) => {
// получаем из стейта cartReducer  обьект shippingAddress
    const cart =  useSelector(state => state.cart)
    const { shippingAddress } = cart

    const [address, setAddress] = useState(shippingAddress.address)
    const [city, setCity] = useState(shippingAddress.city)
    const [postalCode, setPostalCode] = useState(shippingAddress.postalCode)
    const [country, setCountry] = useState(shippingAddress.country)

    const dispatch = useDispatch()


    const submitHandler = (e) => {
        e.preventDefault()
        //будем диспачить  action сохранения адресса отправки
        dispatch(saveShippingAddress({address, city, postalCode, country}))
        // перекидываем на другую страницу для оплаты  
        history.push('/payment')
    }

    return (
        <FormContainer>
            <CheckoutSteps step1 step2 />
            <h1>Shipping</h1>
            <Form onSubmit={submitHandler}>

                <Form.Group controlId='address'>
                        <Form.Label> Address </Form.Label>
                        <Form.Control
                        type='text'
                        placeholder='Enter address'
                        value={address}
                        required
                        onChange={(e) => setAddress(e.target.value)}></Form.Control>
                </Form.Group>

                <Form.Group controlId='city'>
                        <Form.Label> City </Form.Label>
                        <Form.Control
                        type='text'
                        placeholder='Enter city'
                        value={city}
                        required
                        onChange={(e) => setCity(e.target.value)}></Form.Control>
                </Form.Group>
                    
                <Form.Group controlId='postalCode'>
                        <Form.Label> Postal сode </Form.Label>
                        <Form.Control
                        type='text'
                        placeholder='Enter postal code'
                        value={postalCode}
                        required
                        onChange={(e) => setPostalCode(e.target.value)}></Form.Control>
                </Form.Group>

                <Form.Group controlId='country'>
                        <Form.Label> Country </Form.Label>
                        <Form.Control
                        type='text'
                        placeholder='Enter сountry'
                        value={country}
                        required
                        onChange={(e) => setCountry(e.target.value)}></Form.Control>
                </Form.Group>


                <Button type="submit" variant='primary' >
                    Continue
                </Button>

            </Form>
        </FormContainer>
    )
}

export default ShippingScreen
