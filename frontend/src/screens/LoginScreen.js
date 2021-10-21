import React, {useState, useEffect,} from 'react'
import {Link} from 'react-router-dom'
import { Form, Button, Row, Col } from 'react-bootstrap'
import {  useDispatch, useSelector } from 'react-redux'
import Message from '../components/Message'
import Loader from '../components/Loader'
import FormContainer from '../components/FormContainer' 
import { login } from '../actions/userActions'
// форма для входа уже зарегистрированых пользователей пользователя
// useState - поля формы будут частью State
const LoginScreen = ({ location, history }) => {
    //state для полей email password
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

    const dispatch = useDispatch()

    const userLogin = useSelector(state => state.userLogin)
    const {userInfo, loading, error} = userLogin
//сылка на url query string
    const redirect = location.search ? location.search.split('=')[1] : '/'

    //хотим редиректить если пользователь уе зарегистрировался
    useEffect(() => {
        if(userInfo) {
            history.push(redirect)
        }
        //зависимости для тогоо чтоб обновлялся при изменении одной из них
    }, [history, userInfo, redirect])

    //console.log(redirect);

    const submitHandler = (e) => {
        // не перезагружаеться
        e.preventDefault()
        //DISPATCH LOGIN
        dispatch(login(email, password))
    }


    return (
        <FormContainer>
            <h1>Sign In</h1>
            {/* then lets show */}
            {error && <Message variant='danger'>{error}</Message>}
            {loading && <Loader />}
            <Form onSubmit={submitHandler} >
                <Form.Group controlId='email'>
                    <Form.Label>Email Adress</Form.Label>
                    <Form.Control
                     type='email'
                     placeholder='Enter email'
                     value={email}
                     onChange={(e) => setEmail(e.target.value)}></Form.Control>
                </Form.Group>

                <Form.Group controlId='password'>
                    <Form.Label>Password</Form.Label>
                    <Form.Control
                     type='password'
                     placeholder='Enter password'
                     value={password}
                     onChange={(e) => setPassword(e.target.value)}></Form.Control>
                </Form.Group>

                <Button type='submit' variant='primary'>
                    Sign In
                </Button>
            </Form>

{/* Редирект на регистрацию */}
            <Row className='py-3'>
                <Col>
                    New Customer? {' '}
                    <Link to={redirect ?  `/register?redirect=${redirect}`: '/register'}>
                        Register
                    </Link>
                </Col>
            </Row>

        </FormContainer>
    )
}

export default LoginScreen
