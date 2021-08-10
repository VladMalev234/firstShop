// записываем в переменную импорт express
 import express from 'express'
 import dotenv from  'dotenv'
 import products from './data/products.js'

dotenv.config()

//в app записываем вызов express
 const app = express()

// при get запросе
 app.get('/', (req, res) => {
    // при ответе из сервера чтоб клиент получал сообщение
     res.send('API is running...')
 })
//для всех продуктов
 app.get('/api/products', (req, res) => {
    // для конвертации в джейсон формат
    res.json(products)
 })

// для продукта поайди req - параметры запроса, res - отклик(результат)
app.get('/api/products/:id', (req, res) => {
    const product = products.find(p => p._id === req.params.id)
    // для конвертации в джейсон формат
    res.json(product)
 })

// записывает в константу порт который берет из файла .env
 const PORT = process.env.PORT || 5000
// app слушай порт 5000
 app.listen(PORT, console.log(`Server running in ${process.env.NODE_ENV} mode on port ${PORT}`))