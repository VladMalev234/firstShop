import asyncHandler from 'express-async-handler'
import Product  from '../models/productModel.js'

//функции получения продуктов


//@desc Fetch all Prosucts
//@route GET /api/products
//@axess Public
//для всех продуктов
const getProducts = asyncHandler(async (req, res) => {

     // для получения всез продуктов с модели продуктов
     const products = await Product.find({})
    
     // для конвертации в джейсон формат
     res.json(products)

})



//@desc Fetch single product
//@route GET /api/products/:id
//@axess Public
const getProductById = asyncHandler(async (req, res) => {
//получаем один продукт из модели продуктов по айди
    const product = await Product.findById(req.params.id)
    if (product) {
        // для конвертации в джейсон формат
        res.json(product)
    } else {
        res.status(404)
        throw new Error('Product not found')
    }


    console.log(req.params);  

})

export {
    getProductById, 
    getProducts
}