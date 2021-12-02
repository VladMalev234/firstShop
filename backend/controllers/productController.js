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
})


//@desc Delete product 
//@route DELETE /api/products/:id
//@axess Private/Admin
const deleteProduct = asyncHandler(async (req, res) => {
    //получаем один продукт из модели продуктов по айди
        const product = await Product.findById(req.params.id)
        if (product) {
            await product.remove()
            res.json({message: 'Product remove'})
        } else {
            res.status(404)
            throw new Error('Product not found')
        }
    })





//@desc Create a product 
//@route POST /api/products
//@axess Private/Admin
const createProduct = asyncHandler(async (req, res) => {
    const product = new Product({
        name: 'Sample name',
        price: 0,
        //пользователь должен быть зарегистирован
        user: req.user._id,
        image: '/images/sample.jpg',
        brand: 'Sample brand',
        category: 'Sample category',
        countInStock: 0,
        numReviews: 0,
        description: 'Sample description',
    })

    const createdProduct = await product.save()
    //чтобы получить новый продукт обратно
    res.status(201).json(createdProduct)
})


//@desc Update a product 
//@route PUT /api/products:id
//@axess Private/Admin
const updateProduct = asyncHandler(async (req, res) => {
    const {
        name, 
        price, 
        description, 
        image, 
        brand, 
        category, 
        countInStock
    } = req.body

    //для поиска по айди который находиться в url адресе
    const product = await Product.findById(req.params.id)

    if(product) {
        product.name = name
        product.price = price
        product.description = description
        product.image = image
        product.brand = brand
        product.category = category
        product.countInStock = countInStock


        const updatedProduct = await product.save()
        //чтобы получить новый продукт обратно
        res.json(updatedProduct)
    } else {
        res.status(404)
        throw new Error('Product not found')
    } 
})



//@desc Create new review
//@route POST /api/products:id/reviews
//@axess Private
const createProductReview = asyncHandler(async (req, res) => {
    const {
        rating,
        comment,
    } = req.body

    //для поиска по айди который находиться в url адресе
    const product = await Product.findById(req.params.id)

    if(product) {
        //проверяем отправил ли пользователь отзыв
        //для каждого review хотим проверить совпадает ли пользователь оставивший ревью с авторизованым пользователем пользоватеоем
        const alredyReviewed = product.reviews.find((r) => r.user.toString() === req.user._id.toString())
        
        if(alredyReviewed) {
            res.status(400)
            throw new Error('Product already reviwed')
        }
        //если отзыв еще не отправлен, формируем его
        const review = {
            name: req.user.name,
            rating: Number(rating),
            comment,
            user: req.user._id,
        }

        product.reviews.push(review)
//для обновления числа отзывов 
        product.numReviews = product.reviews.length

    //для обновления сумарного рейтинга 
    //хотим поделить сумарный ретинг на количество отзывов
    product.rating = product.reviews.reduce((acc, item) => item.rating + acc, 0) /
    product.reviews.length

    await product.save()
//201 - becsuse new reviews is created
    res.status(201).json({message : "Review added"})
    } else {
        res.status(404)
        throw new Error('Product not found')
    } 
})

export {
    getProductById, 
    getProducts,
    deleteProduct,
    createProduct,
    updateProduct,
    createProductReview,
}