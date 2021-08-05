import React from 'react'
import  { Link } from 'react-router-dom'
import { Row, Col, Image, ListGroup, Card, Button } from 'react-bootstrap'
import Rating from '../components/Rating'
import products from '../products'

// экран где при клике на конкретный продукт будет отображаться конкретно выюранный продукт
const ProductScreen = ({match}) => {
    //будет выдавать тот продукт у которого id эквивалентно id в url адрессе
    console.log(match);
    const product = products.find(p => p._id === match.params.id)

    return (
        <>
            <Link to='/' className="btn btn-light my-3">
                Go back
            </Link>
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
                            DSescription: {product.description}
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

                        <ListGroup.Item>
                            <Button className="btn-block" type="button" disabled={product.countInStock === 0 }>
                                Add to Cart
                            </Button>
                        </ListGroup.Item>

                    </Card>
                </Col>

            </Row>
        </>
    )
}

export default ProductScreen
