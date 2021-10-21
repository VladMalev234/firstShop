import React, {useState, useEffect,} from 'react'
import { Form, Button, Row, Col } from 'react-bootstrap'
import {  useDispatch, useSelector } from 'react-redux'
import Message from '../components/Message'
import Loader from '../components/Loader'
import { getUserDetails, updateUserProfile } from '../actions/userActions'

//Профиль пользователя 
// useState - поля формы будут частью State
const ProfileScreen = ({ history }) => {
    //state для полей email password
    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [confirmPassword, setConfirmPassword] = useState('')
    const [message, setMessage] = useState(null)

    const dispatch = useDispatch()

    const userDetails = useSelector(state => state.userDetails)
    const {user, loading, error} = userDetails
//для проверки зарегистрирован ли пользователь
    const userLogin = useSelector(state => state.userLogin)
    const {userInfo} = userLogin

    const userUpdateProfile = useSelector(state => state.userUpdateProfile)
    const {success} = userUpdateProfile

//сылка на url query string
    //const redirect = location.search ? location.search.split('=')[1] : '/'

    //хотим редиректить если пользователь не зарегистрировался
    useEffect(() => {
        if(!userInfo) {
            //редирект на страницу регистрации
            history.push('/login')
        } else  {
            //проверяем пользователя который пришел из стейта, если нет 
            if(!user.name) {
                //если пользователь не зарегистрирован перекидуем на страницу профиля
                dispatch(getUserDetails('profile'))
            } else {
                // чтобы поля были заполнены при загрузке профиля
                setName(user.name)
                setEmail(user.email)
            }
        }
        //зависимости для тогоо чтоб обновлялся при изменении одной из них
    }, [dispatch, history, userInfo, user])

    //console.log(redirect);

    const submitHandler = (e) => {
        // не перезагружаеться
        e.preventDefault()
        //DISPATCH Register
        if(password !== confirmPassword) {
            setMessage('Password do not match ')
        } else {
            //передаем езменившееся данные в аction
            dispatch(updateUserProfile({id: user._id, name, email, password}))
        }
     
    }


    return <Row>
        <Col md={3}>
            <h2>User Profile</h2>
                {/* then lets show */}
                {message && <Message variant='danger'>{message}</Message>} 
                {error && <Message variant='danger'>{error}</Message>}
                {success && <Message variant='success'>Profile Update</Message>}
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
                        Update
                    </Button>
                </Form>
        </Col>

        <Col md={9}>
            <h2>My Orders</h2>
        </Col>
    </Row>
}


export default ProfileScreen
