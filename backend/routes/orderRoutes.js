import express from 'express'
const router = express.Router()
import { addOrderItems, getOrderById, updateOrderToPaid, getMyOrders} from '../controllers/orderController.js'
import { protect } from '../middleware/authMiddleware.js'

// делаем post request чтоб зарегистрироваться
router.route('/').post(protect, addOrderItems)

router.route('/myorders').get(protect, getMyOrders)
//получаем информацию о закзе по айди
router.route('/:id').get(protect, getOrderById)

router.route('/:id/pay').put(protect, updateOrderToPaid)



export default router