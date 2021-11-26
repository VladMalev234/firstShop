import React, {useState, useEffect,} from 'react'
import {Link} from 'react-router-dom'
import { Form, Button } from 'react-bootstrap'
import {  useDispatch, useSelector } from 'react-redux'
import Message from '../components/Message'
import Loader from '../components/Loader'
import FormContainer from '../components/FormContainer' 
import { getUserDetails, updateUser } from '../actions/userActions'
import {  USER_UPDATE_RESET } from '../constants/userConstants'
// форма для входа уже зарегистрированых пользователей пользователя
// useState - поля формы будут частью State
const UserEditScreen = ({ match, history }) => {
    const userId = match.params.id


    //state для полей email password
    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [isAdmin, setIsAdmin] = useState(false)


    const dispatch = useDispatch()

    const userDetails = useSelector(state => state.userDetails)
    const {user, loading, error} = userDetails

    const userUpdate = useSelector(state => state.userUpdate)
    const {success: successUpdate, loading: loadingUpdate, error: errorUpdate} = userUpdate

    useEffect(() => {
        if(successUpdate) {
            dispatch({type: USER_UPDATE_RESET})

            //хотим редиректить пользователя,  если данные обновились
            history.push('/admin/userlist')
        } else {
            //если мы не получили пользователя или айди с url адресса не совпадает с айди 
            if(!user.name || user._id !== userId) {
                dispatch(getUserDetails(userId))
            } else {
                setName(user.name)
                setEmail(user.email)
                setIsAdmin(user.isAdmin)
            }
        }  
    }, [dispatch, history, userId, user, successUpdate])

    //console.log(redirect);

    const submitHandler = (e) => {
        // не перезагружаеться
        e.preventDefault()
        dispatch(updateUser({ _id:userId, name, email, isAdmin}))
    }


    return (
        <>
            <Link to='admin/user/userlist' className='btn btn-light my-3' >Go Back</Link>

            <FormContainer>
            <h1>Edit User</h1>
            { loadingUpdate && <Loader/> }
            { errorUpdate && <Message varaint='daner'>{errorUpdate}</Message>}
            { loading ? <Loader /> : error 
            ? <Message variant='danger'>{Error}</Message> 
            : (
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

                <Form.Group controlId='isadmin'>
                    <Form.Check
                     type='checkbox'
                     label='Is Admin'
                     checked={isAdmin}
                     onChange={(e) => setIsAdmin(e.target.checked)}></Form.Check>
                </Form.Group>
  

                <Button type='submit' variant='primary'>
                    Update
                </Button>
            </Form>
            )}
            

        </FormContainer>
        </>
        
    )
}

export default UserEditScreen

