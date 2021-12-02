import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Col, Row } from 'react-bootstrap'
import Product from '../components/Product'
import Loader from '../components/Loader'
import Message from '../components/Message'

import { listProducts } from '../actions/productActions'

// 1 экран сайта с продуктами
const HomeScreen = ({match}) => {
    const keyword = match.params.keyword


    // хук для сооденения компонента с actions
    const dispatch = useDispatch()
 
    // название совпадает с названием reducer в store combineReducers
    //2получаем стейт с редюсера через поле в combineReducers в файле store
    const productList = useSelector( (state) => state.productList )

    // деструктуризируем данные по название полей в reducer
    const { loading, error, products } = productList

    //console.log(`Error: ${error}`);
    //console.log(`LOAding: ${loading}`);
    //console.log(`Products: ${products}`);


    //Срабатывает при загрузке компонента
    useEffect(() =>{
        //получает данные из сервера
        //1выполняем функцию !actions, которая в свою очередь передает полученные данные в reducer как обьект продуктов
        dispatch(listProducts(keyword))
    },[dispatch, keyword])

    return (
        <>
            <h1>Latest Products</h1>
            {/* проверка на загрузку */}
            {loading ? <Loader/> : error ? <Message variant="danger">{error}</Message> :    
                <Row>
                    { products.map(product => (
                        <Col key={product._id} sm="12" md={6} lg={4} xl={3}> 
                            <Product product={product} />
                        </Col>
                    ))}
                </Row>
            }
        </>
    )
}

export default HomeScreen





















// Запрос данных, до перехода на редакс
//const [products, setProducts] = useState([])

////Срабатывает при загрузке компонента
//useEffect(() =>{
//    //делаем запрос, получаем промис, командой then делаем из него обьект
////   axios.get('/api/products').then(response)
//    const fetchProducts = async() => {
//        const {data} = await axios.get('/api/products')

//        //получакм обьект с ключем data изменяем стейт с помощью функции 
//        setProducts(data)
//    }

//    fetchProducts()

//}, [])
