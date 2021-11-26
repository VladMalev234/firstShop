import axios from 'axios'
import React, {useState, useEffect,} from 'react'
import {Link} from 'react-router-dom'
import { Form, Button } from 'react-bootstrap'
import {  useDispatch, useSelector } from 'react-redux'
import Message from '../components/Message'
import Loader from '../components/Loader'
import FormContainer from '../components/FormContainer' 
import { listProductsDetails, updateProduct } from '../actions/productActions'
import { PRODUCT_UPDATE_RESET } from '../constants/productConstants'

// форма для входа уже зарегистрированых пользователей пользователя
// useState - поля формы будут частью State
const ProductEditScreen = ({ match, history }) => {
    //получаем айди с url адресса
    const productId = match.params.id


    //state для полей email password
    const [name, setName] = useState('')
    const [price, setPrice] = useState(0)
    const [image, setImage] = useState('')
    const [brand, setBrand] = useState('')
    const [category, setCategory] = useState('')
    const [countInStock, setCountInStock] = useState(0)
    const [description, setDescription] = useState('')
    // для загрузки файла будет true в процесе загрузки, а после снова false
    const [uploading, setUploading] = useState(false)




    const dispatch = useDispatch()

    const productDetails = useSelector(state => state.productDetails)
    const {product, loading, error} = productDetails

    const productUpdate = useSelector(state => state.productUpdate)
    const { error: errorUpdate, loading : loadingUpdate, success: successUpdate} = productUpdate

    //console.log(productDetails);




    useEffect(() => {
        if(successUpdate) {
              dispatch({type: PRODUCT_UPDATE_RESET})
              history.push('/admin/productlist')
        } else {
             //если мы не получили пользователя или айди с url адресса не совпадает с айди 
             if(!product.name || product._id !== productId) {
                dispatch(listProductsDetails(productId))
            } else {
                setName(product.name)
                setPrice(product.price)
                setImage(product.image)
                setBrand(product.brand)
                setCategory(product.category)
                setCountInStock(product.countInStock)
                setDescription(product.description)
            }
        }
               
    }, [dispatch, history, productId, product, successUpdate])


    const uploadFileHandler = async (e) => {
        //при загрузке файла получаем доступ к файлам, которые являються массивом, посколько мы можем загрузить несколько файлов
        // поскольку мы загружаем один файл берем первый файл с массива
        const file = e.target.files[0]
        //для получения значения пар значение-ключ
        const formData = new FormData()
        //для создания нового поля image и добавления к нему значения file
        formData.append('image', file)
        setUploading(true)

        try {
            const config ={
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            }
//получаем обратно путь к файлу
            const {data} = await axios.post('/api/upload', formData, config)

            setImage(data)
            setUploading(false)
        } catch (error){
            console.log(error)
            setUploading(false)
        }
    }

    const submitHandler = (e) => {
        // не перезагружаеться
        e.preventDefault()
        dispatch(updateProduct({
            _id: productId,
            name,
            price, 
            image,
            category,
            brand,
            countInStock,
            description
        }))
    }




    return (
        <>
            <Link to='/admin/productlist' className='btn btn-light my-3' >Go Back</Link>

            <FormContainer>
            <h1>Edit Product</h1>
            { loadingUpdate && <Loader />}
            {errorUpdate && <Message variant='danger' >{errorUpdate}</Message>}
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

                <Form.Group controlId='price'>
                    <Form.Label>Price </Form.Label>
                    <Form.Control
                     type='number'
                     placeholder='Enter price'
                     value={price}
                     onChange={(e) => setPrice(e.target.value)}></Form.Control>
                </Form.Group>

                <Form.Group controlId='image'>
                    <Form.Label>Image </Form.Label>
                    <Form.Control
                     type='text'
                     placeholder='Enter image url'
                     value={image}
                     onChange={(e) => setImage(e.target.value)}></Form.Control>
                     <Form.File id='image-file' label='Choose file' custom 
                     onChange={uploadFileHandler}></Form.File>
                     {uploading && <Loader/>}
                </Form.Group>


                <Form.Group controlId='brand'>
                    <Form.Label>Brand </Form.Label>
                    <Form.Control
                     type='text'
                     placeholder='Enter brand'
                     value={brand}
                     onChange={(e) => setBrand(e.target.value)}></Form.Control>
                </Form.Group>

                <Form.Group controlId='category'>
                    <Form.Label>Category </Form.Label>
                    <Form.Control
                     type='text'
                     placeholder='Enter category'
                     value={category}
                     onChange={(e) => setCategory(e.target.value)}></Form.Control>
                </Form.Group>


                <Form.Group controlId='countInStock'>
                    <Form.Label>Count In Stock </Form.Label>
                    <Form.Control
                     type='number'
                     placeholder='Enter count in stock'
                     value={countInStock}
                     onChange={(e) => setCountInStock(e.target.value)}></Form.Control>
                </Form.Group>


                <Form.Group controlId='description'>
                    <Form.Label>Description</Form.Label>
                    <Form.Control
                     type='text'
                     placeholder='Enter description'
                     value={description}
                     onChange={(e) => setDescription(e.target.value)}></Form.Control>
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

export default ProductEditScreen

