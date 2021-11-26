import express from 'express'
const router = express.Router()
import { authUser, 
    registerUser, 
    getUserProfile, 
    updateUserProfile, 
    getUsers,
    deleteUser,
    getUserById,
    updateUser,
 } from '../controllers/userController.js'
import { protect, admin } from '../middleware/authMiddleware.js'

// делаем post request чтоб зарегистрироваться
router.route('/').post(registerUser).get(protect, admin, getUsers)
//для пути делаем post request с вызовом данных с authUser
router.post('/login', authUser)
//get  запрос, для того чтоб реалзовать midleware записиваем его как первый аргумент 
//сначала идет проверка на наличие токена, а потом по айди в токене получаем профиль ользователя 
router.route('/profile')
.get( protect, getUserProfile )
.put(protect, updateUserProfile)

router.route('/:id').delete(protect, admin, deleteUser)
.get(protect, admin, getUserById)
.put(protect, admin, updateUser)

export default router