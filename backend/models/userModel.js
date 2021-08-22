import mongoose from 'mongoose'

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

// создаем пользоватля и пердаем в него пользовательскую схему
const User = mongoose.model('User', userSchema);

export default User
