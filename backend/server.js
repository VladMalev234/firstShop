// записываем в переменную импорт express
 import express from 'express'
 import dotenv from  'dotenv'
 import { notFound, errorHandler } from './middleware/errorMidleware.js'
 import connectDB from './config/db.js'
 import productRoutes from './routes/productRoutes.js'


// запуск сервера

dotenv.config()

connectDB()

//в app записываем вызов express
 const app = express()

////midewarre for custom error срабатывает при запросе
////next -перемещение к другой части промежуточного ПО
// app.use((req, res, next) => {
//     console.log(req.originalUrl);
//     next()
// })

// при get запросе
 app.get('/', (req, res) => {
    // при ответе из сервера чтоб клиент получал сообщение
     res.send('API is running...')
 })

//сылка на productRoutes
 app.use('/api/products', productRoutes)

//404 error
app.use(notFound) 

//error middleware function
 app.use(errorHandler)

// записывает в константу порт который берет из файла .env
 const PORT = process.env.PORT || 5000
// app слушай порт 5000
 app.listen(PORT, console.log(`Server running in ${process.env.NODE_ENV} mode on port ${PORT}`))