import mongoose from 'mongoose'
import bcrypt from 'bcryptjs'

//создаем схему для пользователей 

const userSchema = mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
    },
    password: {
        type: String,
        required: true,
    },
    isAdmin: {
        type: Boolean,
        required: true,
        default: false
    }, 
}, {
    timestamps: true
})


//methods.matchPassword -  для создания метод для расшифровки пароля, который мы щифруем используя bcryptjs в data/users
userSchema.methods.matchPassword = async function(enteredPassword) {
    //cсравниваем пароли которые приходят и которые есть в базе this.password - потому что мы вызываем это в userController authUser()
    return await bcrypt.compare(enteredPassword, this.password)
}

//encrypt password  pre('') - предварительное выполнее, чтоб функция выполнядась одна за другой
// До сохранения хотим выполнить функцию
userSchema.pre('save', async function (next) {
    //мы хотим хешировать пароль только при заполненом поля ввода пароля или если его изменили
    if(!this.isModified('password')) {
        next()
    }
    //для хеширования 
    const salt = await bcrypt.genSalt(10)
    this.password = await bcrypt.hash(this.password, salt)
})


// создаем пользоватля и пердаем в него пользовательскую схему
const User = mongoose.model('User', userSchema);

export default User
