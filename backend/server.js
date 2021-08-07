// записываем в переменную импорт express
 const express = require('express')
 const products = require('./data/products')
//в app записываем вызов express
 const app = express()

// при get запросе
 app.get('/', (req, res) => {
    // при ответе из сервера чтоб клиент получал сообщение
     res.send('API is running....')
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
// app слушай порт 500
 app.listen(5000, console.log('Server run in port 5000'))