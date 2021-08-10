import React, { useState, useEffect} from 'react'
import { Col, Row } from 'react-bootstrap'
import Product from '../components/Product'
import axios from 'axios'

// 1 экран сайта с продуктами
const HomeScreen = () => {

    const [products, setProducts] = useState([])

    //Срабатывает при загрузке компонента
    useEffect(() =>{
        //делаем запрос, получаем промис, командой then делаем из него обьект
    //   axios.get('/api/products').then(response)
        const fetchProducts = async() => {
            const {data} = await axios.get('/api/products')

            //получакм обьект с ключем data изменяем стейт с помощью функции 
            setProducts(data)
        }

        fetchProducts()

    }, [])

    return (
        <>
            <h1>Latest Products</h1>
            <Row>
                {products.map(product => (
                    <Col key={product._id} sm="12" md={6} lg={4} xl={3}> 
                        <Product product={product} />
                    </Col>
                )
                )}
            </Row>
        </>
    )
}

export default HomeScreen
