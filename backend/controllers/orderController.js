import asyncHandler from 'express-async-handler'
import Order  from '../models/orderModel.js'

//функция для создания заказа

//@desc Create a new order
//@route POST /api/orders
//@axess Private
//для всех продуктов
const addOrderItems = asyncHandler(async (req, res) => {
    //
    const { 
        orderItems, 
        shippingAddress, 
        paymentMethod, 
        itemsPrice, 
        taxPrice, 
        shippingPrice, 
        totalPrice 
    } = req.body

    if(orderItems && orderItems.length === 0) {
        res.status(400)

        throw new Error('No order items')
        return
    } else {
        const order = new Order({
            orderItems, 
            user: req.user._id,
            shippingAddress, 
            paymentMethod, 
            itemsPrice, 
            taxPrice, 
            shippingPrice, 
            totalPrice
        })

        //чтоб добавить в базу данных
        const createOrder = await order.save()

        res.status(201).json(createOrder)
    }
})


//@desc Get order by ID
//@route GET /api/orders/:id
//@axess Private
//для всех продуктов
const getOrderById = asyncHandler(async (req, res) => {
    //хотим фетчить заказы с базы данных и получать user email и  user name
    const order = await Order.findById(req.params.id).populate('user', 'name email')
    
    //если ордер есть 
    if(order) {
        res.json(order)
    } else {
        res.status(404)
        throw new Error('Order not found (in orderControllers)')
    }

})


//@desc Update order to paid
//@route GET /api/orders/:id/pay
//@axess Private
//для всех продуктов
const updateOrderToPaid = asyncHandler(async (req, res) => {
    //хотим фетчить заказы с базы данных и получать user email и  user name
    const order = await Order.findById(req.params.id)
    
    //если ордер есть 
    if(order) {
        order.isPaid = true
        order.paidAt = Date.now()
        //параметр который прийдет с PAYPAl
        order.paymentResult = {
            id: req.body.id,
            status: req.body.status,
            update_time: req.body.update_time,
            email_address: req.body.payer.email_address
        }
// для сохранения измененых параметров в баззу
        const updatedOrder = await order.save()
//отправляем обратно изменненый order
        res.json(updatedOrder)
    } else {
        res.status(404)
        throw new Error('Order not found (in orderControllers)')
    }

})


//@desc Update order to delivered
//@route GET /api/orders/:id/deliver
//@axess Private/Admin
//для всех продуктов
const updateOrderToDelivered = asyncHandler(async (req, res) => {
    //хотим фетчить заказы с базы данных и получать user email и  user name
    const order = await Order.findById(req.params.id)
    
    //если ордер есть 
    if(order) {
        order.isDelivered = true
        order.deliveredAt = Date.now()
        
// для сохранения измененых параметров в баззу
        const updatedOrder = await order.save()
//отправляем обратно изменненый order
        res.json(updatedOrder)
    } else {
        res.status(404)
        throw new Error('Order not found (in orderControllers)')
    }

})


//@desc Get logged in user orders
//@route GET /api/orders/my orders
//@axess Private
//для всех продуктов
const getMyOrders = asyncHandler(async (req, res) => {
    //хотим фетчить заказы с базы данных только те которые совпадает айди
    const orders = await Order.find({ user: req.user._id})
    res.json(orders)


})



//@desc Get all orders
//@route GET /api/orders
//@axess Private/Admon
//для всех продуктов
const getOrders = asyncHandler(async (req, res) => {
    //хотим фетчить все заказы с базы данных только и так же получать id name с поля user
    const orders = await Order.find({}).populate('user', 'id name')
    res.json(orders)


})



export {addOrderItems, 
    getOrderById, 
    updateOrderToPaid, 
    updateOrderToDelivered,
    getMyOrders, 
    getOrders, 
 }