import React, {useState ,useEffect } from 'react'
import  { Link } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import { Row, Col, Image, ListGroup, Card, Button, Form } from 'react-bootstrap'
import Rating from '../components/Rating'
import {listProductsDetails} from '../actions/productActions'
import Message from '../components/Message'
import Loader from '../components/Loader'


// экран где при клике на конкретный продукт будет отображаться страница с конкретно выбранный продукт
//  match.params.id - для получения конкретного айди продукта при клике
const ProductScreen = ({history, match}) => {
// для показа количества едениц товара
    const [qty, setQty] = useState(1)

    const dispatch = useDispatch()

    const productDetails = useSelector(state => state.productDetails)
    const {product = {}, loading, error} = productDetails
    //console.log(productDetails);

    useEffect(() => {
        dispatch(listProductsDetails(match.params.id))
    }, [dispatch, match])

//ФУНКЦИЯ ДОБАВЛЕНИЯ В КОРЗИНУ 
    const addToCartHandler = () => {
        //? парметры которые пушатся в истории переправляются переадресация 
        history.push(`/cart/${match.params.id}?qty=${qty}`)
    }


    return (
        <>
            <Link to='/' className="btn btn-light my-3">
                Go back
            </Link>
            {/* отрисовывает компонент если прошла загрузка и не было ошибок */}
            { loading ? <Loader /> : error ? <Message variant="danger">{error}</Message> : 
            (<Row>
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