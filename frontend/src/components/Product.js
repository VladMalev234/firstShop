import React from 'react'
import { Link } from 'react-router-dom'
import { Card } from 'react-bootstrap'
import Rating from './Rating'

//каждый продукт отбражающийся на сайте
const Product = ( {product} ) => { 
    return (
      // картинка продукта с сылкой на продукт
       <Card className="my-3" >
          {/* Сылка на сам продукт по айди */}
          <Link to={`/product/${product._id}`}>
             <Card.Img src={product.image} variant='top' />
          </Link>
         {/*  название продукта  в виде сылки на айди  */}
          <Card.Body >
            <Link to={`/product/${product._id}`}>
               <Card.Title as="div">
                  <strong>{product.name}</strong>
               </Card.Title>
            </Link>
{/* Рейтинг продукта с компонентом Rating*/}
            <Card.Text as="div">
               <Rating 
                  value={product.rating} 
                  text={`${product.numReviews} reviews`}  
               />
            </Card.Text>
{/* Цена продукта */}
            <Card.Text as="h3">
               ${product.price}
            </Card.Text>
          </Card.Body>
       </Card>
    )
}



export default Product
