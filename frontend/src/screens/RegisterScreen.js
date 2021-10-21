import React, {useState, useEffect,} from 'react'
import {Link} from 'react-router-dom'
import { Form, Button, Row, Col } from 'react-bootstrap'
import {  useDispatch, useSelector } from 'react-redux'
import Message from '../components/Message'
import Loader from '../components/Loader'
import FormContainer from '../components/FormContainer' 
import { register } from '../actions/userActions'
// форма для входа уже зарегистрированых пользователей пользователя
// useState - поля формы будут частью State
const RegisterScreen = ({ location, history }) => {
    //state для полей email password
    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [confirmPassword, setConfirmPassword] = useState('')
    const [message, setMessage] = useState(null)


    const dispatch = useDispatch()

    const userRegister = useSelector(state => state.userRegister)
    const {userInfo, loading, error} = userRegister
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
        //DISPATCH Register
        if(password !== confirmPassword) {
            setMessage('Password do not match ')
        } else {
            dispatch(register(name, email, password))
        }
     
    }


    return (
        <FormContainer>
            <h1>Sign UP</h1>
            {/* then lets show */}
            {message && <Message variant='danger'>{message}</Message>} 
            {error && <Message variant='danger'>{error}</Message>}
            {loading && <Loader />}
            <Form onSubmit={submitHandler} >

                <Form.Group controlId='name'>
                    <Form.Label>Name </Form.Label>
                    <Form.Control
                     type='name'
                     placeholder='Enter name'
                     value={name}
                     onChange={(e) => setName(e.target.value)}></Form.Control>
                </Form.Group>

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


                <Form.Group controlId='confirmPassword'>
                    <Form.Label>Confirm Password</Form.Label>
                    <Form.Control
                     type='password'
                     placeholder='Confirm password'
                     value={confirmPassword}
                     onChange={(e) => setConfirmPassword(e.target.value)}></Form.Control>
                </Form.Group>

                <Button type='submit' variant='primary'>
                    Register
                </Button>
            </Form>

{/* Редирект на регистрацию */}
            <Row className='py-3'>
                <Col>
                    Have an Account ? 
                    {' '} <Link to={redirect ?  `/login?redirect=${redirect}`: '/login'}> 
                        Login
                    </Link>
                </Col>
            </Row>

        </FormContainer>
    )
}

export default RegisterScreen
