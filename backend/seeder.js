//скрипт который запускается для импорта данных
import mongoose from 'mongoose'
import dotenv from 'dotenv'
import users from './data/users.js'
import products from './data/products.js'
import User from './models/userModel.js'
import Product from './models/productModel.js'
import Order from './models/orderModel.js'
import connectDB from './config/db.js'

dotenv.config()

connectDB()

const importData = async() => {
    try {
        //для удаления всех данных чтобы не импортировать те вещи которые уже есть в баззе данных
       await Order.deleteMany()
       await Product.deleteMany()
       await User.deleteMany()
    //импортируем пользователей с папки данные файл пользователи и мы хотим чтоб админ был законекчен
       const createdUsers = await User.insertMany(users)

    // получаем админа из массива пользователей
        const adminUser = createdUsers[0]._id

        const sampleProducts = products.map((product) => {
            //  спомощью спред оператора добавляем в каждый продукт админа
            return { ...product, user: adminUser }
        })

        await Product.insertMany(sampleProducts)

        console.log('Data imported');
        process.exit()
    } catch (error) {
        console.error(`${error} `)
        process.exit(1)
    }
}


const destroyData = async() => {
    try {
        //для удаления всех данных чтобы не импортировать те вещи которые уже есть в баззе данных
       await Order.deleteMany()
       await Product.deleteMany()
       await User.deleteMany()
    
        console.log('Data Destroyed');
        process.exit()
    } catch (error) {
        console.error(`${error} `)
        process.exit(1)
    }
}
//то что написано после запуска файла
if(process.argv[2] === '-d') {
    destroyData()
} else {
    importData()
}