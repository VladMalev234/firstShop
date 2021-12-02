import mongoose from 'mongoose'

//создаем схему для отзывов
const reviewSchema = mongoose.Schema(
    {
    name: { type: String, required: true },
    rating: { type: Number, required: true },
    comment: { type: String, required: true },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        //cылка на конкретную моделю для этого ObjectId
        ref: 'User',
    },
}, {
    timestamps: true
}) 

//создаем схему для продуктов 
const productSchema = mongoose.Schema({
    //соеденяет продукты и пользователей
    user: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        //cылка на конкретную моделю для этого ObjectId
        ref: 'User'
    },
    name: {
        type: String,
        required: true,
    },
    image: {
        type: String,
        required: true,
    },
    brand: {
        type: String,
        required: true,
    },
    category: {
        type: String,
        required: true,
    }, 
    description: {
        type: String,
        required: true,
    },

    reviews: [reviewSchema],

    rating: {
        type: Number,
        required: true,
        default: 0,
    },
    numReviews: {
        type: Number,
        required: true,
        default: 0
    },
    price: {
        type: Number,
        required: true,
        default: 0
    },
    countInStock: {
        type: Number,
        required: true,
        default: 0
    },
}, {
    timestamps: true
})

// создаем пользоватля и пердаем в него пользовательскую схему
const Product = mongoose.model('Product', productSchema);

export default Product
