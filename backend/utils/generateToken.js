import jwt  from 'jsonwebtoken'

//метод будет принимать  id пользователь, потому что мы хотим добавить его как payload в token
const generateToken = (id) => {
    //регистрируем наш токен, задаем ему header, и секретный ключ, а так же время через который он истекает
    return jwt.sign({ id }, process.env.JWT_SECRET, {
        expiresIn: '30d'
    })
}

export default generateToken 