import React, {useState ,useEffect } from 'react'
import  { Link } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import { Row, Col, Image, ListGroup, Card, Button, Form } from 'react-bootstrap'
import Rating from '../components/Rating'
import Message from '../components/Message'
import Loader from '../components/Loader'
import Meta from '../components/Meta'
import {listProductsDetails, createProductReview} from '../actions/productActions'
import { PRODUCT_CREATE_REVIEW_RESET } from '../constants/productConstants'



// экран где при клике на конкретный продукт будет отображаться страница с конкретно выбранный продукт
//  match.params.id - для получения конкретного айди продукта при клике
const ProductScreen = ({history, match}) => {
// для показа количества едениц товара
    const [qty, setQty] = useState(1)
    const [comment, setComment] = useState('')
    const [rating, setRating] = useState(0)

    const dispatch = useDispatch()

    const productDetails = useSelector(state => state.productDetails)
    const {product, loading, error} = productDetails

    const userLogin = useSelector(state => state.userLogin)
    const {userInfo} = userLogin

    const productReviewCreate = useSelector(state => state.productReviewCreate)
    const { error: errorProductReview, success: successProductReview, loading: loadingProductReview} = productReviewCreate

    useEffect(() => {
        if(successProductReview) {
            //alert('Review Submitted')
            setRating(0)
            setComment('')
        }
        if(!product._id || product._id !== match.params.id) {
            dispatch(listProductsDetails(match.params.id))
            dispatch({type: PRODUCT_CREATE_REVIEW_RESET})
        }
    }, [successProductReview, dispatch, match, product])

//ФУНКЦИЯ ДОБАВЛЕНИЯ В КОРЗИНУ 
    const addToCartHandler = () => {
        //? парметры которые пушатся в истории переправляются переадресация 
        history.push(`/cart/${match.params.id}?qty=${qty}`)
    }


    const submitHandler = (e) => {
        e.preventDefault()
        dispatch(createProductReview(match.params.id, {rating, comment}))
    }

    return (
        <>
            <Link to='/' className="btn btn-light my-3">
                Go back
            </Link>
            {/* отрисовывает компонент если прошла загрузка и не было ошибок */}
            { loading ? <Loader /> : error ? <Message variant="danger">{error}</Message> 
            : (
             <> 
            <Meta title={`${product.name}`} />
            <Row>
                <Col md={6} >
                    {/* fluid чтоб картинка не выходила за свои границы конейнера */}
                    <Image src={product.image} alt={product.name}  fluid/>
                </Col>

                <Col md={3}>
                    {/* variant='flash' убирает пробелы или граница */}
                    <ListGroup variant='flu sh'>

                        <ListGroup.Item>
                            <h3>{product.name}</h3>
                        </ListGroup.Item>

                        <ListGroup.Item>
                            <Rating value={product.rating} text={`${product.numReviews} reviews`} />
                        </ListGroup.Item>

                        <ListGroup.Item>
                            Price: ${product.price}
                        </ListGroup.Item>

                        <ListGroup.Item>
                            Description: {product.description}
                        </ListGroup.Item>

                    </ListGroup>
                </Col>

                <Col md={3}>
                    <Card>

                        <ListGroup.Item variant="flush">
                            <Row>
                                <Col>Price:</Col>
                                <Col> <strong>${product.price} </strong> </Col>
                            </Row>
                        </ListGroup.Item>

                        <ListGroup.Item variant="flush">
                            <Row>
                                <Col>Status:</Col>
                                <Col>{product.countInStock > 0 ? "In Stock" : "Out of Stock"}</Col>
                            </Row>
                        </ListGroup.Item>
                        {/* && - then  показывает если продуктов больше 0*/}
                        {product.countInStock > 0 && (
                            <ListGroup.Item >
                                <Row>
                                    <Col>Qty</Col>
                                    <Col>
                                        <Form.Control 
                                        style={{padding: '5px 15px'}}
                                        as="select" 
                                        value={qty} 
                                        onChange={(e) => setQty(e.target.value)} >
                                            {/* для отображения количества */}
                                            {
                                                [...Array(product.countInStock).keys()].map((x) => (
                                                    <option key={x + 1} value={ x + 1}   >
                                                        { x + 1 }
                                                    </option>
                                                ))
                                            }
                                        </Form.Control>
                                    </Col>
                                </Row>
                            </ListGroup.Item>
                        ) }

{/* Button disabled когда нет продуктов в магазине */}
                        <ListGroup.Item>
                            <Button 
                            onClick={addToCartHandler}
                            className="btn-block" 
                            type="button" 
                            disabled={product.countInStock === 0 }>
                                Add to Cart
                            </Button>
                        </ListGroup.Item>

                    </Card>
                </Col>
                      
            </Row>

            <Row>
                <Col md={6}>
                    <h2>Reviews</h2>
                    {product.reviews.lenght === 0 && <Message>No Reviews</Message>}
                    <ListGroup variant='flush'>
                        {product.reviews.map(review => (
                            <ListGroup.Item key={review._id}>
                                <strong>
                                    {review.name}
                                </strong>
                                <Rating value={review.rating} />
                                <p>{review.createdAt.substring(0,10)}</p>
                                <p>{review.comment}</p>
                            </ListGroup.Item>
                        ))}

                        <ListGroup.Item>
                            <h2>Write a Customer Review</h2>
                            {successProductReview  && <Message variant='success'>Review submitted successfully</Message>}
                            {loadingProductReview && <Loader />}
                            {errorProductReview && <Message variant='danger'>{errorProductReview}</Message>}
                            {userInfo ? (
                               <Form onSubmit={submitHandler}>
                                   <Form.Group controlId='rating'>
                                        <Form.Label>Rating</Form.Label>
                                        <Form.Control as='select' 
                                        value={rating} 
                                        onChange={e=> setRating(e.target.value)}>
                                            <option value=''>Select...</option>
                                            <option value='1'>1 - Poor</option>
                                            <option value='2'>2 - Fair</option>
                                            <option value='3'>3 - Good</option>
                                            <option value='4'>4 - Very Good</option>
                                            <option value='5'>5 - Excellent</option>
                                        </Form.Control>
                                   </Form.Group>
                                   <Form.Group controlId='comment'>
                                       <Form.Label>Comment</Form.Label>
                                       <Form.Control as='textarea' 
                                       value={comment} 
                                       row='3' 
                                       onChange={e => setComment(e.target.value)}></Form.Control>
                                   </Form.Group>

                                   <Button disabled={loadingProductReview} type='submit' variant='primary'>Submit</Button>
                               </Form>
                               
                            ) : <Message>Please <Link to='/login'>sign in</Link> to write a review</Message>}
                        </ListGroup.Item>
                    </ListGroup>
                </Col>
            </Row>

            </>
            )}
        </>
    )
}

export default ProductScreen




    //// находит и возвращает, если срабатывает условие
    ////const product = products.find(p => p._id === match.params.id)
    //const [product, setProduct] = useState({})

    //useEffect(() => {
    //    //делаем запрос, получаем промис, командой then делаем из него обьект
    //    const fetchProduct = async() => {
    //        const {data} = await axios.get(`/api/products/${match.params.id}`)

    //        //получакм обьект с ключем data изменяем стейт с помощью функции 
    //        setProduct(data)
    //    }

    //    fetchProduct()
    //}, [match])