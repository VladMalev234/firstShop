import React, { useEffect } from 'react'
import { Link } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { Col, Row } from 'react-bootstrap'
import Product from '../components/Product'
import Loader from '../components/Loader'
import Message from '../components/Message'
import Paginate from '../components/Paginate'
import Meta from '../components/Meta'
import { listProducts } from '../actions/productActions'
import ProductCarousel from '../components/ProductCarousel'

// 1 экран сайта с продуктами
const HomeScreen = ({match}) => {
    const keyword = match.params.keyword


    const pageNumber = match.params.pageNumber || 1

    // хук для сооденения компонента с actions
    const dispatch = useDispatch()
 
    // название совпадает с названием reducer в store combineReducers
    //2получаем стейт с редюсера через поле в combineReducers в файле store
    const productList = useSelector( (state) => state.productList )

    // деструктуризируем данные по название полей в reducer
    const { loading, error, products, pages, page } = productList

    //console.log(`Error: ${error}`);
    //console.log(`LOAding: ${loading}`);
    //console.log(`Products: ${products}`);

    //Срабатывает при загрузке компонента
    useEffect(() =>{
        //получает данные из сервера
        //1выполняем функцию !actions, которая в свою очередь передает полученные данные в reducer как обьект продуктов
        dispatch(listProducts(keyword, pageNumber))
    },[dispatch, keyword, pageNumber])

    return (
        <>
        {/* для отображения заголовка окна */}
        <Meta />
     
        {/* проверка чтоб не показывать карусель при поиске про продукте */}
        {!keyword ? <ProductCarousel />  : (<Link to='/' className='btn btn-light my-3' >Go Back</Link>) }
            <h1>Latest Products</h1>
            {/* проверка на загрузку */}
            {loading ? (<Loader/>) : error ? (<Message variant="danger">{error}</Message>) 
            :    (
                <>
                <Row>
                    { products.map(product => (
                        <Col key={product._id} sm="12" md={6} lg={4} xl={3}> 
                            <Product product={product} />
                        </Col>
                    ))}
                </Row>
                <Paginate pages={pages} page={page} keyword={keyword ? keyword : ''} />
                </>
                )
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
   /*<Helmet> 
            <title>Welcome to Proshop | Home </title>
            <meta name='description' content='We sell the best product for the cheap' />
            <meta name='keywords' content='electronics, buy electronics, cheap electronics' />

        </Helmet>*/