import asyncHandler from 'express-async-handler'
import generateToken from '../utils/generateToken.js'

import User  from '../models/userModel.js'


// хотим отправлять обратно токен
//@desc Auth user & get token
//@route POST api/users/login
//@axess Public
//регистрация пользователя
const authUser = asyncHandler(async (req, res) => {
    //получения данных из тела когда мы записали данные в форму на фронте и нажали submit
    //отправляем  request и отправляем данные в тело 
    // тело сможет получить доступ к запрашиваему паролю и email в теле
    const {email, password } = req.body
//хотим найти юзера у которого имейл совпадает с полученным с body
    const user = await User.findOne({ email })
//проверяем есть ли такой пользователь, а потом проверяем его пароль с использование decrypt 
    if(user && (await user.matchPassword(password))) {
        res.json({
            _id: user._id,
            name: user.name,
            email: user.email,
            isAdmin: user.isAdmin,
            token: generateToken(user._id),
        })
    } else {
        // не авыторизованый
        res.status(401)
        throw new Error('Invalid email or password from authUser')
    }
})

// получать профили зарегистрированых пользователей
//@desc Get user profile
//@route GET api/users/profile
//@axess Private
const getUserProfile = asyncHandler(async (req, res) => {
    //получаем получаем пользователя
    const user = await User.findById(req.user._id)

    if (user) {
        //возвращаем для зарегистрированого пользователя
        res.json(
            {
                _id: user._id,
                name: user.name,
                email: user.email,
                isAdmin: user.isAdmin,
            }
        )
    } else {
        //user not found 
        res.status(404)
        throw new Error ('User not found')
    }
})




//@desc Register a new user
//@route POST api/users
//@axess Public
//регистрация пользователя
const registerUser = asyncHandler(async (req, res) => {
    //получения данных из тела когда мы записали данные в форму на фронте и нажали submit
    //отправляем  request и отправляем данные в тело 
    // тело сможет получить доступ к запрашиваему паролю и email в теле
    const { name, email, password } = req.body
//хотим понимать существует ли пользователь у которого имейл совпадает с полученным с body
    const userExist = await User.findOne({ email })
//проверяем есть ли такой пользователь, а потом проверяем его пароль с использование decrypt 
 if(userExist) {
    res.status(400)
    throw new Error ('User alredy exist')
 } 

// передаем в пользователя имя, email и пароль, которые пришли с запроса "регистрация", create - save
// пароль хешируеться в userModel - автоматически
    const user = await User.create({
        name,
        email, 
        password
    })

// если пользователь создан
    if(user) {
        //пользователь создан
        //возвращаем данные пользователя, даже токен, чтоб аутентифицироваться после регистрации
        res.status(201).json({
            _id: user._id,
            name: user.name,
            email: user.email,
            isAdmin: user.isAdmin,
            token: generateToken(user._id),
        })

    } else {
        res.status(400)
        throw new Error('Inavalid user data')
    }
})


// Измнять данные профиля зарегистрированых пользователей
//@desc Update user profile
//@route PUT api/users/profile
//@axess Private
const updateUserProfile = asyncHandler(async (req, res) => {
    //получаем получаем пользователя
    const user = await User.findById(req.user._id)
// если пользователь есть
    if (user) {
        //заменяет имя пользователя на имя полученное из тела запроса или оставляет его тем же если не изменилось
        user.name = req.body.name || user.name
        user.email = req.body.email || user.email
        //проверяем отправлен ли был пароль в теле
        if(req.body.password) {
            user.password = req.body.password
        }

        const updatedUser = await user.save()

        res.json({
            _id: updatedUser._id,
            name: updatedUser.name,
            email: updatedUser.email,
            isAdmin: updatedUser.isAdmin,
            token: generateToken(updatedUser._id),
        })
    } else {
        //user not found 
        res.status(404)
        throw new Error ('User not found')
    }
})




// получать все профили зарегистрированых пользователей для странички админа
//@desc Get all users 
//@route GET /api/users
//@axess Private/Admin
const getUsers = asyncHandler(async (req, res) => {
    //получаем получаем пользователя
    const users = await User.find({})
    res.json(users) 
})

// удаляет выбраного пользователя
//@desc Delete user
//@route DELETE /api/users:id
//@axess Private/Admin
const deleteUser = asyncHandler(async (req, res) => {
    //получаем получаем пользователя
    const user = await User.findById(req.params.id)
    //проверка есть ли пользователь
    if(user) {
        await user.remove()
        res.json({message: 'User removed'})
    } else {
        res.status(404)
        throw new Error ('User not found')
    }
})


// получать данные про пользователя чтоб их потом изменить
//@desc Get user by ID
//@route GET /api/users/:id
//@axess Private/Admin
const getUserById = asyncHandler(async (req, res) => {
    //получаем данные пользователя кроме пароля
    const user = await User.findById(req.params.id).select('-password')
    if(user) {
        res.json(user) 
    } else {
        res.status(404)
        throw new Error ('User not found')
    }
})


// Измнять данные профиля пользователя админом
//@desc Update user 
//@route PUT api/users/:id
//@axess Private/Admin
const updateUser = asyncHandler(async (req, res) => {
    //получаем получаем пользователя
    const user = await User.findById(req.params.id)
// если пользователь есть
    if (user) {
        //заменяет имя пользователя на имя полученное из тела запроса или оставляет его тем же если не изменилось
        user.name = req.body.name || user.name
        user.email = req.body.email || user.email
        user.isAdmin = req.body.isAdmin 

        const updatedUser = await user.save()

        res.json({
            _id: updatedUser._id,
            name: updatedUser.name,
            email: updatedUser.email,
            isAdmin: updatedUser.isAdmin
        })
    } else {
        //user not found 
        res.status(404)
        throw new Error ('User not found')
    }
})


export  {
    authUser,
    getUserProfile,
    registerUser,
    updateUserProfile,
    getUsers,
    deleteUser,
    getUserById,
    updateUser
}