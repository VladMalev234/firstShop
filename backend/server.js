import path from 'path'
// записываем в переменную импорт express
 import express from 'express'
 import dotenv from  'dotenv'
 import morgan from 'morgan'
 import { notFound, errorHandler } from './middleware/errorMidleware.js'
 import connectDB from './config/db.js'
// роуты для получения или отправки данных на сервер
 import productRoutes from './routes/productRoutes.js'
 import userRoutes from './routes/userRoutes.js'
 import orderRoutes from './routes/orderRoutes.js'
 import uploadRoutes from './routes/uploadRoutes.js'



// запуск сервера

dotenv.config()

connectDB()

//в app записываем вызов express
 const app = express()


 //добавляем морган для отслеживаия пльзователей, когда они регистрируються или переходять по путям
if(process.env.NODE_ENV === 'development') {
    app.use(morgan('dev'))
}

// для получения даних в json формате в body при POST request
 app.use(express.json())


// при get запросе
 app.get('/', (req, res) => {
    // при ответе из сервера чтоб клиент получал сообщение
     res.send('API is running...')
 })

//сылка на productRoutes
 app.use('/api/products', productRoutes)
 
 app.use('/api/users', userRoutes)

 app.use('/api/orders', orderRoutes)

 app.use('/api/upload', uploadRoutes) 


//роут для получения оплаты товаров
 app.get('/api/config/paypal', (req, res) => res.send(process.env.PAYPAL_CLIENT_ID))


//make folder static чтоб загружалась в браузере 'upload
const __dirname = path.resolve()
app.use('/uploads', express.static(path.join(__dirname, '/uploads')))

//404 error
app.use(notFound) 

//error middleware function
app.use(errorHandler)

// записывает в константу порт который берет из файла .env
 const PORT = process.env.PORT || 5000
// app слушай порт 5000
 app.listen(PORT,
     console.log(`Server running in ${process.env.NODE_ENV} mode on port ${PORT}`))


 ////midewarre for custom error срабатывает при запросе
////next -перемещение к другой части промежуточного ПО
// app.use((req, res, next) => {
//     console.log(req.originalUrl);
//     next()
// })