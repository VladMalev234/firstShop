import express from 'express'
const router = express.Router()
import { getProducts, getProductById } from '../controllers/productController.js'


//для пути делаем get request
router.route('/').get(getProducts)


// для продукта по айди
router.route('/:id').get(getProductById)




export default router



//@desc Fetch all Prosucts
//@route GET api/products
//@axess Public
//для всех продуктов
//router.get(
//    '/',
//    asyncHandler(async (req, res) => {
//    // для получения всез продуктов с модели продуктов
//    const products = await Product.find({})
    
//    // для конвертации в джейсон формат
//    res.json(products)
// }))


//@desc Fetch single Prosuct
//@route GET api/products/:id
//@axess Public

// для продукта по айди req - параметры запроса, res - отклик(результат)
//router.get('/:id', asyncHandler(async(req, res) => {
//    const product = await Product.findById(req.params.id)
//    if (product) {
//        // для конвертации в джейсон формат
//        res.json(product)
//    } else {
//        res.status(404)
//        throw new Error('Product not found')
//    }


//    console.log(req.params);  

//    })
// )
