// для проверки токенов
import jwt from 'jsonwebtoken'
import asyncHandler from 'express-async-handler'
import User from '../models/userModel.js'
//request, response, next
const protect = asyncHandler (async (req, res, next) =>  {
    let token
    //console.log(token);
    // для получения отправленного токена в headers 
    //проверяем, начинаеться ли с Bearer
    if(req.headers.authorization && req.headers.authorization.startsWith('Bearer'))
     {
        try {
            //получаем сам токен без начала Bearer, для этого методом split(' ')- разделяем строку на массив и берем его 2 значение
            token = req.headers.authorization.split(' ')[1]

            //декодируем получаемый токен и записываем секретный ключ 
            //const decoded = jwt.verify(token, process.env.JWT_SECRET)
            const decoded = jwt.verify( token, process.env.JWT_SECRET )
//находим юзера по айди и возвращаем его, только без пароля
            req.user = await User.findById(decoded.id).select('-password')

// потому что это промежуточное ПО midleware используем next()
            next()
        } catch (error) { 
            console.error(error)
            res.status(401)
            throw new Error ('Not authorized, token faild')
        }
    }

    if(!token) {
        res.status(401)
        throw new Error('Not autorized, no token')
    }
})

export {
    protect
}